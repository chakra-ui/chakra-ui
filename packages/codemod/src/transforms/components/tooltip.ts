import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const RENAMES: Record<string, string> = {
  label: "content",
  hasArrow: "showArrow",
  closeOnEsc: "closeOnEscape",
  closeOnMouseDown: "closeOnPointerDown",
}

const POSITIONING_KEYS = new Set([
  "placement",
  "gutter",
  "arrow",
  "arrowPadding",
])

const REMOVED = new Set([
  "modifiers",
  "motionProps",
  "portalProps",
  "arrowSize",
  "arrowShadowColor",
])

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  updateTooltipImport(sourceFile)

  const targets: Array<JsxElement | JsxSelfClosingElement> = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    if (isTooltip(el.getOpeningElement(), chakraLocalNames)) targets.push(el)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (isTooltip(el, chakraLocalNames)) targets.push(el)
  }

  targets.sort((a, b) => b.getStart() - a.getStart())

  for (const node of targets) rewriteTooltip(node)
}

function isTooltip(
  opening: JsxOpeningElement | JsxSelfClosingElement,
  chakraLocalNames: Set<string>,
): boolean {
  const base = getJsxBaseName(opening.getTagNameNode())
  return base === "Tooltip" && chakraLocalNames.has("Tooltip")
}

function updateTooltipImport(sourceFile: SourceFile) {
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  const tooltip = importDecl
    .getNamedImports()
    .find((n) => n.getName() === "Tooltip")
  if (!tooltip) return

  const otherNamed = importDecl
    .getNamedImports()
    .filter((n) => n.getName() !== "Tooltip")
  const hasOther =
    otherNamed.length > 0 ||
    !!importDecl.getDefaultImport() ||
    !!importDecl.getNamespaceImport()

  if (!hasOther) {
    // Tooltip is the only import: repoint the module specifier in place.
    importDecl.setModuleSpecifier("@/components/ui/tooltip")
    return
  }

  tooltip.remove()
  const idx = sourceFile.getImportDeclarations().indexOf(importDecl)
  sourceFile.insertStatements(
    idx + 1,
    `\nimport { Tooltip } from '@/components/ui/tooltip'`,
  )
}

function rewriteTooltip(node: JsxElement | JsxSelfClosingElement) {
  const isSelfClosing = Node.isJsxSelfClosingElement(node)
  const opening = isSelfClosing ? node : node.getOpeningElement()
  const attrs = opening.getAttributes()

  const newAttrs: string[] = []
  const positioning: Array<{ key: string; value: string; isObject: boolean }> =
    []
  let onOpen: Node | undefined
  let onClose: Node | undefined
  let shouldWrapChildren = false

  for (const attr of attrs) {
    if (!Node.isJsxAttribute(attr)) {
      newAttrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    const init = attr.getInitializer()
    const suffix = init ? `=${init.getText()}` : ""

    if (RENAMES[name]) {
      newAttrs.push(`${RENAMES[name]}${suffix}`)
      continue
    }

    if (POSITIONING_KEYS.has(name)) {
      const value = expressionText(attr)
      positioning.push({
        key: name,
        value,
        isObject: value.trimStart().startsWith("{"),
      })
      continue
    }

    if (name === "offset") {
      const value = offsetValue(attr)
      positioning.push({ key: "offset", value, isObject: true })
      continue
    }

    if (name === "onOpen") {
      onOpen = handlerNode(attr)
      continue
    }
    if (name === "onClose") {
      onClose = handlerNode(attr)
      continue
    }
    if (name === "shouldWrapChildren") {
      shouldWrapChildren = true
      continue
    }
    if (REMOVED.has(name)) continue

    newAttrs.push(attr.getText())
  }

  if (onOpen || onClose) {
    newAttrs.push(buildOnOpenChange(onOpen, onClose))
  }

  if (positioning.length) {
    newAttrs.push(buildPositioning(positioning))
  }

  const attrsText = newAttrs.length ? `\n${newAttrs.join("\n")}\n` : ""

  if (isSelfClosing) {
    node.replaceWithText(`<Tooltip${attrsText}/>`)
    return
  }

  let childrenText = node
    .getJsxChildren()
    .map((c) => c.getText())
    .join("")

  if (shouldWrapChildren && childrenText.trim().length > 0) {
    childrenText = `<span>${childrenText}</span>`
  }

  node.replaceWithText(`<Tooltip${attrsText}>${childrenText}</Tooltip>`)
}

/** Text of an attribute value, unwrapping the `{}` of an expression container. */
function expressionText(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (!init) return ""
  if (Node.isJsxExpression(init)) return init.getExpression()?.getText() ?? ""
  return init.getText()
}

function offsetValue(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (init && Node.isJsxExpression(init)) {
    const expr = init.getExpression()
    if (expr && Node.isArrayLiteralExpression(expr)) {
      const els = expr.getElements()
      if (els.length === 2) {
        return `{\nmainAxis: ${els[0].getText()},\ncrossAxis: ${els[1].getText()},\n}`
      }
    }
    return expr?.getText() ?? ""
  }
  return init?.getText() ?? ""
}

function handlerNode(attr: JsxAttribute): Node | undefined {
  const init = attr.getInitializer()
  if (init && Node.isJsxExpression(init)) return init.getExpression()
  return init
}

function buildPositioning(
  entries: Array<{ key: string; value: string; isObject: boolean }>,
): string {
  const lines = entries.map((entry, i) => {
    const blank = i > 0 && entry.isObject ? "\n" : ""
    return `${blank}${entry.key}: ${entry.value},`
  })
  return `positioning={{\n${lines.join("\n")}\n}}`
}

function buildOnOpenChange(
  onOpen: Node | undefined,
  onClose: Node | undefined,
): string {
  const openBody = handlerBody(onOpen)
  const elseClause = onClose ? ` else {\n${handlerBody(onClose)}\n}` : ""
  return `onOpenChange={(e) => {\nif (e.open) {\n${openBody}\n}${elseClause}\n}}`
}

function handlerBody(handler: Node | undefined): string {
  if (!handler) return ""
  if (Node.isArrowFunction(handler) || Node.isFunctionExpression(handler)) {
    const body = handler.getBody()
    if (Node.isBlock(body)) {
      return body
        .getStatements()
        .map((s) => s.getText())
        .join("\n")
    }
    return body.getText()
  }
  return `${handler.getText()}()`
}

export default transform
