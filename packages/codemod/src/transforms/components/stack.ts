import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxElement,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph"
import type { Transform } from "../../transform"
import {
  collectChakraLocalNames,
  getJsxBaseName,
} from "../../utils/chakra-tracker"

const STACK_NAMES = /^(Stack|VStack|HStack)$/

function renameTag(el: JsxElement | JsxSelfClosingElement, to: string) {
  if (Node.isJsxElement(el)) {
    el.getClosingElement()?.getTagNameNode().replaceWithText(to)
    el.getOpeningElement().getTagNameNode().replaceWithText(to)
  } else {
    el.getTagNameNode().replaceWithText(to)
  }
}

function isStackDividerTag(
  el: JsxElement | JsxSelfClosingElement,
): "identifier" | "member" | null {
  const opening = Node.isJsxElement(el) ? el.getOpeningElement() : el
  const tag = opening.getTagNameNode()
  if (Node.isIdentifier(tag) && tag.getText() === "StackDivider")
    return "identifier"
  if (Node.isPropertyAccessExpression(tag) && tag.getName() === "StackDivider")
    return "member"
  return null
}

const transform: Transform = (sourceFile) => {
  const { chakraLocalNames } = collectChakraLocalNames(sourceFile)
  if (chakraLocalNames.size === 0) return

  let needsStackSeparatorImport = false

  // Pass 1: Stack / VStack / HStack — spacing -> gap, divider -> separator.
  const stackOpenings: (JsxOpeningElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  for (const opening of stackOpenings) {
    const baseName = getJsxBaseName(opening.getTagNameNode())
    if (!STACK_NAMES.test(baseName)) continue
    if (!chakraLocalNames.has(baseName)) continue

    const attrs = opening.getAttributes()
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i]
      if (!Node.isJsxAttribute(attr)) continue
      const name = attr.getNameNode().getText()

      if (name === "spacing") {
        attr.getNameNode().replaceWithText("gap")
        continue
      }

      if (name === "divider") {
        const init = attr.getInitializer()
        if (init && Node.isJsxExpression(init)) {
          const inner = init.getExpression()
          if (
            inner &&
            (Node.isJsxElement(inner) || Node.isJsxSelfClosingElement(inner)) &&
            isStackDividerTag(inner) === "identifier"
          ) {
            renameTag(inner, "StackSeparator")
            needsStackSeparatorImport = true
          }
        }
        attr.getNameNode().replaceWithText("separator")
      }
    }
  }

  // Pass 2: standalone StackDivider (and member-expression form) -> StackSeparator.
  const dividerElements: (JsxElement | JsxSelfClosingElement)[] = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ]
  const withStart = dividerElements
    .map((e) => ({ e, start: e.getStart() }))
    .sort((a, b) => b.start - a.start)

  for (const { e } of withStart) {
    if (e.wasForgotten()) continue
    const kind = isStackDividerTag(e)
    if (kind === "identifier") {
      if (!chakraLocalNames.has("Stack")) continue
      renameTag(e, "StackSeparator")
      needsStackSeparatorImport = true
    } else if (kind === "member") {
      const opening = Node.isJsxElement(e) ? e.getOpeningElement() : e
      const base = getJsxBaseName(opening.getTagNameNode())
      if (!chakraLocalNames.has(base)) continue
      renameTag(e, "StackSeparator")
      needsStackSeparatorImport = true
    }
  }

  // Imports: remove StackDivider, add StackSeparator when needed.
  const chakraImports = sourceFile
    .getImportDeclarations()
    .filter((d) => d.getModuleSpecifierValue() === "@chakra-ui/react")

  for (const importDecl of chakraImports) {
    importDecl
      .getNamedImports()
      .find((n) => n.getName() === "StackDivider")
      ?.remove()

    if (
      needsStackSeparatorImport &&
      !importDecl
        .getNamedImports()
        .some((n) => n.getName() === "StackSeparator")
    ) {
      importDecl.addNamedImport("StackSeparator")
      needsStackSeparatorImport = false
    }
  }
}

export default transform
