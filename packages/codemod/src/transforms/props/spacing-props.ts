import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  // 1. JSX attributes: spacing -> gap, divider -> separator
  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  for (const opening of openings) {
    if (!chakraLocalNames.has(getJsxBaseName(opening.getTagNameNode())))
      continue
    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) continue
      const nameNode = attr.getNameNode()
      if (!Node.isIdentifier(nameNode)) continue
      const name = nameNode.getText()
      if (name === "spacing") nameNode.replaceWithText("gap")
      if (name === "divider") nameNode.replaceWithText("separator")
    }
  }

  // 2. Destructuring shorthand: { spacing } -> { gap: spacing }
  for (const pattern of sourceFile.getDescendantsOfKind(
    SyntaxKind.ObjectBindingPattern,
  )) {
    const elements = pattern.getElements()
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i]
      if (el.getDotDotDotToken()) continue
      if (el.getPropertyNameNode()) continue
      const nameNode = el.getNameNode()
      if (Node.isIdentifier(nameNode) && nameNode.getText() === "spacing") {
        el.replaceWithText("gap: spacing")
      }
    }
  }

  // 3. Indexed access types: Props["spacing"] -> gap, Props["divider"] -> separator
  for (const iat of sourceFile.getDescendantsOfKind(
    SyntaxKind.IndexedAccessType,
  )) {
    const objectType = iat.getObjectTypeNode()
    const indexType = iat.getIndexTypeNode()
    if (!Node.isTypeReference(objectType)) continue
    const typeName = objectType.getTypeName()
    if (!Node.isIdentifier(typeName)) continue
    if (!chakraLocalNames.has(typeName.getText().replace("Props", ""))) continue
    if (!Node.isLiteralTypeNode(indexType)) continue
    const literal = indexType.getLiteral()
    if (!Node.isStringLiteral(literal)) continue
    const value = literal.getLiteralValue()
    if (value === "spacing") literal.setLiteralValue("gap")
    if (value === "divider") literal.setLiteralValue("separator")
  }
}

export default transform
