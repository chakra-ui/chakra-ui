import { Node, SyntaxKind } from "ts-morph"
import type { JsxAttribute, JsxElement, SourceFile } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const ALERT_DIALOG_COMPONENTS = [
  "AlertDialog",
  "AlertDialogOverlay",
  "AlertDialogContent",
  "AlertDialogHeader",
  "AlertDialogBody",
  "AlertDialogFooter",
  "AlertDialogCloseButton",
]

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

const RENAME_PASSTHROUGH = new Set([
  "motionPreset",
  "scrollBehavior",
  "trapFocus",
])

const REMOVE_PROPS = new Set([
  "allowPinchZoom",
  "autoFocus",
  "lockFocusAcrossFrames",
  "preserveScrollBarGap",
  "returnFocusOnClose",
  "useInert",
  "portalProps",
])

const SIMPLE_RENAMES: Record<string, string> = {
  closeOnOverlayClick: "closeOnInteractOutside",
  closeOnEsc: "closeOnEscape",
  blockScrollOnMount: "preventScroll",
  onCloseComplete: "onExitComplete",
  onEsc: "onEscapeKeyDown",
  onOverlayClick: "onInteractOutside",
}

const REF_RENAMES: Record<string, string> = {
  finalFocusRef: "finalFocusEl",
  initialFocusRef: "initialFocusEl",
  leastDestructiveRef: "initialFocusEl",
}

/** `name` or `name={init}` / `name="str"` preserving the original value text. */
function keepAttr(newName: string, attr: JsxAttribute): string {
  const init = attr.getInitializer()
  return init ? `${newName}=${init.getText()}` : newName
}

/** The inner expression text of a JSX attribute value (drops `{}` / keeps a string). */
function valueExprText(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (!init) return "true"
  if (Node.isJsxExpression(init))
    return init.getExpression()?.getText() ?? "undefined"
  return init.getText()
}

function handlerStatement(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  const expr =
    init && Node.isJsxExpression(init) ? init.getExpression() : undefined
  if (!expr) return ""
  if (Node.isArrowFunction(expr) || Node.isFunctionExpression(expr)) {
    const body = expr.getBody()
    if (Node.isBlock(body)) {
      return body
        .getStatements()
        .map((s) => s.getText())
        .join("\n")
    }
    return body.getText()
  }
  return `${expr.getText()}()`
}

