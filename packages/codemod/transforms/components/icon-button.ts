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
import { createParserFromPath } from "../../utils/parser"

type JSXChild = JSXElement | JSXText | JSXExpressionContainer | JSXFragment

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root
    .find(j.JSXOpeningElement, { name: { name: "IconButton" } })
    .forEach((path) => {
      const attributes = path.node.attributes ?? []

      let iconValue: JSXAttribute["value"] | null = null

      // Transform attributes
      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "icon":
            // Store icon value to inject as children
            iconValue = attr.value
            return []
          case "isRounded":
            // isRounded becomes borderRadius="full"
            return j.jsxAttribute(
              j.jsxIdentifier("borderRadius"),
              j.stringLiteral("full"),
            )
          case "isActive":
            return j.jsxAttribute(j.jsxIdentifier("data-active"), null)
          case "isDisabled":
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
          case "isLoading":
            return j.jsxAttribute(j.jsxIdentifier("loading"), attr.value)
          case "colorScheme":
            return j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value)
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes

      // Inject icon as children
      if (iconValue) {
        const parent = path.parent.node
        if (parent.type === "JSXElement") {
          const originalChildren = parent.children.filter((c: JSXChild) => {
            return c.type !== "JSXText" || (c as JSXText).value.trim() !== ""
          })

          // Add icon as first child
          const newChildren: JSXElement["children"] = [
            j.jsxExpressionContainer(iconValue),
            ...originalChildren,
          ]

          parent.children = newChildren
        }
      }
    })

  return root.toSource({ quote: "single" })
}
