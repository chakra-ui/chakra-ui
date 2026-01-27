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
  let hasChanges = false

  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers?.map((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "CircularProgress"
        ) {
          hasChanges = true
          return j.importSpecifier(j.identifier("ProgressCircle"))
        }
        return spec
      })

      path.node.specifiers = specifiers
    })

  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "CircularProgress" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("CircularProgress")) return
      const openingElement = path.node.openingElement
      const attributes = openingElement.attributes || []

      let value: any = null
      let thickness: any = null
      let color: any = null
      let isIndeterminate = false
      const otherProps: any[] = []

      attributes.forEach((attr) => {
        if (attr.type !== "JSXAttribute") {
          otherProps.push(attr)
          return
        }

        const name = attr.name.name
        const attrValue = attr.value

        if (name === "value") {
          value = attrValue
        } else if (name === "thickness") {
          thickness = attrValue
        } else if (name === "color") {
          color = attrValue
        } else if (name === "isIndeterminate") {
          if (attrValue?.type === "JSXExpressionContainer") {
            const expr = attrValue.expression
            if (expr.type === "BooleanLiteral") {
              isIndeterminate = expr.value === true
            } else {
              isIndeterminate = true
            }
          } else {
            isIndeterminate = true
          }
        } else {
          otherProps.push(attr)
        }
      })

      if (isIndeterminate) {
        value = j.jsxExpressionContainer(j.identifier("null"))
      }

      const rootProps = [
        j.jsxAttribute(
          j.jsxIdentifier("value"),
          value || j.jsxExpressionContainer(j.numericLiteral(0)),
        ),
        ...otherProps,
      ]

      const circleProps = []
      if (thickness) {
        const thicknessValue =
          thickness.type === "JSXExpressionContainer"
            ? thickness.expression
            : thickness

        circleProps.push(
          j.jsxAttribute(
            j.jsxIdentifier("css"),
            j.jsxExpressionContainer(
              j.objectExpression([
                j.property("init", j.literal("--thickness"), thicknessValue),
              ]),
            ),
          ),
        )
      }

      const rangeProps = []
      if (color) {
        rangeProps.push(j.jsxAttribute(j.jsxIdentifier("stroke"), color))
      }

      const newElement = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("ProgressCircle"),
            j.jsxIdentifier("Root"),
          ),
          rootProps,
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("ProgressCircle"),
            j.jsxIdentifier("Root"),
          ),
        ),
        [
          j.jsxText("\n  "),
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("ProgressCircle"),
                j.jsxIdentifier("Circle"),
              ),
              circleProps,
            ),
            j.jsxClosingElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("ProgressCircle"),
                j.jsxIdentifier("Circle"),
              ),
            ),
            [
              j.jsxText("\n    "),
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxMemberExpression(
                    j.jsxIdentifier("ProgressCircle"),
                    j.jsxIdentifier("Track"),
                  ),
                  [],
                  true,
                ),
                null,
                [],
              ),
              j.jsxText("\n    "),
              j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxMemberExpression(
                    j.jsxIdentifier("ProgressCircle"),
                    j.jsxIdentifier("Range"),
                  ),
                  rangeProps,
                  true,
                ),
                null,
                [],
              ),
              j.jsxText("\n  "),
            ],
          ),
          j.jsxText("\n"),
        ],
      )

      j(path).replaceWith(newElement)
      hasChanges = true
    })

  return hasChanges ? root.toSource() : file.source
}
