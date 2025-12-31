import type { API, FileInfo, Options } from "jscodeshift"

export default function transformer(
  file: FileInfo,
  api: API,
  _options: Options,
) {
  const j = api.jscodeshift
  const root = j(file.source)
  let hasChanges = false

  const removedHooksUsed = new Set<string>()

  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/react" },
    })
    .forEach((path) => {
      const originalLength = path.node.specifiers?.length || 0

      const specifiers = path.node.specifiers?.filter((spec) => {
        if (spec.type === "ImportSpecifier") {
          const name = spec.imported.name as string

          if (REMOVED_HOOKS[name]) {
            removedHooksUsed.add(name)
            return false
          }

          return true
        }
        return true
      })

      if (specifiers && specifiers.length < originalLength) {
        if (specifiers.length === 0) {
          j(path).remove()
        } else {
          path.node.specifiers = specifiers
        }
        hasChanges = true
      }
    })

  if (removedHooksUsed.size > 0) {
    const firstStatement = root.find(j.Program).get("body", 0)

    if (firstStatement) {
      const hooksList = Array.from(removedHooksUsed)
        .map((hook) => `//   - ${hook}: Use ${REMOVED_HOOKS[hook]}`)
        .join("\n")

      const comment = j.commentBlock(
        `\n` +
          ` MIGRATION NOTE: The following Chakra UI hooks have been removed.\n` +
          ` Please replace them with the suggested alternatives:\n` +
          `\n` +
          `${hooksList}\n` +
          `\n` +
          ` See: https://chakra-ui.com/docs/get-started/migration#hooks\n`,
        true,
        false,
      )

      firstStatement.node.comments = firstStatement.node.comments || []
      firstStatement.node.comments.unshift(comment)
      hasChanges = true
    }
  }

  root
    .find(j.CallExpression, {
      callee: { name: "useId" },
    })
    .forEach((path) => {
      const parent = path.parent
      if (parent.value.type === "VariableDeclarator") {
        const comment = j.commentLine(
          " Use React.useId instead (available in React 18+)",
        )

        if (parent.parent.value.type === "VariableDeclaration") {
          parent.parent.value.comments = parent.parent.value.comments || []
          parent.parent.value.comments.push(comment)
          hasChanges = true
        }
      }
    })

  root
    .find(j.CallExpression, {
      callee: { name: "useTheme" },
    })
    .forEach((path) => {
      const comment = j.commentLine(
        " useTheme removed: Import theme from your system or use useChakraContext",
      )

      const statement = path.parentPath.parentPath
      if (statement && statement.value) {
        statement.value.comments = statement.value.comments || []
        statement.value.comments.push(comment)
        hasChanges = true
      }
    })

  return hasChanges ? root.toSource() : file.source
}

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
  useToken: "Import tokens from theme system",
  useUpdateEffect: "react-use: useUpdateEffect",
}
