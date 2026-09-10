import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile, {
    crossFile: true,
  })
  if (chakraLocalNames.size === 0) return

  // JSX attributes: colorScheme -> colorPalette, spacing -> gap
  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  for (const opening of openings) {
    if (!isTrackedJsx(opening, chakraLocalNames)) continue
    for (const attr of opening.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) continue
      const nameNode = attr.getNameNode()
      if (!Node.isIdentifier(nameNode)) continue
      const name = nameNode.getText()
      if (name === "colorScheme") nameNode.replaceWithText("colorPalette")
      if (name === "spacing") nameNode.replaceWithText("gap")
    }
  }

  // Indexed access types: Props["colorScheme"] / Props["spacing"]
  for (const iat of sourceFile.getDescendantsOfKind(
    SyntaxKind.IndexedAccessType,
  )) {
    const objectType = iat.getObjectTypeNode()
    const indexType = iat.getIndexTypeNode()
    if (!Node.isTypeReference(objectType)) continue
    const typeName = objectType.getTypeName()
    if (!Node.isIdentifier(typeName)) continue
    if (!Node.isLiteralTypeNode(indexType)) continue
    const literal = indexType.getLiteral()
    if (!Node.isStringLiteral(literal)) continue
    const baseName = typeName.getText().replace(/Props$/, "")
    if (!chakraLocalNames.has(baseName)) continue
    if (literal.getLiteralValue() === "colorScheme") {
      literal.setLiteralValue("colorPalette")
    }
    if (literal.getLiteralValue() === "spacing") {
      literal.setLiteralValue("gap")
    }
  }

  // Property signatures typed as an indexed access on a tracked Props type.
  for (const ps of sourceFile.getDescendantsOfKind(
    SyntaxKind.PropertySignature,
  )) {
    const nameNode = ps.getNameNode()
    if (!Node.isIdentifier(nameNode)) continue
    const propName = nameNode.getText()
    const typeNode = ps.getTypeNode()
    if (!typeNode || !Node.isIndexedAccessTypeNode(typeNode)) continue
    const objectType = typeNode.getObjectTypeNode()
    if (!Node.isTypeReference(objectType)) continue
    const typeName = objectType.getTypeName()
    if (!Node.isIdentifier(typeName)) continue
    const baseName = typeName.getText().replace(/Props$/, "")
    if (!chakraLocalNames.has(baseName)) continue
    if (propName === "colorScheme") nameNode.replaceWithText("colorPalette")
    if (propName === "spacing") nameNode.replaceWithText("gap")
  }
}

export default transform
