import { Node, SyntaxKind } from "ts-morph"
import type { ObjectLiteralExpression } from "ts-morph"
import type { Transform } from "../../transform"
import { getJsxBaseName } from "../../utils/chakra-tracker"

const CHAKRA_SOURCES = ["@chakra-ui/react", "@/components/ui"]

const transform: Transform = (sourceFile) => {
  const chakraLocalNames = new Set<string>()
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const source = importDecl.getModuleSpecifierValue()
    if (!CHAKRA_SOURCES.some((s) => source.includes(s))) continue
    const defaultImport = importDecl.getDefaultImport()
    if (defaultImport) chakraLocalNames.add(defaultImport.getText())
    const namespaceImport = importDecl.getNamespaceImport()
    if (namespaceImport) chakraLocalNames.add(namespaceImport.getText())
    for (const named of importDecl.getNamedImports()) {
      chakraLocalNames.add(named.getAliasNode()?.getText() ?? named.getName())
    }
  }

  if (chakraLocalNames.size === 0) return

  const renameObjectProps = (obj: ObjectLiteralExpression) => {
    const props = obj.getProperties()
    for (let i = props.length - 1; i >= 0; i--) {
      const prop = props[i]
      if (Node.isPropertyAssignment(prop)) {
        const nameNode = prop.getNameNode()
        if (Node.isIdentifier(nameNode) && nameNode.getText() === "spacing") {
          nameNode.replaceWithText("gap")
        } else if (
          Node.isStringLiteral(nameNode) &&
          nameNode.getLiteralValue() === "spacing"
        ) {
          nameNode.setLiteralValue("gap")
        }
      } else if (
        Node.isShorthandPropertyAssignment(prop) &&
        prop.getName() === "spacing"
      ) {
        prop.replaceWithText("gap: spacing")
      }
    }
  }

  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (!chakraLocalNames.has(getJsxBaseName(opening.getTagNameNode())))
      continue

    const attrs = opening.getDescendantsOfKind(SyntaxKind.JsxAttribute)
    for (let i = attrs.length - 1; i >= 0; i--) {
      const nameNode = attrs[i].getNameNode()
      if (Node.isIdentifier(nameNode) && nameNode.getText() === "spacing") {
        nameNode.replaceWithText("gap")
      }
    }

    const spreads = opening.getDescendantsOfKind(SyntaxKind.JsxSpreadAttribute)
    for (let i = spreads.length - 1; i >= 0; i--) {
      const arg = spreads[i].getExpression()
      if (Node.isObjectLiteralExpression(arg)) renameObjectProps(arg)
    }
  }
}

export default transform
