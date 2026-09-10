import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"

const REMOVED_HOOKS: Record<string, string> = {
  useBoolean: "react-use: useToggle or useState",
  useClipboard: "react-use: useCopyToClipboard",
  useConst: "useMemo(() => value, [])",
  useCounter: "react-use: useCounter",
  useDimensions: "react-use: useMeasure",
  useEventListener: "react-use: useEvent",
  useForceUpdate: "useState with counter pattern",
  useId: "React.useId (built-in)",
  useIds: "React.useId (built-in)",
  useImage: "Removed - handle image loading manually",
  useInterval: "react-use: useInterval",
  useLatestRef: "usehooks-ts: useLatest",
  useMergeRefs: "react-use: useMergeRefs",
  useOutsideClick: "react-use: useClickAway",
  usePrefersReducedMotion: "usehooks-ts: usePrefersReducedMotion",
  usePrevious: "react-use: usePrevious",
  useSafeLayoutEffect: "useLayoutEffect",
  useTheme: "Import from system or use useChakraContext",
  useTimeout: "react-use: useTimeout",
  useUpdateEffect: "react-use: useUpdateEffect",
}

const transform: Transform = (sourceFile) => {
  const removedHooksUsed = new Set<string>()

  // Remove the removed hooks from @chakra-ui/react imports.
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/react") continue

    for (const named of importDecl.getNamedImports()) {
      const name = named.getName()
      if (REMOVED_HOOKS[name]) {
        removedHooksUsed.add(name)
        named.remove()
      }
    }

    if (
      importDecl.getNamedImports().length === 0 &&
      !importDecl.getDefaultImport() &&
      !importDecl.getNamespaceImport()
    ) {
      importDecl.remove()
    }
  }

  // Collect comment insertions as (pos, text) and apply them last (descending),
  // because inserting text forgets navigated nodes.
  const insertions: Array<{ pos: number; text: string }> = []

  if (removedHooksUsed.size > 0) {
    const firstStatement = sourceFile.getStatements()[0]
    if (firstStatement) {
      const hooksList = Array.from(removedHooksUsed)
        .map((hook) => `//   - ${hook}: Use ${REMOVED_HOOKS[hook]}`)
        .join("\n")

      const comment =
        `/*\n` +
        ` MIGRATION NOTE: The following Chakra UI hooks have been removed.\n` +
        ` Please replace them with the suggested alternatives:\n` +
        `\n` +
        `${hooksList}\n` +
        `\n` +
        ` See: https://chakra-ui.com/docs/get-started/migration#hooks\n` +
        `*/`

      insertions.push({ pos: firstStatement.getStart(), text: `${comment}\n` })
    }
  }

  for (const call of sourceFile.getDescendantsOfKind(
    SyntaxKind.CallExpression,
  )) {
    const callee = call.getExpression()
    if (!Node.isIdentifier(callee)) continue
    const name = callee.getText()

    if (name === "useId") {
      const parent = call.getParent()
      if (parent && Node.isVariableDeclaration(parent)) {
        const declaration = parent.getParent()
        if (declaration && Node.isVariableDeclarationList(declaration)) {
          const statement = declaration.getParent()
          if (statement && Node.isVariableStatement(statement)) {
            insertions.push({
              pos: statement.getStart(),
              text: "// Use React.useId instead (available in React 18+)\n",
            })
          }
        }
      }
    } else if (name === "useTheme") {
      const statement = call.getFirstAncestor((a) => Node.isStatement(a))
      if (statement) {
        insertions.push({
          pos: statement.getStart(),
          text: "// useTheme removed: Import theme from your system or use useChakraContext\n",
        })
      }
    }
  }

  insertions.sort((a, b) => b.pos - a.pos)
  for (const ins of insertions) {
    sourceFile.insertText(ins.pos, ins.text)
  }
}

export default transform
