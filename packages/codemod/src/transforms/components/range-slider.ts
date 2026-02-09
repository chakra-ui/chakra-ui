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

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return

    // RangeSlider root → Slider.Root
    if (baseName === "RangeSlider") {
      const oldAttrs = opening.attributes ?? []
      const newAttrs: JSXAttribute[] = []

      // Transform props
      oldAttrs.forEach((attr: any) => {
        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          newAttrs.push(attr)
          return
        }

        switch (attr.name.name) {
          case "colorScheme":
            // colorScheme -> colorPalette
            newAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("colorPalette"), attr.value),
            )
            break
          case "onChange":
            // onChange -> onValueChange
            newAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("onValueChange"), attr.value),
            )
            break
          case "onChangeEnd":
            // onChangeEnd -> onValueChangeEnd
            newAttrs.push(
              j.jsxAttribute(j.jsxIdentifier("onValueChangeEnd"), attr.value),
            )
            break
          case "focusThumbOnChange":
          case "reversed":
            // Remove these props
            break
          default:
            newAttrs.push(attr)
        }
      })

      opening.attributes = newAttrs

      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Slider"),
        j.jsxIdentifier("Root"),
      )
      opening.name = newName
      if (elPath.node.closingElement) {
        elPath.node.closingElement.name = newName
      }

      // Restructure children: separate track and thumbs, wrap in Control
      const children = elPath.node.children ?? []
      const trackElements: any[] = []
      const thumbElements: any[] = []
      const otherChildren: any[] = []

      children.forEach((c) => {
        if (c.type !== "JSXElement") {
          otherChildren.push(c)
          return
        }

        const childName = getJsxBaseName(c.openingElement.name)

        if (childName === "RangeSliderTrack" || childName === "Slider.Track") {
          // Transform track and add to trackElements
          trackElements.push(c)
        } else if (
          childName === "RangeSliderThumb" ||
          childName === "Slider.Thumb"
        ) {
          // Add HiddenInput to each thumb
          const thumbChildren = c.children ?? []
          const hiddenInput = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Slider"),
                j.jsxIdentifier("HiddenInput"),
              ),
              [],
              true,
            ),
            null,
            [],
          )

          // Create new thumb with HiddenInput as first child
          const newThumb = j.jsxElement(
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
            [hiddenInput, ...thumbChildren],
          )
          thumbElements.push(newThumb)
        } else {
          otherChildren.push(c)
        }
      })

      // Create Control wrapper with Track and Thumbs
      const controlChildren = [...trackElements, ...thumbElements]
      if (controlChildren.length > 0) {
        const controlElement = j.jsxElement(
          j.jsxOpeningElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Slider"),
              j.jsxIdentifier("Control"),
            ),
            [],
            false,
          ),
          j.jsxClosingElement(
            j.jsxMemberExpression(
              j.jsxIdentifier("Slider"),
              j.jsxIdentifier("Control"),
            ),
          ),
          controlChildren,
        )
        elPath.node.children = [...otherChildren, controlElement]
      }
    }

    // Transform RangeSlider sub-components
    if (opening.name.type === "JSXIdentifier") {
      const componentMap: Record<string, string> = {
        RangeSliderTrack: "Track",
        RangeSliderFilledTrack: "Range",
        RangeSliderThumb: "Thumb",
      }

      const newComponent = componentMap[baseName]
      if (newComponent) {
        opening.name = j.jsxMemberExpression(
          j.jsxIdentifier("Slider"),
          j.jsxIdentifier(newComponent),
        )
        if (elPath.node.closingElement) {
          elPath.node.closingElement.name = j.jsxMemberExpression(
            j.jsxIdentifier("Slider"),
            j.jsxIdentifier(newComponent),
          )
        }
      }
    }
  })

  return root.toSource({ quote: "single" })
}
