import type {
  API,
  FileInfo,
  JSXAttribute,
  JSXSpreadAttribute,
  Options,
} from "jscodeshift"
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

  // Helper function to recursively transform Radio elements
  function transformRadioElement(element: any): any {
    if (element.type !== "JSXElement") return element

    const name = element.openingElement.name
    const baseName = getJsxBaseName(name)

    // Transform <Radio> → <RadioGroup.Item>
    if (baseName === "Radio" && chakraLocalNames.has("Radio")) {
      const radioAttrs = element.openingElement.attributes ?? []
      const radioChildren = element.children ?? []

      // Transform Radio props
      const itemAttrs: JSXAttribute[] = []
      let inputPropsAttr: JSXAttribute | null = null

      radioAttrs.forEach((attr: any) => {
        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          itemAttrs.push(attr)
          return
        }

        switch (attr.name.name) {
          case "isDisabled":
            // isDisabled -> disabled
            itemAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value),
            )
            break
          case "isInvalid":
          case "isChecked":
          case "defaultChecked":
            // Remove these props - controlled from RadioGroup.Root
            break
          case "inputProps":
            // inputProps will go on ItemHiddenInput
            inputPropsAttr = attr
            break
          case "colorScheme":
            // Remove colorScheme from individual items (should be on Root)
            break
          default:
            itemAttrs.push(attr)
        }
      })

      return j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("RadioGroup"),
            j.jsxIdentifier("Item"),
          ),
          itemAttrs,
          false,
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("RadioGroup"),
            j.jsxIdentifier("Item"),
          ),
        ),
        [
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("RadioGroup"),
                j.jsxIdentifier("ItemHiddenInput"),
              ),
              inputPropsAttr ? [inputPropsAttr] : [],
              true,
            ),
            null,
            [],
          ),
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("RadioGroup"),
                j.jsxIdentifier("ItemIndicator"),
              ),
              [],
              true,
            ),
            null,
            [],
          ),
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("RadioGroup"),
                j.jsxIdentifier("ItemText"),
              ),
              [],
              false,
            ),
            j.jsxClosingElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("RadioGroup"),
                j.jsxIdentifier("ItemText"),
              ),
            ),
            radioChildren,
          ),
        ],
      )
    }

    // For other elements, recursively transform their children
    if (element.children && element.children.length > 0) {
      element.children = element.children.map(transformRadioElement)
    }

    return element
  }

  /**
   * RadioGroup → RadioGroup.Root with proper prop transformations
   */
  root
    .find(j.JSXElement, { openingElement: { name: { name: "RadioGroup" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("RadioGroup")) return
      const oldAttrs = path.node.openingElement.attributes ?? []
      const children = path.node.children ?? []

      // Transform RadioGroup props
      const rootAttrs: (JSXAttribute | JSXSpreadAttribute)[] = []

      oldAttrs.forEach((attr) => {
        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          rootAttrs.push(attr)
          return
        }

        switch (attr.name.name) {
          case "onChange":
            // onChange -> onValueChange
            rootAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value),
            )
            break
          default:
            rootAttrs.push(attr)
        }
      })

      // Recursively transform all children (including nested Radio elements)
      const transformedChildren = children.map(transformRadioElement)

      path.replace(
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("RadioGroup"),
              j.jsxIdentifier("Root"),
            ),
            rootAttrs,
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("RadioGroup"),
              j.jsxIdentifier("Root"),
            ),
          ),
          transformedChildren,
        ),
      )
    })

  return root.toSource({ quote: "single" })
}
