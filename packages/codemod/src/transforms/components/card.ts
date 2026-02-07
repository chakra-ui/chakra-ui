import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
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

  const cardComponents = ["Card", "CardHeader", "CardBody", "CardFooter"]

  const hasCardComponent = cardComponents.some((name) =>
    chakraLocalNames.has(name),
  )

  if (!hasCardComponent) return file.source

  // Transform Card to Card.Root
  root
    .find(j.JSXElement, { openingElement: { name: { name: "Card" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Card")) return

      const cardRootName = j.jsxMemberExpression(
        j.jsxIdentifier("Card"),
        j.jsxIdentifier("Root"),
      )
      path.node.openingElement.name = cardRootName
      if (path.node.closingElement) {
        path.node.closingElement.name = cardRootName
      }

      // Transform variant prop: filled -> subtle, unstyled -> unstyled prop
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "variant" } })
        .forEach((attrPath) => {
          const value = attrPath.node.value
          if (value?.type === "StringLiteral") {
            // Map v2 variants to v3 variants
            if (value.value === "filled") {
              value.value = "subtle"
            } else if (value.value === "unstyled") {
              // Remove the variant attribute and add unstyled boolean prop
              const attributes = path.node.openingElement.attributes
              if (attributes) {
                const index = attributes.indexOf(attrPath.node)
                if (index !== -1) {
                  attributes.splice(index, 1)
                  // Add unstyled boolean prop
                  attributes.push(j.jsxAttribute(j.jsxIdentifier("unstyled")))
                }
              }
            }
          }
        })
    })

  // Transform CardHeader to Card.Header
  root
    .find(j.JSXElement, { openingElement: { name: { name: "CardHeader" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("CardHeader")) return

      const cardHeaderName = j.jsxMemberExpression(
        j.jsxIdentifier("Card"),
        j.jsxIdentifier("Header"),
      )
      path.node.openingElement.name = cardHeaderName
      if (path.node.closingElement) {
        path.node.closingElement.name = cardHeaderName
      }
    })

  // Transform CardBody to Card.Body
  root
    .find(j.JSXElement, { openingElement: { name: { name: "CardBody" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("CardBody")) return

      const cardBodyName = j.jsxMemberExpression(
        j.jsxIdentifier("Card"),
        j.jsxIdentifier("Body"),
      )
      path.node.openingElement.name = cardBodyName
      if (path.node.closingElement) {
        path.node.closingElement.name = cardBodyName
      }
    })

  // Transform CardFooter to Card.Footer
  root
    .find(j.JSXElement, { openingElement: { name: { name: "CardFooter" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("CardFooter")) return

      const cardFooterName = j.jsxMemberExpression(
        j.jsxIdentifier("Card"),
        j.jsxIdentifier("Footer"),
      )
      path.node.openingElement.name = cardFooterName
      if (path.node.closingElement) {
        path.node.closingElement.name = cardFooterName
      }
    })

  // Update imports
  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() > 0) {
    chakraImports.forEach((path) => {
      const specifiers = path.node.specifiers || []
      const cardComponentsToRemove = ["CardHeader", "CardBody", "CardFooter"]

      // Remove old component names
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        return !cardComponentsToRemove.includes(spec.imported.name)
      })

      // Ensure Card is imported if any card component was used
      const hasCardImport = path.node.specifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" && spec.imported.name === "Card",
      )

      if (!hasCardImport && hasCardComponent) {
        path.node.specifiers.push(j.importSpecifier(j.identifier("Card")))
      }
    })
  }

  return root.toSource({ quote: "single" })
}
