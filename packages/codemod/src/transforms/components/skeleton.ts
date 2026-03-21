import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
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

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return
    if (baseName !== "Skeleton") return

    const attrs = opening.attributes || []

    // Collect CSS properties to add
    const cssProps: Array<[string, any]> = []

    opening.attributes = attrs
      .map((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr
        const name = attr.name.name

        if (name === "isLoaded") {
          attr.name.name = "loading"
          if (!attr.value) {
            attr.value = j.jsxExpressionContainer(j.literal(false))
          } else if (attr.value.type === "Literal") {
            const isTrue = Boolean(attr.value.value)
            attr.value = j.jsxExpressionContainer(j.literal(!isTrue))
          } else if (attr.value.type === "JSXExpressionContainer") {
            attr.value = j.jsxExpressionContainer(
              j.unaryExpression("!", attr.value.expression as any),
            )
          }
          return attr
        }

        if (name === "startColor") {
          const colorValue =
            attr.value?.type === "Literal" ||
            attr.value?.type === "StringLiteral"
              ? attr.value.value
              : attr.value?.type === "JSXExpressionContainer"
                ? (attr.value.expression as any)
                : null

          if (colorValue) {
            cssProps.push(["--start-color", colorValue])
          }
          return null as any
        }

        if (name === "endColor") {
          const colorValue =
            attr.value?.type === "Literal" ||
            attr.value?.type === "StringLiteral"
              ? attr.value.value
              : attr.value?.type === "JSXExpressionContainer"
                ? (attr.value.expression as any)
                : null

          if (colorValue) {
            cssProps.push(["--end-color", colorValue])
          }
          return null as any
        }

        return attr
      })
      .filter(Boolean) as any

    // Add or merge CSS properties
    if (cssProps.length > 0) {
      const cssAttr = opening.attributes!.find(
        (a: any) =>
          a.type === "JSXAttribute" &&
          a.name.type === "JSXIdentifier" &&
          a.name.name === "css",
      ) as any

      if (cssAttr && cssAttr.value?.type === "JSXExpressionContainer") {
        const expr = cssAttr.value.expression
        if (expr.type === "ObjectExpression") {
          cssProps.forEach(([key, value]) => {
            expr.properties.push(
              j.objectProperty(
                j.stringLiteral(key),
                typeof value === "string" ? j.literal(value) : value,
              ),
            )
          })
        }
      } else {
        opening.attributes!.push(
          j.jsxAttribute(
            j.jsxIdentifier("css"),
            j.jsxExpressionContainer(
              j.objectExpression(
                cssProps.map(([key, value]) =>
                  j.objectProperty(
                    j.stringLiteral(key),
                    typeof value === "string" ? j.literal(value) : value,
                  ),
                ),
              ),
            ),
          ),
        )
      }
    }
  })

  return root.toSource({ quote: "single" })
}
