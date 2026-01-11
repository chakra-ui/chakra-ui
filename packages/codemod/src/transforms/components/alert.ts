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

      // Rename to Alert.Root
      const alertRootName = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Root"),
      )
      path.node.openingElement.name = alertRootName
      if (path.node.closingElement) {
        path.node.closingElement.name = alertRootName
      }

      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "variant" } })
        .forEach((attrPath) => {
          const value = attrPath.node.value
          if (
            value?.type === "StringLiteral" &&
            value.value === "left-accent"
          ) {
            attrPath.node.value = j.jsxExpressionContainer(
              j.memberExpression(
                j.memberExpression(
                  j.memberExpression(
                    j.identifier("Alert"),
                    j.identifier("Root"),
                  ),
                  j.identifier("defaultProps"),
                ),
                j.identifier("variant"),
              ),
            )
          }
        })
    })

  root
    .find(j.JSXElement, { openingElement: { name: { name: "AlertIcon" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Alert")) return

      const indicatorName = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Indicator"),
      )
      path.node.openingElement.name = indicatorName
      path.node.openingElement.selfClosing = true
      path.node.closingElement = null
    })

  return root.toSource({ quote: "single" })
}
