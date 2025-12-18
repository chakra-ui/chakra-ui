import type { API, FileInfo, Options } from "jscodeshift"

/**
 * Codemod to migrate StackDivider to Stack.Separator
 *
 * Transformations:
 * - Remove StackDivider from imports
 * - Remove divider prop from Stack/VStack/HStack
 * - Insert Stack.Separator between children
 * - Transform spacing prop to gap prop
 */

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false

  // Remove StackDivider from imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers?.filter((spec) => {
        if (
          spec.type === "ImportSpecifier" &&
          spec.imported.name === "StackDivider"
        ) {
          hasChanges = true
          return false
        }
        return true
      })

      path.node.specifiers = specifiers
    })

  // Transform Stack components with divider prop
  const stackComponents = ["Stack", "VStack", "HStack"]

  stackComponents.forEach((stackName) => {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: stackName } },
      })
      .forEach((path) => {
        const openingElement = path.node.openingElement
        const attributes = openingElement.attributes || []

        // Find divider and spacing props
        let dividerProp: any = null
        let dividerIndex = -1
        const otherProps: any[] = []

        attributes.forEach((attr, index) => {
          if (attr.type !== "JSXAttribute") {
            otherProps.push(attr)
            return
          }

          const name = attr.name.name

          // Transform spacing to gap
          if (name === "spacing") {
            attr.name.name = "gap"
            otherProps.push(attr)
            hasChanges = true
          } else if (name === "divider") {
            dividerProp = attr.value
            dividerIndex = index
            hasChanges = true
          } else {
            otherProps.push(attr)
          }
        })

        // If divider prop found, transform the children
        if (dividerProp) {
          // Update attributes (remove divider)
          openingElement.attributes = otherProps

          // Get divider element
          let dividerElement: any = null
          if (dividerProp.type === "JSXExpressionContainer") {
            const expr = dividerProp.expression
            if (expr.type === "JSXElement") {
              // Extract props from StackDivider
              const dividerAttrs = expr.openingElement.attributes || []

              // Create Stack.Separator with same props
              dividerElement = j.jsxElement(
                j.jsxOpeningElement(
                  j.jsxMemberExpression(
                    j.jsxIdentifier("Stack"),
                    j.jsxIdentifier("Separator"),
                  ),
                  dividerAttrs,
                  true,
                ),
                null,
                [],
              )
            }
          }

          // If we couldn't extract divider element, create a default one
          if (!dividerElement) {
            dividerElement = j.jsxElement(
              j.jsxOpeningElement(
                j.jsxMemberExpression(
                  j.jsxIdentifier("Stack"),
                  j.jsxIdentifier("Separator"),
                ),
                [],
                true,
              ),
              null,
              [],
            )
          }

          // Insert separators between children
          const children = path.node.children || []
          const newChildren: any[] = []

          // Filter out empty text nodes and JSXText with only whitespace
          const meaningfulChildren = children.filter((child) => {
            if (child.type === "JSXText") {
              return child.value.trim().length > 0
            }
            return (
              child.type === "JSXElement" ||
              child.type === "JSXExpressionContainer"
            )
          })

          meaningfulChildren.forEach((child, index) => {
            // Add the child
            newChildren.push(child)

            // Add separator after each child except the last
            if (index < meaningfulChildren.length - 1) {
              newChildren.push(j.jsxText("\n  "))
              newChildren.push(dividerElement)
            }
          })

          // Update children
          path.node.children = newChildren
        }
      })
  })

  // Ensure Stack is imported if Stack.Separator is used
  const hasStackSeparator =
    root.find(j.JSXMemberExpression, {
      object: { name: "Stack" },
      property: { name: "Separator" },
    }).length > 0

  if (hasStackSeparator && hasChanges) {
    root
      .find(j.ImportDeclaration, {
        source: { value: "@chakra-ui/react" },
      })
      .forEach((path) => {
        const hasStack = path.node.specifiers?.some(
          (spec) =>
            spec.type === "ImportSpecifier" && spec.imported.name === "Stack",
        )

        if (!hasStack) {
          path.node.specifiers = path.node.specifiers || []
          path.node.specifiers.push(j.importSpecifier(j.identifier("Stack")))
        }
      })
  }

  return hasChanges ? root.toSource() : file.source
}
