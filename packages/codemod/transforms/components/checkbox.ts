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
    .find(j.JSXOpeningElement, { name: { name: "Checkbox" } })
    .forEach((path) => {
      const attributes = path.node.attributes ?? []

      // Transform attributes
      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "isChecked":
            return j.jsxAttribute(j.jsxIdentifier("checked"), attr.value)
          case "isDisabled":
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
          case "isInvalid":
            return j.jsxAttribute(j.jsxIdentifier("invalid"), attr.value)
          case "isIndeterminate":
            // This will need to be moved to Checkbox.Indicator
            // For now, just rename it
            return j.jsxAttribute(j.jsxIdentifier("indeterminate"), attr.value)
          case "colorScheme":
            return j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value)
          case "iconColor":
          case "iconSize":
          case "spacing":
            // These props are removed in v3
            return []
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes

      // Rename Checkbox to Checkbox.Root
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Checkbox"),
        j.jsxIdentifier("Root"),
      )
    })

  // Also update closing tags
  root
    .find(j.JSXClosingElement, { name: { name: "Checkbox" } })
    .forEach((path) => {
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("Checkbox"),
        j.jsxIdentifier("Root"),
      )
    })

  return root.toSource({ quote: "single" })
}
