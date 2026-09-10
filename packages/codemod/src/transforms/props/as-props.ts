import { defaultSystem } from "@chakra-ui/react"
import isPropValid from "@emotion/is-prop-valid"
import { htmlElementAttributes } from "html-element-attributes"
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
  isTrackedJsx,
} from "../../utils/chakra-tracker"

const GLOBAL_ATTRIBUTES = new Set([...(htmlElementAttributes["*"] || [])])
const chakraProperties = new Set(Object.keys(defaultSystem.properties || {}))

const ALWAYS_CHILD_PROPS = new Set([
  "ref",
  "dangerouslySetInnerHTML",
  "key",
  "children",
])

const ALWAYS_PARENT_PROPS = new Set([
  "asChild",
  "css",
  "layerStyle",
  "textStyle",
  "apply",
])

const SVG_ELEMENTS = new Set([
  "svg",
  "path",
  "circle",
  "rect",
  "g",
  "line",
  "text",
  "ellipse",
  "polygon",
  "polyline",
  "defs",
  "use",
])

const SIMPLE_DOM_ELEMENTS = new Set([
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "section",
  "article",
  "main",
  "aside",
  "header",
  "footer",
  "nav",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "pre",
  "code",
  "blockquote",
  "figure",
  "figcaption",
])

enum ComponentType {
  DOM,
  Component,
  ElementType,
  Unknown,
}

interface ComponentMetadata {
  tagName: string | null
  type: ComponentType
  isNextLink: boolean
}

const LINK_PROPS = new Set([
  "href",
  "target",
  "rel",
  "download",
  "hreflang",
  "referrerPolicy",
  "type",
  "replace",
  "scroll",
  "shallow",
  "locale",
  "prefetch",
  "legacyBehavior",
  "to",
  "state",
  "preventScrollReset",
  "relative",
  "reloadDocument",
  "unstable_viewTransition",
  "params",
  "search",
  "hash",
  "resetScroll",
  "preload",
  "preloadDelay",
])

const INPUT_PROPS = new Set([
  "type",
  "value",
  "defaultValue",
  "placeholder",
  "disabled",
  "required",
  "readOnly",
  "autoFocus",
  "autoComplete",
  "min",
  "max",
  "step",
  "pattern",
  "minLength",
  "maxLength",
  "size",
  "accept",
  "multiple",
  "checked",
  "defaultChecked",
  "name",
  "form",
  "list",
  "inputMode",
])

const BUTTON_PROPS = new Set([
  "type",
  "disabled",
  "form",
  "formAction",
  "formEnctype",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "name",
  "value",
])

const TEXTAREA_PROPS = new Set([
  "value",
  "defaultValue",
  "placeholder",
  "disabled",
  "required",
  "readOnly",
  "autoFocus",
  "rows",
  "cols",
  "wrap",
  "minLength",
  "maxLength",
  "name",
  "form",
])

const SELECT_PROPS = new Set([
  "value",
  "defaultValue",
  "disabled",
  "required",
  "autoFocus",
  "multiple",
  "size",
  "name",
  "form",
])

const TIME_PROPS = new Set(["datetime", "dateTime"])

const FORM_PROPS = new Set([
  "action",
  "method",
  "enctype",
  "target",
  "noValidate",
  "autoComplete",
  "acceptCharset",
])

const IMG_PROPS = new Set([
  "src",
  "alt",
  "srcSet",
  "sizes",
  "loading",
  "decoding",
  "crossOrigin",
  "referrerPolicy",
  "width",
  "height",
  "useMap",
  "isMap",
])

const MEDIA_PROPS = new Set([
  "src",
  "autoplay",
  "controls",
  "loop",
  "muted",
  "preload",
  "poster",
  "playsInline",
  "crossOrigin",
  "width",
  "height",
])

const LABEL_PROPS = new Set(["htmlFor", "form"])

const OPTION_PROPS = new Set(["value", "selected", "disabled", "label"])

const IFRAME_PROPS = new Set([
  "src",
  "srcdoc",
  "name",
  "sandbox",
  "allow",
  "allowFullScreen",
  "width",
  "height",
  "loading",
  "referrerPolicy",
])

