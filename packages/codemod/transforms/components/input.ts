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
    .find(j.JSXOpeningElement, { name: { name: "Input" } })
    .forEach((path) => {
      const attributes = path.node.attributes ?? []

      // Transform attributes
      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "isDisabled":
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
          case "isInvalid":
            return j.jsxAttribute(j.jsxIdentifier("invalid"), attr.value)
          case "isReadOnly":
            return j.jsxAttribute(j.jsxIdentifier("readOnly"), attr.value)
          case "isRequired":
            return j.jsxAttribute(j.jsxIdentifier("required"), attr.value)
          case "colorScheme":
            return j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value)
          case "focusBorderColor":
          case "errorBorderColor":
            // These should be removed and handled via CSS variables
            // We'll just remove them for now
            return []
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes
    })

  return root.toSource({ quote: "single" })
}
