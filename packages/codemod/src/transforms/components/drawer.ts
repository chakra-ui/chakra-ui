import { Node, SyntaxKind } from "ts-morph"
import type { JsxChild } from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const PLACEMENT_MAP: Record<string, string> = {
  left: "start",
  right: "end",
  start: "start",
  end: "end",
  top: "top",
  bottom: "bottom",
}

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

// Rename map for sub-components (DrawerContent handled specially).
const NAME_MAP: Record<string, string> = {
  DrawerOverlay: "Drawer.Backdrop",
  DrawerHeader: "Drawer.Header",
  DrawerBody: "Drawer.Body",
  DrawerFooter: "Drawer.Footer",
  DrawerCloseButton: "Drawer.CloseTrigger",
}

const DRAWER_SUBCOMPONENTS = [
  "DrawerOverlay",
  "DrawerContent",
  "DrawerHeader",
  "DrawerBody",
  "DrawerFooter",
  "DrawerCloseButton",
]

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return
  if (!chakraLocalNames.has("Drawer")) return

  const drawers = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .filter(
      (el) =>
        getJsxBaseName(el.getOpeningElement().getTagNameNode()) === "Drawer",
    )
    .sort((a, b) => b.getStart() - a.getStart())

  let transformed = false

  for (const el of drawers) {
    const opening = el.getOpeningElement()
    const { attrs, isFullHeight } = computeRootAttrs(opening)

    const renderNode = (child: JsxChild): string => {
      if (Node.isJsxSelfClosingElement(child) || Node.isJsxElement(child)) {
        const childOpening = Node.isJsxElement(child)
          ? child.getOpeningElement()
          : child
        const base = getJsxBaseName(childOpening.getTagNameNode())

        if (!chakraLocalNames.has(base)) return child.getText()

        const childAttrs = childOpening.getAttributes().map((a) => a.getText())

        if (base === "DrawerContent") {
          const contentAttrs = [...childAttrs]
          if (isFullHeight) contentAttrs.push(`height="100%"`)
          const attrsPart = contentAttrs.length
            ? " " + contentAttrs.join(" ")
            : ""
          const inner = Node.isJsxElement(child)
            ? child.getJsxChildren().map(renderNode).join("")
            : ""
          const content = Node.isJsxSelfClosingElement(child)
            ? `<Drawer.Content${attrsPart} />`
            : `<Drawer.Content${attrsPart}>${inner}</Drawer.Content>`
          return `<Drawer.Positioner>${content}</Drawer.Positioner>`
        }

        const mapped = NAME_MAP[base]
        if (mapped) {
          const attrsPart = childAttrs.length ? " " + childAttrs.join(" ") : ""
          if (Node.isJsxSelfClosingElement(child)) {
            return `<${mapped}${attrsPart} />`
          }
          const inner = child.getJsxChildren().map(renderNode).join("")
          return `<${mapped}${attrsPart}>${inner}</${mapped}>`
        }
      }
      return child.getText()
    }

    const childrenText = el.getJsxChildren().map(renderNode).join("")
    const attrsStr = attrs.length ? " " + attrs.join(" ") : ""
    const body = childrenText ? `<Portal>${childrenText}</Portal>` : ""

    el.replaceWithText(`<Drawer.Root${attrsStr}>${body}</Drawer.Root>`)
    transformed = true
  }

  if (transformed) updateDrawerImports(sourceFile)
}

function computeRootAttrs(opening: import("ts-morph").JsxOpeningElement): {
  attrs: string[]
  isFullHeight: boolean
} {
  const attrs: string[] = []
  let isFullHeight = false
  let onCloseInner: string | undefined
  let onCloseIsFn = false
  let onCloseFnBody: string | undefined

  const removed = new Set([
    "allowPinchZoom",
    "autoFocus",
    "lockFocusAcrossFrames",
    "preserveScrollBarGap",
    "returnFocusOnClose",
    "useInert",
    "portalProps",
  ])

  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      attrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    const init = attr.getInitializer()
    const initText = init?.getText()
    const exprText =
      init && Node.isJsxExpression(init)
        ? init.getExpression()?.getText()
        : undefined

    // Drawer-specific
    if (name === "placement") {
      if (init && Node.isStringLiteral(init)) {
        const val = init.getLiteralText()
        attrs.push(`placement="${PLACEMENT_MAP[val] ?? val}"`)
      } else {
        attrs.push(attr.getText())
      }
      continue
    }
    if (name === "isFullHeight") {
      isFullHeight = true
      continue
    }

    // Dialog props
    switch (name) {
      case "isOpen":
        attrs.push(kv("open", initText))
        break
      case "onClose": {
        const expr =
          init && Node.isJsxExpression(init) ? init.getExpression() : undefined
        onCloseInner = expr?.getText()
        if (
          expr &&
          (Node.isArrowFunction(expr) || Node.isFunctionExpression(expr))
        ) {
          onCloseIsFn = true
          const fnBody = expr.getBody()
          onCloseFnBody = Node.isBlock(fnBody)
            ? fnBody.getText()
            : `{ ${fnBody.getText()} }`
        }
        break
      }
      case "isCentered":
        attrs.push(`placement="center"`)
        break
      case "closeOnOverlayClick":
        attrs.push(kv("closeOnInteractOutside", initText))
        break
      case "closeOnEsc":
        attrs.push(kv("closeOnEscape", initText))
        break
      case "blockScrollOnMount":
        attrs.push(kv("preventScroll", initText))
        break
      case "onCloseComplete":
        attrs.push(kv("onExitComplete", initText))
        break
      case "onEsc":
        attrs.push(kv("onEscapeKeyDown", initText))
        break
      case "onOverlayClick":
        attrs.push(kv("onInteractOutside", initText))
        break
      case "finalFocusRef":
        attrs.push(`finalFocusEl={() => ${exprText ?? initText}.current}`)
        break
      case "initialFocusRef":
      case "leastDestructiveRef":
        attrs.push(`initialFocusEl={() => ${exprText ?? initText}.current}`)
        break
      case "size":
        if (init && Node.isStringLiteral(init)) {
          const val = init.getLiteralText()
          attrs.push(`size="${SIZE_MAP[val] ?? val}"`)
        } else {
          attrs.push(attr.getText())
        }
        break
      case "motionPreset":
      case "scrollBehavior":
      case "trapFocus":
        attrs.push(attr.getText())
        break
      default:
        if (removed.has(name)) break
        attrs.push(attr.getText())
    }
  }

  if (onCloseInner !== undefined) {
    let consequent: string
    if (onCloseIsFn) {
      consequent = onCloseFnBody ?? "{}"
    } else {
      consequent = `{ ${onCloseInner}() }`
    }
    attrs.push(`onOpenChange={(e) => { if (!e.open) ${consequent} }}`)
  }

  return { attrs, isFullHeight }
}

function updateDrawerImports(sourceFile: import("ts-morph").SourceFile): void {
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  const names = importDecl
    .getNamedImports()
    .map((n) => n.getName())
    .filter((n) => !DRAWER_SUBCOMPONENTS.includes(n))
  if (!names.includes("Drawer")) names.push("Drawer")
  if (!names.includes("Portal")) names.push("Portal")

  // Replace the whole declaration in one shot so the blank line that
  // separates the imports from the rest of the file is preserved.
  importDecl.replaceWithText(
    `import { ${names.join(", ")} } from '@chakra-ui/react'`,
  )
}

function kv(name: string, initText: string | undefined): string {
  return initText !== undefined ? `${name}=${initText}` : name
}

export default transform
