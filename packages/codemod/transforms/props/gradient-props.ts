import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Converts Chakra UI bgGradient shorthand into:
 * - gradient
 * - gradientFrom
 * - gradientTo
 *
 * Example:
 * <Box bgGradient="linear(to-r, red.200, pink.500)" />
 * =>
 * <Box gradient="to-r" gradientFrom="red.200" gradientTo="pink.500" />
 */

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  root
    .find(j.JSXAttribute, { name: { name: "bgGradient" } })
    .forEach((path) => {
      const attr = path.node
      if (!attr.value || attr.value.type !== "Literal") return

      const value = attr.value.value as string

      // Match "linear(to-r, red.200, pink.500)" or similar
      const match = value.match(/(\w+)\(([^,]+),\s*([^,]+),\s*([^)]+)\)/)
      if (!match) return

      const [, _type, direction, from, to] = match

      const jsxElement = path.parent.node
      if (jsxElement.type !== "JSXOpeningElement") return

      const newAttributes: JSXAttribute[] = [
        j.jsxAttribute(
          j.jsxIdentifier("gradient"),
          j.literal(direction.trim()),
        ),
        j.jsxAttribute(j.jsxIdentifier("gradientFrom"), j.literal(from.trim())),
        j.jsxAttribute(j.jsxIdentifier("gradientTo"), j.literal(to.trim())),
      ]

      // Remove old bgGradient with properly typed filter
      jsxElement.attributes = jsxElement.attributes.filter(
        (attrNode: JSXAttribute): attrNode is JSXAttribute => attrNode !== attr,
      )
      jsxElement.attributes.push(...newAttributes)
    })

  return root.toSource({ quote: "single" })
}
