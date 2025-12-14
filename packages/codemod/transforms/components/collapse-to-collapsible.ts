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
    .find(j.JSXOpeningElement, { name: { name: "Collapse" } })
    .forEach((path) => {
      // Rename Collapse to Collapsible.Root
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Collapsible"),
        j.jsxIdentifier("Root"),
      )

      const attributes = path.node.attributes ?? []

      // Transform attributes
      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "in":
            return j.jsxAttribute(j.jsxIdentifier("open"), attr.value)
          case "animateOpacity":
            // animateOpacity is removed, users should use keyframe animations
            return []
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes
    })

  // Update closing tags
  root
    .find(j.JSXClosingElement, { name: { name: "Collapse" } })
    .forEach((path) => {
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Collapsible"),
        j.jsxIdentifier("Root"),
      )
    })

  return root.toSource({ quote: "single" })
}
