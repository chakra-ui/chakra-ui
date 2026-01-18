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
  // Underscore props are Chakra pseudo props
  if (propName.startsWith("_")) return true

  // Check if it's in the system properties
  if (chakraProperties.has(propName)) return true

  // Check other Chakra-specific props
  if (ALWAYS_PARENT_PROPS.has(propName)) return true

  return false
}

function shouldGoToChild(
  propName: string,
  tagName: string | null,
  isComponent: boolean,
  isElementType: boolean,
): boolean {
  // Always forward these to child
  if (ALWAYS_CHILD_PROPS.has(propName)) return true
  if (isEventHandler(propName)) return true

  // Never forward these to child
  if (ALWAYS_PARENT_PROPS.has(propName)) return false

  // For element type variables (e.g., `as={motion.div}`), keep all props on parent
  // since we can't know what's valid
  if (isElementType) return false

  // For React components
  if (isComponent) {
    // If it's a valid Chakra prop, keep on parent
    if (isValidChakraProp(propName)) return false
    // Otherwise, forward to child component
    return true
  }

  // For DOM elements
  if (tagName) {
    return isValidDOMProp(propName, tagName)
  }

  // Default: keep on parent
  return false
}

function isValidDOMProp(propName: string, tagName: string): boolean {
  const lowerTag = tagName.toLowerCase()
  const lowerProp = propName.toLowerCase()

  // Data and ARIA attributes are always valid
  if (isDataOrAria(propName)) return true

  // Global HTML attributes
  if (GLOBAL_ATTRIBUTES.has(propName) || GLOBAL_ATTRIBUTES.has(lowerProp)) {
    return true
  }

  // SVG elements
  if (
    [
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
    ].includes(lowerTag)
  ) {
    return isPropValid(propName)
  }

  // Check element-specific attributes
  const validAttributes = htmlElementAttributes[lowerTag]
  if (validAttributes) {
    return (
      validAttributes.includes(propName) || validAttributes.includes(lowerProp)
    )
  }

  // Use emotion's isPropValid as fallback for standard DOM props
  return isPropValid(propName)
}

function getTagNameString(node: any): string | null {
  if (node.type === "JSXIdentifier") return node.name
  if (node.type === "Identifier") return node.name
  if (node.type === "Literal" || node.type === "StringLiteral")
    return node.value
  return null
}

function toJsxName(j: any, node: any): any {
  if (node.type === "Identifier") return j.jsxIdentifier(node.name)
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

function isDOMElementName(node: any): boolean {
  if (node.type === "JSXIdentifier") {
    return node.name === node.name.toLowerCase()
  }
  return false
}

function isReactComponent(node: any): boolean {
  if (node.type === "Identifier") {
    return node.name[0] === node.name[0].toUpperCase()
  }
  if (node.type === "JSXIdentifier") {
    return node.name[0] === node.name[0].toUpperCase()
  }
  if (node.type === "MemberExpression") {
    return true // e.g., motion.div, React.Component
  }
  return false
}

function isElementTypeVariable(node: any): boolean {
  if (node.type !== "Identifier") return false
  return node.name[0] === node.name[0].toLowerCase()
}

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)

  if (chakraLocalNames.size === 0) return file.source

  const elementTypeRenames = new Map<string, string>()

  root.find(j.JSXElement).forEach((path) => {
    const opening = path.node.openingElement
    if (!isTrackedJsx(opening, chakraLocalNames)) return

    const asAttrIndex = opening.attributes?.findIndex(
      (a) => a.type === "JSXAttribute" && a.name.name === "as",
    )

    if (asAttrIndex === undefined || asAttrIndex === -1) return

    const asAttr = opening.attributes![asAttrIndex] as any
    let asValue = asAttr.value

    if (asValue?.type === "JSXExpressionContainer") {
      // Handle `as={as}` pattern - just rename to asChild
      if (
        asValue.expression.type === "Identifier" &&
        asValue.expression.name === "as"
      ) {
        opening.attributes!.splice(asAttrIndex, 1)
        opening.attributes!.push(j.jsxAttribute(j.jsxIdentifier("asChild")))
        return
      }
      asValue = asValue.expression
    }

    const innerTagName = toJsxName(j, asValue)
    const tagNameStr = getTagNameString(innerTagName)
    const isDOM = isDOMElementName(innerTagName)
    const isComponent = isReactComponent(asValue)
    const isElementType = isElementTypeVariable(asValue)

    const childAttributes: any[] = []
    const parentAttributes: any[] = []
    const parentName = opening.name
    const parentStr = getTagNameString(parentName)

    opening.attributes?.forEach((attr, idx) => {
      if (idx === asAttrIndex) return

      // Spread attributes stay on parent (we can't analyze them)
      if (attr.type === "JSXSpreadAttribute") {
        parentAttributes.push(attr)
        return
      }

      if (attr.type !== "JSXAttribute" || typeof attr.name.name !== "string") {
        parentAttributes.push(attr)
        return
      }

      const name = attr.name.name

      // Special case: href handling for Link components
      if (name === "href") {
        if (parentStr === "LinkOverlay" || tagNameStr === "a") {
          childAttributes.push(attr)
          return
        }
        if (parentStr === "Link") {
          parentAttributes.push(attr)
          return
        }
      }

      // Determine where this prop should go
      if (shouldGoToChild(name, tagNameStr, isComponent, isElementType)) {
        childAttributes.push(attr)
      } else {
        parentAttributes.push(attr)
      }
    })

    const isSelfClosing = !path.node.children || path.node.children.length === 0

    let innerElementNode: any

    // Handle element type variables (lowercase identifiers) by capitalizing them
    if (isElementType && asValue.type === "Identifier") {
      const capitalizedName =
        asValue.name.charAt(0).toUpperCase() + asValue.name.slice(1)
      elementTypeRenames.set(asValue.name, capitalizedName)

      innerElementNode = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier(capitalizedName),
          childAttributes,
          isSelfClosing,
        ),
        isSelfClosing
          ? null
          : j.jsxClosingElement(j.jsxIdentifier(capitalizedName)),
        path.node.children || [],
      )
    } else {
      innerElementNode = j.jsxElement(
        j.jsxOpeningElement(innerTagName, childAttributes, isSelfClosing),
        isSelfClosing ? null : j.jsxClosingElement(innerTagName),
        path.node.children || [],
      )
    }

    opening.attributes = [
      ...parentAttributes,
      j.jsxAttribute(j.jsxIdentifier("asChild")),
    ]

    path.node.children = [innerElementNode]
    path.node.openingElement.selfClosing = false
    path.node.closingElement = j.jsxClosingElement(opening.name)
  })

  // Update TypeScript property signatures
  root.find(j.TSPropertySignature, { key: { name: "as" } }).forEach((path) => {
    path.node.key = j.identifier("asChild")
    if (path.node.typeAnnotation) {
      path.node.typeAnnotation.typeAnnotation = j.tsBooleanKeyword()
    }
  })

  // Update object destructuring patterns
  root.find(j.ObjectPattern).forEach((path) => {
    path.node.properties.forEach((prop) => {
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

  // Update variable declarations where element types are destructured
  if (elementTypeRenames.size > 0) {
    root.find(j.VariableDeclarator).forEach((path) => {
      if (path.node.id.type !== "ObjectPattern") return

      path.node.id.properties.forEach((prop) => {
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

  return root.toSource({ quote: "single" })
}
