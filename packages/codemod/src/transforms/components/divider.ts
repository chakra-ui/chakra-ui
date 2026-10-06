import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const isDivider = (tagNode: Node) => {
    const baseName = getJsxBaseName(tagNode)
    return baseName === "Divider" && chakraLocalNames.has(baseName)
  }

  let hasDivider = false

  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    if (!isDivider(opening.getTagNameNode())) continue
    hasDivider = true
    // Rename the closing tag first (later position) so the opening tag's
    // position stays stable.
    el.getClosingElement()?.getTagNameNode().replaceWithText("Separator")
    opening.getTagNameNode().replaceWithText("Separator")
  }

  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (!isDivider(el.getTagNameNode())) continue
    hasDivider = true
    el.getTagNameNode().replaceWithText("Separator")
  }

  if (!hasDivider) return

  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  importDecl
    .getNamedImports()
    .find((n) => n.getName() === "Divider")
    ?.remove()

  const hasSeparator = importDecl
    .getNamedImports()
    .some((n) => n.getName() === "Separator")
  if (!hasSeparator) importDecl.addNamedImport("Separator")
}

export default transform
