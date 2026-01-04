import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const chakraLinkNames: string[] = []

  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      path.node.specifiers?.forEach((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "Link" &&
          spec.local?.name
        ) {
          chakraLinkNames.push(spec.local.name as string)
        }
      })
    })

  if (chakraLinkNames.length === 0) return root.toSource({ quote: "single" })

  root
    .find(j.JSXElement, {
      openingElement: (el) =>
        el.name.type === "JSXIdentifier" &&
        chakraLinkNames.includes(el.name.name),
    })
    .forEach((path) => {
      const attrs = path.node.openingElement.attributes
      if (!attrs) return

      const attrsToRemove: number[] = []
      let hasIsExternal = false

      attrs.forEach((attr, index) => {
        if (attr.type !== "JSXAttribute") return
        if (attr.name.name === "isExternal") {
          hasIsExternal = true
          attrsToRemove.push(index)
        }
      })

      attrsToRemove.reverse().forEach((index) => {
        attrs.splice(index, 1)
      })

      if (hasIsExternal) {
        const hasTarget = attrs.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "target",
        )
        if (!hasTarget) {
          attrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("target"),
              j.stringLiteral("_blank"),
            ),
          )
        }

        const hasRel = attrs.some(
          (attr) => attr.type === "JSXAttribute" && attr.name.name === "rel",
        )
        if (!hasRel) {
          attrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("rel"),
              j.stringLiteral("noopener noreferrer"),
            ),
          )
        }
      }
    })

  return root.toSource({ quote: "single" })
}
