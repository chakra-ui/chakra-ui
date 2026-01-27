import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms IconButton component:
 * - icon prop -> children
 * - isRounded -> borderRadius="full"
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
      openingElement: { name: { name: "IconButton" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("IconButton")) return
      const attrs = path.node.openingElement.attributes
      if (!attrs) return

      let iconValue: any = null
      const attrsToRemove: number[] = []

      attrs.forEach((attr, index) => {
        if (attr.type !== "JSXAttribute") return

        // Capture icon prop
        if (attr.name.name === "icon") {
          if (attr.value?.type === "JSXExpressionContainer") {
            iconValue = attr.value.expression
          }
          attrsToRemove.push(index)
        }

        // isRounded -> borderRadius="full"
        if (attr.name.name === "isRounded") {
          attr.name.name = "borderRadius"
          attr.value = j.stringLiteral("full")
        }
      })

      // Remove icon attribute
      attrsToRemove.reverse().forEach((index) => {
        attrs.splice(index, 1)
      })

      // Move icon to children
      if (iconValue) {
        path.node.children = [iconValue]
      }
    })

  return root.toSource({ quote: "single" })
}
