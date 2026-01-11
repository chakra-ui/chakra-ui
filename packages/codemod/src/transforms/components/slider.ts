import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
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

  // Replace Slider and RangeSlider with Slider.Root
  root
    .find(j.JSXIdentifier)
    .filter((path) => path.node.name === "Slider")
    .replaceWith(() =>
      j.jsxMemberExpression(j.jsxIdentifier("Slider"), j.jsxIdentifier("Root")),
    )

  // Rename props
  root.find(j.JSXOpeningElement).forEach((path) => {
    const name = path.node.name
    if (name.type === "JSXIdentifier" && !chakraLocalNames.has(name.name))
      return
    const attrs = path.node.attributes ?? []
    path.node.attributes = attrs
      .map((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "onChange":
            return j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value)
          case "onChangeEnd":
            return j.jsxAttribute(
              j.jsxIdentifier("onValueChangeEnd"),
              attr.value,
            )
          case "isDisabled":
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)
          case "isReadOnly":
            return j.jsxAttribute(j.jsxIdentifier("readOnly"), attr.value)
          case "onChangeStart":
          case "isReversed":
            return null // remove
          default:
            return attr
        }
      })
      .filter(Boolean) as JSXAttribute[]
  })

  return root.toSource({ quote: "single" })
}
