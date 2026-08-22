import type { API, FileInfo, JSXAttribute, Options } from "jscodeshift"
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

  // Update imports from @chakra-ui/react to @/components/ui/tooltip
  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      const specifiers = path.node.specifiers ?? []
      const tooltipSpecifiers = specifiers.filter(
        (spec) =>
          spec.type === "ImportSpecifier" &&
          spec.imported.type === "Identifier" &&
          spec.imported.name === "Tooltip",
      )

      if (tooltipSpecifiers.length === 0) return

      // Remove Tooltip from the Chakra import
      path.node.specifiers = specifiers.filter(
        (spec) =>
          !(
            spec.type === "ImportSpecifier" &&
            spec.imported.type === "Identifier" &&
            spec.imported.name === "Tooltip"
          ),
      )

      // Add new import for Tooltip from snippet
      const tooltipImport = j.importDeclaration(
        tooltipSpecifiers,
        j.literal("@/components/ui/tooltip"),
      )
      j(path).insertAfter(tooltipImport)
    })

  // Remove empty Chakra imports
  root
    .find(j.ImportDeclaration, { source: { value: "@chakra-ui/react" } })
    .forEach((path) => {
      if (!path.node.specifiers || path.node.specifiers.length === 0) {
        j(path).remove()
      }
    })

  root.find(j.JSXElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.openingElement.name)
    if (!chakraLocalNames.has(baseName) || baseName !== "Tooltip") return
    const attrs = path.node.openingElement.attributes ?? []

    const positioning: Record<string, any> = {}
    const newAttrs: JSXAttribute[] = []
    let onOpenHandler: any = null
    let onCloseHandler: any = null
    let shouldWrapChildren = false

    attrs.forEach((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return

      switch (attr.name.name) {
        case "label":
          newAttrs.push(j.jsxAttribute(j.jsxIdentifier("content"), attr.value))
          break
        case "hasArrow":
          newAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("showArrow"), attr.value),
          )
          break
        case "closeOnEsc":
          newAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("closeOnEscape"), attr.value),
          )
          break
        case "closeOnMouseDown":
          newAttrs.push(
            j.jsxAttribute(j.jsxIdentifier("closeOnPointerDown"), attr.value),
          )
          break
        case "placement":
        case "gutter":
        case "arrow":
        case "arrowPadding":
          positioning[attr.name.name] =
            (attr.value as any).expression || attr.value
          break
        case "offset": {
          const value = (attr.value as any).expression || attr.value
          // Transform array [mainAxis, crossAxis] to object { mainAxis, crossAxis }
          if (value.type === "ArrayExpression" && value.elements.length === 2) {
            positioning.offset = j.objectExpression([
              j.property("init", j.identifier("mainAxis"), value.elements[0]),
              j.property("init", j.identifier("crossAxis"), value.elements[1]),
            ])
          } else {
            // Keep as-is if not an array (e.g., variable reference)
            positioning.offset = value
          }
          break
        }
        case "onOpen":
          onOpenHandler = (attr.value as any).expression || attr.value
          break
        case "onClose":
          onCloseHandler = (attr.value as any).expression || attr.value
          break
        case "shouldWrapChildren":
          // Set flag to wrap children in span
          shouldWrapChildren = true
          break
        case "modifiers":
        case "motionProps":
        case "portalProps":
        case "arrowSize":
        case "arrowShadowColor":
          // Remove these deprecated props
          break
        default:
          newAttrs.push(attr)
      }
    })

    // Merge onOpen and onClose into onOpenChange
    if (onOpenHandler || onCloseHandler) {
      // Helper to get the statement for a handler
      const getHandlerStatement = (handler: any) => {
        if (!handler) return j.blockStatement([])

        // If it's an arrow function, use its body directly
        if (
          handler.type === "ArrowFunctionExpression" ||
          handler.type === "FunctionExpression"
        ) {
          if (handler.body.type === "BlockStatement") {
            return handler.body
          }
          // If body is an expression, wrap it in a block
          return j.blockStatement([j.expressionStatement(handler.body)])
        }

        // For identifiers or call expressions, call them directly
        return j.blockStatement([
          j.expressionStatement(j.callExpression(handler, [])),
        ])
      }

      const onOpenChangeHandler = j.arrowFunctionExpression(
        [j.identifier("e")],
        j.blockStatement([
          j.ifStatement(
            j.memberExpression(j.identifier("e"), j.identifier("open")),
            getHandlerStatement(onOpenHandler),
            onCloseHandler ? getHandlerStatement(onCloseHandler) : null,
          ),
        ]),
      )

      newAttrs.push(
        j.jsxAttribute(
          j.jsxIdentifier("onOpenChange"),
          j.jsxExpressionContainer(onOpenChangeHandler),
        ),
      )
    }

    if (Object.keys(positioning).length) {
      newAttrs.push(
        j.jsxAttribute(
          j.jsxIdentifier("positioning"),
          j.jsxExpressionContainer(
            j.objectExpression(
              Object.entries(positioning).map(([key, val]) =>
                j.objectProperty(j.identifier(key), val),
              ),
            ),
          ),
        ),
      )
    }

    path.node.openingElement.attributes = newAttrs

    // Wrap children in span if shouldWrapChildren was true
    if (
      shouldWrapChildren &&
      path.node.children &&
      path.node.children.length > 0
    ) {
      const wrappedChildren = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier("span"), []),
        j.jsxClosingElement(j.jsxIdentifier("span")),
        path.node.children,
      )
      path.node.children = [wrappedChildren]
    }
  })

  return root.toSource({ quote: "single" })
}
