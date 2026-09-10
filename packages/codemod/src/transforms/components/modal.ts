import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

const SIZE_MAP: Record<string, string> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "xl",
  "3xl": "xl",
  "4xl": "xl",
  "5xl": "xl",
  "6xl": "xl",
  full: "full",
}

const REMOVE_PROPS = [
  "allowPinchZoom",
  "autoFocus",
  "lockFocusAcrossFrames",
  "preserveScrollBarGap",
  "returnFocusOnClose",
  "useInert",
  "portalProps",
]

/** Raw text of an attribute's value expression (inside braces / string). */
function valueText(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (!init) return "true"
  if (Node.isStringLiteral(init)) return init.getText()
  if (Node.isJsxExpression(init)) return init.getExpression()?.getText() ?? ""
  return init.getText()
}

/** The `=...` suffix of an attribute (empty for a boolean shorthand). */
function initSuffix(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  return init ? `=${init.getText()}` : ""
}

/** Build the body statements of the generated onOpenChange handler. */
function handlerBody(handler: Node): string {
  if (Node.isArrowFunction(handler) || Node.isFunctionExpression(handler)) {
    const body = handler.getBody()
    if (Node.isBlock(body)) {
      return body
        .getStatements()
        .map((s) => s.getText())
        .join("\n")
    }
    return body.getText()
  }
  return `${handler.getText()}()`
}

/** Port of processDialogProps: returns the Dialog.Root attribute strings. */
function buildDialogAttrs(opening: JsxOpening): string[] {
  const out: string[] = []
  let onCloseHandler: Node | undefined

  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      out.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()

    switch (name) {
      case "isOpen":
        out.push(`open${initSuffix(attr)}`)
        break
      case "onClose": {
        const init = attr.getInitializer()
        if (init && Node.isJsxExpression(init)) {
          onCloseHandler = init.getExpression()
        } else if (init && Node.isStringLiteral(init)) {
          onCloseHandler = init
        }
        break
      }
      case "isCentered":
        out.push(`placement="center"`)
        break
      case "closeOnOverlayClick":
        out.push(`closeOnInteractOutside${initSuffix(attr)}`)
        break
      case "closeOnEsc":
        out.push(`closeOnEscape${initSuffix(attr)}`)
        break
      case "blockScrollOnMount":
        out.push(`preventScroll${initSuffix(attr)}`)
        break
      case "onCloseComplete":
        out.push(`onExitComplete${initSuffix(attr)}`)
        break
      case "onEsc":
        out.push(`onEscapeKeyDown${initSuffix(attr)}`)
        break
      case "onOverlayClick":
        out.push(`onInteractOutside${initSuffix(attr)}`)
        break
      case "finalFocusRef":
        out.push(`finalFocusEl={() => ${valueText(attr)}.current}`)
        break
      case "initialFocusRef":
        out.push(`initialFocusEl={() => ${valueText(attr)}.current}`)
        break
      case "size": {
        const init = attr.getInitializer()
        if (init && Node.isStringLiteral(init)) {
          const mapped =
            SIZE_MAP[init.getLiteralValue()] ?? init.getLiteralValue()
          out.push(`size="${mapped}"`)
        } else {
          out.push(attr.getText())
        }
        break
      }
      case "motionPreset":
      case "scrollBehavior":
      case "trapFocus":
        out.push(attr.getText())
        break
      default:
        if (REMOVE_PROPS.includes(name)) break
        out.push(attr.getText())
    }
  }

  if (onCloseHandler) {
    out.push(
      `onOpenChange={(e) => {\nif (!e.open) {\n${handlerBody(onCloseHandler)}\n}\n}}`,
    )
  }

  return out
}

function childrenText(el: JsxElement, sourceFile: SourceFile): string {
  const start = el.getOpeningElement().getEnd()
  const end = el.getClosingElement().getStart()
  return sourceFile.getFullText().slice(start, end)
}

