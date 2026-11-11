import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

const PROP_RENAMES: Record<string, string> = {
  hasStripe: "striped",
  isAnimated: "animated",
  colorScheme: "colorPalette",
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const elements: Array<JsxElement | JsxSelfClosingElement> = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  // Process later positions first so earlier node positions stay valid.
  for (const el of elements.reverse()) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
    const tagNode = opening.getTagNameNode()
    if (!Node.isIdentifier(tagNode)) continue
    const baseName = tagNode.getText()
    if (baseName !== "Progress" || !chakraLocalNames.has("Progress")) continue

    const attrsText = opening
      .getAttributes()
      .map((attr) => {
        if (!Node.isJsxAttribute(attr)) return attr.getText()
        const name = attr.getNameNode().getText()
        const rename = PROP_RENAMES[name]
        if (!rename) return attr.getText()
        const init = attr.getInitializer()
        return init ? `${rename}=${init.getText()}` : rename
      })
      .join(" ")

    const open = attrsText ? `<Progress.Root ${attrsText}>` : `<Progress.Root>`
    el.replaceWithText(
      `${open}\n` +
        `<Progress.Track>\n` +
        `<Progress.Range />\n` +
        `</Progress.Track>\n` +
        `</Progress.Root>`,
    )
  }
}

export default transform
