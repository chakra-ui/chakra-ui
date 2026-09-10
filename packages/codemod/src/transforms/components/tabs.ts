import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const VARIANT_MAP: Record<string, string> = {
  line: "line",
  enclosed: "enclosed",
  "enclosed-colored": "enclosed",
  "soft-rounded": "subtle",
  "solid-rounded": "outline",
}

const ALIGN_MAP: Record<string, string> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const isTabs = (tagNode: Node) =>
    getJsxBaseName(tagNode) === "Tabs" && chakraLocalNames.has("Tabs")

  // 1. Rename <Tabs> -> <Tabs.Root> and transform its props.
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    if (!isTabs(opening.getTagNameNode())) continue
    const attrsText = buildTabsAttrs(opening)
    el.getClosingElement()?.getTagNameNode().replaceWithText("Tabs.Root")
    opening.replaceWithText(`<Tabs.Root${attrsText}>`)
  }

  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (!isTabs(el.getTagNameNode())) continue
    const attrsText = buildTabsAttrs(el)
    el.replaceWithText(`<Tabs.Root${attrsText} />`)
  }

  // 2. Rename TabList -> Tabs.List.
  renameTag(sourceFile, "TabList", "Tabs.List", chakraLocalNames)
}

function renameTag(
  sourceFile: import("ts-morph").SourceFile,
  from: string,
  to: string,
  chakraLocalNames: Set<string>,
) {
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    const base = getJsxBaseName(opening.getTagNameNode())
    if (base !== from || !chakraLocalNames.has(from)) continue
    el.getClosingElement()?.getTagNameNode().replaceWithText(to)
    opening.getTagNameNode().replaceWithText(to)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const base = getJsxBaseName(el.getTagNameNode())
    if (base !== from || !chakraLocalNames.has(from)) continue
    el.getTagNameNode().replaceWithText(to)
  }
}

function buildTabsAttrs(
  opening: JsxOpeningElement | JsxSelfClosingElement,
): string {
  const attributes = opening.getAttributes()

  const hasUnmountOnExit = attributes.some((attr) => {
    if (!Node.isJsxAttribute(attr)) return false
    if (attr.getNameNode().getText() !== "lazyBehavior") return false
    return literalValue(attr) === "unmount"
  })

  const parts: string[] = []
  for (const attr of attributes) {
    if (!Node.isJsxAttribute(attr)) {
      parts.push(attr.getText())
      continue
    }
    parts.push(...transformAttr(attr, hasUnmountOnExit))
  }

  return parts.length ? ` ${parts.join(" ")}` : ""
}

function transformAttr(
  attr: JsxAttribute,
  hasUnmountOnExit: boolean,
): string[] {
  const name = attr.getNameNode().getText()
  const eq = valueSuffix(attr)

  switch (name) {
    case "defaultIndex":
      return [`defaultValue${eq}`]
    case "index":
      return [`value${eq}`]
    case "onChange": {
      const init = attr.getInitializer()
      if (init && Node.isJsxExpression(init)) {
        const expr = init.getExpression()?.getText() ?? ""
        return [`onValueChange={({ value: value }) => ${expr}(value)}`]
      }
      return [`onValueChange${eq}`]
    }
    case "isManual":
      return [`activationMode="manual"`]
    case "isLazy":
      return [`lazyMount${eq}`]
    case "lazyBehavior":
      return hasUnmountOnExit ? ["unmountOnExit"] : []
    case "isFitted":
      return [`fitted${eq}`]
    case "align": {
      const val = literalValue(attr)
      if (val && ALIGN_MAP[val]) return [`justifyContent="${ALIGN_MAP[val]}"`]
      return [attr.getText()]
    }
    case "variant": {
      const val = literalValue(attr)
      if (val === "unstyled") return ["unstyled"]
      if (val && VARIANT_MAP[val]) return [`variant="${VARIANT_MAP[val]}"`]
      return [attr.getText()]
    }
    default:
      return [attr.getText()]
  }
}

/** Suffix `=<value>` for an attribute, or "" when it's a boolean attribute. */
function valueSuffix(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  return init ? `=${init.getText()}` : ""
}

/** String literal value of an attribute (handles both `x="y"` and `x={'y'}`). */
function literalValue(attr: JsxAttribute): string | undefined {
  const init = attr.getInitializer()
  if (!init) return undefined
  if (Node.isStringLiteral(init)) return init.getLiteralValue()
  if (Node.isJsxExpression(init)) {
    const expr = init.getExpression()
    if (expr && Node.isStringLiteral(expr)) return expr.getLiteralValue()
  }
  return undefined
}

export default transform
