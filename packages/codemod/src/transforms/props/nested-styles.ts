import type {
  API,
  FileInfo,
  JSXExpressionContainer,
  Options,
} from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

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

        if (prop.value.type === "ObjectExpression") {
          return j.objectProperty(j.stringLiteral(`& ${keyName}`), prop.value)
        }

        return prop
      }),
    )

    attr.name.name = "css"
    expr.expression = cssProps
  })

  return root.toSource({ quote: "single" })
}
