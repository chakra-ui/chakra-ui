import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxChild,
  JsxElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

const IMAGE_ATTRS = new Set([
  "src",
  "alt",
  "srcSet",
  "sizes",
  "loading",
  "referrerPolicy",
  "crossOrigin",
])

const REMOVE_ATTRS = new Set(["max", "ignoreFallback", "showBorder"])

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  // AvatarGroup: remove `max`, rename `spacing` -> `spaceX` (in place)
  if (chakraLocalNames.has("AvatarGroup")) {
    const openings = [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ]
    for (const opening of openings) {
      const tag = opening.getTagNameNode()
      if (!Node.isIdentifier(tag) || tag.getText() !== "AvatarGroup") continue
      const spacing = opening
        .getAttributes()
        .find(
          (a): a is JsxAttribute =>
            Node.isJsxAttribute(a) && a.getNameNode().getText() === "spacing",
        )
      spacing?.getNameNode().replaceWithText("spaceX")
      const max = opening
        .getAttributes()
        .find(
          (a): a is JsxAttribute =>
            Node.isJsxAttribute(a) && a.getNameNode().getText() === "max",
        )
      max?.remove()
    }
  }

  // Avatar: rebuild to Avatar.Root / Avatar.Fallback / Avatar.Image
  if (chakraLocalNames.has("Avatar")) {
    // Loop: each transform replaces `<Avatar>` with `<Avatar.Root>` (a member
    // expression) which no longer matches, so this terminates.
    while (transformNextAvatar(sourceFile)) {
      // keep going until no plain <Avatar> remains
    }
  }
}

function isPlainTag(tagNode: Node, name: string): boolean {
  return Node.isIdentifier(tagNode) && tagNode.getText() === name
}

function transformNextAvatar(sourceFile: Node): boolean {
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (isPlainTag(el.getOpeningElement().getTagNameNode(), "Avatar")) {
      rewriteAvatar(el)
      return true
    }
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (isPlainTag(el.getTagNameNode(), "Avatar")) {
      rewriteAvatar(el)
      return true
    }
  }
  return false
}

function rewriteAvatar(el: JsxElement | JsxSelfClosingElement) {
  const attributes = Node.isJsxElement(el)
    ? el.getOpeningElement().getAttributes()
    : el.getAttributes()

  const remainingAttrs: string[] = []
  const imageAttrs: string[] = []
  let nameAttrText: string | undefined
  let iconValueText: string | undefined
  let iconLabelValueText: string | undefined
  let hasGetInitials = false

  for (const attr of attributes) {
    if (!Node.isJsxAttribute(attr)) {
      remainingAttrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    if (REMOVE_ATTRS.has(name)) continue
    if (name === "name") {
      nameAttrText = attr.getText()
      continue
    }
    if (name === "icon") {
      const init = attr.getInitializer()
      if (init && Node.isJsxExpression(init)) {
        iconValueText = init.getText()
      }
      continue
    }
    if (name === "getInitials") {
      hasGetInitials = true
      continue
    }
    if (name === "iconLabel") {
      iconLabelValueText = attr.getInitializer()?.getText()
      continue
    }
    if (IMAGE_ATTRS.has(name)) {
      imageAttrs.push(attr.getText())
      continue
    }
    remainingAttrs.push(attr.getText())
  }

  // Fallback
  const fallbackAttrs: string[] = []
  if (nameAttrText) fallbackAttrs.push(nameAttrText)
  if (iconLabelValueText) fallbackAttrs.push(`aria-label=${iconLabelValueText}`)
  const fallbackAttrStr = fallbackAttrs.length
    ? " " + fallbackAttrs.join(" ")
    : ""
  const fallbackText = iconValueText
    ? `<Avatar.Fallback${fallbackAttrStr}>${iconValueText}</Avatar.Fallback>`
    : `<Avatar.Fallback${fallbackAttrStr} />`

  const childParts: string[] = []
  if (hasGetInitials) {
    childParts.push("// TODO: Handle getInitials function manually")
  }
  childParts.push(fallbackText)

  if (imageAttrs.length) {
    childParts.push(`<Avatar.Image ${imageAttrs.join(" ")} />`)
  }

  // Existing children (drop whitespace-only text; replace AvatarBadge)
  const existing: JsxChild[] = Node.isJsxElement(el) ? el.getJsxChildren() : []
  for (const child of existing) {
    if (Node.isJsxText(child)) {
      if (child.getText().trim() === "") continue
      childParts.push(child.getText())
      continue
    }
    if (
      Node.isJsxElement(child) &&
      isPlainTag(child.getOpeningElement().getTagNameNode(), "AvatarBadge")
    ) {
      childParts.push(
        "// TODO [BREAKING]: AvatarBadge removed. Migrate to Float + Circle pattern." +
          "// See https://chakra-ui.com/docs/components/avatar#badge" +
          "// Original: " +
          child.getText(),
      )
      continue
    }
    if (
      Node.isJsxSelfClosingElement(child) &&
      isPlainTag(child.getTagNameNode(), "AvatarBadge")
    ) {
      childParts.push(
        "// TODO [BREAKING]: AvatarBadge removed. Migrate to Float + Circle pattern." +
          "// See https://chakra-ui.com/docs/components/avatar#badge" +
          "// Original: " +
          child.getText(),
      )
      continue
    }
    childParts.push(child.getText())
  }

  const rootAttrStr = remainingAttrs.length
    ? " " + remainingAttrs.join(" ")
    : ""
  el.replaceWithText(
    `<Avatar.Root${rootAttrStr}>\n${childParts.join("\n")}\n</Avatar.Root>`,
  )
}

export default transform
