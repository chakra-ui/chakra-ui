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
  const { chakraLocalNames, componentAliases } = collectChakraLocalNames(
    j,
    root,
  )
  if (chakraLocalNames.size === 0) return file.source

  let needsUseAccordionItemContext = false
  let itemCounter = 0
  const accordionsWithReduceMotion = new Set<any>()

  /**
   * Rename <Accordion> → <Accordion.Root> and props
   */
  root.find(j.JSXOpeningElement).forEach((path) => {
    const baseName = getJsxBaseName(path.node.name)
    const isChakra =
      chakraLocalNames.has(baseName) ||
      (componentAliases.has(baseName) &&
        chakraLocalNames.has(componentAliases.get(baseName) as string))
    if (
      !isChakra ||
      !(
        baseName === "Accordion" ||
        componentAliases.get(baseName) === "Accordion"
      )
    )
      return

    path.node.name = j.jsxMemberExpression(
      j.jsxIdentifier("Accordion"),
      j.jsxIdentifier("Root"),
    )

    const attrs = path.node.attributes ?? []
    let hasReduceMotion = false

    path.node.attributes = attrs.flatMap((attr) => {
      if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
        return attr

      switch (attr.name.name) {
        case "allowMultiple":
          return j.jsxAttribute(j.jsxIdentifier("multiple"), attr.value)

        case "allowToggle":
          return j.jsxAttribute(j.jsxIdentifier("collapsible"), attr.value)

        case "index":
          return j.jsxAttribute(
            j.jsxIdentifier("value"),
            normalizeIndexValue(j, attr.value),
          )

        case "defaultIndex":
          return j.jsxAttribute(
            j.jsxIdentifier("defaultValue"),
            normalizeIndexValue(j, attr.value),
          )

        case "onChange":
          return j.jsxAttribute(
            j.jsxIdentifier("onValueChange"),
            wrapOnChange(j, attr.value),
          )

        case "reduceMotion":
          hasReduceMotion = true
          // Remove from root, will add animation="none" to ItemContent
          return []

        default:
          return attr
      }
    })

    // Track this accordion element for adding animation="none" to its ItemContent children
    if (hasReduceMotion) {
      accordionsWithReduceMotion.add(path.parent.value)
    }
  })

  /**
   * Closing </Accordion> → </Accordion.Root>
   */
  root.find(j.JSXClosingElement).forEach((path) => {
    const nameNode = path.node.name
    if (nameNode.type !== "JSXIdentifier" || nameNode.name !== "Accordion")
      return
    path.node.name = j.jsxMemberExpression(
      j.jsxIdentifier("Accordion"),
      j.jsxIdentifier("Root"),
    )
  })

  /**
   * Transform <AccordionItem> to <Accordion.Item>
   * Handle render prop children
   * Add value prop if missing
   */
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "AccordionItem" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("AccordionItem")) return

      const element = path.node
      const openingElement = element.openingElement
      const closingElement = element.closingElement

      // Rename to Accordion.Item
      openingElement.name = j.jsxMemberExpression(
        j.jsxIdentifier("Accordion"),
        j.jsxIdentifier("Item"),
      )
      if (closingElement) {
        closingElement.name = j.jsxMemberExpression(
          j.jsxIdentifier("Accordion"),
          j.jsxIdentifier("Item"),
        )
      }

      // Transform props and ensure value prop exists
      const attrs = openingElement.attributes ?? []
      let hasValue = false
      let hasId = false
      let idValue: any = null

      // Transform props
      openingElement.attributes = attrs.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "value":
            hasValue = true
            return attr

          case "id":
            hasId = true
            idValue = attr.value
            // Transform id → value
            return j.jsxAttribute(j.jsxIdentifier("value"), attr.value)

          case "isDisabled":
            // Transform isDisabled → disabled
            return j.jsxAttribute(j.jsxIdentifier("disabled"), attr.value)

          case "isFocusable":
            // Remove isFocusable entirely
            return []

          default:
            return attr
        }
      })

      // Add auto-generated value if no value or id was present
      if (!hasValue && !hasId) {
        openingElement.attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier("value"),
            j.stringLiteral(`item-${itemCounter++}`),
          ),
        )
      } else if (hasId) {
        itemCounter++
      }

      // Check for render prop (function as child)
      if (element.children && element.children.length === 1) {
        const child = element.children[0]
        if (
          child.type === "JSXExpressionContainer" &&
          (child.expression.type === "ArrowFunctionExpression" ||
            child.expression.type === "FunctionExpression")
        ) {
          needsUseAccordionItemContext = true
          const funcExpr = child.expression

          // Extract parameter name (e.g., isExpanded from ({ isExpanded }) => ...)
          let paramName = "context"
          if (
            funcExpr.params.length > 0 &&
            funcExpr.params[0].type === "Identifier"
          ) {
            paramName = funcExpr.params[0].name
          }

          // Create the component wrapper
          const componentName = `AccordionItemContent${itemCounter - 1}`
          const hookCall = j.variableDeclaration("const", [
            j.variableDeclarator(
              funcExpr.params[0] || j.identifier(paramName),
              j.callExpression(j.identifier("useAccordionItemContext"), []),
            ),
          ])

          // Get the function body
          const body =
            funcExpr.body.type === "BlockStatement"
              ? funcExpr.body.body
              : [j.returnStatement(funcExpr.body)]

          // Replace the render prop with the component
          element.children = [
            j.jsxExpressionContainer(
              j.jsxElement(
                j.jsxOpeningElement(j.jsxIdentifier(componentName), [], true),
              ),
            ),
          ]

          // Add the component definition before the Accordion
          const accordionRoot = path.parentPath.parentPath
          if (accordionRoot) {
            const componentDecl = j.variableDeclaration("const", [
              j.variableDeclarator(
                j.identifier(componentName),
                j.arrowFunctionExpression(
                  [],
                  j.blockStatement([hookCall, ...body]),
                ),
              ),
            ])

            // Find the statement containing the accordion
            let statementPath = path
            while (
              statementPath.parentPath &&
              statementPath.parentPath.value.type !== "Program" &&
              statementPath.parentPath.value.type !== "BlockStatement"
            ) {
              statementPath = statementPath.parentPath
            }

            // Insert before the statement
            if (statementPath.parentPath) {
              j(statementPath).insertBefore(componentDecl)
            }
          }
        }
      }
    })

  /**
   * AccordionButton → Accordion.ItemTrigger
   */
  renameComponent(j, root, "AccordionButton", "Accordion.ItemTrigger")

  /**
   * AccordionIcon → Accordion.ItemIndicator
   */
  renameComponent(j, root, "AccordionIcon", "Accordion.ItemIndicator")

  /**
   * AccordionPanel → Accordion.ItemContent + Accordion.ItemBody
   */
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: "AccordionPanel" } },
    })
    .forEach((path) => {
      if (!chakraLocalNames.has("AccordionPanel")) return

      const panel = path.node

      // Check if this panel is inside an accordion with reduceMotion
      let currentParent = path.parent
      let hasReduceMotion = false
      while (currentParent) {
        if (accordionsWithReduceMotion.has(currentParent.value)) {
          hasReduceMotion = true
          break
        }
        currentParent = currentParent.parent
      }

      // Create ItemBody with the panel's children
      const itemBody = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Accordion"),
            j.jsxIdentifier("ItemBody"),
          ),
          [],
          false,
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Accordion"),
            j.jsxIdentifier("ItemBody"),
          ),
        ),
        panel.children,
      )

      // Add animation="none" to ItemContent attributes if reduceMotion was set
      const itemContentAttrs = [...(panel.openingElement.attributes || [])]
      if (hasReduceMotion) {
        itemContentAttrs.push(
          j.jsxAttribute(j.jsxIdentifier("animation"), j.stringLiteral("none")),
        )
      }

      // Create ItemContent wrapping ItemBody
      const itemContent = j.jsxElement(
        j.jsxOpeningElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Accordion"),
            j.jsxIdentifier("ItemContent"),
          ),
          itemContentAttrs,
          false,
        ),
        j.jsxClosingElement(
          j.jsxMemberExpression(
            j.jsxIdentifier("Accordion"),
            j.jsxIdentifier("ItemContent"),
          ),
        ),
        [itemBody],
      )

      j(path).replaceWith(itemContent)
    })

  /**
   * Clean up imports - remove old component names that are no longer used
   */
  const componentsToRemove = [
    "AccordionItem",
    "AccordionButton",
    "AccordionIcon",
    "AccordionPanel",
  ]

  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers || []

      // Filter out old accordion component imports
      path.node.specifiers = specifiers.filter((spec) => {
        if (spec.type !== "ImportSpecifier") return true
        if (spec.imported.type !== "Identifier") return true
        return !componentsToRemove.includes(spec.imported.name)
      })

      // Add useAccordionItemContext if needed
      if (needsUseAccordionItemContext) {
        const hasHook = path.node.specifiers?.some(
          (spec) =>
            spec.type === "ImportSpecifier" &&
            spec.imported.type === "Identifier" &&
            spec.imported.name === "useAccordionItemContext",
        )

        if (!hasHook && path.node.specifiers) {
          path.node.specifiers.push(
            j.importSpecifier(j.identifier("useAccordionItemContext")),
          )
        }
      }
    })

  return root.toSource({ quote: "single" })
}

