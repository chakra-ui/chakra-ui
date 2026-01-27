import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
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
  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "Spinner" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("Spinner")) return
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
