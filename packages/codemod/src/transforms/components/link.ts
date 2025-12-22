import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Link component:
 * - isExternal -> target="_blank" rel="noopener noreferrer"
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
      openingElement: { name: { name: "Link" } },
    })
    .forEach((path) => {
      const attrs = path.node.openingElement.attributes
      if (!attrs) return

      const attrsToRemove: number[] = []
      let hasIsExternal = false

      attrs.forEach((attr, index) => {
        if (attr.type !== "JSXAttribute") return

        if (attr.name.name === "isExternal") {
          hasIsExternal = true
          attrsToRemove.push(index)
        }
      })

      // Remove isExternal
      attrsToRemove.reverse().forEach((index) => {
        attrs.splice(index, 1)
      })

      // Add target and rel if isExternal was present
      if (hasIsExternal) {
        // Check if target already exists
        const hasTarget = attrs.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "target",
        )
        if (!hasTarget) {
          attrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("target"),
              j.stringLiteral("_blank"),
            ),
          )
        }

        // Check if rel already exists
        const hasRel = attrs.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "rel",
        )
        if (!hasRel) {
          attrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("rel"),
              j.stringLiteral("noopener noreferrer"),
            ),
          )
        }
      }
    })

  return root.toSource({ quote: "single" })
}
