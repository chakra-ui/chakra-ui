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
    .find(j.JSXOpeningElement, { name: { name: "Select" } })
    .forEach((path) => {
      // Rename Select to NativeSelect.Root
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("NativeSelect"),
        j.jsxIdentifier("Root"),
      )

      const attributes = path.node.attributes ?? []

      // Transform props
      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "icon":
            // icon prop should be removed and placed in NativeSelect.Indicator
            return []
          case "colorScheme":
            return j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value)
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes
    })

  // Update closing tags
  root
    .find(j.JSXClosingElement, { name: { name: "Select" } })
    .forEach((path) => {
      path.node.name = j.jsxMemberExpression(
        j.jsxIdentifier("NativeSelect"),
        j.jsxIdentifier("Root"),
      )
    })

  return root.toSource({ quote: "single" })
}
