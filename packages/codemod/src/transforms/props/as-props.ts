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

function isValidDOMProp(propName: string, tagName: string): boolean {
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

  // Special Link handling
  if (propName === "href") {
    return (
      metadata.parentName === "LinkOverlay" ||
      metadata.tagName === "a" ||
      metadata.isNextLink
    )
  }

  if (propName === "passHref" && metadata.isNextLink) {
    return true
  }

  // For element type variables, keep all props on parent
  if (metadata.type === ComponentType.ElementType) {
    return false
  }

  // For React components
  if (metadata.type === ComponentType.Component) {
    return !isValidChakraProp(propName)
  }

  // For DOM elements
  if (metadata.type === ComponentType.DOM && metadata.tagName) {
    return isValidDOMProp(propName, metadata.tagName)
  }

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

    const target = shouldPropGoToChild(attr.name.name, metadata)
      ? result.child
      : result.parent

    target.push(attr)
  })

  return result
}

function collectNextLinkImports(j: any, root: any): Set<string> {
  const nextLinkNames = new Set<string>(["NextLink"])

  root
    .find(j.ImportDeclaration, { source: { value: "next/link" } })
    .forEach((path: any) => {
      path.node.specifiers?.forEach((spec: any) => {
        if (spec.local?.type === "Identifier") {
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

  // Handle `as={as}` pattern - just rename to asChild
  if (asValue.type === "Identifier" && asValue.name === "as") {
    opening.attributes.splice(asAttrIndex, 1)
    opening.attributes.push(j.jsxAttribute(j.jsxIdentifier("asChild")))
    return
  }

  const metadata = getComponentMetadata(asAttr, opening.name, nextLinkNames, j)

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
