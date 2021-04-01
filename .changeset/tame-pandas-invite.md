---
"@chakra-ui/react-utils": patch
"@chakra-ui/utils": patch
---

- Extract functions from `react-utils` back to `utils` package
- Remove `withFlushSync` function in favor of using a microtask callback