function renameLeaf(
  sourceFile: SourceFile,
  from: string,
  to: string,
  chakra: Set<string>,
) {
  if (!chakra.has(from)) return false
  let found = false
  while (true) {
    const openings: JsxOpening[] = [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ]
    const opening = openings.find((o) => {
      const tag = o.getTagNameNode()
      return Node.isIdentifier(tag) && tag.getText() === from
    })
    if (!opening) break
    found = true
    if (Node.isJsxSelfClosingElement(opening)) {
      opening.getTagNameNode().replaceWithText(to)
    } else {
      const parent = opening.getParentIfKind(SyntaxKind.JsxElement)
      parent?.getClosingElement()?.getTagNameNode().replaceWithText(to)
      opening.getTagNameNode().replaceWithText(to)
    }
  }
  return found
}

function findFirstElement(
  sourceFile: SourceFile,
  name: string,
): JsxElement | undefined {
  return sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement).find((e) => {
    const tag = e.getOpeningElement().getTagNameNode()
    return Node.isIdentifier(tag) && tag.getText() === name
  })
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const transformed = new Set<string>()

  // 1. Leaf renames (also inside ModalContent, done before wrapping).
  if (
    renameLeaf(sourceFile, "ModalOverlay", "Dialog.Backdrop", chakraLocalNames)
  )
    transformed.add("ModalOverlay")
  if (renameLeaf(sourceFile, "ModalHeader", "Dialog.Header", chakraLocalNames))
    transformed.add("ModalHeader")
  if (renameLeaf(sourceFile, "ModalBody", "Dialog.Body", chakraLocalNames))
    transformed.add("ModalBody")
  if (renameLeaf(sourceFile, "ModalFooter", "Dialog.Footer", chakraLocalNames))
    transformed.add("ModalFooter")
  if (
    renameLeaf(
      sourceFile,
      "ModalCloseButton",
      "Dialog.CloseTrigger",
      chakraLocalNames,
    )
  )
    transformed.add("ModalCloseButton")

  // 2. ModalContent -> Dialog.Positioner > Dialog.Content
  if (chakraLocalNames.has("ModalContent")) {
    while (true) {
      const content = findFirstElement(sourceFile, "ModalContent")
      if (!content) break
      transformed.add("ModalContent")
      content
        .getClosingElement()
        ?.getTagNameNode()
        .replaceWithText("Dialog.Content")
      content
        .getOpeningElement()
        .getTagNameNode()
        .replaceWithText("Dialog.Content")
      content.replaceWithText(
        `<Dialog.Positioner>\n${content.getText()}\n</Dialog.Positioner>`,
      )
    }
  }

  // 3. Modal -> Dialog.Root, wrap children in Portal.
  if (chakraLocalNames.has("Modal")) {
    while (true) {
      const modal = findFirstElement(sourceFile, "Modal")
      if (!modal) break
      transformed.add("Modal")
      const attrs = buildDialogAttrs(modal.getOpeningElement())
      const attrsPrefix = attrs.length ? ` ${attrs.join(" ")}` : ""
      const inner = childrenText(modal, sourceFile)
      modal.replaceWithText(
        `<Dialog.Root${attrsPrefix}>\n<Portal>${inner}</Portal>\n</Dialog.Root>`,
      )
    }
  }

  // 4. Update imports.
  if (transformed.size > 0) {
    const importDecl = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
    )
    if (importDecl) {
      const modalNames = [
        "Modal",
        "ModalOverlay",
        "ModalContent",
        "ModalHeader",
        "ModalBody",
        "ModalFooter",
        "ModalCloseButton",
      ]
      for (const spec of importDecl.getNamedImports()) {
        if (modalNames.includes(spec.getName())) spec.remove()
      }
      const names = importDecl.getNamedImports().map((n) => n.getName())
      if (!names.includes("Dialog")) importDecl.addNamedImport("Dialog")
      if (transformed.has("Modal") && !names.includes("Portal")) {
        importDecl.addNamedImport("Portal")
      }
    }
  }
}

export default transform