/** Reproduce processDialogProps: returns the ordered list of attribute source strings. */
function processDialogProps(el: JsxElement): string[] {
  const attrs = el.getOpeningElement().getAttributes()
  const out: string[] = []
  let onCloseStmt: string | null = null

  for (const attr of attrs) {
    if (!Node.isJsxAttribute(attr)) {
      out.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()

    if (name === "isOpen") {
      out.push(keepAttr("open", attr))
      continue
    }
    if (name === "onClose") {
      onCloseStmt = handlerStatement(attr)
      continue
    }
    if (name === "isCentered") {
      out.push(`placement="center"`)
      continue
    }
    if (SIMPLE_RENAMES[name]) {
      out.push(keepAttr(SIMPLE_RENAMES[name], attr))
      continue
    }
    if (REF_RENAMES[name]) {
      out.push(`${REF_RENAMES[name]}={() => ${valueExprText(attr)}.current}`)
      continue
    }
    if (name === "size") {
      const init = attr.getInitializer()
      if (init && Node.isStringLiteral(init)) {
        const size = init.getLiteralValue()
        out.push(`size="${SIZE_MAP[size] ?? size}"`)
      } else {
        out.push(attr.getText())
      }
      continue
    }
    if (RENAME_PASSTHROUGH.has(name)) {
      out.push(attr.getText())
      continue
    }
    if (REMOVE_PROPS.has(name)) {
      continue
    }
    out.push(attr.getText())
  }

  // AlertDialog always adds role="alertdialog"
  out.push(`role="alertdialog"`)

  if (onCloseStmt !== null) {
    out.push(`onOpenChange={(e) => {\nif (!e.open) {\n${onCloseStmt}\n}\n}}`)
  }

  return out
}

/** Raw inner text between an element's opening and closing tags. */
function innerText(el: JsxElement): string {
  const full = el.getText()
  const open = el.getOpeningElement().getText()
  const close = el.getClosingElement()?.getText() ?? ""
  return full.slice(open.length, full.length - close.length)
}

function attrsPart(el: JsxElement): string {
  const attrs = el.getOpeningElement().getAttributes()
  return attrs.length ? " " + attrs.map((a) => a.getText()).join(" ") : ""
}

function findElement(
  sourceFile: SourceFile,
  name: string,
): JsxElement | undefined {
  return sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .find(
      (el) => getJsxBaseName(el.getOpeningElement().getTagNameNode()) === name,
    )
}

function findSelfClosing(sourceFile: SourceFile, name: string) {
  return sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
    .find((el) => getJsxBaseName(el.getTagNameNode()) === name)
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const transformed = new Set<string>()

  // 1. AlertDialog -> Dialog.Root (+ props, wrap children in Portal)
  if (chakraLocalNames.has("AlertDialog")) {
    let el: JsxElement | undefined
    while ((el = findElement(sourceFile, "AlertDialog"))) {
      const attrList = processDialogProps(el)
      const attrText = attrList.length ? " " + attrList.join(" ") : ""
      const children = innerText(el)
      const inner = children.trim() ? `<Portal>${children}</Portal>` : children
      el.replaceWithText(`<Dialog.Root${attrText}>${inner}</Dialog.Root>`)
      transformed.add("AlertDialog")
    }
  }

  // 2. AlertDialogOverlay -> Dialog.Backdrop (keep children)
  renamePhase(
    sourceFile,
    chakraLocalNames,
    transformed,
    "AlertDialogOverlay",
    "Dialog.Backdrop",
  )

  // 3. AlertDialogContent -> Dialog.Positioner > Dialog.Content
  if (chakraLocalNames.has("AlertDialogContent")) {
    let el: JsxElement | undefined
    while ((el = findElement(sourceFile, "AlertDialogContent"))) {
      const part = attrsPart(el)
      const children = innerText(el)
      el.replaceWithText(
        `<Dialog.Positioner><Dialog.Content${part}>${children}</Dialog.Content></Dialog.Positioner>`,
      )
      transformed.add("AlertDialogContent")
    }
  }

  // 4. Simple renames
  renamePhase(
    sourceFile,
    chakraLocalNames,
    transformed,
    "AlertDialogHeader",
    "Dialog.Header",
  )
  renamePhase(
    sourceFile,
    chakraLocalNames,
    transformed,
    "AlertDialogBody",
    "Dialog.Body",
  )
  renamePhase(
    sourceFile,
    chakraLocalNames,
    transformed,
    "AlertDialogFooter",
    "Dialog.Footer",
  )
  renamePhase(
    sourceFile,
    chakraLocalNames,
    transformed,
    "AlertDialogCloseButton",
    "Dialog.CloseTrigger",
  )

  // 5. Update imports
  if (transformed.size > 0) {
    const importDecl = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
    )
    if (importDecl) {
      for (const named of importDecl.getNamedImports()) {
        if (ALERT_DIALOG_COMPONENTS.includes(named.getName())) named.remove()
      }
      const names = importDecl.getNamedImports().map((n) => n.getName())
      if (!names.includes("Dialog")) importDecl.addNamedImport("Dialog")
      if (!names.includes("Portal")) importDecl.addNamedImport("Portal")
    }
  }
}

function renamePhase(
  sourceFile: SourceFile,
  chakraLocalNames: Set<string>,
  transformed: Set<string>,
  from: string,
  to: string,
) {
  if (!chakraLocalNames.has(from)) return

  let el: JsxElement | undefined
  while ((el = findElement(sourceFile, from))) {
    el.getClosingElement()?.getTagNameNode().replaceWithText(to)
    el.getOpeningElement().getTagNameNode().replaceWithText(to)
    transformed.add(from)
  }

  let sc = findSelfClosing(sourceFile, from)
  while (sc) {
    sc.getTagNameNode().replaceWithText(to)
    transformed.add(from)
    sc = findSelfClosing(sourceFile, from)
  }
}

export default transform
