import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

function toCharArray(value: string): string {
  return `[${value
    .split("")
    .map((c) => `'${c}'`)
    .join(", ")}]`
}

/** Transform the props on the PinInput.Root opening element in place. */
function transformRootAttrs(opening: JsxOpening) {
  for (const attr of opening.getAttributes()) {
    if (attr.wasForgotten()) continue
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()

    switch (name) {
      case "value":
      case "defaultValue": {
        const init = attr.getInitializer()
        if (init && Node.isStringLiteral(init)) {
          attr.setInitializer(`{${toCharArray(init.getLiteralValue())}}`)
        } else if (init && Node.isJsxExpression(init)) {
          const inner = init.getExpression()
          if (!inner) break
          if (Node.isStringLiteral(inner)) {
            attr.setInitializer(`{${toCharArray(inner.getLiteralValue())}}`)
          } else {
            attr.setInitializer(`{${inner.getText()}.split('')}`)
          }
        }
        break
      }
      case "isDisabled":
        attr.getNameNode().replaceWithText("disabled")
        break
      case "isInvalid":
        attr.getNameNode().replaceWithText("invalid")
        break
      case "onChange":
        attr.getNameNode().replaceWithText("onValueChange")
        break
      case "onComplete":
        attr.getNameNode().replaceWithText("onValueComplete")
        break
      case "manageFocus":
        attr.remove()
        break
      default:
        break
    }
  }
}

/** Build a `<PinInput.Input index={i} ... />` string from a PinInputField. */
function buildInput(fieldOpening: JsxOpening, index: number): string {
  const extra: string[] = []
  for (const attr of fieldOpening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      extra.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    if (name === "focusBorderColor" || name === "errorBorderColor") {
      // string values are dropped; expression values become a css var
      const init = attr.getInitializer()
      if (init && Node.isJsxExpression(init)) {
        const valText = init.getExpression()?.getText()
        const varName =
          name === "focusBorderColor" ? "--focus-color" : "--error-color"
        if (valText) extra.push(`css={{ '${varName}': ${valText} }}`)
      }
      continue
    }
    extra.push(attr.getText())
  }
  const attrsText = [`index={${index}}`, ...extra].join(" ")
  return `<PinInput.Input ${attrsText} />`
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return
  if (!chakraLocalNames.has("PinInput")) return

  // Re-query each iteration so structural rewrites never touch stale nodes.
  while (true) {
    const el = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .find((e) => {
        const tag = e.getOpeningElement().getTagNameNode()
        return Node.isIdentifier(tag) && tag.getText() === "PinInput"
      }) as JsxElement | undefined
    if (!el) break

    const opening = el.getOpeningElement()
    transformRootAttrs(opening)

    // Collect PinInputField children and build inputs.
    const inputs: string[] = []
    let index = 0
    for (const child of el.getJsxChildren()) {
      if (
        Node.isJsxElement(child) &&
        getJsxBaseName(child.getOpeningElement().getTagNameNode()) ===
          "PinInputField"
      ) {
        inputs.push(buildInput(child.getOpeningElement(), index++))
      } else if (
        Node.isJsxSelfClosingElement(child) &&
        getJsxBaseName(child.getTagNameNode()) === "PinInputField"
      ) {
        inputs.push(buildInput(child, index++))
      }
    }

    const attrsText = opening
      .getAttributes()
      .map((a) => a.getText())
      .join(" ")
    const attrsPrefix = attrsText ? ` ${attrsText}` : ""

    const control =
      inputs.length > 0
        ? `\n<PinInput.Control>\n${inputs.join("\n")}\n</PinInput.Control>`
        : ""

    const replacement = `<PinInput.Root${attrsPrefix}>\n<PinInput.HiddenInput />\n${control}\n</PinInput.Root>`

    el.replaceWithText(replacement)
  }
}

export default transform
