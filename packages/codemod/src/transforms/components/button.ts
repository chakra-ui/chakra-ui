import type {
  API,
  FileInfo,
  JSXAttribute,
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
    const resolvesToButton =
      baseName === "Button" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "Button")
    if (!isChakra || !resolvesToButton) return

    const attributes = path.node.attributes ?? []

    let leftIconValue: JSXAttribute["value"] | null = null
    let rightIconValue: JSXAttribute["value"] | null = null

    // Transform attributes
    const newAttributes = attributes.flatMap((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return attr

      switch (attr.name.name) {
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
          return [] // remove
        default:
          return attr
      }
    })

    path.node.attributes = newAttributes

    // Inject leftIcon / rightIcon as children
    if (leftIconValue || rightIconValue) {
      const parent = path.parent.node
      if (parent.type === "JSXElement") {
        const originalChildren = parent.children.filter((c: JSXChild) => {
          return c.type !== "JSXText" || (c as JSXText).value.trim() !== ""
        })

        const newChildren: JSXElement["children"] = []

        if (leftIconValue)
          newChildren.push(j.jsxExpressionContainer(leftIconValue))
        newChildren.push(...originalChildren)
        if (rightIconValue)
          newChildren.push(j.jsxExpressionContainer(rightIconValue))

        parent.children = newChildren
      }
    }
  })

  return root.toSource({ quote: "single" })
}
