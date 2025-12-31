import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  isTrackedJsx,
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
    if (!isTrackedJsx(opening, chakraLocalNames)) return
    const attrs = opening.attributes || []
    const bgAttrIndex = attrs.findIndex(
      (a) =>
        a.type === "JSXAttribute" &&
        a.name.type === "JSXIdentifier" &&
        a.name.name === "bgGradient",
    )
    if (bgAttrIndex === -1) return
    const attr = attrs[bgAttrIndex] as JSXAttribute
    if (!attr.value || attr.value.type !== "Literal") return

    const value = attr.value.value as string

    const match = value.match(/(\w+)\(([^,]+),\s*([^,]+),\s*([^)]+)\)/)
    if (!match) return

    const [, _type, direction, from, to] = match

    const newAttributes: JSXAttribute[] = [
      j.jsxAttribute(j.jsxIdentifier("gradient"), j.literal(direction.trim())),
      j.jsxAttribute(j.jsxIdentifier("gradientFrom"), j.literal(from.trim())),
      j.jsxAttribute(j.jsxIdentifier("gradientTo"), j.literal(to.trim())),
    ]

    opening.attributes = attrs.filter((a) => a !== attr)
    opening.attributes.push(...newAttributes)
  })

  return root.toSource({ quote: "single" })
}
