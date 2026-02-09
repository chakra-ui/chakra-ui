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

  const listComponents = [
    "List",
    "OrderedList",
    "UnorderedList",
    "ListItem",
    "ListIcon",
  ]

  const hasListComponent = listComponents.some((name) =>
    chakraLocalNames.has(name),
  )

  if (!hasListComponent) return file.source

  // Transform List to List.Root
  root
    .find(j.JSXElement, { openingElement: { name: { name: "List" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("List")) return

      const listRootName = j.jsxMemberExpression(
        j.jsxIdentifier("List"),
        j.jsxIdentifier("Root"),
      )
      path.node.openingElement.name = listRootName
      if (path.node.closingElement) {
        path.node.closingElement.name = listRootName
      }

      // Transform spacing prop to gap
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "spacing" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("gap")
        })

      // Transform styleType prop to listStyleType
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "styleType" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("listStyleType")
        })

      // Transform stylePosition prop to listStylePosition
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "stylePosition" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("listStylePosition")
        })
    })

  // Transform OrderedList to List.Root with as="ol"
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "OrderedList" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("OrderedList")) return

      const listRootName = j.jsxMemberExpression(
        j.jsxIdentifier("List"),
        j.jsxIdentifier("Root"),
      )
      path.node.openingElement.name = listRootName
      if (path.node.closingElement) {
        path.node.closingElement.name = listRootName
      }

      // Add as="ol" prop
      const attributes = path.node.openingElement.attributes || []
      attributes.unshift(
        j.jsxAttribute(j.jsxIdentifier("as"), j.stringLiteral("ol")),
      )

      // Transform spacing prop to gap
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "spacing" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("gap")
        })

      // Transform styleType prop to listStyleType
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "styleType" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("listStyleType")
        })

      // Transform stylePosition prop to listStylePosition
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "stylePosition" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("listStylePosition")
        })
    })

  // Transform UnorderedList to List.Root with as="ul"
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "UnorderedList" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("UnorderedList")) return

      const listRootName = j.jsxMemberExpression(
        j.jsxIdentifier("List"),
        j.jsxIdentifier("Root"),
      )
      path.node.openingElement.name = listRootName
      if (path.node.closingElement) {
        path.node.closingElement.name = listRootName
      }

      // Add as="ul" prop
      const attributes = path.node.openingElement.attributes || []
      attributes.unshift(
        j.jsxAttribute(j.jsxIdentifier("as"), j.stringLiteral("ul")),
      )

      // Transform spacing prop to gap
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "spacing" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("gap")
        })

      // Transform styleType prop to listStyleType
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "styleType" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("listStyleType")
        })

      // Transform stylePosition prop to listStylePosition
      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "stylePosition" } })
        .forEach((attrPath) => {
          attrPath.node.name = j.jsxIdentifier("listStylePosition")
        })
    })

  // Transform ListItem to List.Item
  root
    .find(j.JSXElement, { openingElement: { name: { name: "ListItem" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("ListItem")) return

      const listItemName = j.jsxMemberExpression(
        j.jsxIdentifier("List"),
        j.jsxIdentifier("Item"),
      )
      path.node.openingElement.name = listItemName
      if (path.node.closingElement) {
        path.node.closingElement.name = listItemName
      }
    })

  // Transform ListIcon to List.Indicator
  root
    .find(j.JSXElement, { openingElement: { name: { name: "ListIcon" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("ListIcon")) return

      const listIndicatorName = j.jsxMemberExpression(
        j.jsxIdentifier("List"),
        j.jsxIdentifier("Indicator"),
      )
      path.node.openingElement.name = listIndicatorName
      if (path.node.closingElement) {
        path.node.closingElement.name = listIndicatorName
      }
    })

  // Update imports
  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() > 0) {
    chakraImports.forEach((path) => {
      const specifiers = path.node.specifiers || []
      const listComponentsToRemove = [
        "OrderedList",
        "UnorderedList",
        "ListItem",
        "ListIcon",
      ]

      // Remove old component names
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        return !listComponentsToRemove.includes(spec.imported.name as string)
      })

      // Ensure List is imported if any list component was used
      const hasListImport = path.node.specifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" && spec.imported.name === "List",
      )

      if (!hasListImport && hasListComponent) {
        path.node.specifiers.push(j.importSpecifier(j.identifier("List")))
      }
    })
  }

  return root.toSource({ quote: "single" })
}
