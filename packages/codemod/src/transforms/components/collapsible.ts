import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Collapse to Collapsible
 */
export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)
  if (chakraLocalNames.size === 0) return file.source

  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "Collapse" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("Collapse")) return
      const attrs = path.node.openingElement.attributes || []
      const children = path.node.children || []

      const newAttrs = attrs.flatMap((attr) => {
        if (attr.type !== "JSXAttribute") return attr

        if (attr.name.name === "in") {
          attr.name.name = "open"
          return attr
        }

        if (attr.name.name === "animateOpacity") {
          return []
        }

        return attr
      })

      const collapsibleRoot = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Collapsible"),
            j.jsxIdentifier("Root"),
          ),
          newAttrs,
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Collapsible"),
            j.jsxIdentifier("Root"),
          ),
        ),
        [
          j.jsxText("\n  "),
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Collapsible"),
                j.jsxIdentifier("Content"),
              ),
              [],
            ),
            j.jsxClosingElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("Collapsible"),
                j.jsxIdentifier("Content"),
              ),
            ),
            children,
          ),
          j.jsxText("\n"),
        ],
      )

      j(path).replaceWith(collapsibleRoot)
    })

  // Update imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return

      path.node.specifiers = specifiers.map((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "Collapse"
        ) {
          return j.importSpecifier(j.identifier("Collapsible"))
        }
        return spec
      })
    })

  return root.toSource({ quote: "single" })
}
