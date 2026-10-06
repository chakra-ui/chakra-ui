import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

/**
 * Transforms Collapse to Collapsible.Root > Collapsible.Content
 */
const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const isCollapse = (tagNode: Node) =>
    getJsxBaseName(tagNode) === "Collapse" && chakraLocalNames.has("Collapse")

  const targets: Node[] = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (isCollapse(el.getOpeningElement().getTagNameNode())) targets.push(el)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (isCollapse(el.getTagNameNode())) targets.push(el)
  }

  if (targets.length === 0) return

  // Edit later-in-file nodes first to keep earlier positions stable.
  targets.sort((a, b) => b.getStart() - a.getStart())

  for (const el of targets) {
    const opening = Node.isJsxElement(el) ? el.getOpeningElement() : (el as any)

    const attrParts: string[] = []
    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) {
        attrParts.push(attr.getText())
        continue
      }
      const name = attr.getNameNode().getText()
      if (name === "in") {
        const init = attr.getInitializer()
        attrParts.push(init ? `open=${init.getText()}` : "open")
      } else if (name === "animateOpacity") {
        // remove
      } else {
        attrParts.push(attr.getText())
      }
    }

    const childrenText = Node.isJsxElement(el)
      ? el
          .getJsxChildren()
          .map((c) => c.getText())
          .join("")
      : ""

    const attrsStr = attrParts.length ? " " + attrParts.join(" ") : ""
    el.replaceWithText(
      `<Collapsible.Root${attrsStr}>\n` +
        `<Collapsible.Content>${childrenText}</Collapsible.Content>\n` +
        `</Collapsible.Root>`,
    )
  }

  // Update imports: Collapse -> Collapsible
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  importDecl
    ?.getNamedImports()
    .find((n) => n.getName() === "Collapse")
    ?.getNameNode()
    .replaceWithText("Collapsible")
}

export default transform
