import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

/**
 * Transforms IconButton component:
 * - icon prop -> children
 * - isRounded -> borderRadius="full"
 */
const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const isIconButton = (tagNode: Node) =>
    getJsxBaseName(tagNode) === "IconButton" &&
    chakraLocalNames.has("IconButton")

  const targets: Node[] = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (isIconButton(el.getOpeningElement().getTagNameNode())) targets.push(el)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (isIconButton(el.getTagNameNode())) targets.push(el)
  }

  targets.sort((a, b) => b.getStart() - a.getStart())

  for (const el of targets) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : (el as any)

    const attrParts: string[] = []
    let iconInner: string | undefined
    let iconIsJsx = false
    let changed = false

    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) {
        attrParts.push(attr.getText())
        continue
      }
      const name = attr.getNameNode().getText()
      if (name === "icon") {
        changed = true
        const init = attr.getInitializer()
        if (init && Node.isJsxExpression(init)) {
          const expr = init.getExpression()
          iconInner = expr?.getText()
          iconIsJsx =
            !!expr &&
            (Node.isJsxElement(expr) ||
              Node.isJsxSelfClosingElement(expr) ||
              Node.isJsxFragment(expr))
        }
        continue
      }
      if (name === "isRounded") {
        changed = true
        attrParts.push(`borderRadius="full"`)
        continue
      }
      attrParts.push(attr.getText())
    }

    if (!changed) continue

    const attrsStr = attrParts.length ? " " + attrParts.join(" ") : ""

    let childText: string | null
    if (iconInner !== undefined) {
      childText = iconIsJsx ? iconInner : `{${iconInner}}`
    } else if (Node.isJsxElement(el)) {
      childText = el
        .getJsxChildren()
        .map((c) => c.getText())
        .join("")
    } else {
      childText = null
    }

    el.replaceWithText(
      childText === null
        ? `<IconButton${attrsStr} />`
        : `<IconButton${attrsStr}>${childText}</IconButton>`,
    )
  }
}

export default transform
