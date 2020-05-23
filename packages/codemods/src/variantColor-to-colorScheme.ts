import { Transform } from "jscodeshift"
import { describe } from "jscodeshift-helper"
import { types as t } from "@babel/core"

const renames = [
  ["variantColor", "colorScheme"],
  // ["size", "boxSize"], // need to break out into w and h props in the future
  ["rounded", "borderRadius"],
  ["roundedLeft", "borderLeftRadius"],
  ["roundedRight", "borderRightRadius"],
  ["roundedTop", "borderTopRadius"],
  ["roundedTopLeft", "borderTopLeftRadius"],
  ["roundedTopRight", "borderTopRightRadius"],
  ["roundedBottomLeft", "borderBottomLeftRadius"],
  ["roundedBottomRight", "borderBottomRightRadius"],
  ["roundedBottom", "borderBottomRadius"],
  ["size", "boxSize"], // do we need to change all size to boxSize or just for Box component
  ["bgImg", "bgImage"],
  ["bgPos", "bgPosition"],
  ["shadow", "boxShadow"],
  ["listStyleImg", "listStyleImage"],
  ["listStylePos", "listStylePosition"],
]

// t-shirt sized components:
// Tag
// Tab
// Switch
// Spinner
// Slider
// ProgressBar
// Input
// Heading
// Drawer
// CloseButton
// Checkbox
// Button
// Avatar
const transformer2: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  // need to figure out how to only modify chakra components
  // renames.forEach(([from, to]) => renameAttribute(from, to))

  root
    .find(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "size",
      },
    })
    .filter(nodePath => {
      const value = nodePath.node.value
      if (t.isJSXExpressionContainer(value)) {
        const expression = value.expression

        if (t.isLiteral(expression)) {
          console.log((expression as t.StringLiteral).value)
        }
      }
      if (value?.type === "JSXExpressionContainer") {
        if (value.expression.type === "Literal")
          console.log(value.expression.value)
        else if (value.expression.type === "ArrayExpression")
          value.expression.elements.forEach(e => console.log(e.value))
      } else if (value?.type === "Literal") {
        console.log(value.value)
      }
    })
    .forEach(describe)

  root.findJSXElements("Box").find(j.JSXAttribute, {
    type: "JSXIdentifier",
    name: "size",
  })

  return root.toSource()

  function renameAttribute(from: string, to: string) {
    root
      .find(j.JSXAttribute, {
        name: {
          type: "JSXIdentifier",
          name: from,
        },
      })
      .find(j.JSXIdentifier)
      .replaceWith(nodePath => {
        const { node } = nodePath

        return j.identifier(to)
      })
  }
}

const transformer: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  // need to figure out how to only modify chakra components
  renames.forEach(([from, to]) => renameAttribute(from, to))

  root.find(j.JSXAttribute, {
    type: "JSXIdentifier",
    name: "size",
  })

  return root.toSource()

  function renameAttribute(from: string, to: string) {
    root
      .find(j.JSXAttribute, {
        name: {
          type: "JSXIdentifier",
          name: from,
        },
      })
      .find(j.JSXIdentifier)
      .replaceWith(nodePath => {
        const { node } = nodePath

        return j.identifier(to)
      })
  }
}

export default transformer2
