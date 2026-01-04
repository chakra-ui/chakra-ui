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
          // move to css var
          // add/merge css prop with --start-color
          const cssAttr = attrs.find(
            (a) =>
              a.type === "JSXAttribute" &&
              a.name.type === "JSXIdentifier" &&
              a.name.name === "css",
          ) as any
          const colorValue =
            attr.value?.type === "Literal"
              ? attr.value.value
              : attr.value?.type === "JSXExpressionContainer"
                ? (attr.value.expression as any)
                : null
          if (cssAttr && cssAttr.value?.type === "JSXExpressionContainer") {
            const expr = cssAttr.value.expression
            if (expr.type === "ObjectExpression") {
              expr.properties.push(
                j.objectProperty(
                  j.stringLiteral("--start-color"),
                  typeof colorValue === "string"
                    ? j.literal(colorValue)
                    : colorValue,
                ),
              )
            }
          } else {
            opening.attributes = opening.attributes || []
            opening.attributes.push(
              j.jsxAttribute(
                j.jsxIdentifier("css"),
                j.jsxExpressionContainer(
                  j.objectExpression([
                    j.objectProperty(
                      j.stringLiteral("--start-color"),
                      typeof colorValue === "string"
                        ? j.literal(colorValue)
                        : (colorValue as any),
                    ),
                  ]),
                ),
              ),
            )
          }
          return null as any
        }
        if (name === "endColor") {
          opening.attributes = opening.attributes || []
          const cssAttr = opening.attributes.find(
            (a) =>
              a &&
              a.type === "JSXAttribute" &&
              a.name.type === "JSXIdentifier" &&
              a.name.name === "css",
          ) as any
          const colorValue =
            attr.value?.type === "Literal"
              ? attr.value.value
              : attr.value?.type === "JSXExpressionContainer"
                ? (attr.value.expression as any)
                : null
          if (cssAttr && cssAttr.value?.type === "JSXExpressionContainer") {
            const expr = cssAttr.value.expression
            if (expr.type === "ObjectExpression") {
              expr.properties.push(
                j.objectProperty(
                  j.stringLiteral("--end-color"),
                  typeof colorValue === "string"
                    ? j.literal(colorValue)
                    : colorValue,
                ),
              )
            }
          } else {
            opening.attributes = opening.attributes || []
            opening.attributes.push(
              j.jsxAttribute(
                j.jsxIdentifier("css"),
                j.jsxExpressionContainer(
                  j.objectExpression([
                    j.objectProperty(
                      j.stringLiteral("--end-color"),
                      typeof colorValue === "string"
                        ? j.literal(colorValue)
                        : (colorValue as any),
                    ),
                  ]),
                ),
              ),
            )
          }
          return null as any
        }
        return attr
      })
      .filter(Boolean) as any
  })

  return root.toSource({ quote: "single" })
}
