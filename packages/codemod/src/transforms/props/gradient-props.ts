import { Node, SyntaxKind } from "ts-morph"
import type { JsxAttribute } from "ts-morph"
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

  const openings = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (!isTrackedJsx(opening, chakraLocalNames)) continue

    const bgAttr = opening
      .getAttributes()
      .find(
        (a): a is JsxAttribute =>
          Node.isJsxAttribute(a) &&
          Node.isIdentifier(a.getNameNode()) &&
          a.getNameNode().getText() === "bgGradient",
      )
    if (!bgAttr) continue

    const init = bgAttr.getInitializer()
    if (!init || !Node.isStringLiteral(init)) continue

    const value = init.getLiteralValue()
    const match = value.match(/(\w+)\(([^,]+),\s*([^,]+),\s*([^)]+)\)/)
    if (!match) continue

    const [, , direction, from, to] = match

    bgAttr.remove()
    opening.addAttributes([
      { name: "gradient", initializer: JSON.stringify(direction.trim()) },
      { name: "gradientFrom", initializer: JSON.stringify(from.trim()) },
      { name: "gradientTo", initializer: JSON.stringify(to.trim()) },
    ])
  }
}

export default transform