const DIALOG_PROPS = new Set(["open"])
const DETAILS_PROPS = new Set(["open"])
const METER_PROPS = new Set(["value", "min", "max", "low", "high", "optimum"])
const PROGRESS_PROPS = new Set(["value", "max"])
const TRACK_PROPS = new Set(["src", "kind", "srclang", "label", "default"])
const SOURCE_PROPS = new Set(["src", "srcset", "type", "media", "sizes"])
const CANVAS_PROPS = new Set(["width", "height"])

const ELEMENT_PROPS_MAP: Record<string, Set<string>> = {
  a: LINK_PROPS,
  Link: LINK_PROPS,
  NextLink: LINK_PROPS,
  input: INPUT_PROPS,
  button: BUTTON_PROPS,
  textarea: TEXTAREA_PROPS,
  select: SELECT_PROPS,
  option: OPTION_PROPS,
  time: TIME_PROPS,
  form: FORM_PROPS,
  img: IMG_PROPS,
  video: MEDIA_PROPS,
  audio: MEDIA_PROPS,
  label: LABEL_PROPS,
  iframe: IFRAME_PROPS,
  dialog: DIALOG_PROPS,
  details: DETAILS_PROPS,
  meter: METER_PROPS,
  progress: PROGRESS_PROPS,
  track: TRACK_PROPS,
  source: SOURCE_PROPS,
  canvas: CANVAS_PROPS,
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const nextLinkNames = collectNextLinkImports(sourceFile)

  const targets: Array<JsxElement | JsxSelfClosingElement> = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const opening = el.getOpeningElement()
    if (isTrackedJsx(opening, chakraLocalNames) && hasAsAttr(opening)) {
      targets.push(el)
    }
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (isTrackedJsx(el, chakraLocalNames) && hasAsAttr(el)) {
      targets.push(el)
    }
  }

  // Rewrite deepest/last-first so earlier captured nodes stay valid.
  targets.sort((a, b) => b.getStart() - a.getStart())

  for (const node of targets) transformAsToAsChild(node, nextLinkNames)
}

