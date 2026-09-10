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

export function collectChakraLocalNames(
  sourceFile: SourceFile,
  options: { crossFile?: boolean } = {},
): ChakraTrackerResult {
  const chakraLocalNames = new Set<string>()
  const svgComponents = new Set<string>()
  const componentAliases = new Map<string, string>()

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

  if (options.crossFile)
    for (const importDecl of sourceFile.getImportDeclarations()) {
      if (isChakraSource(importDecl.getModuleSpecifierValue())) continue
      const target = importDecl.getModuleSpecifierSourceFile()
      if (!target) continue
      for (const named of importDecl.getNamedImports()) {
        const local = named.getAliasNode()?.getText() ?? named.getName()
        if (chakraLocalNames.has(local)) continue
        if (reExportsChakra(target, named.getName(), new Set(), 0)) {
          chakraLocalNames.add(local)
        }
      }
    }

  return { chakraLocalNames, svgComponents, componentAliases }
}

const MAX_REEXPORT_DEPTH = 5

function importedNameIsChakra(file: SourceFile, localName: string): boolean {
  for (const imp of file.getImportDeclarations()) {
    if (!isChakraSource(imp.getModuleSpecifierValue())) continue
    if (imp.getDefaultImport()?.getText() === localName) return true
    if (imp.getNamespaceImport()?.getText() === localName) return true
    for (const n of imp.getNamedImports()) {
      if ((n.getAliasNode()?.getText() ?? n.getName()) === localName)
        return true
    }
  }
  return false
}

function reExportsChakra(
  file: SourceFile,
  exportName: string,
  visited: Set<string>,
  depth: number,
): boolean {
  if (depth > MAX_REEXPORT_DEPTH) return false
  const key = `${file.getFilePath()}::${exportName}`
  if (visited.has(key)) return false
  visited.add(key)

  for (const exp of file.getExportDeclarations()) {
    const spec = exp.getModuleSpecifierValue()
    const named = exp.getNamedExports()

    if (spec) {
      const targetIsChakra = isChakraSource(spec)
      let matchedNamed = false
      for (const n of named) {
        const exported = n.getAliasNode()?.getText() ?? n.getName()
        if (exported !== exportName) continue
        matchedNamed = true
        if (targetIsChakra) return true
        const target = exp.getModuleSpecifierSourceFile()
        if (
          target &&
          reExportsChakra(target, n.getName(), visited, depth + 1)
        ) {
          return true
        }
      }
      if (!matchedNamed && named.length === 0) {
        if (targetIsChakra) return true
        const target = exp.getModuleSpecifierSourceFile()
        if (target && reExportsChakra(target, exportName, visited, depth + 1)) {
          return true
        }
      }
    } else {
      for (const n of named) {
        const exported = n.getAliasNode()?.getText() ?? n.getName()
        if (
          exported === exportName &&
          importedNameIsChakra(file, n.getName())
        ) {
          return true
        }
      }
    }
  }
  return false
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

export function isTrackedJsx(
  opening: JsxOpening,
  chakraLocalNames: Set<string>,
): boolean {
  return chakraLocalNames.has(getJsxBaseName(opening.getTagNameNode()))
}

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
