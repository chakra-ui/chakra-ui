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

  root
    .find(j.JSXElement)
    .filter((path) => {
      const baseName = getJsxBaseName(path.node.openingElement.name)
      return chakraLocalNames.has(baseName)
    })
    .forEach((path) => {
      path.node.openingElement.attributes?.forEach((attr) => {
        if (attr.type !== "JSXAttribute") return

        if (attr.name.name === "casing") {
          attr.name.name = "textTransform"
        }
      })
    })

  root.find(j.ObjectPattern).forEach((path) => {
    path.node.properties.forEach((prop) => {
      if (
        prop.type === "Property" &&
        prop.key.type === "Identifier" &&
        prop.key.name === "casing" &&
        prop.value.type === "Identifier" &&
        prop.value.name === "casing" &&
        prop.shorthand
      ) {
        prop.key.name = "textTransform"
        prop.shorthand = false
      }
    })
  })

  root
    .find(j.TSIndexedAccessType, {
      indexType: { literal: { value: "casing" } },
    })
    .forEach((path) => {
      const objectType = path.node.objectType
      if (
        objectType.type === "TSTypeReference" &&
        objectType.typeName.type === "Identifier" &&
        chakraLocalNames.has(objectType.typeName.name.replace("Props", ""))
      ) {
        if (
          path.node.indexType.type === "TSLiteralType" &&
          path.node.indexType.literal.type === "StringLiteral"
        ) {
          path.node.indexType.literal.value = "textTransform"
        }
      }
    })

  return root.toSource({ quote: "single" })
}
