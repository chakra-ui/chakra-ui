import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root
    .find(j.JSXAttribute, { name: { name: "colorScheme" } })
    .forEach((path) => {
      const attr = path.node
      attr.name.name = "colorPalette"
    })

  return root.toSource({ quote: "single" })
}
