import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const mapping: Record<string, string> = {
    Tag: "Tag.Root",
    TagLeftIcon: "Tag.StartElement",
    TagRightIcon: "Tag.EndElement",
    TagLabel: "Tag.Label",
    TagCloseButton: "Tag.CloseTrigger",
  }

  Object.entries(mapping).forEach(([from, to]) => {
    const parts = to.split(".")
    root
      .find(j.JSXIdentifier, { name: from })
      .replaceWith(() =>
        parts.length === 1
          ? j.jsxIdentifier(parts[0])
          : j.jsxMemberExpression(
              j.jsxIdentifier(parts[0]),
              j.jsxIdentifier(parts[1]),
            ),
      )
  })

  return root.toSource({ quote: "single" })
}
