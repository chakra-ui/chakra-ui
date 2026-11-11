import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"

const transform: Transform = (sourceFile, ctx) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile, {
    crossFile: ctx.crossFile,
  })
  if (chakraLocalNames.size === 0) return

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
      if (name !== "sx" && name !== "__css") continue

      const init = attr.getInitializer()
      if (!init || !Node.isJsxExpression(init)) continue
      const obj = init.getExpression()
      if (!obj || !Node.isObjectLiteralExpression(obj)) continue

      // Prefix nested object-valued keys with "& " so they become CSS selectors.
      const props = obj.getProperties()
      for (let i = props.length - 1; i >= 0; i--) {
        const prop = props[i]
        if (!Node.isPropertyAssignment(prop)) continue
        const keyNode = prop.getNameNode()
        let keyName: string
        if (Node.isIdentifier(keyNode)) keyName = keyNode.getText()
        else if (Node.isStringLiteral(keyNode))
          keyName = keyNode.getLiteralValue()
        else continue
        const value = prop.getInitializer()
        if (!value || !Node.isObjectLiteralExpression(value)) continue
        keyNode.replaceWithText(JSON.stringify(`& ${keyName}`))
      }

      nameNode.replaceWithText("css")
    }
  }
}

export default transform
