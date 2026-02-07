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

  // Remove old Stat component imports except Stat itself
  const oldStatComponents = [
    "StatLabel",
    "StatNumber",
    "StatHelpText",
    "StatArrow",
    "StatGroup",
  ]

  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      const specifiers = path.node.specifiers || []
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        return !oldStatComponents.includes(spec.imported.name)
      })
    })

  // Remove empty Chakra imports
  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      if (!path.node.specifiers || path.node.specifiers.length === 0) {
        j(path).remove()
      }
    })

  // Component mappings
  const componentMap: Record<string, string> = {
    Stat: "Stat.Root",
    StatLabel: "Stat.Label",
    StatNumber: "Stat.ValueText",
    StatHelpText: "Stat.HelpText",
    StatArrow: "Stat.UpIndicator", // Will be handled specially
    StatGroup: "Stat.Root",
  }

  // Track if we need to handle StatArrow specially
  const statArrowsToTransform = new Set<any>()

  // Find all StatArrow elements and check their type prop
  root.find(j.JSXElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.openingElement.name)
    if (!chakraLocalNames.has(baseName) || baseName !== "StatArrow") return

    const attrs = path.node.openingElement.attributes ?? []
    const typeAttr = attrs.find(
      (attr) =>
        attr.type === "JSXAttribute" &&
        attr.name.type === "JSXIdentifier" &&
        attr.name.name === "type",
    )

    if (typeAttr && typeAttr.type === "JSXAttribute") {
      const typeValue =
        typeAttr.value?.type === "StringLiteral"
          ? typeAttr.value.value
          : typeAttr.value?.type === "Literal"
            ? (typeAttr.value as any).value
            : null

      // Store the path and type for transformation
      statArrowsToTransform.add({ path, typeValue })
    }
  })

  // Transform component names
  root.find(j.JSXIdentifier).forEach((path) => {
    const name = path.node.name
    if (!chakraLocalNames.has(name)) return
    if (!componentMap[name]) return

    // Skip StatArrow here, handle it separately
    if (name === "StatArrow") return

    // Special handling for StatGroup
    if (name === "StatGroup") {
      // StatGroup becomes Stat.Root, but we need to mark it differently
      // For now, just transform the name
      const newName = j.jsxMemberExpression(
        j.jsxIdentifier("Stat"),
        j.jsxIdentifier("Root"),
      )
      path.replace(newName)
      return
    }

    const [object, property] = componentMap[name].split(".")
    const memberExpression = j.jsxMemberExpression(
      j.jsxIdentifier(object),
      j.jsxIdentifier(property),
    )
    path.replace(memberExpression)
  })

  // Transform StatArrow based on type prop
  statArrowsToTransform.forEach(({ path, typeValue }) => {
    const component = typeValue === "increase" ? "UpIndicator" : "DownIndicator"

    // Replace opening element
    path.node.openingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier("Stat"),
      j.jsxIdentifier(component),
    )

    // Replace closing element if it exists
    if (path.node.closingElement) {
      path.node.closingElement.name = j.jsxMemberExpression(
        j.jsxIdentifier("Stat"),
        j.jsxIdentifier(component),
      )
    }

    // Remove the type attribute
    path.node.openingElement.attributes =
      path.node.openingElement.attributes?.filter(
        (attr) =>
          !(
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "type"
          ),
      ) ?? []
  })

  return root.toSource({ quote: "single" })
}
