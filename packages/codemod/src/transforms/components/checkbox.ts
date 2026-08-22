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

  const { chakraLocalNames, componentAliases } = collectChakraLocalNames(
    j,
    root,
  )
  if (chakraLocalNames.size === 0) return file.source

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    const isChakra = chakraLocalNames.has(baseName)

    // Handle CheckboxGroup
    if (
      isChakra &&
      (baseName === "CheckboxGroup" ||
        (componentAliases.has(baseName) &&
          componentAliases.get(baseName) === "CheckboxGroup"))
    ) {
      const attrs = opening.attributes || []
      const newAttributes = attrs.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "isDisabled":
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
          case "isNative":
            return [] // Remove
          case "onChange":
            return j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value)
          default:
            return attr
        }
      })
      opening.attributes = newAttributes
      return
    }

    // Handle Checkbox
    if (
      !isChakra ||
      (baseName !== "Checkbox" &&
        (!componentAliases.has(baseName) ||
          componentAliases.get(baseName) !== "Checkbox"))
    ) {
      return
    }

    const attrs = opening.attributes || []
    const remainingAttrs: any[] = []
    let iconValue: any = null
    let iconColorValue: any = null
    let iconSizeValue: any = null
    let inputPropsValue: any = null
    let tabIndexValue: any = null
    let isIndeterminateValue: any = null
    let isCheckedValue: any = null

    // First pass: collect special props
    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier") {
        remainingAttrs.push(attr)
        return
      }

      const name = attr.name.name
      switch (name) {
        case "icon":
          iconValue = attr.value
          break
        case "iconColor":
          iconColorValue = attr.value
          break
        case "iconSize":
          iconSizeValue = attr.value
          break
        case "inputProps":
          inputPropsValue = attr.value
          break
        case "tabIndex":
          tabIndexValue = attr.value
          break
        case "isIndeterminate":
          isIndeterminateValue = attr.value
          break
        case "isChecked":
          isCheckedValue = attr.value
          break
        case "isFocusable":
          // Remove
          break
        case "isDisabled":
          remainingAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value),
          )
          break
        case "isInvalid":
          remainingAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("invalid"), attr.value),
          )
          break
        case "isReadOnly":
          remainingAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("readOnly"), attr.value),
          )
          break
        case "isRequired":
          remainingAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("required"), attr.value),
          )
          break
        case "onChange":
          remainingAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("onCheckedChange"), attr.value),
          )
          break
        case "colorScheme":
          remainingAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value),
          )
          break
        default:
          remainingAttrs.push(attr)
      }
    })

    // Handle isIndeterminate + isChecked transformation
    if (isIndeterminateValue !== null) {
      // checked={isIndeterminate ? "indeterminate" : isChecked}
      const ternary = j.conditionalExpression(
        isIndeterminateValue.type === "JSXExpressionContainer"
          ? isIndeterminateValue.expression
          : isIndeterminateValue,
        j.literal("indeterminate"),
        isCheckedValue?.type === "JSXExpressionContainer"
          ? isCheckedValue.expression
          : isCheckedValue || j.booleanLiteral(false),
      )
      remainingAttrs.push(
        j.jsxAttribute(
          j.jsxIdentifier("checked"),
          j.jsxExpressionContainer(ternary),
        ),
      )
    } else if (isCheckedValue !== null) {
      remainingAttrs.push(
        j.jsxAttribute(j.jsxIdentifier("checked"), isCheckedValue),
      )
    }

    // Update opening element to Checkbox.Root
    const newName = j.jsxMemberExpression(
      j.jsxIdentifier("Checkbox"),
      j.jsxIdentifier("Root"),
    )
    opening.name = newName
    opening.attributes = remainingAttrs
    opening.selfClosing = false

    // Build new children structure
    const originalChildren = elPath.node.children || []
    const newChildren: any[] = []

    // 1. Add HiddenInput
    const hiddenInputAttrs: any[] = []
    if (tabIndexValue) {
      hiddenInputAttrs.push(
        j.jsxAttribute(j.jsxIdentifier("tabIndex"), tabIndexValue),
      )
    }
    if (inputPropsValue) {
      hiddenInputAttrs.push(j.jsxSpreadAttribute(inputPropsValue.expression))
    }

    const hiddenInputName = j.jsxMemberExpression(
      j.jsxIdentifier("Checkbox"),
      j.jsxIdentifier("HiddenInput"),
    )
    const hiddenInput = j.jsxElement(
      j.jsxOpeningElement(hiddenInputName, hiddenInputAttrs, true),
      null,
      [],
    )
    newChildren.push(hiddenInput)

    // 2. Add Control with Indicator or custom icon
    const controlName = j.jsxMemberExpression(
      j.jsxIdentifier("Checkbox"),
      j.jsxIdentifier("Control"),
    )

    const controlChildren: any[] = []

    // Build indicator/icon with color and boxSize
    if (iconValue) {
      // Use custom icon
      if (iconValue.type === "JSXExpressionContainer") {
        const iconExpr = iconValue.expression
        if (iconExpr.type === "JSXElement" || iconExpr.type === "JSXFragment") {
          // Clone the icon element and add color/boxSize props
          const iconElement = iconExpr
          const iconAttrs = iconElement.openingElement.attributes || []
          if (iconColorValue) {
            iconAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("color"), iconColorValue),
            )
          }
          if (iconSizeValue) {
            iconAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("boxSize"), iconSizeValue),
            )
          }
          iconElement.openingElement.attributes = iconAttrs
          controlChildren.push(iconElement)
        } else {
          // For variables/expressions, just add as is
          controlChildren.push(iconValue)
        }
      }
    } else {
      // Use default Checkbox.Indicator
      const indicatorName = j.jsxMemberExpression(
        j.jsxIdentifier("Checkbox"),
        j.jsxIdentifier("Indicator"),
      )
      const indicatorAttrs: any[] = []
      if (iconColorValue) {
        indicatorAttrs.push(
          j.jsxAttribute(j.jsxIdentifier("color"), iconColorValue),
        )
      }
      if (iconSizeValue) {
        indicatorAttrs.push(
          j.jsxAttribute(j.jsxIdentifier("boxSize"), iconSizeValue),
        )
      }
      const indicator = j.jsxElement(
        j.jsxOpeningElement(
          indicatorName,
          indicatorAttrs,
          indicatorAttrs.length === 0,
        ),
        indicatorAttrs.length === 0 ? null : j.jsxClosingElement(indicatorName),
        [],
      )
      controlChildren.push(indicator)
    }

    const control = j.jsxElement(
      j.jsxOpeningElement(controlName, [], false),
      j.jsxClosingElement(controlName),
      controlChildren,
    )
    newChildren.push(control)

    // 3. Add Label with original children
    const hasNonEmptyChildren = originalChildren.some(
      (child: any) =>
        child.type !== "JSXText" || (child as any).value.trim() !== "",
    )

    if (hasNonEmptyChildren) {
      const labelName = j.jsxMemberExpression(
        j.jsxIdentifier("Checkbox"),
        j.jsxIdentifier("Label"),
      )
      const label = j.jsxElement(
        j.jsxOpeningElement(labelName, [], false),
        j.jsxClosingElement(labelName),
        originalChildren,
      )
      newChildren.push(label)
    }

    elPath.node.children = newChildren
    elPath.node.closingElement = j.jsxClosingElement(newName)
  })

  return root.toSource({ quote: "single" })
}
