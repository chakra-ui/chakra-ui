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

  const formControlComponents = [
    "FormControl",
    "FormLabel",
    "FormHelperText",
    "FormErrorMessage",
  ]

  const hasFormControl = formControlComponents.some((name) =>
    chakraLocalNames.has(name),
  )

  if (!hasFormControl) return file.source

  let needsFieldImport = false
  let needsFieldsetImport = false

  // Track which FormControls are fieldsets
  const fieldsetPaths = new Set()

  // First pass: identify fieldsets
  root
    .find(j.JSXElement, { openingElement: { name: { name: "FormControl" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("FormControl")) return

      const attributes = path.node.openingElement.attributes || []
      const asAttr = attributes.find(
        (attr) =>
          attr.type === "JSXAttribute" &&
          attr.name.name === "as" &&
          attr.value?.type === "StringLiteral" &&
          attr.value.value === "fieldset",
      )

      if (asAttr) {
        fieldsetPaths.add(path)
      }
    })

  // Transform FormControl
  root
    .find(j.JSXElement, { openingElement: { name: { name: "FormControl" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("FormControl")) return

      const isFieldset = fieldsetPaths.has(path)
      const attributes = path.node.openingElement.attributes || []

      // Determine component name
      const componentName = isFieldset ? "Fieldset" : "Field"
      const rootName = j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("Root"),
      )

      path.node.openingElement.name = rootName
      if (path.node.closingElement) {
        path.node.closingElement.name = rootName
      }

      if (isFieldset) {
        needsFieldsetImport = true
        // Remove as="fieldset" attribute
        const asAttrIndex = attributes.findIndex(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name.name === "as" &&
            attr.value?.type === "StringLiteral" &&
            attr.value.value === "fieldset",
        )
        if (asAttrIndex !== -1) {
          attributes.splice(asAttrIndex, 1)
        }
      } else {
        needsFieldImport = true
      }

      // Transform props
      attributes.forEach((attr) => {
        if (attr.type !== "JSXAttribute") return

        // isInvalid -> invalid
        if (attr.name.name === "isInvalid") {
          attr.name.name = "invalid"
        }
        // isRequired -> required
        else if (attr.name.name === "isRequired") {
          attr.name.name = "required"
        }
        // isDisabled -> disabled
        else if (attr.name.name === "isDisabled") {
          attr.name.name = "disabled"
        }
        // isReadOnly -> readOnly
        else if (attr.name.name === "isReadOnly") {
          attr.name.name = "readOnly"
        }
      })
    })

  // Transform FormLabel
  root
    .find(j.JSXElement, { openingElement: { name: { name: "FormLabel" } } })
    .forEach((path) => {
      if (!chakraLocalNames.has("FormLabel")) return

      // Check if we're inside a fieldset
      let isInsideFieldset = false
      let parent = path.parent
      while (parent) {
        if (
          parent.value?.type === "JSXElement" &&
          parent.value.openingElement?.name?.type === "JSXMemberExpression" &&
          parent.value.openingElement.name.object?.name === "Fieldset" &&
          parent.value.openingElement.name.property?.name === "Root"
        ) {
          isInsideFieldset = true
          break
        }
        parent = parent.parent
      }

      // Check if it has as="legend"
      const attributes = path.node.openingElement.attributes || []
      const hasLegendAs = attributes.some(
        (attr) =>
          attr.type === "JSXAttribute" &&
          attr.name.name === "as" &&
          attr.value?.type === "StringLiteral" &&
          attr.value.value === "legend",
      )

      const componentName =
        isInsideFieldset || hasLegendAs ? "Fieldset" : "Field"
      const subComponentName =
        isInsideFieldset || hasLegendAs ? "Legend" : "Label"

      const labelName = j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier(subComponentName),
      )
      path.node.openingElement.name = labelName
      if (path.node.closingElement) {
        path.node.closingElement.name = labelName
      }

      // Remove as="legend" attribute if present
      if (hasLegendAs) {
        const asAttrIndex = attributes.findIndex(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name.name === "as" &&
            attr.value?.type === "StringLiteral" &&
            attr.value.value === "legend",
        )
        if (asAttrIndex !== -1) {
          attributes.splice(asAttrIndex, 1)
        }
      }
    })

  // Transform FormHelperText
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "FormHelperText" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("FormHelperText")) return

      // Check if we're inside a fieldset
      let isInsideFieldset = false
      let parent = path.parent
      while (parent) {
        if (
          parent.value?.type === "JSXElement" &&
          parent.value.openingElement?.name?.type === "JSXMemberExpression" &&
          parent.value.openingElement.name.object?.name === "Fieldset" &&
          parent.value.openingElement.name.property?.name === "Root"
        ) {
          isInsideFieldset = true
          break
        }
        parent = parent.parent
      }

      const componentName = isInsideFieldset ? "Fieldset" : "Field"
      const helperTextName = j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("HelperText"),
      )
      path.node.openingElement.name = helperTextName
      if (path.node.closingElement) {
        path.node.closingElement.name = helperTextName
      }
    })

  // Transform FormErrorMessage
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "FormErrorMessage" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("FormErrorMessage")) return

      // Check if we're inside a fieldset
      let isInsideFieldset = false
      let parent = path.parent
      while (parent) {
        if (
          parent.value?.type === "JSXElement" &&
          parent.value.openingElement?.name?.type === "JSXMemberExpression" &&
          parent.value.openingElement.name.object?.name === "Fieldset" &&
          parent.value.openingElement.name.property?.name === "Root"
        ) {
          isInsideFieldset = true
          break
        }
        parent = parent.parent
      }

      const componentName = isInsideFieldset ? "Fieldset" : "Field"
      const errorTextName = j.jsxMemberExpression(
        j.jsxIdentifier(componentName),
        j.jsxIdentifier("ErrorText"),
      )
      path.node.openingElement.name = errorTextName
      if (path.node.closingElement) {
        path.node.closingElement.name = errorTextName
      }
    })

  // Update imports
  const chakraImports = root.find(j.ImportDeclaration, {
    source: { value: "@chakra-ui/react" },
  })

  if (chakraImports.size() > 0) {
    chakraImports.forEach((path) => {
      const specifiers = path.node.specifiers || []
      const componentsToRemove = [
        "FormControl",
        "FormLabel",
        "FormHelperText",
        "FormErrorMessage",
      ]

      // Remove old component names
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        return !componentsToRemove.includes(spec.imported.name as string)
      })

      // Add Field import if needed
      if (needsFieldImport) {
        const hasFieldImport = path.node.specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" && spec.imported.name === "Field",
        )
        if (!hasFieldImport) {
          path.node.specifiers.push(j.importSpecifier(j.identifier("Field")))
        }
      }

      // Add Fieldset import if needed
      if (needsFieldsetImport) {
        const hasFieldsetImport = path.node.specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.name === "Fieldset",
        )
        if (!hasFieldsetImport) {
          path.node.specifiers.push(j.importSpecifier(j.identifier("Fieldset")))
        }
      }
    })
  }

  return root.toSource({ quote: "single" })
}
