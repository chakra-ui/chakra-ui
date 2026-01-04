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

    // RangeSlider root → Slider.Root
    if (baseName === "RangeSlider") {
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Slider"),
        j.jsxIdentifier("Root"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }

      const children = elPath.node.children ?? []
      const thumbChildren: any[] = []
      const otherChildren: any[] = []
      children.forEach((c) => {
        if (
          c.type === "JSXElement" &&
          c.openingElement.name.type === "JSXMemberExpression" &&
          c.openingElement.name.object.type === "JSXIdentifier" &&
          c.openingElement.name.object.name === "RangeSlider" &&
          c.openingElement.name.property.type === "JSXIdentifier" &&
          c.openingElement.name.property.name === "Thumb"
        ) {
          const thumbEl = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Slider"),
                j.jsxIdentifier("Thumb"),
              ),
              c.openingElement.attributes ?? [],
              false,
            ),
            j.jsxClosingElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Slider"),
                j.jsxIdentifier("Thumb"),
              ),
            ),
            c.children ?? [],
          )
          thumbChildren.push(thumbEl)
        } else {
          otherChildren.push(c)
        }
      })
      if (thumbChildren.length > 0) {
        const thumbsContainer = j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Slider"),
              j.jsxIdentifier("Thumbs"),
            ),
            [],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Slider"),
              j.jsxIdentifier("Thumbs"),
            ),
          ),
          thumbChildren,
        )
        elPath.node.children = [...otherChildren, thumbsContainer]
      }
    }

    // Parts
    if (
      opening.name.type === "JSXMemberExpression" &&
      opening.name.object.type === "JSXIdentifier" &&
      opening.name.object.name === "RangeSlider" &&
      opening.name.property.type === "JSXIdentifier"
    ) {
      const prop = opening.name.property.name
      const map: Record<string, string> = {
        RangeSliderTrack: "Track",
        RangeSliderFilledTrack: "Range",
        RangeSliderThumb: "Thumb",
      }
      if (map[prop]) {
        opening.name = j.jsxMemberExpression(
          j.jsxIdentifier("Slider"),
          j.jsxIdentifier(map[prop]),
        )
        if (elPath.node.closingElement?.name?.type === "JSXMemberExpression") {
          elPath.node.closingElement.name = j.jsxMemberExpression(
            j.jsxIdentifier("Slider"),
            j.jsxIdentifier(map[prop]),
          )
        }
      }
    }
  })

  return root.toSource({ quote: "single" })
}
