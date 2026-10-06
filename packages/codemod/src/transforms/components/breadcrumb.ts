import { Node, SyntaxKind } from "ts-morph"
import type { JsxElement } from "ts-morph"
import type { Transform } from "../../transform"
import { collectChakraLocalNames } from "../../utils/chakra-tracker"

/**
 * Transforms Breadcrumb components to the v3 compound component API:
 * `<Breadcrumb>` becomes `<Breadcrumb.Root>` wrapping a `<Breadcrumb.List>`
 * with `<Breadcrumb.Separator>` inserted between items.
 */
const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  const transformed = new Set<string>()

  const plainTag = (el: JsxElement, name: string): boolean => {
    const tag = el.getOpeningElement().getTagNameNode()
    return Node.isIdentifier(tag) && tag.getText() === name
  }

  // 1. BreadcrumbLink -> Breadcrumb.Link / Breadcrumb.CurrentLink
  if (chakraLocalNames.has("BreadcrumbLink")) {
    const links = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .filter((el) => plainTag(el, "BreadcrumbLink"))
    for (const link of links.reverse()) {
      transformLink(link)
      transformed.add("BreadcrumbLink")
    }
  }

  // 2. BreadcrumbItem -> Breadcrumb.Item
  if (chakraLocalNames.has("BreadcrumbItem")) {
    const items = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .filter((el) => plainTag(el, "BreadcrumbItem"))
    for (const item of items.reverse()) {
      transformItem(item)
      transformed.add("BreadcrumbItem")
    }
  }

  // 3. Breadcrumb -> Breadcrumb.Root + Breadcrumb.List + separators
  if (chakraLocalNames.has("Breadcrumb")) {
    let roots = sourceFile
      .getDescendantsOfKind(SyntaxKind.JsxElement)
      .filter((el) => plainTag(el, "Breadcrumb"))
    while (roots.length) {
      transformRoot(roots[0])
      transformed.add("Breadcrumb")
      roots = sourceFile
        .getDescendantsOfKind(SyntaxKind.JsxElement)
        .filter((el) => plainTag(el, "Breadcrumb"))
    }
  }

  if (transformed.size > 0) updateImports(sourceFile)
}

function transformLink(el: JsxElement) {
  const opening = el.getOpeningElement()
  let isCurrent = false
  for (const attr of [...opening.getAttributes()].reverse()) {
    if (!Node.isJsxAttribute(attr)) continue
    if (attr.getNameNode().getText() !== "isCurrentPage") continue
    const init = attr.getInitializer()
    if (!init) {
      isCurrent = true
    } else if (Node.isJsxExpression(init)) {
      const expr = init.getExpression()
      if (expr && expr.getKind() === SyntaxKind.TrueKeyword) isCurrent = true
    }
    attr.remove()
  }
  const target = isCurrent ? "Breadcrumb.CurrentLink" : "Breadcrumb.Link"
  el.getClosingElement()?.getTagNameNode().replaceWithText(target)
  opening.getTagNameNode().replaceWithText(target)
}

function transformItem(el: JsxElement) {
  const opening = el.getOpeningElement()
  for (const attr of [...opening.getAttributes()].reverse()) {
    if (!Node.isJsxAttribute(attr)) continue
    const name = attr.getNameNode().getText()
    if (name === "isCurrentPage" || name === "isLastChild") {
      attr.remove()
    } else if (name === "spacing") {
      attr.getNameNode().replaceWithText("gap")
    }
  }
  el.getClosingElement()?.getTagNameNode().replaceWithText("Breadcrumb.Item")
  opening.getTagNameNode().replaceWithText("Breadcrumb.Item")
}

function transformRoot(el: JsxElement) {
  const opening = el.getOpeningElement()
  const rootAttrs: string[] = []
  const listAttrs: string[] = []
  let separatorStr = "<Breadcrumb.Separator />"
  let listPropsStr: string | null = null

  for (const attr of opening.getAttributes()) {
    if (!Node.isJsxAttribute(attr)) {
      rootAttrs.push(attr.getText())
      continue
    }
    const name = attr.getNameNode().getText()
    if (name === "separator") {
      const init = attr.getInitializer()
      if (init && Node.isStringLiteral(init)) {
        separatorStr = `<Breadcrumb.Separator>${init.getLiteralValue()}</Breadcrumb.Separator>`
      } else if (init && Node.isJsxExpression(init)) {
        separatorStr = `<Breadcrumb.Separator>${init.getText()}</Breadcrumb.Separator>`
      }
      continue
    }
    if (name === "listProps") {
      const init = attr.getInitializer()
      if (init && Node.isJsxExpression(init)) {
        const expr = init.getExpression()
        if (expr) listPropsStr = `{...${expr.getText()}}`
      }
      continue
    }
    if (name === "spacing") {
      const init = attr.getInitializer()
      listAttrs.push(`gap=${init ? init.getText() : ""}`)
      continue
    }
    rootAttrs.push(attr.getText())
  }
  if (listPropsStr) listAttrs.push(listPropsStr)

  const itemTexts = el
    .getJsxChildren()
    .filter(
      (c): c is JsxElement =>
        Node.isJsxElement(c) &&
        c.getOpeningElement().getTagNameNode().getText() === "Breadcrumb.Item",
    )
    .map((c) => c.getText())

  const listChildren: string[] = []
  itemTexts.forEach((t, i) => {
    listChildren.push(t)
    if (i < itemTexts.length - 1) listChildren.push(separatorStr)
  })

  const listAttrStr = listAttrs.length ? " " + listAttrs.join(" ") : ""
  const list = `<Breadcrumb.List${listAttrStr}>\n${listChildren.join("\n")}\n</Breadcrumb.List>`
  const rootAttrStr = rootAttrs.length ? " " + rootAttrs.join(" ") : ""
  el.replaceWithText(
    `<Breadcrumb.Root${rootAttrStr}>\n${list}\n</Breadcrumb.Root>`,
  )
}

function updateImports(sourceFile: Parameters<Transform>[0]) {
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
  )
  if (!importDecl) return

  const remove = ["BreadcrumbItem", "BreadcrumbLink", "BreadcrumbSeparator"]
  for (const named of importDecl.getNamedImports()) {
    if (remove.includes(named.getName())) named.remove()
  }

  const hasBreadcrumb = importDecl
    .getNamedImports()
    .some((n) => n.getName() === "Breadcrumb")
  if (!hasBreadcrumb) importDecl.addNamedImport("Breadcrumb")
}

export default transform
