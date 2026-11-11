import { Node, SyntaxKind } from "ts-morph"
import type { JsxAttributeLike, SourceFile } from "ts-morph"
import type { Transform } from "../../transform"

/**
 * Codemod to migrate StackDivider to Stack.Separator
 *
 * Transformations:
 * - Remove StackDivider from imports
 * - Remove divider prop from Stack/VStack/HStack
 * - Insert Stack.Separator between children
 * - Transform spacing prop to gap prop
 */

const STACK_COMPONENTS = ["Stack", "VStack", "HStack"]

function attrName(attr: JsxAttributeLike): string | undefined {
  return Node.isJsxAttribute(attr) ? attr.getNameNode().getText() : undefined
}

const transform: Transform = (sourceFile) => {
  let hasChanges = false
  let usedStackSeparator = false

  // Remove StackDivider from @chakra-ui/react imports.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue
    const spec = importDecl
      .getNamedImports()
      .find((n) => n.getName() === "StackDivider")
    if (spec) {
      spec.remove()
      hasChanges = true
    }
  }

  // Self-closing stacks: just rename spacing -> gap and drop divider.
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    if (!STACK_COMPONENTS.includes(el.getTagNameNode().getText())) continue
    for (const attr of el.getAttributes()) {
      if (!Node.isJsxAttribute(attr)) continue
      const name = attr.getNameNode().getText()
      if (name === "spacing") {
        attr.getNameNode().replaceWithText("gap")
        hasChanges = true
      } else if (name === "divider") {
        attr.remove()
        hasChanges = true
      }
    }
  }

  // JsxElements with children: process later positions first to keep earlier
  // node positions valid when we do whole-element text replacements.
  const elements = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxElement)
    .filter((el) =>
      STACK_COMPONENTS.includes(
        el.getOpeningElement().getTagNameNode().getText(),
      ),
    )
    .reverse()

  for (const el of elements) {
    if (el.wasForgotten()) continue
    const opening = el.getOpeningElement()
    const attributes = opening.getAttributes()

    // Rename spacing -> gap in place.
    for (const attr of attributes) {
      if (
        Node.isJsxAttribute(attr) &&
        attr.getNameNode().getText() === "spacing"
      ) {
        attr.getNameNode().replaceWithText("gap")
        hasChanges = true
      }
    }

    const dividerAttr = opening
      .getAttributes()
      .find((a) => attrName(a) === "divider")
    if (!dividerAttr || !Node.isJsxAttribute(dividerAttr)) continue

    hasChanges = true

    // Build the Stack.Separator element text (copy divider's own attributes).
    let dividerText = "<Stack.Separator />"
    const dividerInit = dividerAttr.getInitializer()
    if (dividerInit && Node.isJsxExpression(dividerInit)) {
      const expr = dividerInit.getExpression()
      if (
        expr &&
        (Node.isJsxElement(expr) || Node.isJsxSelfClosingElement(expr))
      ) {
        const innerOpening = Node.isJsxElement(expr)
          ? expr.getOpeningElement()
          : expr
        const dividerAttrsText = innerOpening
          .getAttributes()
          .map((a) => a.getText())
          .join(" ")
        dividerText = dividerAttrsText
          ? `<Stack.Separator ${dividerAttrsText} />`
          : "<Stack.Separator />"
      }
    }
    usedStackSeparator = true

    // Opening-tag attributes (everything except divider, spacing already gap).
    const attrsText = opening
      .getAttributes()
      .filter((a) => attrName(a) !== "divider")
      .map((a) => a.getText())
      .join(" ")

    // Meaningful children get separators inserted between them.
    const meaningfulChildren = el.getJsxChildren().filter((child) => {
      if (Node.isJsxText(child)) return child.getText().trim().length > 0
      return (
        Node.isJsxElement(child) ||
        Node.isJsxSelfClosingElement(child) ||
        Node.isJsxExpression(child)
      )
    })

    const parts: string[] = []
    meaningfulChildren.forEach((child, index) => {
      parts.push(child.getText())
      if (index < meaningfulChildren.length - 1) {
        parts.push("\n  ")
        parts.push(dividerText)
      }
    })

    const tagName = opening.getTagNameNode().getText()
    const openingText = attrsText ? `<${tagName} ${attrsText}>` : `<${tagName}>`
    el.replaceWithText(`${openingText}${parts.join("")}</${tagName}>`)
  }

  // Ensure Stack is imported when Stack.Separator is used.
  if (usedStackSeparator && hasChanges) {
    ensureStackImport(sourceFile)
  }
}

function ensureStackImport(sourceFile: SourceFile) {
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue
    const hasStack = importDecl
      .getNamedImports()
      .some((n) => n.getName() === "Stack")
    if (!hasStack) importDecl.addNamedImport("Stack")
  }
}

export default transform
