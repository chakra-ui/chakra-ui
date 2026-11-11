import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const TARGET_COMPONENTS = new Set(["Input", "Textarea"])

const VAR_FOR: Record<string, string> = {
  focusBorderColor: "--focus-color",
  errorBorderColor: "--error-color",
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
    if (!TARGET_COMPONENTS.has(baseName) || !chakraLocalNames.has(baseName)) {
      continue
    }

    for (const attr of [...opening.getAttributes()]) {
      if (!Node.isJsxAttribute(attr)) continue
      const name = attr.getNameNode().getText()
      const varName = VAR_FOR[name]
      if (!varName) continue

      const init = attr.getInitializer()
      let valText: string | null = null
      if (init && Node.isStringLiteral(init)) {
        valText = `'${init.getLiteralValue()}'`
      } else if (init && Node.isJsxExpression(init)) {
        valText = init.getExpression()?.getText() ?? null
      }

      attr.remove()
      if (valText !== null) addOrMergeCss(opening, varName, valText)
    }
  }
}

export default transform
