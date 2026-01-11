import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Select to NativeSelect compound component:
 * Before:
 * <Select placeholder="Select option">
 *   <option>Option 1</option>
 * </Select>
 *
 * After:
 * <NativeSelect.Root>
 *   <NativeSelect.Field placeholder="Select option">
 *     <option>Option 1</option>
 *   </NativeSelect.Field>
 *   <NativeSelect.Indicator />
 * </NativeSelect.Root>
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
      openingElement: { name: { name: "Select" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("Select")) return
      const attrs = path.node.openingElement.attributes || []
      const children = path.node.children || []

      // Filter out icon prop if it exists (will handle separately)
      const regularAttrs = attrs.filter((attr) => {
        if (attr.type === "JSXAttribute") {
          return attr.name.name !== "icon"
        }
        return true
      })

      const hasIndicator = children.some(
        (c) =>
          c.type === "JSXElement" &&
          c.openingElement.name.type === "JSXMemberExpression" &&
          c.openingElement.name.object.type === "JSXIdentifier" &&
          c.openingElement.name.object.name === "NativeSelect" &&
          c.openingElement.name.property.type === "JSXIdentifier" &&
          c.openingElement.name.property.name === "Indicator",
      )

      // Create NativeSelect.Root with NativeSelect.Field and NativeSelect.Indicator
      const nativeSelectRoot = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("NativeSelect"),
            j.jsxIdentifier("Root"),
          ),
          [],
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("NativeSelect"),
            j.jsxIdentifier("Root"),
          ),
        ),
        [
          j.jsxText("\n  "),
          j.jsxElement(
            j.jsxOpeningElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("NativeSelect"),
                j.jsxIdentifier("Field"),
              ),
              regularAttrs,
            ),
            j.jsxClosingElement(
              j.jsxMemberExpression(
                j.jsxIdentifier("NativeSelect"),
                j.jsxIdentifier("Field"),
              ),
            ),
            children,
          ),
          j.jsxText("\n  "),
          ...(hasIndicator
            ? []
            : [
                j.jsxElement(
                  j.jsxOpeningElement(
                    j.jsxMemberExpression(
                      j.jsxIdentifier("NativeSelect"),
                      j.jsxIdentifier("Indicator"),
                    ),
                    [],
                    true,
                  ),
                ),
              ]),
          j.jsxText("\n"),
        ],
      )

      j(path).replaceWith(nativeSelectRoot)
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
          spec.imported.name === "Select"
        ) {
          return j.importSpecifier(j.identifier("NativeSelect"))
        }
        return spec
      })
    })

  return root.toSource({ quote: "single" })
}
