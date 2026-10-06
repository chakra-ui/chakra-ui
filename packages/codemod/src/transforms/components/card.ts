import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

function getAttr(opening: JsxOpening, name: string): JsxAttribute | undefined {
  for (const attr of opening.getAttributes()) {
    if (Node.isJsxAttribute(attr) && attr.getNameNode().getText() === name) {
      return attr
    }
  }
  return undefined
}

function transformCardRootProps(opening: JsxOpening) {
  const variantAttr = getAttr(opening, "variant")
  if (!variantAttr) return
  const init = variantAttr.getInitializer()
  if (!init || !Node.isStringLiteral(init)) return
  const val = init.getLiteralValue()
  if (val === "filled") {
    variantAttr.setInitializer('"subtle"')
  } else if (val === "unstyled") {
    variantAttr.remove()
    opening.addAttribute({ name: "unstyled" })
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const renameMap: Record<string, string> = {
    Card: "Card.Root",
    CardHeader: "Card.Header",
    CardBody: "Card.Body",
    CardFooter: "Card.Footer",
  }
  const cardSubComponents = ["CardHeader", "CardBody", "CardFooter"]
  const hasCardComponent = ["Card", ...cardSubComponents].some((name) =>
    chakraLocalNames.has(name),
  )
  if (!hasCardComponent) return

  // Multi-child JSX elements.
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (!chakraLocalNames.has(baseName)) continue
    const target = renameMap[baseName]
    if (!target) continue
    if (baseName === "Card") transformCardRootProps(opening)
    el.getClosingElement()?.getTagNameNode().replaceWithText(target)
    opening.getTagNameNode().replaceWithText(target)
  }

  // Self-closing JSX elements.
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const baseName = getJsxBaseName(el.getTagNameNode())
    if (!chakraLocalNames.has(baseName)) continue
    const target = renameMap[baseName]
    if (!target) continue
    if (baseName === "Card") transformCardRootProps(el)
    el.getTagNameNode().replaceWithText(target)
  }

  // Update imports.
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  for (const named of importDecl.getNamedImports()) {
    if (cardSubComponents.includes(named.getName())) named.remove()
  }

  const hasCard = importDecl
    .getNamedImports()
    .some((n) => n.getName() === "Card")
  if (!hasCard) importDecl.addNamedImport("Card")
}

export default transform
