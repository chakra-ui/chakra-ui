import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Replace Slider and RangeSlider with Slider.Root
  root
    .find(j.JSXIdentifier)
    .filter(
      (path) => path.node.name === "Slider" || path.node.name === "RangeSlider",
    )
    .replaceWith(() =>
      j.jsxMemberExpression(j.jsxIdentifier("Slider"), j.jsxIdentifier("Root")),
    )

  // Rename props
  root.find(j.JSXOpeningElement).forEach((path) => {
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
