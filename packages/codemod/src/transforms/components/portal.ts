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

  // Remove appendToParentPortal prop from Portal
  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return
    if (baseName !== "Portal") return

    opening.attributes = (opening.attributes || []).filter((attr) => {
      return !(
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "appendToParentPortal"
      )
    })
  })

  // Remove PortalManager import and usage
  root.find(j.ImportDeclaration).forEach((path) => {
    const source = path.node.source.value
    if (typeof source !== "string") return
    if (!source.includes("@chakra-ui/react")) return
    path.node.specifiers = (path.node.specifiers || []).filter((spec) => {
      return !(
        spec.type === "ImportSpecifier" &&
        spec.imported.type === "Identifier" &&
        spec.imported.name === "PortalManager"
      )
    })
  })

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    if (
      opening.name.type === "JSXIdentifier" &&
      opening.name.name === "PortalManager"
    ) {
      const children = elPath.node.children || []
      j(elPath).replaceWith(
        children.length
          ? children[0]
          : j.jsxFragment(j.jsxOpeningFragment(), j.jsxClosingFragment(), []),
      )
    }
  })

  return root.toSource({ quote: "single" })
}
