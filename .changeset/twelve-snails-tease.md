---
"@chakra-ui/form-control": patch
---

- Refactor form label to use prop getter instead of hook for better consistency
- Replace `withFlushSync` with `scheduleMicrotask` callback to prevent ReactDOM
  warning when an element us focused by calling `.focus()`. This works as well
  in concurrent mode.
