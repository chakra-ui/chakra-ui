import { Node, SyntaxKind } from "ts-morph"
import type {
  JsxOpeningElement,
  JsxSelfClosingElement,
  SourceFile,
} from "ts-morph"

type JsxOpening = JsxOpeningElement | JsxSelfClosingElement

export interface ChakraTrackerResult {
  chakraLocalNames: Set<string>
  svgComponents: Set<string>
  componentAliases: Map<string, string>
}

function isChakraSource(source: string): boolean {
  return source.includes("@chakra-ui/react")
}

function isChakraFactory(name: string): boolean {
  return name === "chakra" || name === "styled"
}

/**
 * Collect the local names that resolve to Chakra components in a file:
 * direct imports, `chakra("div")` / `chakra.div` factories, aliases, and
 * re-exports.
 */
export function collectChakraLocalNames(
  sourceFile: SourceFile,
): ChakraTrackerResult {
  const chakraLocalNames = new Set<string>()
  const svgComponents = new Set<string>()
  const componentAliases = new Map<string, string>()

  // 1. Imports from @chakra-ui/react
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (!isChakraSource(importDecl.getModuleSpecifierValue())) continue
    const defaultImport = importDecl.getDefaultImport()
    if (defaultImport) chakraLocalNames.add(defaultImport.getText())
    const namespaceImport = importDecl.getNamespaceImport()
    if (namespaceImport) chakraLocalNames.add(namespaceImport.getText())
    for (const named of importDecl.getNamedImports()) {
      chakraLocalNames.add(named.getAliasNode()?.getText() ?? named.getName())
    }
  }

  // 2. Variable declarations (chakra factories, aliases, SVG components)
  for (const decl of sourceFile.getVariableDeclarations()) {
    const varName = decl.getName()
    const typeNode = decl.getTypeNode()

    if (typeNode && Node.isTypeReference(typeNode)) {
      const typeName = typeNode.getTypeName().getText()
      if (typeName.includes("SVG")) svgComponents.add(varName)
      const typeArgText = typeNode
        .getTypeArguments()
        .map((t) => t.getText())
        .join(",")
      if (typeArgText.includes("SVG")) svgComponents.add(varName)
    }

    const init = decl.getInitializer()
    if (!init) continue

    if (Node.isCallExpression(init)) {
      const callee = init.getExpression()
      if (Node.isIdentifier(callee) && callee.getText() === "chakra") {
        chakraLocalNames.add(varName)
        continue
      }
      if (Node.isPropertyAccessExpression(callee)) {
        const obj = callee.getExpression()
        if (Node.isIdentifier(obj) && isChakraFactory(obj.getText())) {
          chakraLocalNames.add(varName)
          continue
        }
      }
      const firstArg = init.getArguments()[0]
      if (
        firstArg &&
        Node.isIdentifier(firstArg) &&
        chakraLocalNames.has(firstArg.getText())
      ) {
        chakraLocalNames.add(varName)
        componentAliases.set(varName, firstArg.getText())
        continue
      }
    }

    if (Node.isIdentifier(init) && chakraLocalNames.has(init.getText())) {
      chakraLocalNames.add(varName)
      componentAliases.set(varName, init.getText())
      continue
    }

    if (Node.isPropertyAccessExpression(init)) {
      let current: Node = init
      while (Node.isPropertyAccessExpression(current)) {
        current = current.getExpression()
      }
      if (
        Node.isIdentifier(current) &&
        chakraLocalNames.has(current.getText())
      ) {
        chakraLocalNames.add(varName)
      }
    }
  }

  // 3. Function declarations returning tracked JSX / SVG
  for (const fn of sourceFile.getFunctions()) {
    const name = fn.getName()
    if (!name) continue
    for (const ret of fn.getDescendantsOfKind(SyntaxKind.ReturnStatement)) {
      const arg = ret.getExpression()
      if (!arg) continue
      const opening = getJsxOpening(arg)
      if (opening) {
        const returned = getJsxBaseName(opening.getTagNameNode())
        if (chakraLocalNames.has(returned)) chakraLocalNames.add(name)
        if (returned === "svg") {
          const returnType = fn.getReturnTypeNode()?.getText() ?? ""
          if (returnType.includes("SVG") || returnType === "ReactElement") {
            svgComponents.add(name)
          }
        }
      }
    }
  }

  // 4. Re-exports: `export const X = chakra(...)`, `export { X as Y }`
  for (const exportDecl of sourceFile.getExportDeclarations()) {
    if (exportDecl.getModuleSpecifier()) continue
    for (const spec of exportDecl.getNamedExports()) {
      const localName = spec.getName()
      const exportedName = spec.getAliasNode()?.getText() ?? localName
      if (chakraLocalNames.has(localName)) {
        chakraLocalNames.add(exportedName)
        componentAliases.set(exportedName, localName)
      }
    }
  }

  return { chakraLocalNames, svgComponents, componentAliases }
}

function getJsxOpening(node: Node): JsxOpening | undefined {
  if (Node.isJsxElement(node)) return node.getOpeningElement()
  if (Node.isJsxSelfClosingElement(node)) return node
  if (Node.isParenthesizedExpression(node)) {
    const inner = node.getExpression()
    return inner ? getJsxOpening(inner) : undefined
  }
  return undefined
}

/** True when a JSX opening/self-closing element is a tracked Chakra component. */
export function isTrackedJsx(
  opening: JsxOpening,
  chakraLocalNames: Set<string>,
): boolean {
  return chakraLocalNames.has(getJsxBaseName(opening.getTagNameNode()))
}

/** Base identifier of a JSX tag name (handles `Foo.Bar` member names). */
export function getJsxBaseName(nameNode: Node): string {
  if (Node.isIdentifier(nameNode)) return nameNode.getText()
  if (Node.isPropertyAccessExpression(nameNode)) {
    let current: Node = nameNode
    while (Node.isPropertyAccessExpression(current)) {
      current = current.getExpression()
    }
    return current.getText()
  }
  return nameNode.getText()
}
