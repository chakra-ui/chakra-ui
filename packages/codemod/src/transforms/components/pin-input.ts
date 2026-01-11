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

  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return
    if (baseName !== "PinInput") return

    const attrs = opening.attributes || []
    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return
      const name = attr.name.name
      if (name === "onChange") {
        attr.name.name = "onValueChange"
      }
      if (name === "onComplete") {
        attr.name.name = "onValueComplete"
      }
    })

    // Convert <PinInput ...> to <PinInput.Root ...>
    const newName = j.jsxMemberExpression(
      j.jsxIdentifier("PinInput"),
      j.jsxIdentifier("Root"),
    )
    opening.name = newName
    if (elPath.node.closingElement) {
      elPath.node.closingElement.name = newName
    }
  })

  return root.toSource({ quote: "single" })
}
