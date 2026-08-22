import type {
  API,
  FileInfo,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXText,
  Options,
} from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

type JSXChild = JSXElement | JSXText | JSXExpressionContainer | JSXFragment

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

  root.find(j.JSXOpeningElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.name)
    const isChakra = chakraLocalNames.has(baseName)

    // Handle ButtonGroup
    const resolvesToButtonGroup =
      baseName === "ButtonGroup" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "ButtonGroup")

    if (isChakra && resolvesToButtonGroup) {
      const attributes = path.node.attributes ?? []
      let hasIsDisabled = false
      let isDisabledValue: any = null

      // Check if isDisabled is present
      attributes.forEach((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          attr.name.type === "JSXIdentifier" &&
          attr.name.name === "isDisabled"
        ) {
          hasIsDisabled = true
          isDisabledValue = attr.value
        }
      })

      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "isAttached":
            return j.jsxAttribute(j.jsxIdentifier("attached"), attr.value)
          case "isDisabled":
            return [] // Remove from ButtonGroup, will propagate to children
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes

      // If isDisabled was present, propagate to Button children
      if (hasIsDisabled) {
        const parent = path.parent.node
        if (parent.type === "JSXElement") {
          const children = parent.children || []

          children.forEach((child: any) => {
            if (child.type === "JSXElement") {
              const childBaseName = getJsxBaseName(child.openingElement.name)
              const isButton =
                childBaseName === "Button" ||
                childBaseName === "IconButton" ||
                (componentAliases.has(childBaseName) &&
                  (componentAliases.get(childBaseName) === "Button" ||
                    componentAliases.get(childBaseName) === "IconButton"))

              if (isButton) {
                const childAttrs = child.openingElement.attributes || []
                const hasDisabled = childAttrs.some(
                  (attr: any) =>
                    attr.type === "JSXAttribute" &&
                    attr.name.type === "JSXIdentifier" &&
                    attr.name.name === "disabled",
                )

                // Only add disabled if not already present
                if (!hasDisabled) {
                  child.openingElement.attributes = [
                    ...childAttrs,
                    j.jsxAttribute(
                      j.jsxIdentifier("disabled"),
                      isDisabledValue || null,
                    ),
                  ]
                }
              }
            }
          })
        }
      }

      return
    }

    // Handle Button
    const resolvesToButton =
      baseName === "Button" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "Button")
    if (!isChakra || !resolvesToButton) return

    const attributes = path.node.attributes ?? []

    let leftIconValue: any = null
    let rightIconValue: any = null
    let hasUnstyledVariant = false
    let iconSpacingValue: any = null
    let hasGapProp = false

    // First pass: check if gap prop exists
    attributes.forEach((attr) => {
      if (
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "gap"
      ) {
        hasGapProp = true
      }
    })

    const newAttributes = attributes.flatMap((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return attr

      switch (attr.name.name) {
        case "variant":
          if (
            attr.value?.type === "Literal" &&
            attr.value.value === "unstyled"
          ) {
            hasUnstyledVariant = true
            return []
          } else if (
            attr.value?.type === "StringLiteral" &&
            attr.value.value === "unstyled"
          ) {
            hasUnstyledVariant = true
            return [] // remove variant prop
          } else if (
            attr.value?.type === "Literal" &&
            attr.value.value === "link"
          ) {
            return j.jsxAttribute(
              j.jsxIdentifier("variant"),
              j.literal("plain"),
            )
          } else if (
            attr.value?.type === "StringLiteral" &&
            attr.value.value === "link"
          ) {
            return j.jsxAttribute(
              j.jsxIdentifier("variant"),
              j.stringLiteral("plain"),
            )
          }
          return attr
        case "isActive":
          return j.jsxAttribute(j.jsxIdentifier("data-active"), null)
        case "isDisabled":
          return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
        case "isLoading":
          return j.jsxAttribute(j.jsxIdentifier("loading"), attr.value)
        case "colorScheme":
          return j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value)
        case "leftIcon":
          leftIconValue = attr.value
          return []
        case "rightIcon":
          rightIconValue = attr.value
          return []
        case "iconSpacing":
          iconSpacingValue = attr.value
          // If gap doesn't exist, transform to gap; otherwise remove
          if (!hasGapProp && iconSpacingValue) {
            return j.jsxAttribute(j.jsxIdentifier("gap"), iconSpacingValue)
          }
          return []
        default:
          return attr
      }
    })

    if (hasUnstyledVariant) {
      newAttributes.push(j.jsxAttribute(j.jsxIdentifier("unstyled"), null))
    }

    path.node.attributes = newAttributes

    if (leftIconValue || rightIconValue) {
      const parent = path.parent.node
      if (parent.type === "JSXElement") {
        const originalChildren = parent.children.filter((c: JSXChild) => {
          return c.type !== "JSXText" || (c as JSXText).value.trim() !== ""
        })

        const newChildren: JSXElement["children"] = []

        if (leftIconValue) {
          if (leftIconValue.type === "JSXExpressionContainer") {
            // Extract the expression from the container
            const expr = leftIconValue.expression
            // If it's a JSXElement, push it directly without wrapping
            if (expr.type === "JSXElement" || expr.type === "JSXFragment") {
              newChildren.push(expr)
            } else {
              // For other expressions (variables, function calls), keep the container
              newChildren.push(leftIconValue)
            }
          } else if (
            leftIconValue.type === "Literal" ||
            leftIconValue.type === "StringLiteral"
          ) {
            newChildren.push(j.jsxExpressionContainer(leftIconValue))
          } else {
            newChildren.push(j.jsxExpressionContainer(leftIconValue))
          }
        }

        newChildren.push(...originalChildren)

        if (rightIconValue) {
          if (rightIconValue.type === "JSXExpressionContainer") {
            // Extract the expression from the container
            const expr = rightIconValue.expression
            // If it's a JSXElement, push it directly without wrapping
            if (expr.type === "JSXElement" || expr.type === "JSXFragment") {
              newChildren.push(expr)
            } else {
              // For other expressions (variables, function calls), keep the container
              newChildren.push(rightIconValue)
            }
          } else if (
            rightIconValue.type === "Literal" ||
            rightIconValue.type === "StringLiteral"
          ) {
            newChildren.push(j.jsxExpressionContainer(rightIconValue))
          } else {
            newChildren.push(j.jsxExpressionContainer(rightIconValue))
          }
        }

        parent.children = newChildren
      }
    }
  })

  return root.toSource({ quote: "single" })
}
