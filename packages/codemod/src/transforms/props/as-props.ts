import { defaultSystem } from "@chakra-ui/react"
import isPropValid from "@emotion/is-prop-valid"
import { htmlElementAttributes } from "html-element-attributes"
import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

const GLOBAL_ATTRIBUTES = new Set([...(htmlElementAttributes["*"] || [])])
const chakraProperties = new Set(Object.keys(defaultSystem.properties || {}))

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)

  if (chakraLocalNames.size === 0) return file.source

  const nextLinkNames = collectNextLinkImports(j, root)
  const elementTypeRenames = new Map<string, string>()

  root.find(j.JSXElement).forEach((path) => {
    const opening = path.node.openingElement
    if (!isTrackedJsx(opening, chakraLocalNames)) return

    const asAttrIndex = opening.attributes?.findIndex(
      (a) => a.type === "JSXAttribute" && a.name.name === "as",
    )

    if (asAttrIndex === undefined || asAttrIndex === -1) return

    transformAsToAsChild(
      j,
      path,
      asAttrIndex,
      nextLinkNames,
      elementTypeRenames,
    )
  })

  updateTypeScriptSignatures(j, root)
  updateObjectDestructuring(j, root)
  updateElementTypeDestructuring(j, root, elementTypeRenames)

  return root.toSource({ quote: "single" })
}

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

// Simple presentational DOM elements that can use `as` prop directly (no asChild needed)
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

// Component type classifications
enum ComponentType {
  DOM,
  Component,
  ElementType,
  Unknown,
}

interface PropDistribution {
  child: any[]
  parent: any[]
}

interface ComponentMetadata {
  tagName: string | null
  type: ComponentType
  isNextLink: boolean
  parentName: string | null
}

function isEventHandler(propName: string): boolean {
  return (
    propName.startsWith("on") &&
    propName.length > 2 &&
    propName[2] === propName[2].toUpperCase()
  )
}

function isDataOrAria(propName: string): boolean {
  return propName.startsWith("data-") || propName.startsWith("aria-")
}

function isValidChakraProp(propName: string): boolean {
  return (
    propName.startsWith("_") ||
    chakraProperties.has(propName) ||
    ALWAYS_PARENT_PROPS.has(propName)
  )
}

export function isValidDOMProp(propName: string, tagName: string): boolean {
  if (isDataOrAria(propName)) return true

  const lowerTag = tagName.toLowerCase()
  const lowerProp = propName.toLowerCase()

  if (GLOBAL_ATTRIBUTES.has(propName) || GLOBAL_ATTRIBUTES.has(lowerProp)) {
    return true
  }

  if (SVG_ELEMENTS.has(lowerTag)) {
    return isPropValid(propName)
  }

  const validAttributes = htmlElementAttributes[lowerTag]
  if (validAttributes) {
    return (
      validAttributes.includes(propName) || validAttributes.includes(lowerProp)
    )
  }

  return isPropValid(propName)
}

function classifyComponentType(node: any): ComponentType {
  if (!node) return ComponentType.Unknown

  if (node.type === "JSXIdentifier" || node.type === "Identifier") {
    const firstChar = node.name[0]
    const isLowerCase = firstChar === firstChar.toLowerCase()

    if (node.type === "JSXIdentifier" && isLowerCase) {
      return ComponentType.DOM
    }

    return isLowerCase ? ComponentType.ElementType : ComponentType.Component
  }

  if (node.type === "MemberExpression") {
    return ComponentType.Component
  }

  // Handle string literals like as="div" or as="a"
  if (node.type === "Literal" || node.type === "StringLiteral") {
    const value = node.value
    if (typeof value === "string") {
      const firstChar = value[0]
      const isLowerCase = firstChar === firstChar.toLowerCase()
      return isLowerCase ? ComponentType.DOM : ComponentType.Component
    }
  }

  return ComponentType.Unknown
}

function getTagNameString(node: any): string | null {
  if (!node) return null

  if (node.type === "JSXIdentifier" || node.type === "Identifier") {
    return node.name
  }

  if (node.type === "Literal" || node.type === "StringLiteral") {
    return node.value
  }

  return null
}

function toJsxName(j: any, node: any): any {
  if (node.type === "Identifier") {
    return j.jsxIdentifier(node.name)
  }

  if (node.type === "MemberExpression") {
    return j.jsxMemberExpression(
      toJsxName(j, node.object),
      toJsxName(j, node.property),
    )
  }

  if (node.type === "Literal" || node.type === "StringLiteral") {
    return j.jsxIdentifier(node.value)
  }

  return node
}

function extractAsValue(asAttr: any): any {
  let asValue = asAttr.value

  if (asValue?.type === "JSXExpressionContainer") {
    asValue = asValue.expression
  }

  return asValue
}

function getComponentMetadata(
  asAttr: any,
  parentName: any,
  nextLinkNames: Set<string>,
  j: any,
): ComponentMetadata {
  const asValue = extractAsValue(asAttr)
  const innerTagName = toJsxName(j, asValue)
  const tagName = getTagNameString(innerTagName)
  const type = classifyComponentType(asValue)
  const isNextLink = tagName ? nextLinkNames.has(tagName) : false
  const parentNameStr = getTagNameString(parentName)

  return {
    tagName,
    type,
    isNextLink,
    parentName: parentNameStr,
  }
}

