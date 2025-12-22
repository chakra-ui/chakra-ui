import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Stack component:
 * - spacing -> gap
 * - divider -> separator (with manual Stack.Separator replacement needed)
 * - StackDivider -> Stack.Separator
 */
export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Transform spacing to gap
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: (name: string) => /^(Stack|VStack|HStack)$/.test(name) },
      },
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes

      attributes?.forEach((attr) => {
        if (attr.type === "JSXAttribute" && attr.name.name === "spacing") {
          attr.name.name = "gap"
        }

        if (attr.type === "JSXAttribute" && attr.name.name === "divider") {
          attr.name.name = "separator"
        }
      })
    })

  // Transform StackDivider to Stack.Separator
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "StackDivider" } },
    })
    .forEach((path) => {
      path.node.openingElement.name = j.jsxMemberExpression(
        j.jsxIdentifier("Stack"),
        j.jsxIdentifier("Separator"),
      )

      if (path.node.closingElement) {
        path.node.closingElement.name = j.jsxMemberExpression(
          j.jsxIdentifier("Stack"),
          j.jsxIdentifier("Separator"),
        )
      }
    })

  // Update imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return

      // Remove StackDivider import
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type === "ImportSpecifier") {
          return spec.imported.name !== "StackDivider"
        }
        return true
      })
    })

  return root.toSource({ quote: "single" })
}
