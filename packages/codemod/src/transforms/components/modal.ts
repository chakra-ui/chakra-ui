import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms Modal to Dialog component:
 * - Modal -> Dialog.Root
 * - ModalOverlay -> Dialog.Backdrop
 * - ModalContent -> Dialog.Content (with Dialog.Positioner wrapper)
 * - ModalHeader -> Dialog.Header
 * - ModalBody -> Dialog.Body
 * - ModalFooter -> Dialog.Footer
 * - ModalCloseButton -> Dialog.CloseTrigger
 * - isOpen -> open
 * - onClose -> onOpenChange
 * - isCentered -> placement="center"
 */

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  const componentMappings: Record<string, string> = {
    Modal: "Dialog.Root",
    ModalOverlay: "Dialog.Backdrop",
    ModalContent: "Dialog.Content",
    ModalHeader: "Dialog.Header",
    ModalBody: "Dialog.Body",
    ModalFooter: "Dialog.Footer",
    ModalCloseButton: "Dialog.CloseTrigger",
  }

  // Transform component names
  Object.entries(componentMappings).forEach(([oldName, newName]) => {
    const [namespace, component] = newName.split(".")

    root
      .find(j.JSXElement, {
        openingElement: { name: { name: oldName } },
      })
      .forEach((path) => {
        const memberExpression = j.jsxMemberExpression(
          j.jsxIdentifier(namespace),
          j.jsxIdentifier(component),
        )

        path.node.openingElement.name = memberExpression

        if (path.node.closingElement) {
          path.node.closingElement.name = memberExpression
        }

        // Transform props on Dialog.Root
        if (oldName === "Modal") {
          const attrs = path.node.openingElement.attributes

          attrs?.forEach((attr) => {
            if (attr.type !== "JSXAttribute") return

            // isOpen -> open
            if (attr.name.name === "isOpen") {
              attr.name.name = "open"
            }

            // onClose -> onOpenChange (note: signature changes)
            if (attr.name.name === "onClose") {
              attr.name.name = "onOpenChange"
              // Add comment about signature change
              const comment = " TODO: Update to (e) => !e.open && onClose() "
              attr.name.name = "onOpenChange" + comment
            }

            // isCentered -> placement="center"
            if (attr.name.name === "isCentered") {
              if (
                attr.value?.type === "JSXExpressionContainer" &&
                attr.value.expression.type === "BooleanLiteral" &&
                attr.value.expression.value === true
              ) {
                attr.name.name = "placement"
                attr.value = j.stringLiteral("center")
              }
            }

            // closeOnOverlayClick -> closeOnInteractOutside
            if (attr.name.name === "closeOnOverlayClick") {
              attr.name.name = "closeOnInteractOutside"
            }

            // closeOnEsc -> closeOnEscape
            if (attr.name.name === "closeOnEsc") {
              attr.name.name = "closeOnEscape"
            }

            // blockScrollOnMount -> preventScroll
            if (attr.name.name === "blockScrollOnMount") {
              attr.name.name = "preventScroll"
            }

            // returnFocusOnClose -> restoreFocus
            if (attr.name.name === "returnFocusOnClose") {
              attr.name.name = "restoreFocus"
            }
          })
        }
      })
  })

  // Update imports
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const specifiers = path.node.specifiers
      if (!specifiers) return

      path.node.specifiers = specifiers.map((spec) => {
        if (spec.type === "ImportSpecifier") {
          const name = spec.imported.name

          if (typeof name === "string" && name in componentMappings) {
            return j.importSpecifier(j.identifier("Dialog"))
          }
        }
        return spec
      })
    })

  return root.toSource({ quote: "single" })
}
