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

    // Handle NumberInput -> NumberInput.Root
    if (baseName === "NumberInput") {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("NumberInput"),
        j.jsxIdentifier("Root"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Handle NumberInputField -> NumberInput.Input
    if (baseName === "NumberInputField") {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("NumberInput"),
        j.jsxIdentifier("Input"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Handle NumberInputStepper -> NumberInput.Control
    if (baseName === "NumberInputStepper") {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("NumberInput"),
        j.jsxIdentifier("Control"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Handle NumberIncrementStepper -> NumberInput.IncrementTrigger
    if (baseName === "NumberIncrementStepper") {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("NumberInput"),
        j.jsxIdentifier("IncrementTrigger"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Handle NumberDecrementStepper -> NumberInput.DecrementTrigger
    if (baseName === "NumberDecrementStepper") {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("NumberInput"),
        j.jsxIdentifier("DecrementTrigger"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }

    // Transform props
    const attrs = opening.attributes || []
    const newAttributes: any[] = []

    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier") {
        newAttributes.push(attr)
        return
      }

      const name = attr.name.name
      switch (name) {
        case "value":
        case "defaultValue":
          // Convert numeric values to strings
          if (attr.value?.type === "JSXExpressionContainer") {
            const expr = attr.value.expression
            // Check for numeric literal (can be "Literal" or "NumericLiteral")
            if (
              (expr.type === "Literal" || expr.type === "NumericLiteral") &&
              typeof (expr as any).value === "number"
            ) {
              // Convert number to string literal: defaultValue={15} -> defaultValue="15"
              newAttributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier(name),
                  j.literal(String((expr as any).value)),
                ),
              )
            } else if (
              expr.type === "Literal" &&
              typeof (expr as any).value === "string"
            ) {
              // Already a string literal, keep as-is
              newAttributes.push(attr)
            } else if (expr.type !== "JSXEmptyExpression") {
              // It's an expression (variable, function call, etc.)
              // Wrap in String() to ensure runtime conversion: value={val} -> value={String(val)}
              newAttributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier(name),
                  j.jsxExpressionContainer(
                    j.callExpression(j.identifier("String"), [expr as any]),
                  ),
                ),
              )
            } else {
              newAttributes.push(attr)
            }
          } else {
            // Keep string literals and other values as-is
            newAttributes.push(attr)
          }
          break
        case "isDisabled":
          newAttributes.push(
            j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value),
          )
          break
        case "isInvalid":
          newAttributes.push(
            j.jsxAttribute(j.jsxIdentifier("invalid"), attr.value),
          )
          break
        case "isReadOnly":
          newAttributes.push(
            j.jsxAttribute(j.jsxIdentifier("readOnly"), attr.value),
          )
          break
        case "isRequired":
          newAttributes.push(
            j.jsxAttribute(j.jsxIdentifier("required"), attr.value),
          )
          break
        case "onChange":
          newAttributes.push(
            j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value),
          )
          break
        case "onInvalid":
          newAttributes.push(
            j.jsxAttribute(j.jsxIdentifier("onValueInvalid"), attr.value),
          )
          break
        case "keepWithinRange":
          // Convert to allowOverflow (inverse boolean)
          if (attr.value?.type === "JSXExpressionContainer") {
            const expr = attr.value.expression
            if (expr.type === "JSXEmptyExpression") {
              // Skip empty expressions
              break
            }
            if (
              (expr.type === "Literal" && typeof expr.value === "boolean") ||
              expr.type === "BooleanLiteral"
            ) {
              const boolValue = (expr as any).value
              // keepWithinRange={false} -> allowOverflow={true}
              // keepWithinRange={true} -> allowOverflow={false}
              newAttributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier("allowOverflow"),
                  j.jsxExpressionContainer(j.booleanLiteral(!boolValue)),
                ),
              )
            } else {
              // keepWithinRange={variable} -> allowOverflow={!variable}
              newAttributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier("allowOverflow"),
                  j.jsxExpressionContainer(
                    j.unaryExpression("!", expr as any, true),
                  ),
                ),
              )
            }
          } else if (!attr.value) {
            // keepWithinRange (no value, true by default) -> allowOverflow={false}
            newAttributes.push(
              j.jsxAttribute(
                j.jsxIdentifier("allowOverflow"),
                j.jsxExpressionContainer(j.booleanLiteral(false)),
              ),
            )
          }
          break
        case "isValidCharacter":
          // Remove this prop
          break
        case "focusBorderColor":
        case "errorBorderColor":
          // Move to css var
          const varName =
            name === "focusBorderColor" ? "--focus-color" : "--error-color"
          const cssAttr = newAttributes.find(
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

          // Only process if we have a valid value
          if (val !== null) {
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
              newAttributes.push(
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
          }
          break
        default:
          newAttributes.push(attr)
      }
    })

    opening.attributes = newAttributes
  })

  return root.toSource({ quote: "single" })
}
