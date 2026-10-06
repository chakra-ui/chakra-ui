import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const TAG_MAP: Record<string, string> = {
  NumberInput: "NumberInput.Root",
  NumberInputField: "NumberInput.Input",
  NumberInputStepper: "NumberInput.Control",
  NumberIncrementStepper: "NumberInput.IncrementTrigger",
  NumberDecrementStepper: "NumberInput.DecrementTrigger",
}

function renameTag(opening: JsxOpening, newText: string) {
  if (Node.isJsxSelfClosingElement(opening)) {
    opening.getTagNameNode().replaceWithText(newText)
    return
  }
  const el = opening.getParentIfKind(SyntaxKind.JsxElement)
  el?.getClosingElement()?.getTagNameNode().replaceWithText(newText)
  opening.getTagNameNode().replaceWithText(newText)
}

function addOrMergeCss(opening: JsxOpening, varName: string, valText: string) {
  const cssAttr = opening
    .getAttributes()
    .find((a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "css")
  if (cssAttr && Node.isJsxAttribute(cssAttr)) {
    const init = cssAttr.getInitializer()
    if (init && Node.isJsxExpression(init)) {
      const expr = init.getExpression()
      if (expr && Node.isObjectLiteralExpression(expr)) {
        expr.addPropertyAssignment({
          name: `'${varName}'`,
          initializer: valText,
        })
        return
      }
    }
  }
  opening.addAttribute({
    name: "css",
    initializer: `{{ '${varName}': ${valText} }}`,
  })
}

function transformAttrs(opening: JsxOpening, baseName: string) {
  for (const attr of opening.getAttributes()) {
    if (attr.wasForgotten()) continue
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()

    switch (name) {
      case "value":
      case "defaultValue": {
        if (baseName !== "NumberInput") break
        const init = attr.getInitializer()
        if (init && Node.isJsxExpression(init)) {
          const inner = init.getExpression()
          if (!inner) break
          if (Node.isNumericLiteral(inner)) {
            attr.setInitializer(`"${inner.getLiteralValue()}"`)
          } else if (Node.isStringLiteral(inner)) {
            // keep as-is
          } else {
            attr.setInitializer(`{String(${inner.getText()})}`)
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
      case "isReadOnly":
        attr.getNameNode().replaceWithText("readOnly")
        break
      case "isRequired":
        attr.getNameNode().replaceWithText("required")
        break
      case "onChange":
        attr.getNameNode().replaceWithText("onValueChange")
        break
      case "onInvalid":
        attr.getNameNode().replaceWithText("onValueInvalid")
        break
      case "keepWithinRange": {
        const init = attr.getInitializer()
        if (init && Node.isJsxExpression(init)) {
          const inner = init.getExpression()
          if (!inner) break
          const t = inner.getText()
          attr.getNameNode().replaceWithText("allowOverflow")
          if (t === "true") attr.setInitializer("{false}")
          else if (t === "false") attr.setInitializer("{true}")
          else attr.setInitializer(`{!${t}}`)
        } else if (!init) {
          attr.getNameNode().replaceWithText("allowOverflow")
          attr.setInitializer("{false}")
        }
        break
      }
      case "isValidCharacter":
        attr.remove()
        break
      case "focusBorderColor":
      case "errorBorderColor": {
        const varName =
          name === "focusBorderColor" ? "--focus-color" : "--error-color"
        const init = attr.getInitializer()
        let valText: string | null = null
        if (init && Node.isJsxExpression(init)) {
          valText = init.getExpression()?.getText() ?? null
        }
        attr.remove()
        if (valText !== null) addOrMergeCss(opening, varName, valText)
        break
      }
      default:
        break
    }
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const openings: JsxOpening[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (opening.wasForgotten()) continue
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (!chakraLocalNames.has(baseName)) continue

    transformAttrs(opening, baseName)

    const newTag = TAG_MAP[baseName]
    if (newTag) renameTag(opening, newTag)
  }
}

export default transform
