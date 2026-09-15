import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"

const HTML_ELEMENT_MAP: Record<string, string> = {
  button: "HTMLButtonElement",
  div: "HTMLDivElement",
  span: "HTMLSpanElement",
  input: "HTMLInputElement",
  a: "HTMLAnchorElement",
  img: "HTMLImageElement",
  p: "HTMLParagraphElement",
  h1: "HTMLHeadingElement",
  h2: "HTMLHeadingElement",
  h3: "HTMLHeadingElement",
  h4: "HTMLHeadingElement",
  h5: "HTMLHeadingElement",
  h6: "HTMLHeadingElement",
  ul: "HTMLUListElement",
  ol: "HTMLOListElement",
  li: "HTMLLIElement",
  form: "HTMLFormElement",
  label: "HTMLLabelElement",
  select: "HTMLSelectElement",
  textarea: "HTMLTextAreaElement",
  section: "HTMLElement",
  article: "HTMLElement",
  nav: "HTMLElement",
  header: "HTMLElement",
  footer: "HTMLElement",
  main: "HTMLElement",
  aside: "HTMLElement",
}

const transform: Transform = (sourceFile) => {
  const reactImports = sourceFile
    .getImportDeclarations()
    .filter((d) => d.getModuleSpecifierValue() === "react")

  const hasReactImport = reactImports.length > 0
  const hasReactForwardRefImport = reactImports.some((d) =>
    d.getNamedImports().some((n) => n.getName() === "forwardRef"),
  )

  let needsReactForwardRef = false

  // Remove `forwardRef` from @chakra-ui/react imports.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue

    const forwardRefSpec = importDecl
      .getNamedImports()
      .find((n) => n.getName() === "forwardRef")
    if (!forwardRefSpec) continue

    needsReactForwardRef = true
    forwardRefSpec.remove()

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }

  // Add `forwardRef` to react import (or create one) if needed.
  if (needsReactForwardRef && !hasReactForwardRefImport) {
    if (hasReactImport) {
      for (const importDecl of sourceFile.getImportDeclarations()) {
        if (importDecl.getModuleSpecifierValue() !== "react") continue
        const hasForwardRef = importDecl
          .getNamedImports()
          .some((n) => n.getName() === "forwardRef")
        if (!hasForwardRef) importDecl.addNamedImport("forwardRef")
      }
    } else {
      sourceFile.insertImportDeclaration(0, {
        namedImports: ["forwardRef"],
        moduleSpecifier: "react",
      })
    }
  }

  // Rewrite `forwardRef<Props, "div">(...)` to `forwardRef<HTMLDivElement, Props>(...)`.
  const replacements: Array<{ start: number; end: number; text: string }> = []
  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    const callee = call.getExpression()
    if (!Node.isIdentifier(callee) || callee.getText() !== "forwardRef")
      continue

    const typeArgs = call.getTypeArguments()
    if (typeArgs.length !== 2) continue

    const propsType = typeArgs[0]
    const elementType = typeArgs[1]

    if (!Node.isLiteralTypeNode(elementType)) continue
    const literal = elementType.getLiteral()
    if (!Node.isStringLiteral(literal)) continue

    const elementName = literal.getLiteralValue()
    const htmlElementType = HTML_ELEMENT_MAP[elementName] || "HTMLElement"

    replacements.push({
      start: propsType.getStart(),
      end: elementType.getEnd(),
      text: `${htmlElementType}, ${propsType.getText()}`,
    })
  }

  replacements.sort((a, b) => b.start - a.start)
  for (const r of replacements) {
    sourceFile.replaceText([r.start, r.end], r.text)
  }
}

export default transform
