import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
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

  let needsStackSeparatorImport = false

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: (name: string) => /^(Stack|VStack|HStack)$/.test(name) },
      },
    })
    .forEach((path) => {
      const baseName = getJsxBaseName(path.node.openingElement.name)
      if (!chakraLocalNames.has(baseName)) return

      const attributes = path.node.openingElement.attributes
      if (!attributes) return

      let dividerElement: any = null
      let dividerAttrIndex = -1

      attributes.forEach((attr, index) => {
        if (attr.type !== "JSXAttribute") return

        if (attr.name.name === "spacing") {
          attr.name.name = "gap"
        }

        if (attr.name.name === "divider") {
          dividerAttrIndex = index

          if (attr.value?.type === "JSXExpressionContainer") {
            dividerElement = attr.value.expression
          }
        }
      })

      // Transform divider prop to separator
      if (dividerAttrIndex !== -1 && dividerElement) {
        // Check if divider is a StackDivider element
        if (
          dividerElement.type === "JSXElement" &&
          dividerElement.openingElement.name.name === "StackDivider"
        ) {
          // Get the props from StackDivider
          const stackDividerProps =
            dividerElement.openingElement.attributes || []

          // Create StackSeparator element with the props
          const separatorElement = j.jsxElement(
            j.jsxOpeningElement(
              j.jsxIdentifier("StackSeparator"),
              stackDividerProps,
              true, // self-closing
            ),
            null,
            [],
          )

          // Replace divider prop with separator prop
          attributes[dividerAttrIndex] = j.jsxAttribute(
            j.jsxIdentifier("separator"),
            j.jsxExpressionContainer(separatorElement),
          )

          needsStackSeparatorImport = true
        } else {
          // If it's not a StackDivider, just rename the prop
          attributes[dividerAttrIndex] = j.jsxAttribute(
            j.jsxIdentifier("separator"),
            (attributes[dividerAttrIndex] as any).value,
          )
        }
      }
    })

  // Transform standalone StackDivider usage (not inside divider prop)
  root
    .find(j.JSXElement, { openingElement: { name: { name: "StackDivider" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Stack")) return

      // Check if this StackDivider is inside a divider prop (already handled above)
      let parent = path.parent
      let isInsideDividerProp = false

      while (parent) {
        if (
          parent.node.type === "JSXAttribute" &&
          parent.node.name?.name === "divider"
        ) {
          isInsideDividerProp = true
          break
        }
        parent = parent.parent
      }

      if (!isInsideDividerProp) {
        path.node.openingElement.name = j.jsxIdentifier("StackSeparator")
        if (path.node.closingElement) {
          path.node.closingElement.name = j.jsxIdentifier("StackSeparator")
        }
        needsStackSeparatorImport = true
      }
    })

  root
    .find(j.JSXMemberExpression, {
      object: { type: "JSXIdentifier" },
      property: { name: "StackDivider" },
    })
    .forEach((path) => {
      // Replace the member expression with a simple identifier
      const parentPath = path.parent
      if (parentPath.node.type === "JSXOpeningElement") {
        parentPath.node.name = j.jsxIdentifier("StackSeparator")
      } else if (parentPath.node.type === "JSXClosingElement") {
        parentPath.node.name = j.jsxIdentifier("StackSeparator")
      }
      needsStackSeparatorImport = true
    })

  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() > 0) {
    chakraImports.forEach((path) => {
      const specifiers = path.node.specifiers || []

      path.node.specifiers = specifiers.filter(
        (spec) =>
          spec.type !== "ImportSpecifier" ||
          spec.imported.name !== "StackDivider",
      )

      if (
        needsStackSeparatorImport &&
        !path.node.specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.name === "StackSeparator",
        )
      ) {
        path.node.specifiers.push(
          j.importSpecifier(j.identifier("StackSeparator")),
        )
        needsStackSeparatorImport = false
      }
    })
  } else if (needsStackSeparatorImport) {
    root
      .get()
      .node.program.body.unshift(
        j.importDeclaration(
          [j.importSpecifier(j.identifier("StackSeparator"))],
          j.stringLiteral("@chakra-ui/react"),
        ),
      )
    needsStackSeparatorImport = false
  }

  return root.toSource({ quote: "single" })
}
