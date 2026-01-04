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
    if (baseName !== "Show" && baseName !== "Hide") return

    const isShow = baseName === "Show"

    // Find 'below' prop value
    let belowValue: any = null
    opening.attributes = (opening.attributes || [])
      .map((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          attr.name.type === "JSXIdentifier"
        ) {
          if (attr.name.name === "below") {
            belowValue = attr.value
            return null as any
          }
        }
        return attr
      })
      .filter(Boolean) as any

    const boxName = j.jsxIdentifier("Box")
    const newOpening = j.jsxOpeningElement(boxName, opening.attributes, false)
    const newClosing = j.jsxClosingElement(boxName)

    const newAttrs = newOpening.attributes || []
    const propName = isShow ? "hideFrom" : "hideBelow"
    newAttrs.push(j.jsxAttribute(j.jsxIdentifier(propName), belowValue))
    newOpening.attributes = newAttrs

    elPath.node.openingElement = newOpening
    elPath.node.closingElement = newClosing
  })

  return root.toSource({ quote: "single" })
}
