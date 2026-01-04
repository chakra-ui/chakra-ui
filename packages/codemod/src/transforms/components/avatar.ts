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

  root.find(j.JSXElement).forEach((elPath) => {
    const opening = elPath.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return
    if (baseName !== "Avatar") return

    const attrs = opening.attributes || []
    const remainingAttrs: any[] = []
    let nameAttr: any = null
    const imageAttrs: any[] = []

    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier") {
        remainingAttrs.push(attr)
        return
      }
      const name = attr.name.name
      if (name === "max") {
        return
      }
      if (name === "name") {
        nameAttr = attr
        return
      }
      if (
        name === "src" ||
        name === "alt" ||
        name === "srcSet" ||
        name === "sizes"
      ) {
        imageAttrs.push(attr)
        return
      }
      remainingAttrs.push(attr)
    })
    opening.attributes = remainingAttrs

    // Convert <Avatar ...> to <Avatar.Root ...>
    const newName = j.jsxMemberExpression(
      j.jsxIdentifier("Avatar"),
      j.jsxIdentifier("Root"),
    )
    opening.name = newName
    if (elPath.node.closingElement) {
      elPath.node.closingElement.name = newName
    }

    // Inject parts for Fallback and Image
    const children = elPath.node.children || []
    const newChildren = []
    if (nameAttr) {
      const fallbackName = j.jsxMemberExpression(
        j.jsxIdentifier("Avatar"),
        j.jsxIdentifier("Fallback"),
      )
      const fallback = j.jsxElement(
        j.jsxOpeningElement(
          fallbackName,
          [j.jsxAttribute(j.jsxIdentifier("name"), nameAttr.value || null)],
          true,
        ),
        null,
        [],
      )
      newChildren.push(fallback)
    }
    if (imageAttrs.length > 0) {
      const imageName = j.jsxMemberExpression(
        j.jsxIdentifier("Avatar"),
        j.jsxIdentifier("Image"),
      )
      const image = j.jsxElement(
        j.jsxOpeningElement(imageName, imageAttrs, true),
        null,
        [],
      )
      newChildren.push(image)
    }
    newChildren.push(...children)
    elPath.node.children = newChildren
  })

  return root.toSource({ quote: "single" })
}
