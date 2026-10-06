import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

function renameProps(opening: JsxOpeningElement | JsxSelfClosingElement) {
  const attrs = opening.getAttributes()
  for (let i = attrs.length - 1; i >= 0; i--) {
    const attr = attrs[i]
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()
    switch (name) {
      case "onChange":
        attr.getNameNode().replaceWithText("onValueChange")
        break
      case "onChangeEnd":
        attr.getNameNode().replaceWithText("onValueChangeEnd")
        break
      case "isDisabled":
        attr.getNameNode().replaceWithText("disabled")
        break
      case "isReadOnly":
        attr.getNameNode().replaceWithText("readOnly")
        break
      case "onChangeStart":
      case "isReversed":
        attr.remove()
        break
    }
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return
  if (!chakraLocalNames.has("Slider")) return

  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    if (getJsxBaseName(opening.getTagNameNode()) !== "Slider") continue
    renameProps(opening)
    // Rename the closing tag first (later position) so the opening tag's
    // position stays stable.
    el.getClosingElement()?.getTagNameNode().replaceWithText("Slider.Root")
    opening.getTagNameNode().replaceWithText("Slider.Root")
  }

  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (getJsxBaseName(el.getTagNameNode()) !== "Slider") continue
    renameProps(el)
    el.getTagNameNode().replaceWithText("Slider.Root")
  }
}

export default transform
