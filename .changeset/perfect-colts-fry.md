---
"@chakra-ui/checkbox": patch
"@chakra-ui/number-input": patch
"@chakra-ui/radio": patch
---

Replace `withFlushSync` with microtask callback to prevent ReactDOM warning.
