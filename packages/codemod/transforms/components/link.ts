import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root.find(j.JSXOpeningElement, { name: { name: "Link" } }).forEach((path) => {
    const attributes = path.node.attributes ?? []
    let hasIsExternal = false

    // Transform attributes
    const newAttributes = attributes.flatMap((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return attr

      if (attr.name.name === "isExternal") {
        hasIsExternal = true
        // Remove isExternal and replace with target and rel
        return [
          j.jsxAttribute(j.jsxIdentifier("target"), j.stringLiteral("_blank")),
          j.jsxAttribute(
            j.jsxIdentifier("rel"),
            j.stringLiteral("noopener noreferrer"),
          ),
        ]
      }

      return attr
    })

    path.node.attributes = newAttributes
  })

  return root.toSource({ quote: "single" })
}
