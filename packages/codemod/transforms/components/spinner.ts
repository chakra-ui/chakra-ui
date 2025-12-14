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
    .find(j.JSXOpeningElement, { name: { name: "Spinner" } })
    .forEach((path) => {
      const attributes = path.node.attributes ?? []

      // Transform attributes
      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "thickness":
            return j.jsxAttribute(j.jsxIdentifier("borderWidth"), attr.value)
          case "speed":
            return j.jsxAttribute(
              j.jsxIdentifier("animationDuration"),
              attr.value,
            )
          case "colorScheme":
            return j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value)
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes
    })

  return root.toSource({ quote: "single" })
}
