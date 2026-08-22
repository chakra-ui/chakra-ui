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

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    if (!isTrackedJsx(opening, chakraLocalNames)) return

    opening.attributes?.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return

      if (attr.name.name === "colorScheme") {
        attr.name.name = "colorPalette"
      }
      if (attr.name.name === "spacing") {
        attr.name.name = "gap"
      }
    })
  })

  root.find(j.TSIndexedAccessType).forEach((path) => {
    const { objectType, indexType } = path.node
    if (
      objectType.type === "TSTypeReference" &&
      objectType.typeName.type === "Identifier" &&
      indexType.type === "TSLiteralType" &&
      indexType.literal.type === "StringLiteral"
    ) {
      const baseName = objectType.typeName.name.replace(/Props$/, "")
      if (chakraLocalNames.has(baseName)) {
        if (indexType.literal.value === "colorScheme") {
          indexType.literal.value = "colorPalette"
        }
        if (indexType.literal.value === "spacing") {
          indexType.literal.value = "gap"
        }
      }
    }
  })

  root.find(j.TSPropertySignature).forEach((path) => {
    if (path.node.key.type !== "Identifier") return

    const propName = path.node.key.name
    const typeAnnotation = path.node.typeAnnotation?.typeAnnotation

    if (
      typeAnnotation?.type === "TSIndexedAccessType" &&
      typeAnnotation.objectType.type === "TSTypeReference" &&
      typeAnnotation.objectType.typeName.type === "Identifier"
    ) {
      const baseName = typeAnnotation.objectType.typeName.name.replace(
        /Props$/,
        "",
      )
      if (chakraLocalNames.has(baseName)) {
        if (propName === "colorScheme") path.node.key.name = "colorPalette"
        if (propName === "spacing") path.node.key.name = "gap"
      }
    }
  })

  return root.toSource({ quote: "single" })
}
