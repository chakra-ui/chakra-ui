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

const TRANSITIONS = ["Fade", "ScaleFade", "Slide", "SlideFade"] as const
type TransitionName = (typeof TRANSITIONS)[number]

const SLIDE_CONFIG: Record<
  string,
  { positioning: Array<[string, string]>; open: string; closed: string }
> = {
  top: {
    positioning: [
      ["position", "fixed"],
      ["top", "0"],
      ["insetX", "0"],
    ],
    open: "slide-from-top-full",
    closed: "slide-to-top-full",
  },
  bottom: {
    positioning: [
      ["position", "fixed"],
      ["bottom", "0"],
      ["insetX", "0"],
    ],
    open: "slide-from-bottom-full",
    closed: "slide-to-bottom-full",
  },
  left: {
    positioning: [
      ["position", "fixed"],
      ["left", "0"],
      ["insetY", "0"],
    ],
    open: "slide-from-left-full",
    closed: "slide-to-left-full",
  },
  right: {
    positioning: [
      ["position", "fixed"],
      ["right", "0"],
      ["insetY", "0"],
    ],
    open: "slide-from-right-full",
    closed: "slide-to-right-full",
  },
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const transformed = new Set<TransitionName>()

  // Collect targets first, then rewrite deepest/last-first so captured nodes
  // earlier in the file stay valid across text replacements.
  const targets: Array<{
    node: JsxElement | JsxSelfClosingElement
    name: TransitionName
  }> = []

  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const name = matchTransition(el.getOpeningElement(), chakraLocalNames)
    if (name) targets.push({ node: el, name })
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const name = matchTransition(el, chakraLocalNames)
    if (name) targets.push({ node: el, name })
  }

  targets.sort((a, b) => b.node.getStart() - a.node.getStart())

  for (const { node, name } of targets) {
    const opening = Node.isJsxElement(node) ? node.getOpeningElement() : node
    const childrenText = Node.isJsxElement(node)
      ? node
          .getJsxChildren()
          .map((c) => c.getText())
          .join("")
      : ""
    const attrsText = buildAttrs(opening, name)
    node.replaceWithText(
      `<Presence\n${attrsText.join("\n")}\n>${childrenText}</Presence>`,
    )
    transformed.add(name)
  }

  if (transformed.size > 0) updateImports(sourceFile, transformed)
}

function matchTransition(
  opening: JsxOpeningElement | JsxSelfClosingElement,
  chakraLocalNames: Set<string>,
): TransitionName | undefined {
  const base = getJsxBaseName(opening.getTagNameNode())
  const name = TRANSITIONS.find((t) => t === base)
  if (name && chakraLocalNames.has(name)) return name
  return undefined
}

const ANIMATION_OBJECT = (open: string, closed: string) =>
  `{\n_open: '${open}',\n_closed: '${closed}',\n}`

function buildAttrs(
  opening: JsxOpeningElement | JsxSelfClosingElement,
  name: TransitionName,
): string[] {
  const attrs = opening.getAttributes()
  const kept: string[] = []
  let direction = "bottom"

  for (const attr of attrs) {
    if (!Node.isJsxAttribute(attr)) {
      kept.push(attr.getText())
      continue
    }
    const attrName = attr.getNameNode().getText()

    if (attrName === "in") {
      const init = attr.getInitializer()
      kept.push(`present${init ? `=${init.getText()}` : ""}`)
      continue
    }

    if (name === "ScaleFade" && attrName === "initialScale") continue
    if (
      name === "SlideFade" &&
      (attrName === "offsetX" || attrName === "offsetY")
    )
      continue
    if (name === "Slide" && attrName === "direction") {
      const val = stringValue(attr)
      if (val) direction = val
      continue
    }

    kept.push(attr.getText())
  }

  const trailing: string[] = []

  if (name === "Slide") {
    const config = SLIDE_CONFIG[direction] ?? SLIDE_CONFIG.bottom
    for (const [prop, value] of config.positioning) {
      trailing.push(`${prop}="${value}"`)
    }
    trailing.push(
      `animationName={${ANIMATION_OBJECT(config.open, config.closed)}}`,
    )
  } else if (name === "ScaleFade") {
    trailing.push(
      `animationStyle={${ANIMATION_OBJECT("scale-fade-in", "scale-fade-out")}}`,
    )
  } else if (name === "SlideFade") {
    trailing.push(
      `animationName={${ANIMATION_OBJECT("slide-from-bottom, fade-in", "slide-to-bottom, fade-out")}}`,
    )
  } else {
    trailing.push(`animationName={${ANIMATION_OBJECT("fade-in", "fade-out")}}`)
  }

  trailing.push(`animationDuration="moderate"`)

  return [...kept, ...trailing]
}

function stringValue(attr: JsxAttribute): string | undefined {
  const init = attr.getInitializer()
  if (!init) return undefined
  if (Node.isStringLiteral(init)) return init.getLiteralValue()
  if (Node.isJsxExpression(init)) {
    const expr = init.getExpression()
    if (expr && Node.isStringLiteral(expr)) return expr.getLiteralValue()
  }
  return undefined
}

function updateImports(
  sourceFile: SourceFile,
  transformed: Set<TransitionName>,
) {
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  for (const named of importDecl.getNamedImports()) {
    if (transformed.has(named.getName() as TransitionName)) named.remove()
  }

  const hasPresence = importDecl
    .getNamedImports()
    .some((n) => n.getName() === "Presence")
  if (!hasPresence) importDecl.addNamedImport("Presence")
}

export default transform
