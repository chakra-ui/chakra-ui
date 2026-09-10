import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxAttribute,
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

type JsxEl = JsxElement | JsxSelfClosingElement

const SUBCOMPONENTS = [
  "PopoverTrigger",
  "PopoverContent",
  "PopoverHeader",
  "PopoverBody",
  "PopoverFooter",
  "PopoverArrow",
  "PopoverCloseButton",
  "PopoverAnchor",
]

function openingOf(el: JsxEl): JsxOpeningElement | JsxSelfClosingElement {
  return Node.isJsxElement(el) ? el.getOpeningElement() : el
}

function getAttrsText(el: JsxEl): string {
  return openingOf(el)
    .getAttributes()
    .map((a) => a.getText())
    .join(" ")
}

function getInner(el: JsxEl): string {
  if (!Node.isJsxElement(el)) return ""
  const full = el.getText()
  const openText = el.getOpeningElement().getText()
  const closeText = el.getClosingElement().getText()
  return full.slice(openText.length, full.length - closeText.length)
}

function valueExpr(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (!init) return "true"
  if (Node.isStringLiteral(init)) return init.getText()
  if (Node.isJsxExpression(init))
    return init.getExpression()?.getText() ?? "true"
  return init.getText()
}

function findElements(
  sourceFile: import("ts-morph").SourceFile,
  predicate: (base: string) => boolean,
): JsxEl[] {
  return [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ].filter((el) => {
    const tag = openingOf(el).getTagNameNode()
    return Node.isIdentifier(tag) && predicate(tag.getText())
  })
}

function renameTag(el: JsxEl, newName: string) {
  if (Node.isJsxElement(el)) {
    el.getClosingElement().getTagNameNode().replaceWithText(newName)
    el.getOpeningElement().getTagNameNode().replaceWithText(newName)
  } else {
    el.getTagNameNode().replaceWithText(newName)
  }
}

