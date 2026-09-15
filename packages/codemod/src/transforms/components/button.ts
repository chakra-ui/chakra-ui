import { Node, SyntaxKind } from "ts-morph"
import type { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames, componentAliases } =
    collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const resolvesTo = (baseName: string, target: string): boolean =>
    baseName === target || componentAliases.get(baseName) === target

  const openings: JsxOpening[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]

  for (const opening of openings) {
    if (opening.wasForgotten()) continue

    const baseName = getJsxBaseName(opening.getTagNameNode())
    const isChakra = chakraLocalNames.has(baseName)
    if (!isChakra) continue

    // ButtonGroup
    if (resolvesTo(baseName, "ButtonGroup")) {
      processButtonGroup(opening, resolvesTo)
      continue
    }

    // Button
    if (resolvesTo(baseName, "Button")) {
      processButton(opening)
      continue
    }
  }
}

function jsxAttributes(opening: JsxOpening) {
  return opening.getAttributes().filter(Node.isJsxAttribute)
}

function attrName(attr: ReturnType<typeof jsxAttributes>[number]): string {
  return attr.getNameNode().getText()
}

function processButtonGroup(
  opening: JsxOpening,
  resolvesTo: (baseName: string, target: string) => boolean,
) {
  let disabledInitializer: string | undefined
  let hasIsDisabled = false

  for (const attr of jsxAttributes(opening)) {
    const name = attrName(attr)
    if (name === "isAttached") {
      attr.getNameNode().replaceWithText("attached")
    } else if (name === "isDisabled") {
      hasIsDisabled = true
      const init = attr.getInitializer()
      if (init && Node.isJsxExpression(init)) {
        const expr = init.getExpression()
        if (expr) disabledInitializer = `{${expr.getText()}}`
      }
      attr.remove()
    }
  }

  if (!hasIsDisabled) return

  const jsxEl = opening.getParentIfKind(SyntaxKind.JsxElement)
  if (!jsxEl) return

  for (const child of jsxEl.getJsxChildren()) {
    let childOpening: JsxOpening | undefined
    if (Node.isJsxElement(child)) childOpening = child.getOpeningElement()
    else if (Node.isJsxSelfClosingElement(child)) childOpening = child
    if (!childOpening) continue

    const childBase = getJsxBaseName(childOpening.getTagNameNode())
    const isButton =
      resolvesTo(childBase, "Button") || resolvesTo(childBase, "IconButton")
    if (!isButton) continue

    const hasDisabled = jsxAttributes(childOpening).some(
      (a) => attrName(a) === "disabled",
    )
    if (hasDisabled) continue

    childOpening.addAttribute(
      disabledInitializer
        ? { name: "disabled", initializer: disabledInitializer }
        : { name: "disabled" },
    )
  }
}

function processButton(opening: JsxOpening) {
  const hasGap = jsxAttributes(opening).some((a) => attrName(a) === "gap")

  let needUnstyled = false
  let leftIcon: string | undefined
  let rightIcon: string | undefined

  for (const attr of jsxAttributes(opening)) {
    const name = attrName(attr)
    switch (name) {
      case "variant": {
        const init = attr.getInitializer()
        if (init && Node.isStringLiteral(init)) {
          const value = init.getLiteralValue()
          if (value === "unstyled") {
            attr.remove()
            needUnstyled = true
          } else if (value === "link") {
            init.replaceWithText('"plain"')
          }
        }
        break
      }
      case "isActive":
        attr.replaceWithText("data-active")
        break
      case "isDisabled":
        attr.getNameNode().replaceWithText("disabled")
        break
      case "isLoading":
        attr.getNameNode().replaceWithText("loading")
        break
      case "colorScheme":
        attr.getNameNode().replaceWithText("colorPalette")
        break
      case "leftIcon":
        leftIcon = extractIcon(attr)
        attr.remove()
        break
      case "rightIcon":
        rightIcon = extractIcon(attr)
        attr.remove()
        break
      case "iconSpacing": {
        if (!hasGap && attr.getInitializer()) {
          attr.getNameNode().replaceWithText("gap")
        } else {
          attr.remove()
        }
        break
      }
      default:
        break
    }
  }

  if (needUnstyled) opening.addAttribute({ name: "unstyled" })

  if (!leftIcon && !rightIcon) return

  const jsxEl = opening.getParentIfKind(SyntaxKind.JsxElement)
  if (!jsxEl) return

  const closing = jsxEl.getClosingElement()
  if (!closing) return

  const childrenText = jsxEl
    .getJsxChildren()
    .map((c) => c.getText())
    .join("")
    .trim()

  const parts: string[] = []
  if (leftIcon) parts.push(leftIcon)
  if (childrenText) parts.push(childrenText)
  if (rightIcon) parts.push(rightIcon)

  jsxEl.replaceWithText(
    `${opening.getText()}\n${parts.join("\n")}\n${closing.getText()}`,
  )
}

/**
 * Extract the icon value for leftIcon/rightIcon. Unwrap `{<Icon />}` to
 * `<Icon />`; keep other expressions/values wrapped in braces.
 */
function extractIcon(
  attr: ReturnType<typeof jsxAttributes>[number],
): string | undefined {
  const init = attr.getInitializer()
  if (!init) return undefined
  if (Node.isJsxExpression(init)) {
    const expr = init.getExpression()
    if (
      expr &&
      (Node.isJsxElement(expr) ||
        Node.isJsxSelfClosingElement(expr) ||
        Node.isJsxFragment(expr))
    ) {
      return expr.getText()
    }
    return init.getText()
  }
  // string literal or other → wrap in braces
  return `{${init.getText()}}`
}

export default transform
