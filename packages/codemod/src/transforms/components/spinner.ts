import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const RENAME: Record<string, string> = {
  thickness: "borderWidth",
  speed: "animationDuration",
}

/**
 * Transforms Spinner component:
 * - thickness -> borderWidth
 * - speed -> animationDuration
 */
const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return
  if (!chakraLocalNames.has("Spinner")) return

  const openings: (JsxOpeningElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ]

  for (const opening of openings) {
    if (getJsxBaseName(opening.getTagNameNode()) !== "Spinner") continue
    const attrs = opening.getAttributes()
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i]
      if (!Node.isJsxAttribute(attr)) continue
      const newName = RENAME[attr.getNameNode().getText()]
      if (newName) attr.getNameNode().replaceWithText(newName)
    }
  }
}

export default transform