function mergeArrowSize(
  opening: JsxOpeningElement | JsxSelfClosingElement,
  sizeText: string,
) {
  const cssAttr = opening
    .getAttributes()
    .find((a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "css")
  const newProp = `'--arrow-size': ${sizeText}`
  if (cssAttr && Node.isJsxAttribute(cssAttr)) {
    const init = cssAttr.getInitializer()
    if (init && Node.isJsxExpression(init)) {
      const obj = init.getExpression()
      if (obj && Node.isObjectLiteralExpression(obj)) {
        const existing = obj.getProperties().map((p) => p.getText())
        // Newline after `{` forces prettier to keep the object multi-line.
        cssAttr.setInitializer(`{{\n${[...existing, newProp].join(",\n")}\n}}`)
        return
      }
    }
  }
  opening.addAttribute({
    name: "css",
    initializer: `{{\n${newProp}\n}}`,
  })
}

interface RootProps {
  rootAttrs: string[]
  positioning: string[]
  arrowSize: string | null
  useHoverCard: boolean
}

function processRootProps(opening: JsxOpeningElement): RootProps {
  const triggerAttr = opening
    .getAttributes()
    .find(
      (a) => Node.isJsxAttribute(a) && a.getNameNode().getText() === "trigger",
    )
  const useHoverCard =
    !!triggerAttr &&
    Node.isJsxAttribute(triggerAttr) &&
    valueExpr(triggerAttr) === "'hover'"

  const rootAttrs: string[] = []
  const positioning: string[] = []
  let arrowSize: string | null = null
  let onOpenHandler: Node | undefined
  let onCloseHandler: Node | undefined

  const keepRenamed = (newName: string, attr: JsxAttribute) => {
    const init = attr.getInitializer()
    rootAttrs.push(init ? `${newName}=${init.getText()}` : newName)
  }

  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      rootAttrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    switch (name) {
      case "placement":
        positioning.push(`placement: ${valueExpr(attr)}`)
        break
      case "boundary": {
        const v = valueExpr(attr)
        positioning.push(
          `boundary: ${v.endsWith(".current") ? `() => ${v}` : `() => ${v}.current`}`,
        )
        break
      }
      case "flip":
        positioning.push(`flip: ${valueExpr(attr)}`)
        break
      case "gutter":
        positioning.push(`gutter: ${valueExpr(attr)}`)
        break
      case "matchWidth":
        positioning.push(`sameWidth: ${valueExpr(attr)}`)
        break
      case "offset":
        positioning.push(`offset: ${valueExpr(attr)}`)
        break
      case "strategy":
        positioning.push(`strategy: ${valueExpr(attr)}`)
        break
      case "arrowPadding":
        positioning.push(`arrowPadding: ${valueExpr(attr)}`)
        break
      case "preventOverflow":
        positioning.push(`preventOverflow: ${valueExpr(attr)}`)
        break
      case "eventListeners":
        positioning.push(`listeners: ${transformListeners(attr)}`)
        break
      case "closeOnBlur":
        keepRenamed("closeOnInteractOutside", attr)
        break
      case "closeOnEsc":
        keepRenamed("closeOnEscape", attr)
        break
      case "defaultIsOpen":
        keepRenamed("defaultOpen", attr)
        break
      case "isOpen":
        keepRenamed("open", attr)
        break
      case "isLazy":
        keepRenamed("lazyMount", attr)
        break
      case "lazyBehavior":
        if (valueExpr(attr) === "'unmount'") rootAttrs.push("unmountOnExit")
        break
      case "onOpen": {
        const init = attr.getInitializer()
        onOpenHandler =
          init && Node.isJsxExpression(init) ? init.getExpression() : undefined
        break
      }
      case "onClose": {
        const init = attr.getInitializer()
        onCloseHandler =
          init && Node.isJsxExpression(init) ? init.getExpression() : undefined
        break
      }
      case "computePositionOnMount":
      case "returnFocusOnClose":
      case "arrowShadowColor":
      case "trigger":
      case "modifiers":
        break
      case "openDelay":
      case "closeDelay":
        if (useHoverCard) rootAttrs.push(attr.getText())
        break
      case "arrowSize":
        arrowSize = valueExpr(attr)
        break
      case "initialFocusRef":
        rootAttrs.push(`initialFocusEl={() => ${valueExpr(attr)}.current}`)
        break
      default:
        rootAttrs.push(attr.getText())
    }
  }

  if (onOpenHandler || onCloseHandler) {
    rootAttrs.push(buildOnOpenChange(onOpenHandler, onCloseHandler))
  }

  return { rootAttrs, positioning, arrowSize, useHoverCard }
}

function transformListeners(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (init && Node.isJsxExpression(init)) {
    const obj = init.getExpression()
    if (obj && Node.isObjectLiteralExpression(obj)) {
      const props = obj.getProperties().map((p) => {
        if (Node.isPropertyAssignment(p)) {
          const n = p.getName()
          const key =
            n === "scroll"
              ? "ancestorScroll"
              : n === "resize"
                ? "ancestorResize"
                : n
          return `${key}: ${p.getInitializer()?.getText()}`
        }
        if (Node.isShorthandPropertyAssignment(p)) {
          const n = p.getName()
          const key =
            n === "scroll"
              ? "ancestorScroll"
              : n === "resize"
                ? "ancestorResize"
                : n
          return `${key}: ${n}`
        }
        return p.getText()
      })
      // Newline after `{` forces prettier to keep the object multi-line.
      return `{\n${props.join(",\n")}\n}`
    }
  }
  return valueExpr(attr)
}

function handlerToStatements(h: Node | undefined): string {
  if (!h) return ""
  if (Node.isArrowFunction(h) || Node.isFunctionExpression(h)) {
    const body = h.getBody()
    if (Node.isBlock(body)) {
      const t = body.getText()
      return t.slice(1, t.length - 1).trim()
    }
    return body.getText()
  }
  return `${h.getText()}()`
}

