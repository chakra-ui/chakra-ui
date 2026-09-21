import { Node, SyntaxKind } from "ts-morph"
import type { JsxAttribute, JsxElement, JsxSelfClosingElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

type JsxAnyElement = JsxElement | JsxSelfClosingElement

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  // 1. AccordionPanel -> Accordion.ItemContent > Accordion.ItemBody
  //    (run first, while the enclosing <Accordion> still carries reduceMotion)
  eachNamed("AccordionPanel", (el) => transformPanel(el))

  // 2. AccordionButton -> Accordion.ItemTrigger
  eachNamed("AccordionButton", (el) => renameTag(el, "Accordion.ItemTrigger"))

  // 3. AccordionIcon -> Accordion.ItemIndicator
  eachNamed("AccordionIcon", (el) => renameTag(el, "Accordion.ItemIndicator"))

  // 4. AccordionItem -> Accordion.Item (+ value bookkeeping)
  let itemCounter = 0
  eachNamed("AccordionItem", (el) => {
    itemCounter = transformItem(el, itemCounter)
  })

  // 5. Accordion -> Accordion.Root (+ prop transforms)
  eachNamed("Accordion", (el) => transformRoot(el))

  // 6. Clean up imports
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (importDecl) {
    for (const name of [
      "AccordionItem",
      "AccordionButton",
      "AccordionIcon",
      "AccordionPanel",
    ]) {
      importDecl
        .getNamedImports()
        .find((n) => n.getName() === name)
        ?.remove()
    }
  }

  /** Process every tracked element whose plain-identifier tag === `name`,
   *  one at a time with a fresh query, in document order. The callback must
   *  rename the element so it no longer matches (avoids infinite loops and
   *  stale nodes). */
  function eachNamed(name: string, cb: (el: JsxAnyElement) => void) {
    if (!chakraLocalNames.has(name)) return
    while (true) {
      const el = findFirst(name)
      if (!el) break
      cb(el)
    }
  }

  function findFirst(name: string): JsxAnyElement | undefined {
    const matches: JsxAnyElement[] = []
    for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
      const tag = el.getOpeningElement().getTagNameNode()
      if (Node.isIdentifier(tag) && tag.getText() === name) matches.push(el)
    }
    for (const el of sourceFile.getDescendantsOfKind(
      SyntaxKind.JsxSelfClosingElement,
    )) {
      const tag = el.getTagNameNode()
      if (Node.isIdentifier(tag) && tag.getText() === name) matches.push(el)
    }
    matches.sort((a, b) => a.getStart() - b.getStart())
    return matches[0]
  }
}

function openingOf(el: JsxAnyElement) {
  return Node.isJsxSelfClosingElement(el) ? el : el.getOpeningElement()
}

/** Simple tag rename, preserving attributes and children. */
function renameTag(el: JsxAnyElement, newTag: string) {
  if (Node.isJsxSelfClosingElement(el)) {
    el.getTagNameNode().replaceWithText(newTag)
    return
  }
  el.getClosingElement()?.getTagNameNode().replaceWithText(newTag)
  el.getOpeningElement().getTagNameNode().replaceWithText(newTag)
}

/** Replace the opening tag (and closing, for elements) with a new tag +
 *  rebuilt attribute list. Closing is edited first so the opening's position
 *  stays valid. */
function replaceOpening(el: JsxAnyElement, newTag: string, attrs: string[]) {
  const attrsPart = attrs.length ? " " + attrs.join(" ") : ""
  if (Node.isJsxSelfClosingElement(el)) {
    el.replaceWithText(`<${newTag}${attrsPart} />`)
    return
  }
  el.getClosingElement()?.getTagNameNode().replaceWithText(newTag)
  el.getOpeningElement().replaceWithText(`<${newTag}${attrsPart}>`)
}

function renameAttr(attr: JsxAttribute, newName: string): string {
  const init = attr.getInitializer()
  return init ? `${newName}=${init.getText()}` : newName
}

