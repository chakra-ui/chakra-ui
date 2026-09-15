import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

function transformSkeleton(opening: JsxOpeningElement | JsxSelfClosingElement) {
  // 1. isLoaded -> loading (inverted boolean)
  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) continue
    if (attr.getNameNode().getText() !== "isLoaded") continue

    const init = attr.getInitializer()
    let newInit: string
    if (!init) {
      newInit = "{false}"
    } else if (Node.isJsxExpression(init)) {
      newInit = `{!${init.getExpression()?.getText() ?? ""}}`
    } else if (Node.isStringLiteral(init)) {
      newInit = `{${!init.getLiteralValue()}}`
    } else {
      newInit = init.getText()
    }
    attr.setInitializer(newInit)
    attr.getNameNode().replaceWithText("loading")
    break
  }

  // 2. startColor / endColor -> css custom properties
  const cssProps: [string, string][] = []
  let cssAttr: import("ts-morph").JsxAttribute | undefined
  const toRemove: import("ts-morph").JsxAttribute[] = []

  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()
    if (name === "css") {
      cssAttr = attr
      continue
    }
    if (name !== "startColor" && name !== "endColor") continue

    const varName = name === "startColor" ? "--start-color" : "--end-color"
    const init = attr.getInitializer()
    let valueText: string | null = null
    if (init && Node.isStringLiteral(init)) {
      valueText = init.getText()
    } else if (init && Node.isJsxExpression(init)) {
      valueText = init.getExpression()?.getText() ?? null
    }
    if (valueText) cssProps.push([`'${varName}'`, valueText])
    toRemove.push(attr)
  }

  if (cssProps.length === 0) return

  for (const attr of toRemove) attr.remove()

  const newEntries = cssProps.map(([k, v]) => `${k}: ${v}`)

  if (cssAttr && !cssAttr.wasForgotten()) {
    const init = cssAttr.getInitializer()
    if (init && Node.isJsxExpression(init)) {
      const obj = init.getExpression()
      if (obj && Node.isObjectLiteralExpression(obj)) {
        const existing = obj.getProperties().map((p) => p.getText())
        cssAttr.setInitializer(
          `{{\n${[...existing, ...newEntries].join(",\n")},\n}}`,
        )
      }
    }
  } else {
    opening.addAttribute({
      name: "css",
      initializer: `{{\n${newEntries.join(",\n")},\n}}`,
    })
  }
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return
  if (!chakraLocalNames.has("Skeleton")) return

  const openings: (JsxOpeningElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
  ].filter((o) => getJsxBaseName(o.getTagNameNode()) === "Skeleton")

  // Process later elements first so earlier positions stay stable.
  for (const opening of openings.reverse()) {
    if (opening.wasForgotten()) continue
    transformSkeleton(opening)
  }
}

export default transform
