---
"@chakra-ui/cli": patch
---

Improve the `chakra typegen` error when the input file does not export a Chakra
system, including the discovered exports and a `createSystem(...)` example for
files that export `defineConfig(...)` configs.
