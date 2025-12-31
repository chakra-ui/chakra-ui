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

  root
    .find(j.JSXElement, { openingElement: { name: { name: "Alert" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Alert")) return
      path.node.openingElement.name = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Root"),
      )
      path.node.closingElement!.name = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Root"),
      )
    })

  root
    .find(j.JSXElement, { openingElement: { name: { name: "AlertIcon" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Alert")) return
      path.node.openingElement.name = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Indicator"),
      )
      path.node.closingElement = null
    })

  return root.toSource({ quote: "single" })
}
