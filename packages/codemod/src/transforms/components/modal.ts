import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import { createParserFromPath } from "../../utils/parser"
import {
  processDialogProps,
  renameToMemberExpression,
  transformDialogContent,
  updateDialogImports,
} from "./dialog-utils"

/**
 * Transforms Modal components to v3 Dialog compound component API
 *
 * @example
 * // Before
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   <ModalOverlay />
 *   <ModalContent>
 *     <ModalHeader>Title</ModalHeader>
 *     <ModalCloseButton />
 *     <ModalBody>Body</ModalBody>
 *   </ModalContent>
 * </Modal>
 *
 * // After
 * <Dialog.Root open={isOpen} onOpenChange={(e) => { if (!e.open) onClose() }}>
 *   <Portal>
 *     <Dialog.Backdrop />
 *     <Dialog.Positioner>
 *       <Dialog.Content>
 *         <Dialog.Header>Title</Dialog.Header>
 *         <Dialog.CloseTrigger />
 *         <Dialog.Body>Body</Dialog.Body>
 *       </Dialog.Content>
 *     </Dialog.Positioner>
 *   </Portal>
 * </Dialog.Root>
 */
export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)
  const { chakraLocalNames } = collectChakraLocalNames(j, root)

  if (chakraLocalNames.size === 0) return file.source

  const transformedComponents = new Set<string>()

  // Transform Modal
  if (chakraLocalNames.has("Modal")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "Modal" } },
      })
      .forEach((path) => {
        transformModal(j, path)
        transformedComponents.add("Modal")
      })
  }

  // Transform ModalOverlay
  if (chakraLocalNames.has("ModalOverlay")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ModalOverlay" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Backdrop")
        transformedComponents.add("ModalOverlay")
      })
  }

  // Transform ModalContent
  if (chakraLocalNames.has("ModalContent")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ModalContent" } },
      })
      .forEach((path) => {
        transformDialogContent(j, path, "Dialog")
        transformedComponents.add("ModalContent")
      })
  }

  // Transform ModalHeader
  if (chakraLocalNames.has("ModalHeader")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ModalHeader" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Header")
        transformedComponents.add("ModalHeader")
      })
  }

  // Transform ModalBody
  if (chakraLocalNames.has("ModalBody")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ModalBody" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Body")
        transformedComponents.add("ModalBody")
      })
  }

  // Transform ModalFooter
  if (chakraLocalNames.has("ModalFooter")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ModalFooter" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Footer")
        transformedComponents.add("ModalFooter")
      })
  }

  // Transform ModalCloseButton
  if (chakraLocalNames.has("ModalCloseButton")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "ModalCloseButton" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "CloseTrigger")
        transformedComponents.add("ModalCloseButton")
      })
  }

  // Update imports
  if (transformedComponents.size > 0) {
    const modalComponentNames = [
      "Modal",
      "ModalOverlay",
      "ModalContent",
      "ModalHeader",
      "ModalBody",
      "ModalFooter",
      "ModalCloseButton",
    ]
    updateDialogImports(j, root, transformedComponents, modalComponentNames)
  }

  return root.toSource({ quote: "single" })
}

/**
 * Transform Modal to Dialog.Root and wrap children in Portal
 */
function transformModal(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  const newAttrs = processDialogProps(j, attrs, { componentType: "modal" })

  // Update component name to Dialog.Root
  path.node.openingElement.name = j.jsxMemberExpression(
    j.jsxIdentifier("Dialog"),
    j.jsxIdentifier("Root"),
  )

  if (path.node.closingElement) {
    path.node.closingElement.name = j.jsxMemberExpression(
      j.jsxIdentifier("Dialog"),
      j.jsxIdentifier("Root"),
    )
  }

  path.node.openingElement.attributes = newAttrs

  // Wrap children in Portal (mimicking v2 behavior)
  // In v2, Modal automatically rendered backdrop/content in a portal
  if (children.length > 0) {
    const portalElement = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier("Portal"), []),
      j.jsxClosingElement(j.jsxIdentifier("Portal")),
      [j.jsxText("\n    "), ...children, j.jsxText("\n  ")],
    )
    path.node.children = [j.jsxText("\n  "), portalElement, j.jsxText("\n")]
  }
}
