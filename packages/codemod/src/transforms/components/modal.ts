import type { API, FileInfo, Options } from "jscodeshift"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"
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

  const { chakraLocalNames, componentAliases } = collectChakraLocalNames(
    j,
    root,
  )
  if (chakraLocalNames.size === 0) return file.source

  const isChakraModalBase = (baseName: string) => {
    return (
      baseName === "Modal" ||
      (componentAliases.has(baseName) &&
        componentAliases.get(baseName) === "Modal")
    )
  }

  // Rename Modal and parts to Dialog.*
  root.find(j.JSXElement).forEach((path) => {
    const opening = path.node.openingElement
    const baseName = getJsxBaseName(opening.name)
    if (!chakraLocalNames.has(baseName)) return
    if (isChakraModalBase(baseName)) {
      opening.name = j.jsxMemberExpression(
        j.jsxIdentifier("Dialog"),
        j.jsxIdentifier("Root"),
      )
      if (path.node.closingElement) {
        path.node.closingElement.name = j.jsxMemberExpression(
          j.jsxIdentifier("Dialog"),
          j.jsxIdentifier("Root"),
        )
      }
      const attrs = opening.attributes || []
      attrs.forEach((attr) => {
        if (attr.type !== "JSXAttribute" || attr.name.type !== "JSXIdentifier")
          return
        const name = attr.name.name
        if (name === "isOpen") attr.name.name = "open"
        if (name === "onClose") attr.name.name = "onOpenChange"
        if (name === "isCentered") {
          attr.name.name = "placement"
          attr.value = j.stringLiteral("center")
        }
        if (name === "closeOnOverlayClick")
          attr.name.name = "closeOnInteractOutside"
        if (name === "closeOnEsc") attr.name.name = "closeOnEscape"
        if (name === "blockScrollOnMount") attr.name.name = "preventScroll"
        if (name === "returnFocusOnClose") attr.name.name = "restoreFocus"
      })
      return
    }
    // Parts remap
    const partsMap: Record<string, { ns: string; part: string }> = {
      ModalOverlay: { ns: "Dialog", part: "Backdrop" },
      ModalContent: { ns: "Dialog", part: "Content" },
      ModalHeader: { ns: "Dialog", part: "Header" },
      ModalBody: { ns: "Dialog", part: "Body" },
      ModalFooter: { ns: "Dialog", part: "Footer" },
      ModalCloseButton: { ns: "Dialog", part: "CloseTrigger" },
    }
    if (partsMap[baseName]) {
      const { ns, part } = partsMap[baseName]
      opening.name = j.jsxMemberExpression(
        j.jsxIdentifier(ns),
        j.jsxIdentifier(part),
      )
      if (path.node.closingElement) {
        path.node.closingElement.name = j.jsxMemberExpression(
          j.jsxIdentifier(ns),
          j.jsxIdentifier(part),
        )
      }
      // Special handling: wrap Content inside Positioner
      if (baseName === "ModalContent") {
        const contentEl = path.node
        const positionerName = j.jsxMemberExpression(
          j.jsxIdentifier("Dialog"),
          j.jsxIdentifier("Positioner"),
        )
        const wrapped = j.jsxElement(
          j.jsxOpeningElement(positionerName, [], false),
          j.jsxClosingElement(positionerName),
          [contentEl],
        )
        j(path).replaceWith(wrapped)
      }
    }
  })

  // Update imports: replace Modal-related imports with Dialog
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((impPath) => {
      const specs = impPath.node.specifiers || []
      let needsDialog = false
      const modalNames = new Set([
        "Modal",
        "ModalOverlay",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
        "ModalCloseButton",
      ])
      const filtered = specs.filter((spec) => {
        if (spec.type === "ImportSpecifier") {
          const importedName =
            (spec.imported as any)?.name ?? (spec.imported as any)
          if (
            typeof importedName === "string" &&
            modalNames.has(importedName)
          ) {
            needsDialog = true
            return false
          }
        }
        return true
      })
      impPath.node.specifiers = filtered
      if (needsDialog) {
        const hasDialog = filtered.some(
          (s) => s.type === "ImportSpecifier" && s.imported.name === "Dialog",
        )
        if (!hasDialog) {
          impPath.node.specifiers.push(
            j.importSpecifier(j.identifier("Dialog")),
          )
        }
      }
    })

  return root.toSource({ quote: "single" })
}
