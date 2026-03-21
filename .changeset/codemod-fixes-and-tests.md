---
"@chakra-ui/codemod": patch
---

- Fix issue where `Steps` was added to the import list.

- Fix issue where `ChakraProvider value={defaultSystem}` was wrapped in
  `String()` — the system engine is passed through correctly.
