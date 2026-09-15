import { SyntaxKind } from "ts-morph"
import type { Node } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const isStackItem = (tagNode: Node) => {
    const baseName = getJsxBaseName(tagNode)
    return baseName === "StackItem" && chakraLocalNames.has(baseName)
  }

  let hasStackItem = false

  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    if (!isStackItem(opening.getTagNameNode())) continue
    hasStackItem = true
    el.getClosingElement()?.getTagNameNode().replaceWithText("Box")
    opening.getTagNameNode().replaceWithText("Box")
  }

  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (!isStackItem(el.getTagNameNode())) continue
    hasStackItem = true
    el.getTagNameNode().replaceWithText("Box")
  }

  if (!hasStackItem) return

  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  importDecl
    .getNamedImports()
    .find((n) => n.getName() === "StackItem")
    ?.remove()

  const hasBox = importDecl.getNamedImports().some((n) => n.getName() === "Box")
  if (!hasBox) importDecl.addNamedImport("Box")
}

export default transform
