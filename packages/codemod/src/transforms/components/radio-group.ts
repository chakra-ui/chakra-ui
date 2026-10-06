import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

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

  // 1. Transform every tracked Radio into a RadioGroup.Item structure.
  if (chakraLocalNames.has("Radio")) {
    const radios: Array<JsxElement | JsxSelfClosingElement> = [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ].filter((el) => {
      const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
      const tag = opening.getTagNameNode()
      return Node.isIdentifier(tag) && tag.getText() === "Radio"
    })

    for (const radio of radios.reverse()) {
      const opening = Node.isJsxElement(radio)
        ? radio.getOpeningElement()
        : radio

      let inputPropsAttr = ""
      const itemAttrs = opening
        .getAttributes()
        .flatMap((attr) => {
          if (!Node.isJsxAttribute(attr)) return [attr.getText()]
          const name = attr.getNameNode().getText()
          switch (name) {
            case "isDisabled": {
              const init = attr.getInitializer()
              return [init ? `disabled=${init.getText()}` : "disabled"]
            }
            case "isInvalid":
            case "isChecked":
            case "defaultChecked":
            case "colorScheme":
              return []
            case "inputProps":
              inputPropsAttr = attr.getText()
              return []
            default:
              return [attr.getText()]
          }
        })
        .join(" ")

      const itemOpen = itemAttrs
        ? `<RadioGroup.Item ${itemAttrs}>`
        : `<RadioGroup.Item>`
      const hidden = inputPropsAttr
        ? `<RadioGroup.ItemHiddenInput ${inputPropsAttr} />`
        : `<RadioGroup.ItemHiddenInput />`

      radio.replaceWithText(
        `${itemOpen}\n` +
          `${hidden}\n` +
          `<RadioGroup.ItemIndicator />\n` +
          `<RadioGroup.ItemText>${getInner(radio)}</RadioGroup.ItemText>\n` +
          `</RadioGroup.Item>`,
      )
    }
  }

  // 2. Transform RadioGroup -> RadioGroup.Root (re-query after Radio edits).
  if (chakraLocalNames.has("RadioGroup")) {
    const roots = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .filter((el) => {
        const tag = el.getOpeningElement().getTagNameNode()
        return Node.isIdentifier(tag) && tag.getText() === "RadioGroup"
      })

    for (const root of roots.reverse()) {
      const opening = root.getOpeningElement()
      const onChange = opening
        .getAttributes()
        .find(
          (a) =>
            Node.isJsxAttribute(a) && a.getNameNode().getText() === "onChange",
        )
      if (onChange && Node.isJsxAttribute(onChange)) {
        onChange.getNameNode().replaceWithText("onValueChange")
      }

      root
        .getClosingElement()
        .getTagNameNode()
        .replaceWithText("RadioGroup.Root")
      opening.getTagNameNode().replaceWithText("RadioGroup.Root")
    }
  }
}

export default transform
