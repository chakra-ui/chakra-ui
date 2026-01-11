import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  const mapping: Record<string, string> = {
    Tag: "Tag.Root",
    TagLeftIcon: "Tag.StartElement",
    TagRightIcon: "Tag.EndElement",
    TagLabel: "Tag.Label",
    TagCloseButton: "Tag.CloseTrigger",
  }

  Object.entries(mapping).forEach(([from, to]) => {
    const parts = to.split(".")
    root.find(j.JSXElement).forEach((path) => {
      const opening = path.node.openingElement
      if (opening.name.type !== "JSXIdentifier" || opening.name.name !== from)
        return
      if (!chakraLocalNames.has(from)) return
      opening.name =
        parts.length === 1
          ? j.jsxIdentifier(parts[0])
          : j.jsxMemberExpression(
              j.jsxIdentifier(parts[0]),
              j.jsxIdentifier(parts[1]),
            )
      if (path.node.closingElement) {
        path.node.closingElement.name =
          parts.length === 1
            ? j.jsxIdentifier(parts[0])
            : j.jsxMemberExpression(
                j.jsxIdentifier(parts[0]),
                j.jsxIdentifier(parts[1]),
              )
      }
    })
  })

  return root.toSource({ quote: "single" })
}
