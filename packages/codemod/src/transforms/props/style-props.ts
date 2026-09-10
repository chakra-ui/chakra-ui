import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"

const STYLE_PROP_MAP: Record<string, string> = {
  noOfLines: "lineClamp",
  truncated: "truncate",
  _activeLink: "_currentPage",
  _activeStep: "_currentStep",
  _mediaDark: "_osDark",
  _mediaLight: "_osLight",
}

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

    const attrs = opening.getAttributes()
    // Edit later-in-file nodes first so removals don't invalidate earlier ones.
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i]
      if (!Node.isJsxAttribute(attr)) continue
      const nameNode = attr.getNameNode()
      if (!Node.isIdentifier(nameNode)) continue
      const oldName = nameNode.getText()

      if (oldName === "apply") {
        attr.remove()
        continue
      }

      const newName = STYLE_PROP_MAP[oldName]
      if (!newName) continue
      nameNode.replaceWithText(newName)
    }
  }
}

export default transform
