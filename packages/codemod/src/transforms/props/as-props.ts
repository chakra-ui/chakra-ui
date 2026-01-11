import isPropValid from "@emotion/is-prop-valid"
import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  isTrackedJsx,
} from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

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

  const toJsxName = (node: any): any => {
    if (node.type === "Identifier") return j.jsxIdentifier(node.name)
    if (node.type === "MemberExpression") {
      return j.jsxMemberExpression(
        toJsxName(node.object),
        toJsxName(node.property),
      )
    }
    if (node.type === "Literal" || node.type === "StringLiteral") {
      return j.jsxIdentifier(node.value)
    }
    return node
  }

  const getTagNameString = (node: any): string | null => {
    if (node.type === "JSXIdentifier") {
      return node.name
    }
    if (node.type === "Identifier") {
      return node.name
    }
    if (node.type === "Literal" || node.type === "StringLiteral") {
      return node.value
    }
    return null
  }

  const isDOMElementName = (node: any): boolean => {
    if (node.type === "JSXIdentifier") {
      return node.name === node.name.toLowerCase()
    }
    return false
  }

  const isElementTypeVariable = (node: any): boolean => {
    if (node.type !== "Identifier") return false
    return node.name[0] === node.name[0].toLowerCase()
  }

  const alwaysForwardToChild = (name: string): boolean => {
    return name === "ref" || name.startsWith("on")
  }

  const shouldKeepPropOnParent = (
    propName: string,
    parentName: any,
    childName: any,
  ): boolean => {
    const parentStr = getTagNameString(parentName)
    const childStr = getTagNameString(childName)

    // For Link -> LinkOverlay, keep href on Link (parent) so it has priority
    if (
      propName === "href" &&
      parentStr === "Link" &&
      childStr === "LinkOverlay"
    ) {
      return true
    }
    return false
  }

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

    const innerTagName = toJsxName(asValue)
    const tagNameStr = getTagNameString(innerTagName)
    const isDOM = isDOMElementName(innerTagName)
    const isElementType = isElementTypeVariable(asValue)

    const childAttributes: any[] = []
    const parentAttributes: any[] = []
    const parentName = opening.name

    opening.attributes?.forEach((attr, idx) => {
      if (idx === asAttrIndex) return

      if (attr.type === "JSXSpreadAttribute") {
        parentAttributes.push(attr)
        return
      }

      if (attr.type !== "JSXAttribute" || typeof attr.name.name !== "string") {
        parentAttributes.push(attr)
        return
      }

      const name = attr.name.name

      if (shouldKeepPropOnParent(name, parentName, innerTagName)) {
        parentAttributes.push(attr)
        return
      }

      if (alwaysForwardToChild(name)) {
        childAttributes.push(attr)
        return
      }

      if (isElementType) {
        parentAttributes.push(attr)
        return
      }

      if (isDOM && tagNameStr) {
        if (shouldForwardPropToChild(name, tagNameStr, true)) {
          childAttributes.push(attr)
        } else {
          parentAttributes.push(attr)
        }
        return
      }

      parentAttributes.push(attr)
    })

    const isSelfClosing = !path.node.children || path.node.children.length === 0

    let innerElementNode: any
    if (isElementType && asValue.type === "Identifier") {
      const CapitalizedComponent =
        asValue.name.charAt(0).toUpperCase() + asValue.name.slice(1)

      elementTypeRenames.set(asValue.name, CapitalizedComponent)

      innerElementNode = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxIdentifier(CapitalizedComponent),
          childAttributes,
          isSelfClosing,
        ),
        isSelfClosing
          ? null
          : j.jsxClosingElement(j.jsxIdentifier(CapitalizedComponent)),
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

  root.find(j.TSPropertySignature, { key: { name: "as" } }).forEach((path) => {
    path.node.key = j.identifier("asChild")
    if (path.node.typeAnnotation) {
      path.node.typeAnnotation.typeAnnotation = j.tsBooleanKeyword()
    }
  })

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
          const oldName = prop.key.name
          const newName = elementTypeRenames.get(oldName)

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

const isSVGElement = (tagName: string): boolean => {
  return tagName.toLowerCase() === "svg"
}

const shouldForwardPropToChild = (
  propName: string,
  tagName: string,
  isDOM: boolean,
): boolean => {
  // Always forward ref and event handlers
  if (propName === "ref" || propName.startsWith("on")) {
    return true
  }

  // If it's not a DOM element (component), keep everything on parent
  if (!isDOM) {
    return false
  }

  // For SVG elements, be permissive - allow all props through
  if (isSVGElement(tagName)) {
    return true
  }

  // For regular DOM elements, use isPropValid
  return isPropValid(propName)
}
