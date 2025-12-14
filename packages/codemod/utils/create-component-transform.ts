import type { API, FileInfo, JSCodeshift, Options } from "jscodeshift"
import type { ComponentMapping, PropMapping } from "./component-mappings"
import { createParserFromPath } from "./parser"

interface TransformOptions {
  componentMappings: ComponentMapping[]
  propMappings?: Record<string, PropMapping>
  customTransform?: (j: JSCodeshift, root: ReturnType<JSCodeshift>) => void
}

/**
 * Create a component transform function using mappings
 * This is a generic transformer that handles most component migrations
 */
export function createComponentTransform(options: TransformOptions) {
  const { componentMappings, propMappings = {}, customTransform } = options

  return function transformer(
    file: FileInfo,
    _api: API,
    _options: Options,
  ): string {
    const j = createParserFromPath(file.path)
    const root = j(file.source)

    // Transform component names
    componentMappings.forEach(({ v2Name, v3Name }) => {
      // Skip empty mappings (removed components)
      if (!v3Name) {
        return
      }

      // Transform opening tags
      root
        .find(j.JSXOpeningElement, { name: { name: v2Name } })
        .forEach((path) => {
          if (v3Name.includes(".")) {
            const [namespace, component] = v3Name.split(".")
            path.node.name = j.jsxMemberExpression(
              j.jsxIdentifier(namespace),
              j.jsxIdentifier(component),
            )
          } else {
            path.node.name = j.jsxIdentifier(v3Name)
          }
        })

      // Transform closing tags
      root
        .find(j.JSXClosingElement, { name: { name: v2Name } })
        .forEach((path) => {
          if (v3Name.includes(".")) {
            const [namespace, component] = v3Name.split(".")
            path.node.name = j.jsxMemberExpression(
              j.jsxIdentifier(namespace),
              j.jsxIdentifier(component),
            )
          } else {
            path.node.name = j.jsxIdentifier(v3Name)
          }
        })

      // Transform self-closing tags
      root
        .find(j.JSXElement)
        .filter((path) => {
          return (
            path.node.openingElement.name.type === "JSXIdentifier" &&
            path.node.openingElement.name.name === v2Name
          )
        })
        .forEach((path) => {
          if (v3Name.includes(".")) {
            const [namespace, component] = v3Name.split(".")
            path.node.openingElement.name = j.jsxMemberExpression(
              j.jsxIdentifier(namespace),
              j.jsxIdentifier(component),
            )
            if (path.node.closingElement) {
              path.node.closingElement.name = j.jsxMemberExpression(
                j.jsxIdentifier(namespace),
                j.jsxIdentifier(component),
              )
            }
          }
        })
    })

    // Transform props on all renamed components
    const rootComponentNames = componentMappings
      .filter((m) => m.v3Name.endsWith(".Root"))
      .map((m) => {
        const [namespace] = m.v3Name.split(".")
        return namespace
      })

    rootComponentNames.forEach((namespace) => {
      root
        .find(j.JSXOpeningElement, {
          name: {
            type: "JSXMemberExpression",
            object: { name: namespace },
            property: { name: "Root" },
          },
        })
        .forEach((path) => {
          const attributes = path.node.attributes ?? []

          const newAttributes = attributes.flatMap((attr) => {
            if (
              attr.type !== "JSXAttribute" ||
              attr.name.type !== "JSXIdentifier"
            )
              return attr

            const propName = attr.name.name
            const mapping = propMappings[propName]

            if (!mapping) return attr

            // Transform the prop name
            const newAttr = j.jsxAttribute(
              j.jsxIdentifier(mapping.newProp),
              attr.value,
            )

            // Transform the value if transformValue function is provided
            if (mapping.transformValue && newAttr.value) {
              if (newAttr.value.type === "JSXExpressionContainer") {
                // Keep expression as is, but we could transform it here
                return newAttr
              } else if (newAttr.value.type === "StringLiteral") {
                // Transform string literal
                const transformed = mapping.transformValue(newAttr.value.value)
                return j.jsxAttribute(
                  j.jsxIdentifier(mapping.newProp),
                  j.stringLiteral(transformed),
                )
              } else if (mapping.transformValue) {
                // For cases like isCentered where we set a fixed value
                const transformed = mapping.transformValue(null)
                return j.jsxAttribute(
                  j.jsxIdentifier(mapping.newProp),
                  j.stringLiteral(transformed),
                )
              }
            }

            return newAttr
          })

          path.node.attributes = newAttributes
        })
    })

    // Run custom transform if provided
    if (customTransform) {
      customTransform(j, root)
    }

    return root.toSource({ quote: "single" })
  }
}

/**
 * Helper to transform props on any component
 */
export function transformPropsOnComponent(
  j: JSCodeshift,
  root: ReturnType<JSCodeshift>,
  componentName: string,
  propMappings: Record<string, PropMapping>,
) {
  root
    .find(j.JSXOpeningElement, { name: { name: componentName } })
    .forEach((path) => {
      const attributes = path.node.attributes ?? []

      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        const propName = attr.name.name
        const mapping = propMappings[propName]

        if (!mapping) return attr

        return j.jsxAttribute(j.jsxIdentifier(mapping.newProp), attr.value)
      })

      path.node.attributes = newAttributes
    })
}
