import type { API, FileInfo, Options } from "jscodeshift"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"
import {
  processDialogProps,
  renameToMemberExpression,
  transformDialogContent,
  updateDialogImports,
} from "../../utils/dialog-utils"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms AlertDialog components to v3 Dialog compound component API
 *
 * @example
 * // Before
 * <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
 *   <AlertDialogOverlay>
 *     <AlertDialogContent>
 *       <AlertDialogHeader>Delete Customer</AlertDialogHeader>
 *       <AlertDialogBody>
 *         Are you sure? You can't undo this action afterwards.
 *       </AlertDialogBody>
 *       <AlertDialogFooter>
 *         <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
 *         <Button colorScheme='red' onClick={onDelete} ml={3}>Delete</Button>
 *       </AlertDialogFooter>
 *     </AlertDialogContent>
 *   </AlertDialogOverlay>
 * </AlertDialog>
 *
 * // After
 * <Dialog.Root
 *   open={isOpen}
 *   initialFocusEl={() => cancelRef.current}
 *   onOpenChange={(e) => { if (!e.open) onClose() }}
 *   role="alertdialog"
 * >
 *   <Portal>
 *     <Dialog.Backdrop />
 *     <Dialog.Positioner>
 *       <Dialog.Content>
 *         <Dialog.Header>Delete Customer</Dialog.Header>
 *         <Dialog.Body>
 *           Are you sure? You can't undo this action afterwards.
 *         </Dialog.Body>
 *         <Dialog.Footer>
 *           <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
 *           <Button colorScheme='red' onClick={onDelete} ml={3}>Delete</Button>
 *         </Dialog.Footer>
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

  // Transform AlertDialog
  if (chakraLocalNames.has("AlertDialog")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialog" } },
      })
      .forEach((path) => {
        transformAlertDialog(j, path)
        transformedComponents.add("AlertDialog")
      })
  }

  // Transform AlertDialogOverlay
  if (chakraLocalNames.has("AlertDialogOverlay")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialogOverlay" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Backdrop")
        transformedComponents.add("AlertDialogOverlay")
      })
  }

  // Transform AlertDialogContent
  if (chakraLocalNames.has("AlertDialogContent")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialogContent" } },
      })
      .forEach((path) => {
        transformDialogContent(j, path, "Dialog")
        transformedComponents.add("AlertDialogContent")
      })
  }

  // Transform AlertDialogHeader
  if (chakraLocalNames.has("AlertDialogHeader")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialogHeader" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Header")
        transformedComponents.add("AlertDialogHeader")
      })
  }

  // Transform AlertDialogBody
  if (chakraLocalNames.has("AlertDialogBody")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialogBody" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Body")
        transformedComponents.add("AlertDialogBody")
      })
  }

  // Transform AlertDialogFooter
  if (chakraLocalNames.has("AlertDialogFooter")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialogFooter" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "Footer")
        transformedComponents.add("AlertDialogFooter")
      })
  }

  // Transform AlertDialogCloseButton
  if (chakraLocalNames.has("AlertDialogCloseButton")) {
    root
      .find(j.JSXElement, {
        openingElement: { name: { name: "AlertDialogCloseButton" } },
      })
      .forEach((path) => {
        renameToMemberExpression(j, path, "Dialog", "CloseTrigger")
        transformedComponents.add("AlertDialogCloseButton")
      })
  }

  // Update imports
  if (transformedComponents.size > 0) {
    const alertDialogComponentNames = [
      "AlertDialog",
      "AlertDialogOverlay",
      "AlertDialogContent",
      "AlertDialogHeader",
      "AlertDialogBody",
      "AlertDialogFooter",
      "AlertDialogCloseButton",
    ]
    updateDialogImports(
      j,
      root,
      transformedComponents,
      alertDialogComponentNames,
    )
  }

  return root.toSource({ quote: "single" })
}

/**
 * Transform AlertDialog to Dialog.Root and wrap children in Portal
 * Adds role="alertdialog" attribute
 */
function transformAlertDialog(j: any, path: any) {
  const attrs = path.node.openingElement.attributes || []
  const children = path.node.children || []

  // Process props with alertdialog role
  const newAttrs = processDialogProps(j, attrs, {
    componentType: "alertdialog",
    additionalRole: "alertdialog",
  })

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
  // In v2, AlertDialog automatically rendered backdrop/content in a portal
  if (children.length > 0) {
    const portalElement = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier("Portal"), []),
      j.jsxClosingElement(j.jsxIdentifier("Portal")),
      [j.jsxText("\n    "), ...children, j.jsxText("\n  ")],
    )
    path.node.children = [j.jsxText("\n  "), portalElement, j.jsxText("\n")]
  }
}
