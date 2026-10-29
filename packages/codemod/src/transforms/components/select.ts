import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

function getInner(el: JsxElement | JsxSelfClosingElement): string {
  if (!Node.isJsxElement(el)) return ""
  const full = el.getText()
  const openText = el.getOpeningElement().getText()
  const closeText = el.getClosingElement().getText()
  return full.slice(openText.length, full.length - closeText.length)
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const elements: Array<JsxElement | JsxSelfClosingElement> = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const el of elements.reverse()) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
    const tagNode = opening.getTagNameNode()
    if (!Node.isIdentifier(tagNode)) continue
    if (tagNode.getText() !== "Select" || !chakraLocalNames.has("Select"))
      continue

    // Drop the `icon` prop.
    const attrsText = opening
      .getAttributes()
      .filter(
        (attr) =>
          !(
            Node.isJsxAttribute(attr) && attr.getNameNode().getText() === "icon"
          ),
      )
      .map((attr) => attr.getText())
      .join(" ")

    // Detect an existing NativeSelect.Indicator among direct children.
    const hasIndicator = Node.isJsxElement(el)
      ? el.getJsxChildren().some((child) => {
          if (Node.isJsxSelfClosingElement(child) || Node.isJsxElement(child)) {
            const childTag = Node.isJsxElement(child)
              ? child.getOpeningElement().getTagNameNode()
              : child.getTagNameNode()
            return childTag.getText() === "NativeSelect.Indicator"
          }
          return false
        })
      : false

    const inner = getInner(el)
    const fieldOpen = attrsText
      ? `<NativeSelect.Field ${attrsText}>`
      : `<NativeSelect.Field>`

    const indicator = hasIndicator ? "" : `\n<NativeSelect.Indicator />`

    el.replaceWithText(
      `<NativeSelect.Root>\n` +
        `${fieldOpen}${inner}</NativeSelect.Field>` +
        `${indicator}\n` +
        `</NativeSelect.Root>`,
    )
  }

  // Rename the Select import to NativeSelect.
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  importDecl
    ?.getNamedImports()
    .find((n) => n.getName() === "Select")
    ?.setName("NativeSelect")
}

export default transform