// Element-specific props that should move to child elements

// Link elements: <a>, <Link>, <NextLink>
const LINK_PROPS = new Set([
  "href",
  "target",
  "rel",
  "download",
  "hreflang",
  "referrerPolicy",
  "type",
  // Next.js Link props
  "replace",
  "scroll",
  "shallow",
  "locale",
  "prefetch",
  "legacyBehavior",
  // React Router / TanStack Router Link props
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

// Input elements: <input>
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

// Button elements: <button>
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

// Textarea elements: <textarea>
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

// Select elements: <select>
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

// Time elements: <time>
const TIME_PROPS = new Set(["datetime", "dateTime"])

// Form elements: <form>
const FORM_PROPS = new Set([
  "action",
  "method",
  "enctype",
  "target",
  "noValidate",
  "autoComplete",
  "acceptCharset",
])

// Image elements: <img>
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

// Video/Audio elements: <video>, <audio>
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

// Label elements: <label>
const LABEL_PROPS = new Set(["htmlFor", "form"])

// Option elements: <option>
const OPTION_PROPS = new Set(["value", "selected", "disabled", "label"])

// Iframe elements: <iframe>
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

// Dialog elements: <dialog>
const DIALOG_PROPS = new Set(["open"])

// Details elements: <details>
const DETAILS_PROPS = new Set(["open"])

// Meter elements: <meter>
const METER_PROPS = new Set(["value", "min", "max", "low", "high", "optimum"])

// Progress elements: <progress>
const PROGRESS_PROPS = new Set(["value", "max"])

// Track elements: <track> (for video/audio)
const TRACK_PROPS = new Set(["src", "kind", "srclang", "label", "default"])

// Source elements: <source> (for video/audio/picture)
const SOURCE_PROPS = new Set(["src", "srcset", "type", "media", "sizes"])

// Canvas elements: <canvas>
const CANVAS_PROPS = new Set(["width", "height"])

// Map tag name to its specific props
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

function shouldPropGoToChild(
  propName: string,
  metadata: ComponentMetadata,
): boolean {
  // Always forward these to child
  if (ALWAYS_CHILD_PROPS.has(propName) || isEventHandler(propName)) {
    return true
  }

  // Never forward these to child
  if (ALWAYS_PARENT_PROPS.has(propName)) {
    return false
  }

  // Chakra style props always stay on parent
  if (isValidChakraProp(propName)) {
    return false
  }

  // Check if this is a link element (a, Link, or anything ending with "Link")
  const isLinkElement =
    metadata.tagName === "a" ||
    metadata.tagName === "Link" ||
    (metadata.tagName && metadata.tagName.endsWith("Link"))

  if (isLinkElement && LINK_PROPS.has(propName)) {
    // Filter out passHref for Next.js Links
    if (metadata.isNextLink && propName === "passHref") {
      return false
    }
    return true
  }

  // Check if this prop should move based on element type
  if (metadata.tagName) {
    const elementProps = ELEMENT_PROPS_MAP[metadata.tagName]
    if (elementProps && elementProps.has(propName)) {
      return true
    }
  }

  // For element type variables, keep all props on parent
  if (metadata.type === ComponentType.ElementType) {
    return false
  }

  // For everything else, keep props on parent by default
  // This is conservative - only move props we explicitly whitelisted above
  return false
}

function distributeProps(
  attributes: any[],
  asAttrIndex: number,
  metadata: ComponentMetadata,
): PropDistribution {
  const result: PropDistribution = { child: [], parent: [] }

  attributes.forEach((attr, idx) => {
    if (idx === asAttrIndex) return

    // Spread attributes stay on parent
    if (attr.type === "JSXSpreadAttribute") {
      result.parent.push(attr)
      return
    }

    if (attr.type !== "JSXAttribute" || typeof attr.name.name !== "string") {
      result.parent.push(attr)
      return
    }

    // Special handling: remove passHref for Next.js Links
    if (metadata.isNextLink && attr.name.name === "passHref") {
      return // Don't add to either parent or child
    }

    const target = shouldPropGoToChild(attr.name.name, metadata)
      ? result.child
      : result.parent

    target.push(attr)
  })

  return result
}

function collectNextLinkImports(j: any, root: any): Set<string> {
  const nextLinkNames = new Set<string>()

  root
    .find(j.ImportDeclaration, { source: { value: "next/link" } })
    .forEach((path: any) => {
      path.node.specifiers?.forEach((spec: any) => {
        if (
          spec.type === "ImportDefaultSpecifier" &&
          spec.local?.type === "Identifier"
        ) {
          nextLinkNames.add(spec.local.name)
        }
        if (
          spec.type === "ImportSpecifier" &&
          spec.local?.type === "Identifier"
        ) {
          nextLinkNames.add(spec.local.name)
        }
      })
    })

  return nextLinkNames
}

function capitalizeElementType(
  asValue: any,
  j: any,
  elementTypeRenames: Map<string, string>,
): { name: any; capitalized: boolean } {
  if (asValue.type === "Identifier") {
    const capitalizedName =
      asValue.name.charAt(0).toUpperCase() + asValue.name.slice(1)

    elementTypeRenames.set(asValue.name, capitalizedName)

    return {
      name: j.jsxIdentifier(capitalizedName),
      capitalized: true,
    }
  }

  return { name: null, capitalized: false }
}

function createInnerElement(
  j: any,
  asAttr: any,
  childAttributes: any[],
  children: any[],
  metadata: ComponentMetadata,
  elementTypeRenames: Map<string, string>,
): any {
  const asValue = extractAsValue(asAttr)
  const isSelfClosing = children.length === 0

  // Handle element type variables
  if (metadata.type === ComponentType.ElementType) {
    const { name, capitalized } = capitalizeElementType(
      asValue,
      j,
      elementTypeRenames,
    )

    if (capitalized && name) {
      return j.jsxElement(
        j.jsxOpeningElement(name, childAttributes, isSelfClosing),
        isSelfClosing ? null : j.jsxClosingElement(name),
        children,
      )
    }
  }

  const innerTagName = toJsxName(j, asValue)

  return j.jsxElement(
    j.jsxOpeningElement(innerTagName, childAttributes, isSelfClosing),
    isSelfClosing ? null : j.jsxClosingElement(innerTagName),
    children,
  )
}

function transformAsToAsChild(
  j: any,
  path: any,
  asAttrIndex: number,
  nextLinkNames: Set<string>,
  elementTypeRenames: Map<string, string>,
): void {
  const opening = path.node.openingElement
  const asAttr = opening.attributes[asAttrIndex]
  const asValue = extractAsValue(asAttr)

  // Skip transformation for dynamic expressions like as={as} or as={component}
  // We can't know at build time what these will be, so leave them as-is
  if (asValue.type === "Identifier") {
    // Only transform if it's a known component name (starts with uppercase)
    // or a known element name (lowercase string literal would have been caught earlier)
    const firstChar = asValue.name[0]
    const isComponent = firstChar === firstChar.toUpperCase()

    // If it's a lowercase identifier (like 'as', 'elem', 'component'), skip transformation
    if (!isComponent) {
      return
    }
  }

  const metadata = getComponentMetadata(asAttr, opening.name, nextLinkNames, j)

  // Skip transformation for simple presentational DOM elements - they can use `as` prop directly
  // Interactive/semantic elements like <a>, <button>, <time> still need asChild for proper prop handling
  if (
    metadata.type === ComponentType.DOM &&
    metadata.tagName &&
    SIMPLE_DOM_ELEMENTS.has(metadata.tagName)
  ) {
    return
  }

  const { child, parent } = distributeProps(
    opening.attributes,
    asAttrIndex,
    metadata,
  )

  const innerElement = createInnerElement(
    j,
    asAttr,
    child,
    path.node.children || [],
    metadata,
    elementTypeRenames,
  )

  // Update parent element
  opening.attributes = [...parent, j.jsxAttribute(j.jsxIdentifier("asChild"))]

  path.node.children = [innerElement]
  path.node.openingElement.selfClosing = false
  path.node.closingElement = j.jsxClosingElement(opening.name)
}

function updateTypeScriptSignatures(j: any, root: any): void {
  root
    .find(j.TSPropertySignature, { key: { name: "as" } })
    .forEach((path: any) => {
      path.node.key = j.identifier("asChild")
      if (path.node.typeAnnotation) {
        path.node.typeAnnotation.typeAnnotation = j.tsBooleanKeyword()
      }
    })
}

function updateObjectDestructuring(j: any, root: any): void {
  root.find(j.ObjectPattern).forEach((path: any) => {
    path.node.properties.forEach((prop: any) => {
      if (
        prop.type === "Property" &&
        prop.key.type === "Identifier" &&
        prop.key.name === "as"
      ) {
        prop.key.name = "asChild"

        if (prop.value.type === "Identifier" && prop.value.name === "as") {
          prop.value.name = "asChild"
        } else if (
          prop.value.type === "AssignmentPattern" &&
          prop.value.left.type === "Identifier"
        ) {
          prop.value.left.name = "asChild"
        }
      }
    })
  })
}

function updateElementTypeDestructuring(
  j: any,
  root: any,
  elementTypeRenames: Map<string, string>,
): void {
  if (elementTypeRenames.size === 0) return

  root.find(j.VariableDeclarator).forEach((path: any) => {
    if (path.node.id.type !== "ObjectPattern") return

    path.node.id.properties.forEach((prop: any) => {
      if (
        prop.type === "Property" &&
        prop.key.type === "Identifier" &&
        prop.value.type === "Identifier" &&
        prop.shorthand
      ) {
        const newName = elementTypeRenames.get(prop.key.name)
        if (newName) {
          prop.shorthand = false
          prop.value = j.identifier(newName)
        }
      }
    })
  })
}
