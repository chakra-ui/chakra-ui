---
"@chakra-ui/descendant": patch
"@chakra-ui/react": patch
"@chakra-ui/theme": patch
---

Ensure types used by other chakra packages are properly exported and imported so
that `src` directory is not referenced in the emitted type declarations.
