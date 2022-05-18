---
"@chakra-ui/descendant": patch
"@chakra-ui/react": patch
"@chakra-ui/theme": patch
---

Make sure that types used by other chakra packages are properly exported and
imported so that `src` directory is not referenced in the emitted type
declarations. Fixes #6021
