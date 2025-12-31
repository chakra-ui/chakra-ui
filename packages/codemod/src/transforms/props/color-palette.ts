import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    if (!isTrackedJsx(opening, chakraLocalNames)) return
    opening.attributes?.forEach((attr) => {
      if (attr.type !== "JSXAttribute") return
      if (attr.name.type !== "JSXIdentifier") return
      if (attr.name.name === "colorScheme") {
        attr.name.name = "colorPalette"
      }
    })
  })

  return root.toSource({ quote: "single" })
}
