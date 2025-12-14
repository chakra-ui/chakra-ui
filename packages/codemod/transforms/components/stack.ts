import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Transform Stack, VStack, and HStack components
  const stackComponents = ["Stack", "VStack", "HStack"]

  stackComponents.forEach((componentName) => {
    root
      .find(j.JSXOpeningElement, { name: { name: componentName } })
      .forEach((path) => {
        const attributes = path.node.attributes ?? []

        // Transform attributes
        const newAttributes = attributes.flatMap((attr) => {
          if (
            attr.type !== "JSXAttribute" ||
            attr.name.type !== "JSXIdentifier"
          )
            return attr

          switch (attr.name.name) {
            case "spacing":
              return j.jsxAttribute(j.jsxIdentifier("gap"), attr.value)
            case "divider":
              // Remove divider prop - user needs to manually add Stack.Separator
              return []
            default:
              return attr
          }
        })

        path.node.attributes = newAttributes
      })
  })

  return root.toSource({ quote: "single" })
}
