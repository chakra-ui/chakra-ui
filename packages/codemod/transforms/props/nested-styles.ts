import type { API, FileInfo, Options } from "jscodeshift"
import type { JSXExpressionContainer } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Converts Chakra nested styles from sx/__css to css with ampersand (&) prefix
 *
 * Example:
 * <Box sx={{ svg: { color: 'red.500' } }} />
 * =>
 * <Box css={{ '& svg': { color: 'red.500' } }} />
 */

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Find sx or __css props
  root.find(j.JSXAttribute).forEach((path) => {
    const attr = path.node
    if (attr.name.type !== "JSXIdentifier") return
    if (attr.name.name !== "sx" && attr.name.name !== "__css") return
    if (!attr.value || attr.value.type !== "JSXExpressionContainer") return

    const expr = attr.value as JSXExpressionContainer
    if (expr.expression.type !== "ObjectExpression") return

    const cssProps = j.objectExpression(
      expr.expression.properties.map((prop) => {
        if (prop.type !== "ObjectProperty") return prop
        if (prop.key.type !== "Identifier" && prop.key.type !== "StringLiteral")
          return prop

        const keyName =
          prop.key.type === "Identifier" ? prop.key.name : prop.key.value
        const newKey = `& ${keyName}`

        return j.objectProperty(j.stringLiteral(newKey), prop.value)
      }),
    )

    // Replace sx/__css with css
    attr.name.name = "css"
    expr.expression = cssProps
  })

  return root.toSource({ quote: "single" })
}
