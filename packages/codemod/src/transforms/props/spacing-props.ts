import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() === 0) {
    return file.source
  }

  const chakraNamedImports = new Set<string>()
  const chakraNamespaces = new Set<string>()

  chakraImports.forEach((path) => {
    path.node.specifiers?.forEach((spec) => {
      if (spec.type === "ImportSpecifier") {
        chakraNamedImports.add(spec.local?.name ?? (spec.imported as any).name)
      }

      if (spec.type === "ImportNamespaceSpecifier") {
        chakraNamespaces.add(spec.local?.name as string)
      }
    })
  })

  if (chakraNamedImports.size === 0 && chakraNamespaces.size === 0) {
    return file.source
  }

  root
    .find(j.JSXElement)
    .filter((path) => {
      const name = path.node.openingElement.name

      if (name.type === "JSXIdentifier" && chakraNamedImports.has(name.name)) {
        return true
      }

      if (
        name.type === "JSXMemberExpression" &&
        name.object.type === "JSXIdentifier" &&
        chakraNamespaces.has(name.object.name)
      ) {
        return true
      }

      return false
    })
    .forEach((path) => {
      path.node.openingElement.attributes?.forEach((attr) => {
        if (attr.type !== "JSXAttribute") return

        if (attr.name.name === "spacing") {
          attr.name.name = "gap"
        }

        if (attr.name.name === "divider") {
          attr.name.name = "separator"
        }
      })
    })

  return root.toSource({ quote: "single" })
}