function renameComponent(j: any, root: any, from: string, to: string) {
  const parts = to.split(".")

  root
    .find(j.JSXIdentifier, { name: from })
    .replaceWith(() =>
      j.jsxMemberExpression(
        j.jsxIdentifier(parts[0]),
        j.jsxIdentifier(parts[1]),
      ),
    )
}

function normalizeIndexValue(j: any, value: any) {
  if (!value) return value

  if (value.type === "JSXExpressionContainer") {
    const expr = value.expression

    if (expr.type === "NumericLiteral") {
      return j.jsxExpressionContainer(
        j.arrayExpression([j.stringLiteral(String(expr.value))]),
      )
    }

    if (expr.type === "ArrayExpression") {
      return j.jsxExpressionContainer(
        j.arrayExpression(
          expr.elements.map((el: any) =>
            el?.type === "NumericLiteral"
              ? j.stringLiteral(String(el.value))
              : el,
          ),
        ),
      )
    }
  }

  return value
}

function wrapOnChange(j: any, value: any) {
  if (!value || value.type !== "JSXExpressionContainer") return value
  return j.jsxExpressionContainer(
    j.arrowFunctionExpression(
      [
        j.objectPattern([
          j.property("init", j.identifier("value"), j.identifier("value")),
        ]),
      ],
      j.callExpression(value.expression, [j.identifier("value")]),
    ),
  )
}
