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

  // ✅ DOM-element checker
  const isDOMElementName = (node: any): boolean => {
    if (node.type === "JSXIdentifier") {
      return node.name === node.name.toLowerCase()
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
    const isDOM = isDOMElementName(innerTagName)

    const childAttributes: any[] = []
    const parentAttributes: any[] = []

    opening.attributes?.forEach((attr, idx) => {
      if (idx === asAttrIndex) return

      if (attr.type !== "JSXAttribute" || typeof attr.name.name !== "string") {
        childAttributes.push(attr)
        return
      }

      const name = attr.name.name

      // always forward refs & event handlers
      if (name === "ref" || name.startsWith("on")) {
        childAttributes.push(attr)
        return
      }

      // only forward DOM-valid props if the child is a DOM element
      if (isDOM && isPropValid(name)) {
        childAttributes.push(attr)
        return
      }

      parentAttributes.push(attr)
    })

    const isSelfClosing = !path.node.children || path.node.children.length === 0

    // ✅ Handle ElementType variables safely for Icon / dynamic components
    let innerElementNode: any
    if (asValue.type === "Identifier") {
      // Wrap the variable in JSXExpressionContainer
      innerElementNode = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier("span"), [], false),
        j.jsxClosingElement(j.jsxIdentifier("span")),
        [j.jsxExpressionContainer(asValue)],
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

  return root.toSource({ quote: "single" })
}
