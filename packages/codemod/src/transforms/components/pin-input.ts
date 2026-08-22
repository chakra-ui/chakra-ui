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

    // Handle PinInput -> PinInput.Root
    if (baseName === "PinInput") {
      const attrs = opening.attributes || []
      const newAttributes: any[] = []

      attrs.forEach((attr) => {
        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          newAttributes.push(attr)
          return
        }

        const name = attr.name.name
        switch (name) {
          case "value":
          case "defaultValue":
            // Convert string to string array
            // Check for direct string literal (defaultValue='234')
            if (
              attr.value?.type === "Literal" ||
              attr.value?.type === ("StringLiteral" as any)
            ) {
              const stringValue = (attr.value as any).value
              if (typeof stringValue === "string") {
                // "234" -> ["2", "3", "4"]
                const chars = stringValue.split("")
                const arrayExpr = j.arrayExpression(
                  chars.map((char) => j.literal(char)),
                )
                newAttributes.push(
                  j.jsxAttribute(
                    j.jsxIdentifier(name),
                    j.jsxExpressionContainer(arrayExpr),
                  ),
                )
                break
              }
            }
            // Check for expression container {value}
            if (attr.value?.type === "JSXExpressionContainer") {
              const expr = attr.value.expression
              if (expr.type === "JSXEmptyExpression") {
                newAttributes.push(attr)
              } else if (
                (expr.type === "Literal" || expr.type === "StringLiteral") &&
                typeof (expr as any).value === "string"
              ) {
                // {"234"} -> {["2", "3", "4"]}
                const chars = (expr as any).value.split("")
                const arrayExpr = j.arrayExpression(
                  chars.map((char: string) => j.literal(char)),
                )
                newAttributes.push(
                  j.jsxAttribute(
                    j.jsxIdentifier(name),
                    j.jsxExpressionContainer(arrayExpr),
                  ),
                )
              } else {
                // value={pinValue} -> value={pinValue.split('')}
                newAttributes.push(
                  j.jsxAttribute(
                    j.jsxIdentifier(name),
                    j.jsxExpressionContainer(
                      j.callExpression(
                        j.memberExpression(expr as any, j.identifier("split")),
                        [j.literal("")],
                      ),
                    ),
                  ),
                )
              }
            } else {
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
          case "onChange":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value),
            )
            break
          case "onComplete":
            newAttributes.push(
              j.jsxAttribute(j.jsxIdentifier("onValueComplete"), attr.value),
            )
            break
          case "manageFocus":
            // Remove this prop
            break
          default:
            newAttributes.push(attr)
        }
      })

      opening.attributes = newAttributes

      // Transform children: wrap PinInputFields in Control and add HiddenInput
      const children = elPath.node.children || []
      const newChildren: any[] = []

      // Add HiddenInput as first child
      newChildren.push(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("PinInput"),
              j.jsxIdentifier("HiddenInput"),
            ),
            [],
            true,
          ),
        ),
      )

      // Collect all PinInputField elements and wrap them in Control
      const inputElements: any[] = []
      let inputIndex = 0

      children.forEach((child: any) => {
        if (
          child.type === "JSXElement" &&
          getJsxBaseName(child.openingElement.name) === "PinInputField"
        ) {
          // Transform PinInputField to PinInput.Input with index prop
          const inputAttrs = child.openingElement.attributes || []
          const transformedAttrs: any[] = []

          // Add index prop first
          transformedAttrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("index"),
              j.jsxExpressionContainer(j.numericLiteral(inputIndex)),
            ),
          )
          inputIndex++

          // Handle other attributes (focusBorderColor, errorBorderColor, etc.)
          inputAttrs.forEach((attr: any) => {
            if (
              attr.type !== "JSXAttribute" ||
              attr.name.type !== "JSXIdentifier"
            ) {
              transformedAttrs.push(attr)
              return
            }

            const name = attr.name.name
            switch (name) {
              case "focusBorderColor":
              case "errorBorderColor":
                // Move to css var
                const varName =
                  name === "focusBorderColor"
                    ? "--focus-color"
                    : "--error-color"
                const cssAttr = transformedAttrs.find(
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

                if (val !== null) {
                  if (
                    cssAttr &&
                    cssAttr.value?.type === "JSXExpressionContainer"
                  ) {
                    const expr = cssAttr.value.expression
                    if (expr.type === "ObjectExpression") {
                      expr.properties.push(
                        j.objectProperty(
                          j.stringLiteral(varName),
                          typeof val === "string"
                            ? j.literal(val)
                            : (val as any),
                        ),
                      )
                    }
                  } else {
                    transformedAttrs.push(
                      j.jsxAttribute(
                        j.jsxIdentifier("css"),
                        j.jsxExpressionContainer(
                          j.objectExpression([
                            j.objectProperty(
                              j.stringLiteral(varName),
                              typeof val === "string"
                                ? j.literal(val)
                                : (val as any),
                            ),
                          ]),
                        ),
                      ),
                    )
                  }
                }
                break
              default:
                transformedAttrs.push(attr)
            }
          })

          const newInputName = j.jsxMemberExpression(
            j.jsxIdentifier("PinInput"),
            j.jsxIdentifier("Input"),
          )

          inputElements.push(
            j.jsxElement(
              j.jsxOpeningElement(newInputName, transformedAttrs, true),
            ),
          )
        } else if (child.type === "JSXText" && child.value.trim() === "") {
          // Preserve whitespace/newlines
          newChildren.push(child)
        } else {
          // Keep other children as-is
          newChildren.push(child)
        }
      })

      // Wrap all input elements in PinInput.Control
      if (inputElements.length > 0) {
        const controlElement = j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("PinInput"),
              j.jsxIdentifier("Control"),
            ),
            [],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("PinInput"),
              j.jsxIdentifier("Control"),
            ),
          ),
          inputElements,
        )
        newChildren.push(controlElement)
      }

      elPath.node.children = newChildren

      // Convert <PinInput ...> to <PinInput.Root ...>
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("PinInput"),
        j.jsxIdentifier("Root"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }
    }
  })

  return root.toSource({ quote: "single" })
}