function normalizeIndex(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (!init || !Node.isJsxExpression(init)) {
    return init ? init.getText() : ""
  }
  const expr = init.getExpression()
  if (!expr) return init.getText()
  if (Node.isNumericLiteral(expr)) return `{['${expr.getText()}']}`
  if (Node.isArrayLiteralExpression(expr)) {
    const els = expr
      .getElements()
      .map((e) => (Node.isNumericLiteral(e) ? `'${e.getText()}'` : e.getText()))
    return `{[${els.join(", ")}]}`
  }
  return init.getText()
}

function wrapOnChange(attr: JsxAttribute): string {
  const init = attr.getInitializer()
  if (!init || !Node.isJsxExpression(init)) {
    return init ? init.getText() : ""
  }
  const expr = init.getExpression()
  if (!expr) return init.getText()
  return `{({ value: value }) => ${expr.getText()}(value)}`
}

function transformRoot(el: JsxAnyElement) {
  const opening = openingOf(el)
  const attrs: string[] = []
  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      attrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    switch (name) {
      case "allowMultiple":
        attrs.push(renameAttr(attr, "multiple"))
        break
      case "allowToggle":
        attrs.push(renameAttr(attr, "collapsible"))
        break
      case "index":
        attrs.push(`value=${normalizeIndex(attr)}`)
        break
      case "defaultIndex":
        attrs.push(`defaultValue=${normalizeIndex(attr)}`)
        break
      case "onChange":
        attrs.push(`onValueChange=${wrapOnChange(attr)}`)
        break
      case "reduceMotion":
        // removed; handled on ItemContent via animation="none"
        break
      default:
        attrs.push(attr.getText())
    }
  }
  replaceOpening(el, "Accordion.Root", attrs)
}

function transformItem(el: JsxAnyElement, counter: number): number {
  const opening = openingOf(el)
  const attrs: string[] = []
  let hasValue = false
  let hasId = false
  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      attrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    switch (name) {
      case "value":
        hasValue = true
        attrs.push(attr.getText())
        break
      case "id":
        hasId = true
        attrs.push(renameAttr(attr, "value"))
        break
      case "isDisabled":
        attrs.push(renameAttr(attr, "disabled"))
        break
      case "isFocusable":
        break
      default:
        attrs.push(attr.getText())
    }
  }
  if (!hasValue && !hasId) {
    attrs.push(`value="item-${counter}"`)
    counter++
  } else if (hasId) {
    counter++
  }
  replaceOpening(el, "Accordion.Item", attrs)
  return counter
}

function transformPanel(el: JsxAnyElement) {
  const opening = openingOf(el)
  const attrs = opening.getAttributes().map((a) => a.getText())
  if (panelHasReduceMotion(el)) attrs.push('animation="none"')
  const attrsPart = attrs.length ? " " + attrs.join(" ") : ""
  const inner = innerText(el)
  el.replaceWithText(
    `<Accordion.ItemContent${attrsPart}>\n<Accordion.ItemBody>${inner}</Accordion.ItemBody>\n</Accordion.ItemContent>`,
  )
}

function innerText(el: JsxAnyElement): string {
  if (Node.isJsxSelfClosingElement(el)) return ""
  const open = el.getOpeningElement()
  const close = el.getClosingElement()
  if (!close) return ""
  return el.getSourceFile().getFullText().slice(open.getEnd(), close.getStart())
}

function panelHasReduceMotion(el: JsxAnyElement): boolean {
  for (const anc of el.getAncestors()) {
    if (!Node.isJsxElement(anc)) continue
    const opening = anc.getOpeningElement()
    const tag = opening.getTagNameNode()
    if (!Node.isIdentifier(tag) || tag.getText() !== "Accordion") continue
    if (
      opening
        .getAttributes()
        .some(
          (a) =>
            Node.isJsxAttribute(a) &&
            a.getNameNode().getText() === "reduceMotion",
        )
    ) {
      return true
    }
  }
  return false
}

export default transform
