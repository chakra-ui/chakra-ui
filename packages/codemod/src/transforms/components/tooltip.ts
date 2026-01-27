import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
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

  root.find(j.JSXOpeningElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.name)
    if (!chakraLocalNames.has(baseName) || baseName !== "Tooltip") return
    const attrs = path.node.attributes ?? []

    const positioning: Record<string, any> = {}
    const newAttrs: JSXAttribute[] = []

    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return

      switch (attr.name.name) {
        case "closeOnEsc":
          newAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("closeOnEscape"), attr.value),
          )
          break
        case "closeOnMouseDown":
          newAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("closeOnPointerDown"), attr.value),
          )
          break
        case "placement":
        case "gutter":
        case "offset":
        case "arrow":
          positioning[attr.name.name] =
            (attr.value as any).expression || attr.value
          break
        default:
          newAttrs.push(attr)
      }
    })

    if (Object.keys(positioning).length) {
      newAttrs.push(
        j.jsxAttribute(
          j.jsxIdentifier("positioning"),
          j.jsxExpressionContainer(
            j.objectExpression(
              Object.entries(positioning).map(([key, val]) =>
                j.objectProperty(j.identifier(key), val),
              ),
            ),
          ),
        ),
      )
    }

    path.node.attributes = newAttrs
  })

  return root.toSource({ quote: "single" })
}
