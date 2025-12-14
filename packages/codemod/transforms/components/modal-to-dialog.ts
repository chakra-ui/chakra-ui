import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Map of old component names to new component names
  const componentNameMap: Record<string, string> = {
    Modal: "Dialog.Root",
    ModalOverlay: "Dialog.Backdrop",
    ModalContent: "Dialog.Content",
    ModalHeader: "Dialog.Header",
    ModalBody: "Dialog.Body",
    ModalFooter: "Dialog.Footer",
    ModalCloseButton: "Dialog.CloseTrigger",
  }

  // Transform component names
  Object.entries(componentNameMap).forEach(([oldName, newName]) => {
    root
      .find(j.JSXOpeningElement, { name: { name: oldName } })
      .forEach((path) => {
        const [namespace, component] = newName.split(".")
        path.node.name = j.jsxMemberExpression(
          j.jsxIdentifier(namespace),
          j.jsxIdentifier(component),
        )
      })

    root
      .find(j.JSXClosingElement, { name: { name: oldName } })
      .forEach((path) => {
        const [namespace, component] = newName.split(".")
        path.node.name = j.jsxMemberExpression(
          j.jsxIdentifier(namespace),
          j.jsxIdentifier(component),
        )
      })
  })

  // Transform props on Dialog.Root (formerly Modal)
  root
    .find(j.JSXOpeningElement, {
      name: {
        type: "JSXMemberExpression",
        object: { name: "Dialog" },
        property: { name: "Root" },
      },
    })
    .forEach((path) => {
      const attributes = path.node.attributes ?? []

      const newAttributes = attributes.flatMap((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return attr

        switch (attr.name.name) {
          case "isOpen":
            return j.jsxAttribute(j.jsxIdentifier("open"), attr.value)
          case "onClose":
            // onClose becomes onOpenChange with different signature
            // We'll keep the prop but rename it
            return j.jsxAttribute(j.jsxIdentifier("onOpenChange"), attr.value)
          case "isCentered":
            // isCentered becomes placement="center"
            return j.jsxAttribute(
              j.jsxIdentifier("placement"),
              j.stringLiteral("center"),
            )
          case "closeOnOverlayClick":
            return j.jsxAttribute(
              j.jsxIdentifier("closeOnInteractOutside"),
              attr.value,
            )
          case "closeOnEsc":
            return j.jsxAttribute(j.jsxIdentifier("closeOnEscape"), attr.value)
          case "blockScrollOnMount":
            return j.jsxAttribute(j.jsxIdentifier("preventScroll"), attr.value)
          case "returnFocusOnClose":
            return j.jsxAttribute(j.jsxIdentifier("restoreFocus"), attr.value)
          case "initialFocusRef":
          case "finalFocusRef":
            // These need manual conversion to functions
            // Keep them but add a comment
            return attr
          default:
            return attr
        }
      })

      path.node.attributes = newAttributes
    })

  return root.toSource({ quote: "single" })
}
