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

  root
    .find(j.JSXElement, { openingElement: { name: { name: "Alert" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("Alert")) return

      // Rename to Alert.Root
      const alertRootName = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Root"),
      )
      path.node.openingElement.name = alertRootName
      if (path.node.closingElement) {
        path.node.closingElement.name = alertRootName
      }

      // Transform variant prop: left-accent and top-accent -> subtle with border
      const attributes = path.node.openingElement.attributes || []
      let hasLeftAccent = false
      let hasTopAccent = false

      j(path.node.openingElement)
        .find(j.JSXAttribute, { name: { name: "variant" } })
        .forEach((attrPath) => {
          const value = attrPath.node.value
          if (value?.type === "StringLiteral") {
            if (value.value === "left-accent") {
              value.value = "subtle"
              hasLeftAccent = true
            } else if (value.value === "top-accent") {
              value.value = "subtle"
              hasTopAccent = true
            }
          }
        })

      // Add border props for accent variants
      if (hasLeftAccent) {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier("borderStartWidth"),
            j.stringLiteral("3px"),
          ),
        )
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier("borderStartColor"),
            j.stringLiteral("colorPalette.solid"),
          ),
        )
      }

      if (hasTopAccent) {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier("borderTopWidth"),
            j.stringLiteral("3px"),
          ),
        )
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier("borderTopColor"),
            j.stringLiteral("colorPalette.solid"),
          ),
        )
      }

      // Remove addRole prop (not needed in v3)
      const addRoleIndex = attributes.findIndex(
        (attr) => attr.type === "JSXAttribute" && attr.name.name === "addRole",
      )
      if (addRoleIndex !== -1) {
        attributes.splice(addRoleIndex, 1)
      }
    })

  root
    .find(j.JSXElement, { openingElement: { name: { name: "AlertIcon" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("AlertIcon")) return

      const indicatorName = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Indicator"),
      )
      path.node.openingElement.name = indicatorName
      path.node.openingElement.selfClosing = true
      path.node.closingElement = null
    })

  // Transform AlertTitle to Alert.Title
  root
    .find(j.JSXElement, { openingElement: { name: { name: "AlertTitle" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("AlertTitle")) return

      const titleName = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Title"),
      )
      path.node.openingElement.name = titleName
      if (path.node.closingElement) {
        path.node.closingElement.name = titleName
      }
    })

  // Transform AlertDescription to Alert.Description
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "AlertDescription" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("AlertDescription")) return

      const descriptionName = j.jsxMemberExpression(
        j.jsxIdentifier("Alert"),
        j.jsxIdentifier("Description"),
      )
      path.node.openingElement.name = descriptionName
      if (path.node.closingElement) {
        path.node.closingElement.name = descriptionName
      }
    })

  // Update imports
  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() > 0) {
    chakraImports.forEach((path) => {
      const specifiers = path.node.specifiers || []
      const alertComponentsToRemove = [
        "AlertIcon",
        "AlertTitle",
        "AlertDescription",
      ]

      // Remove old component names
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        return !alertComponentsToRemove.includes(spec.imported.name as string)
      })

      // Ensure Alert is imported
      const hasAlertImport = path.node.specifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" && spec.imported.name === "Alert",
      )

      const hasAnyAlertComponent = ["Alert", ...alertComponentsToRemove].some(
        (name) => chakraLocalNames.has(name),
      )

      if (!hasAlertImport && hasAnyAlertComponent) {
        path.node.specifiers.push(j.importSpecifier(j.identifier("Alert")))
      }
    })
  }

  return root.toSource({ quote: "single" })
}
