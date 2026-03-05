---
"@chakra-ui/react": patch
---

- **Hooks**: Fix `usePrevious` to use a React 19-safe state-based implementation
  and compare values with `Object.is` for correct `NaN`/`-0` behavior.
