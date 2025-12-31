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

        let dividerProp: any = null
        const otherProps: any[] = []

        attributes.forEach((attr) => {
          if (attr.type !== "JSXAttribute") {
            otherProps.push(attr)
            return
          }

          const name = attr.name.name

          if (name === "spacing") {
            attr.name.name = "gap"
            otherProps.push(attr)
            hasChanges = true
          } else if (name === "divider") {
            dividerProp = attr.value
            hasChanges = true
          } else {
            otherProps.push(attr)
          }
        })

        if (dividerProp) {
          openingElement.attributes = otherProps

          let dividerElement: any = null
          if (dividerProp.type === "JSXExpressionContainer") {
            const expr = dividerProp.expression
            if (expr.type === "JSXElement") {
              const dividerAttrs = expr.openingElement.attributes || []

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
          const children = path.node.children || []
          const newChildren: any[] = []
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
            newChildren.push(child)
            if (index < meaningfulChildren.length - 1) {
              newChildren.push(j.jsxText("\n  "))
              newChildren.push(dividerElement)
            }
          })
          path.node.children = newChildren
        }
      })
  })

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
