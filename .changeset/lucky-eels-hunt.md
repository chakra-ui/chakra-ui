---
"@chakra-ui/descendant": patch
"@chakra-ui/theme": patch
---

Make sure that the types used by other chackra packages are properly exported so
that there isn't reference to \`src\` in type declarations. Fixes #6021
