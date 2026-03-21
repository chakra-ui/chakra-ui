import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const disclosureNames = new Set<string>()

  // 1. Find useDisclosure and handle renames/tracking
  root.find(j.VariableDeclarator).forEach((path) => {
    const init = path.node.init

    if (
      init?.type === "CallExpression" &&
      init.callee.type === "Identifier" &&
      init.callee.name === "useDisclosure"
    ) {
      // Scenario: const menu = useDisclosure()
      if (path.node.id.type === "Identifier") {
        disclosureNames.add(path.node.id.name)
      }

      // Scenario: const { isOpen, onOpen } = useDisclosure()
      if (path.node.id.type === "ObjectPattern") {
        path.node.id.properties.forEach((prop) => {
          if (
            prop.type === "ObjectProperty" &&
            prop.key.type === "Identifier" &&
            prop.key.name === "isOpen"
          ) {
            // Rename key to 'open'
            prop.key.name = "open"

            // If it wasn't aliased (const { isOpen }), rename the value too
            if (
              prop.value.type === "Identifier" &&
              prop.value.name === "isOpen"
            ) {
              prop.value.name = "open"
            }
          }
        })
      }
    }
  })

  // 2. Update references: menu.isOpen -> menu.open
  if (disclosureNames.size > 0) {
    root.find(j.MemberExpression).forEach((path) => {
      if (
        path.node.object.type === "Identifier" &&
        disclosureNames.has(path.node.object.name) &&
        path.node.property.type === "Identifier" &&
        path.node.property.name === "isOpen"
      ) {
        path.node.property.name = "open"
      }
    })
  }

  // 3. Update JSX usage for onOpenChange callback signature
  // Transforms:
  // onOpenChange={menu.onClose}
  // -> onOpenChange={(e) => menu.onClose()}
  root
    .find(j.JSXAttribute, { name: { name: "onOpenChange" } })
    .forEach((path) => {
      const value = path.node.value
      if (!value || value.type !== "JSXExpressionContainer") return

      const expr = value.expression

      // Ignore if already a function
      if (
        expr.type === "ArrowFunctionExpression" ||
        expr.type === "FunctionExpression"
      ) {
        return
      }

      const isDisclosureCall =
        (expr.type === "MemberExpression" &&
          expr.object.type === "Identifier" &&
          disclosureNames.has(expr.object.name)) ||
        (expr.type === "Identifier" && expr.name === "onClose")

      if (isDisclosureCall) {
        path.node.value = j.jsxExpressionContainer(
          j.arrowFunctionExpression(
            [j.identifier("e")],
            j.callExpression(expr, []),
          ),
        )
      }
    })

  return root.toSource({ quote: "single" })
}
