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

    const renamePart = (from: string, to: string) => {
      if (
        opening.name.type === "JSXMemberExpression" &&
        opening.name.object.type === "JSXIdentifier" &&
        opening.name.object.name === "NumberInput" &&
        opening.name.property.type === "JSXIdentifier" &&
        opening.name.property.name === from
      ) {
        opening.name.property.name = to
        if (elPath.node.closingElement?.name?.type === "JSXMemberExpression") {
          const closing = elPath.node.closingElement.name
          if (
            closing.object.type === "JSXIdentifier" &&
            closing.object.name === "NumberInput" &&
            closing.property.type === "JSXIdentifier" &&
            closing.property.name === from
          ) {
            closing.property.name = to
          }
        }
      }
    }

    renamePart("NumberInputStepper", "Control")
    renamePart("NumberIncrementStepper", "IncrementTrigger")
    renamePart("NumberDecrementStepper", "DecrementTrigger")

    // Rename props on NumberInput.* elements
    const attrs = opening.attributes || []
    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return
      const name = attr.name.name
      if (name === "onChange") {
        attr.name.name = "onValueChange"
      }
      if (name === "onInvalid") {
        attr.name.name = "onValueInvalid"
      }
      if (name === "focusBorderColor" || name === "errorBorderColor") {
        // Move to css var
        const varName =
          name === "focusBorderColor" ? "--focus-color" : "--error-color"
        const cssAttr = attrs.find(
          (a) =>
            a.type === "JSXAttribute" &&
            a.name.type === "JSXIdentifier" &&
            a.name.name === "css",
        ) as any
        const val =
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
                j.stringLiteral(varName),
                typeof val === "string" ? j.literal(val) : (val as any),
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
                    j.stringLiteral(varName),
                    typeof val === "string" ? j.literal(val) : (val as any),
                  ),
                ]),
              ),
            ),
          )
        }
        // remove original
        opening.attributes = (opening.attributes || []).filter(
          (a) => a !== attr,
        )
      }
    })
  })

  return root.toSource({ quote: "single" })
}
