import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  /**
   * Accordion props
   */
  root
    .find(j.JSXOpeningElement, { name: { name: "Accordion" } })
    .forEach((path) => {
      const attrs = path.node.attributes ?? []

      path.node.attributes = attrs.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "allowMultiple":
            return j.jsxAttribute(j.jsxIdentifier("multiple"), attr.value)

          case "allowToggle":
            return j.jsxAttribute(j.jsxIdentifier("collapsible"), attr.value)

          case "index":
            return j.jsxAttribute(
              j.jsxIdentifier("value"),
              normalizeIndexValue(j, attr.value),
            )

          case "defaultIndex":
            return j.jsxAttribute(
              j.jsxIdentifier("defaultValue"),
              normalizeIndexValue(j, attr.value),
            )

          case "onChange":
            return j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value)

          default:
            return attr
        }
      })
    })

  /**
   * Rename subcomponents
   */
  renameComponent(j, root, "AccordionButton", "Accordion.Trigger")
  renameComponent(j, root, "AccordionIcon", "Accordion.ItemIndicator")

  return root.toSource({ quote: "single" })
}

function renameComponent(j: any, root: any, from: string, to: string) {
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
}

function normalizeIndexValue(j: any, value: any) {
  if (!value) return value

  if (value.type === "JSXExpressionContainer") {
    const expr = value.expression

    if (expr.type === "NumericLiteral") {
      return j.jsxExpressionContainer(
        j.arrayExpression([j.stringLiteral(String(expr.value))]),
      )
    }

    if (expr.type === "ArrayExpression") {
      return j.jsxExpressionContainer(
        j.arrayExpression(
          expr.elements.map((el: any) =>
            el?.type === "NumericLiteral"
              ? j.stringLiteral(String(el.value))
              : el,
          ),
        ),
      )
    }
  }

  return value
}