function buildOnOpenChange(
  openH: Node | undefined,
  closeH: Node | undefined,
): string {
  const openStmt = handlerToStatements(openH)
  const closeStmt = closeH ? handlerToStatements(closeH) : null
  let body = `if (e.open) {\n${openStmt}\n}`
  if (closeStmt !== null) body += ` else {\n${closeStmt}\n}`
  return `onOpenChange={(e) => {\n${body}\n}}`
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  let usedHoverCard = false

  // Phase P: process each Popover root (opening attrs, positioning, arrowSize).
  if (chakraLocalNames.has("Popover")) {
    for (const rootEl of findElements(
      sourceFile,
      (b) => b === "Popover",
    ).reverse()) {
      if (!Node.isJsxElement(rootEl)) continue
      const opening = rootEl.getOpeningElement()
      const { rootAttrs, positioning, arrowSize, useHoverCard } =
        processRootProps(opening)
      if (useHoverCard) usedHoverCard = true

      // Transfer root arrowSize onto descendant PopoverArrow elements.
      if (arrowSize) {
        for (const arrow of rootEl.getDescendantsOfKind(
          SyntaxKind.JsxSelfClosingElement,
        )) {
          if (getJsxBaseName(arrow.getTagNameNode()) === "PopoverArrow") {
            mergeArrowSize(arrow, arrowSize)
          }
        }
        for (const arrow of rootEl.getDescendantsOfKind(
          SyntaxKind.JsxElement,
        )) {
          if (
            getJsxBaseName(arrow.getOpeningElement().getTagNameNode()) ===
            "PopoverArrow"
          ) {
            mergeArrowSize(arrow.getOpeningElement(), arrowSize)
          }
        }
      }

      const parts = [...rootAttrs]
      if (positioning.length)
        parts.push(`positioning={{\n${positioning.join(",\n")}\n}}`)
      const attrsText = parts.join("\n")

      rootEl
        .getClosingElement()
        .getTagNameNode()
        .replaceWithText("Popover.Root")
      opening.replaceWithText(
        attrsText ? `<Popover.Root ${attrsText}>` : `<Popover.Root>`,
      )
    }
  }

  // Phase C: PopoverTrigger -> Popover.Trigger asChild.
  if (chakraLocalNames.has("PopoverTrigger")) {
    for (const el of findElements(
      sourceFile,
      (b) => b === "PopoverTrigger",
    ).reverse()) {
      renameTag(el, "Popover.Trigger")
      openingOf(el).insertAttribute(0, { name: "asChild" })
    }
  }

  // Phase D: PopoverArrow -> Popover.Arrow (own arrowSize -> css).
  if (chakraLocalNames.has("PopoverArrow")) {
    for (const el of findElements(
      sourceFile,
      (b) => b === "PopoverArrow",
    ).reverse()) {
      const opening = openingOf(el)
      const own = opening
        .getAttributes()
        .find(
          (a) =>
            Node.isJsxAttribute(a) && a.getNameNode().getText() === "arrowSize",
        )
      if (own && Node.isJsxAttribute(own)) {
        const v = valueExpr(own)
        own.remove()
        mergeArrowSize(opening, v)
      }
      renameTag(el, "Popover.Arrow")
    }
  }

  // Phase E: simple member-expression renames.
  const simpleRenames: Record<string, string> = {
    PopoverHeader: "Popover.Title",
    PopoverBody: "Popover.Body",
    PopoverFooter: "Popover.Footer",
    PopoverCloseButton: "Popover.CloseTrigger",
    PopoverAnchor: "Popover.Anchor",
  }
  for (const [from, to] of Object.entries(simpleRenames)) {
    if (!chakraLocalNames.has(from)) continue
    for (const el of findElements(sourceFile, (b) => b === from).reverse()) {
      renameTag(el, to)
    }
  }

  // Phase B: PopoverContent -> Popover.Positioner > Popover.Content.
  if (chakraLocalNames.has("PopoverContent")) {
    for (const el of findElements(
      sourceFile,
      (b) => b === "PopoverContent",
    ).reverse()) {
      const attrs = getAttrsText(el)
      const inner = getInner(el)
      const contentOpen = attrs
        ? `<Popover.Content ${attrs}>`
        : `<Popover.Content>`
      el.replaceWithText(
        `<Popover.Positioner>\n` +
          `${contentOpen}${inner}</Popover.Content>\n` +
          `</Popover.Positioner>`,
      )
    }
  }

  // Phase R: wrap render-prop roots in Popover.Context.
  for (const rootEl of sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .filter(
      (el) =>
        el.getOpeningElement().getTagNameNode().getText() === "Popover.Root",
    )) {
    for (const child of rootEl.getJsxChildren()) {
      if (!Node.isJsxExpression(child)) continue
      const func = child.getExpression()
      if (
        !func ||
        (!Node.isArrowFunction(func) && !Node.isFunctionExpression(func))
      )
        continue

      const param = func.getParameters()[0]
      const names: string[] = []
      if (param) {
        const nameNode = param.getNameNode()
        if (Node.isObjectBindingPattern(nameNode)) {
          for (const e of nameNode.getElements()) names.push(e.getName())
        }
      }
      const needsIsOpen = names.includes("isOpen")
      const needsOnClose = names.includes("onClose")
      const needsOnOpen = names.includes("onOpen")
      const needsSetOpen = needsOnClose || needsOnOpen

      const newProps: string[] = []
      if (needsIsOpen) newProps.push("open: isOpen")
      if (needsSetOpen) newProps.push("setOpen: setOpen")
      const newParam = `{ ${newProps.join(", ")} }`

      const helpers: string[] = []
      if (needsOnClose) helpers.push("const onClose = () => setOpen(false)")
      if (needsOnOpen) helpers.push("const onOpen = () => setOpen(true)")

      const bodyText = func.getBody().getText()
      const funcText = helpers.length
        ? `(${newParam}) => {\n${helpers.join("\n")}\n\nreturn ${bodyText}\n}`
        : `(${newParam}) => ${bodyText}`

      child.replaceWithText(
        `<Popover.Context>\n{${funcText}}\n</Popover.Context>`,
      )
      break
    }
  }

  // Phase F: rename Popover.* -> HoverCard.* everywhere.
  if (usedHoverCard) {
    const tagNodes: Node[] = [
      ...sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
        .map((e) => e.getTagNameNode()),
      ...sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxClosingElement)
        .map((e) => e.getTagNameNode()),
      ...sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
        .map((e) => e.getTagNameNode()),
    ].sort((a, b) => b.getStart() - a.getStart())
    for (const t of tagNodes) {
      if (Node.isPropertyAccessExpression(t)) {
        const obj = t.getExpression()
        if (Node.isIdentifier(obj) && obj.getText() === "Popover") {
          obj.replaceWithText("HoverCard")
        }
      }
    }
  }

  // Phase G: update imports.
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (importDecl) {
    for (const sub of SUBCOMPONENTS) {
      importDecl
        .getNamedImports()
        .find((n) => n.getName() === sub)
        ?.remove()
    }
    if (usedHoverCard) {
      const named = importDecl.getNamedImports()
      const hasHoverCard = named.some((n) => n.getName() === "HoverCard")
      if (!hasHoverCard) {
        const popoverIdx = named.findIndex((n) => n.getName() === "Popover")
        if (popoverIdx >= 0) {
          importDecl.insertNamedImport(popoverIdx + 1, "HoverCard")
        } else {
          importDecl.addNamedImport("HoverCard")
        }
      }
    }
  }
}

export default transform