function hasAsAttr(
  opening: JsxOpeningElement | JsxSelfClosingElement,
): boolean {
  return opening
    .getAttributes()
    .some((a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "as")
}

function transformAsToAsChild(
  node: JsxElement | JsxSelfClosingElement,
  nextLinkNames: Set<string>,
) {
  const isSelfClosing = Node.isJsxSelfClosingElement(node)
  const opening = isSelfClosing ? node : node.getOpeningElement()
  const attrs = opening.getAttributes()

  const asAttr = attrs.find(
    (a): a is JsxAttribute =>
      Node.isJsxAttribute(a) && a.getNameNode().getText() === "as",
  )
  if (!asAttr) return

  const asValue = extractAsValue(asAttr)
  if (!asValue) return

  // Skip dynamic lowercase identifiers, e.g. as={as}.
  if (Node.isIdentifier(asValue)) {
    const first = asValue.getText()[0]
    if (first !== first.toUpperCase()) return
  }

  const metadata = getMetadata(asValue, nextLinkNames)

  // Simple presentational DOM elements can keep the `as` prop directly.
  if (
    metadata.type === ComponentType.DOM &&
    metadata.tagName &&
    SIMPLE_DOM_ELEMENTS.has(metadata.tagName)
  ) {
    return
  }

  const child: string[] = []
  const parent: string[] = []

  for (const attr of attrs) {
    if (attr === asAttr) continue

    if (!Node.isJsxAttribute(attr)) {
      parent.push(attr.getText())
      continue
    }

    const name = attr.getNameNode().getText()
    if (metadata.isNextLink && name === "passHref") continue

    if (shouldPropGoToChild(name, metadata)) child.push(attr.getText())
    else parent.push(attr.getText())
  }

  const innerTag = tagNameText(asValue)
  const childrenText = Node.isJsxElement(node)
    ? node
        .getJsxChildren()
        .map((c) => c.getText())
        .join("")
    : ""

  const childAttrsText = child.length ? ` ${child.join(" ")}` : ""
  const inner =
    childrenText.trim().length === 0
      ? `<${innerTag}${childAttrsText} />`
      : `<${innerTag}${childAttrsText}>${childrenText}</${innerTag}>`

  const parentAttrsText = parent.length ? ` ${parent.join(" ")}` : ""
  const parentTag = opening.getTagNameNode().getText()

  node.replaceWithText(
    `<${parentTag}${parentAttrsText} asChild>${inner}</${parentTag}>`,
  )
}

function extractAsValue(asAttr: JsxAttribute): Node | undefined {
  const init = asAttr.getInitializer()
  if (!init) return undefined
  if (Node.isJsxExpression(init)) return init.getExpression()
  return init
}

function getMetadata(
  asValue: Node,
  nextLinkNames: Set<string>,
): ComponentMetadata {
  const tagName = getTagNameString(asValue)
  const type = classifyComponentType(asValue)
  const isNextLink = tagName ? nextLinkNames.has(tagName) : false
  return { tagName, type, isNextLink }
}

function getTagNameString(node: Node): string | null {
  if (Node.isIdentifier(node)) return node.getText()
  if (Node.isStringLiteral(node)) return node.getLiteralValue()
  return null
}

function tagNameText(node: Node): string {
  if (Node.isStringLiteral(node)) return node.getLiteralValue()
  return node.getText()
}

function classifyComponentType(node: Node): ComponentType {
  if (Node.isIdentifier(node)) {
    const first = node.getText()[0]
    return first === first.toLowerCase()
      ? ComponentType.ElementType
      : ComponentType.Component
  }
  if (Node.isPropertyAccessExpression(node)) return ComponentType.Component
  if (Node.isStringLiteral(node)) {
    const value = node.getLiteralValue()
    const first = value[0]
    return first === first.toLowerCase()
      ? ComponentType.DOM
      : ComponentType.Component
  }
  return ComponentType.Unknown
}

function isEventHandler(name: string): boolean {
  return (
    name.startsWith("on") &&
    name.length > 2 &&
    name[2] === name[2].toUpperCase()
  )
}

function isDataOrAria(name: string): boolean {
  return name.startsWith("data-") || name.startsWith("aria-")
}

function isValidChakraProp(name: string): boolean {
  return (
    name.startsWith("_") ||
    chakraProperties.has(name) ||
    ALWAYS_PARENT_PROPS.has(name)
  )
}

function shouldPropGoToChild(
  name: string,
  metadata: ComponentMetadata,
): boolean {
  if (ALWAYS_CHILD_PROPS.has(name) || isEventHandler(name)) return true
  if (ALWAYS_PARENT_PROPS.has(name)) return false
  if (isValidChakraProp(name)) return false

  const isLinkElement =
    metadata.tagName === "a" ||
    metadata.tagName === "Link" ||
    (!!metadata.tagName && metadata.tagName.endsWith("Link"))

  if (isLinkElement && LINK_PROPS.has(name)) {
    if (metadata.isNextLink && name === "passHref") return false
    return true
  }

  if (metadata.tagName) {
    const elementProps = ELEMENT_PROPS_MAP[metadata.tagName]
    if (elementProps && elementProps.has(name)) return true
  }

  if (metadata.type === ComponentType.ElementType) return false

  return false
}

function collectNextLinkImports(sourceFile: SourceFile): Set<string> {
  const names = new Set<string>()
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "next/link",
  )
  if (!importDecl) return names
  const def = importDecl.getDefaultImport()
  if (def) names.add(def.getText())
  for (const named of importDecl.getNamedImports()) {
    names.add(named.getAliasNode()?.getText() ?? named.getName())
  }
  return names
}

// Referenced for parity with the DOM-prop validity checks used elsewhere.
export function isValidDOMProp(name: string, tagName: string): boolean {
  if (isDataOrAria(name)) return true
  const lowerTag = tagName.toLowerCase()
  const lowerProp = name.toLowerCase()
  if (GLOBAL_ATTRIBUTES.has(name) || GLOBAL_ATTRIBUTES.has(lowerProp))
    return true
  if (SVG_ELEMENTS.has(lowerTag)) return isPropValid(name)
  const validAttributes = htmlElementAttributes[lowerTag]
  if (validAttributes) {
    return validAttributes.includes(name) || validAttributes.includes(lowerProp)
  }
  return isPropValid(name)
}

export default transform
