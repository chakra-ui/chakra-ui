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

  let hasDivider = false

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return
    if (baseName !== "Divider") return

    hasDivider = true
    const newName = j.jsxIdentifier("Separator")
    opening.name = newName
    if (elPath.node.closingElement) {
      elPath.node.closingElement.name = newName
    }
  })

  // Update imports
  if (hasDivider) {
    const chakraImports = root.find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })

    if (chakraImports.size() > 0) {
      chakraImports.forEach((path) => {
        const specifiers = path.node.specifiers || []

        // Remove Divider import
        path.node.specifiers = specifiers.filter((spec) => {
          if (spec.type !== "ImportSpecifier") return true
          return spec.imported.name !== "Divider"
        })

        // Add Separator import if not already present
        const hasSeparatorImport = path.node.specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.name === "Separator",
        )

        if (!hasSeparatorImport) {
          path.node.specifiers.push(
            j.importSpecifier(j.identifier("Separator")),
          )
        }
      })
    }
  }

  return root.toSource({ quote: "single" })
}
