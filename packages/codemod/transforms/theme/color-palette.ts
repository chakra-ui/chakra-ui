import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function colorPaletteTransformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Find all JSXElements with colorScheme prop
  root
    .find(j.JSXAttribute, { name: { name: "colorScheme" } })
    .forEach((path) => {
      const attr = path.node
      attr.name.name = "colorPalette"
    })

  return root.toSource({ quote: "single" })
}
