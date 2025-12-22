import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Spinner component:
 * - thickness -> borderWidth
 * - speed -> animationDuration
 */
export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "Spinner" } },
    })
    .forEach((path) => {
      const attrs = path.node.openingElement.attributes
      if (!attrs) return

      attrs.forEach((attr) => {
        if (attr.type !== "JSXAttribute") return

        if (attr.name.name === "thickness") {
          attr.name.name = "borderWidth"
        }

        if (attr.name.name === "speed") {
          attr.name.name = "animationDuration"
        }
      })
    })

  return root.toSource({ quote: "single" })
}
