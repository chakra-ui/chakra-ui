import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  let needsStackImport = false

  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: (name: string) => /^(Stack|VStack|HStack)$/.test(name) },
      },
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes
      attributes?.forEach((attr) => {
        if (attr.type !== "JSXAttribute") return
        if (attr.name.name === "spacing") attr.name.name = "gap"
        if (attr.name.name === "divider") attr.name.name = "separator"
      })
    })

  root
    .find(j.JSXElement, { openingElement: { name: { name: "StackDivider" } } })
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
      needsStackImport = true
    })

  root
    .find(j.JSXMemberExpression, {
      object: { type: "JSXIdentifier" },
      property: { name: "StackDivider" },
    })
    .forEach((path) => {
      path.node.property.name = "Separator"
      if (path.node.object.type === "JSXIdentifier") {
        path.node.object.name = path.node.object.name
      }
      needsStackImport = true
    })

  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() > 0) {
    chakraImports.forEach((path) => {
      const specifiers = path.node.specifiers || []

      path.node.specifiers = specifiers.filter(
        (spec) =>
          spec.type !== "ImportSpecifier" ||
          spec.imported.name !== "StackDivider",
      )

      if (
        needsStackImport &&
        !specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" && spec.imported.name === "Stack",
        )
      ) {
        path.node.specifiers.push(j.importSpecifier(j.identifier("Stack")))
        needsStackImport = false
      }
    })
  } else if (needsStackImport) {
    root
      .get()
      .node.program.body.unshift(
        j.importDeclaration(
          [j.importSpecifier(j.identifier("Stack"))],
          j.stringLiteral("@chakra-ui/react"),
        ),
      )
    needsStackImport = false
  }

  return root.toSource({ quote: "single" })
}
