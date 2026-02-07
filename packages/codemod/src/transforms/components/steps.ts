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

  // Track if we're using useSteps (for Steps.RootProvider)
  let usesStepsHook = false
  let stepsVariableName = "stepsApi"

  // Check if useSteps is being used and convert destructured to full assignment
  root
    .find(j.VariableDeclarator, {
      init: { type: "CallExpression", callee: { name: "useSteps" } },
    })
    .forEach((path) => {
      usesStepsHook = true

      // If it's a destructured pattern, convert to full identifier
      if (path.node.id.type === "ObjectPattern") {
        // Find a unique variable name (avoid naming conflicts)
        let variableName = "stepsApi"
        let counter = 1
        while (
          root
            .find(j.Identifier, { name: variableName })
            .some(
              (p) =>
                p.parent.node.type === "VariableDeclarator" &&
                p.parent.node.id === p.node,
            )
        ) {
          variableName = `stepsApi${counter++}`
        }
        stepsVariableName = variableName

        // Replace destructured pattern with identifier
        path.node.id = j.identifier(variableName)
      } else if (path.node.id.type === "Identifier") {
        // Already a full assignment, use that variable name
        stepsVariableName = path.node.id.name
      }
    })

  // Track if StepIcon was imported (to add LuCheck from react-icons/lu)
  let hadStepIcon = false

  // Remove old Steps component imports except Steps and useSteps
  const oldStepsComponents = [
    "Stepper",
    "Step",
    "StepDescription",
    "StepIcon",
    "StepIndicator",
    "StepNumber",
    "StepSeparator",
    "StepStatus",
    "StepTitle",
  ]

  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      const specifiers = path.node.specifiers || []

      // Check if StepIcon was imported
      if (
        specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.name === "StepIcon",
        )
      ) {
        hadStepIcon = true
      }

      const filteredSpecifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        return !oldStepsComponents.includes(spec.imported.name)
      })

      // Check if Steps import already exists
      const hasStepsImport = filteredSpecifiers.some(
        (spec) =>
          spec.type === "ImportSpecifier" && spec.imported.name === "Steps",
      )

      // Add Steps import if not present
      if (!hasStepsImport) {
        filteredSpecifiers.unshift(
          j.importSpecifier(j.identifier("Steps"), j.identifier("Steps")),
        )
      }

      path.node.specifiers = filteredSpecifiers
    })

  // Add LuCheck import from react-icons/lu if StepIcon was used
  if (hadStepIcon) {
    const reactIconsImport = root.find(j.ImportDeclaration, {
      source: { value: "react-icons/lu" },
    })

    if (reactIconsImport.length > 0) {
      // react-icons/lu import exists, add LuCheck if not already there
      reactIconsImport.forEach((path) => {
        const specifiers = path.node.specifiers || []
        const hasLuCheck = specifiers.some(
          (spec) =>
            spec.type === "ImportSpecifier" && spec.imported.name === "LuCheck",
        )

        if (!hasLuCheck) {
          specifiers.push(
            j.importSpecifier(j.identifier("LuCheck"), j.identifier("LuCheck")),
          )
          path.node.specifiers = specifiers
        }
      })
    } else {
      // Create new react-icons/lu import with LuCheck
      const firstImport = root.find(j.ImportDeclaration).at(0)
      const luCheckImport = j.importDeclaration(
        [j.importSpecifier(j.identifier("LuCheck"), j.identifier("LuCheck"))],
        j.literal("react-icons/lu"),
      )

      if (firstImport.length > 0) {
        firstImport.insertAfter(luCheckImport)
      } else {
        root.get().node.program.body.unshift(luCheckImport)
      }
    }
  }

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
    Stepper: usesStepsHook ? "Steps.RootProvider" : "Steps.Root",
    Step: "Steps.Item",
    StepIndicator: "Steps.Indicator",
    StepStatus: "Steps.Status",
    StepTitle: "Steps.Title",
    StepDescription: "Steps.Description",
    StepSeparator: "Steps.Separator",
    StepNumber: "Steps.Number",
    StepIcon: "LuCheck", // v3 uses LuCheck from react-icons/lu
  }

  // Transform Stepper props: index -> step (if not using hook pattern)
  root.find(j.JSXOpeningElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.name)
    if (!chakraLocalNames.has(baseName) || baseName !== "Stepper") return

    const attrs = path.node.attributes ?? []
    const newAttrs = attrs.map((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier") {
        return attr
      }

      // index -> step (only if not using hook pattern)
      if (attr.name.name === "index" && !usesStepsHook) {
        return j.jsxAttribute(j.jsxIdentifier("step"), attr.value)
      }

      // Remove index prop if using hook pattern
      if (attr.name.name === "index" && usesStepsHook) {
        return null
      }

      return attr
    })

    path.node.attributes = newAttrs.filter(Boolean)
  })

  // Transform useSteps hook calls: index -> defaultStep, activeStep -> value
  root
    .find(j.CallExpression, { callee: { name: "useSteps" } })
    .forEach((path) => {
      if (path.node.arguments.length === 0) return
      const arg = path.node.arguments[0]
      if (arg.type !== "ObjectExpression") return

      arg.properties = arg.properties.map((prop: any) => {
        if (prop.type !== "Property" && prop.type !== "ObjectProperty") {
          return prop
        }

        // index -> defaultStep
        if (prop.key.type === "Identifier" && prop.key.name === "index") {
          return j.property("init", j.identifier("defaultStep"), prop.value)
        }

        return prop
      })
    })

  // Wrap Stepper content in Steps.List BEFORE transforming names
  root.find(j.JSXElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.openingElement.name)
    if (baseName !== "Stepper") return
    if (!chakraLocalNames.has(baseName)) return

    // Only wrap if NOT using useSteps hook (when using hook, structure is different)
    if (usesStepsHook) return

    // Get all children
    const children = path.node.children || []

    // Create Steps.List wrapper
    const listElement = j.jsxElement(
      j.jsxOpeningElement(
        j.jsxMemberExpression(
          j.jsxIdentifier("Steps"),
          j.jsxIdentifier("List"),
        ),
        [],
      ),
      j.jsxClosingElement(
        j.jsxMemberExpression(
          j.jsxIdentifier("Steps"),
          j.jsxIdentifier("List"),
        ),
      ),
      children,
    )

    // Replace children with Steps.List wrapper
    path.node.children = [
      j.jsxText("\n      "),
      listElement,
      j.jsxText("\n    "),
    ]
  })

  // Transform component names
  root.find(j.JSXIdentifier).forEach((path) => {
    const name = path.node.name
    if (!chakraLocalNames.has(name)) return
    if (!componentMap[name]) return

    const targetName = componentMap[name]

    // StepIcon → LuCheck (simple identifier, not compound)
    if (name === "StepIcon") {
      path.replace(j.jsxIdentifier("LuCheck"))
      return
    }

    // StepNumber → Steps.Number and others → compound components
    if (targetName.includes(".")) {
      const [object, property] = targetName.split(".")
      const memberExpression = j.jsxMemberExpression(
        j.jsxIdentifier(object),
        j.jsxIdentifier(property),
      )
      path.replace(memberExpression)
    }
  })

  // Transform StepStatus props: active → current
  root
    .find(j.JSXOpeningElement, {
      name: {
        type: "JSXMemberExpression",
        object: { name: "Steps" },
        property: { name: "Status" },
      },
    })
    .forEach((path) => {
      const attrs = path.node.attributes ?? []
      const newAttrs = attrs.map((attr) => {
        if (
          attr.type !== "JSXAttribute" ||
          attr.name.type !== "JSXIdentifier"
        ) {
          return attr
        }

        // active → current
        if (attr.name.name === "active") {
          return j.jsxAttribute(j.jsxIdentifier("current"), attr.value)
        }

        return attr
      })

      path.node.attributes = newAttrs
    })

  // Add value prop to Steps.RootProvider when using hook pattern
  if (usesStepsHook) {
    root
      .find(j.JSXOpeningElement, {
        name: {
          type: "JSXMemberExpression",
          object: { name: "Steps" },
          property: { name: "RootProvider" },
        },
      })
      .forEach((path) => {
        const attrs = path.node.attributes ?? []

        // Check if value prop already exists
        const hasValueProp = attrs.some(
          (attr) =>
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "value",
        )

        if (!hasValueProp) {
          // Add value={stepsVariableName} prop
          attrs.push(
            j.jsxAttribute(
              j.jsxIdentifier("value"),
              j.jsxExpressionContainer(j.identifier(stepsVariableName)),
            ),
          )
          path.node.attributes = attrs
        }
      })
  }

  return root.toSource({ quote: "single" })
}
