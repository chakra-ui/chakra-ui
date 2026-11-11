import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const ROOT_PROP_RENAMES: Record<string, string> = {
  colorScheme: "colorPalette",
  onChange: "onValueChange",
  onChangeEnd: "onValueChangeEnd",
}
const ROOT_PROP_REMOVE = new Set(["focusThumbOnChange", "reversed"])

function getAttrsText(el: JsxElement | JsxSelfClosingElement): string {
  const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
  return opening
    .getAttributes()
    .map((a) => a.getText())
    .join(" ")
}

function getInner(el: JsxElement | JsxSelfClosingElement): string {
  if (!Node.isJsxElement(el)) return ""
  const full = el.getText()
  const openText = el.getOpeningElement().getText()
  const closeText = el.getClosingElement().getText()
  return full.slice(openText.length, full.length - closeText.length)
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const roots = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .filter((el) => {
      const tag = el.getOpeningElement().getTagNameNode()
      return (
        Node.isIdentifier(tag) &&
        tag.getText() === "RangeSlider" &&
        chakraLocalNames.has("RangeSlider")
      )
    })

  for (const el of roots.reverse()) {
    const opening = el.getOpeningElement()

    // Transform root props.
    const rootAttrs = opening
      .getAttributes()
      .flatMap((attr) => {
        if (!Node.isJsxAttribute(attr)) return [attr.getText()]
        const name = attr.getNameNode().getText()
        if (ROOT_PROP_REMOVE.has(name)) return []
        const rename = ROOT_PROP_RENAMES[name]
        if (rename) {
          const init = attr.getInitializer()
          return [init ? `${rename}=${init.getText()}` : rename]
        }
        return [attr.getText()]
      })
      .join(" ")

    // Classify direct children.
    const tracks: string[] = []
    const thumbs: string[] = []
    const others: string[] = []

    for (const child of el.getJsxChildren()) {
      if (Node.isJsxText(child)) {
        if (child.getText().trim() !== "") others.push(child.getText())
        continue
      }
      if (!Node.isJsxElement(child) && !Node.isJsxSelfClosingElement(child)) {
        others.push(child.getText())
        continue
      }
      const baseName = getJsxBaseName(
        Node.isJsxElement(child)
          ? child.getOpeningElement().getTagNameNode()
          : child.getTagNameNode(),
      )
      if (baseName === "RangeSliderTrack") {
        tracks.push(
          child
            .getText()
            .replaceAll("RangeSliderFilledTrack", "Slider.Range")
            .replaceAll("RangeSliderTrack", "Slider.Track"),
        )
      } else if (baseName === "RangeSliderThumb") {
        const attrs = getAttrsText(child)
        const thumbOpen = attrs ? `<Slider.Thumb ${attrs}>` : `<Slider.Thumb>`
        thumbs.push(
          `${thumbOpen}\n<Slider.HiddenInput />${getInner(child)}\n</Slider.Thumb>`,
        )
      } else {
        others.push(child.getText())
      }
    }

    const controlInner = [...tracks, ...thumbs].join("\n")
    const control = `<Slider.Control>\n${controlInner}\n</Slider.Control>`
    const rootOpen = rootAttrs ? `<Slider.Root ${rootAttrs}>` : `<Slider.Root>`

    el.replaceWithText(
      `${rootOpen}\n${others.join("")}${control}\n</Slider.Root>`,
    )
  }
}

export default transform
