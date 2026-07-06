---
"@chakra-ui/react": patch
---

Fix error when merging recipes (e.g. composing a recipe-based component through
the `chakra` factory). Recipe merging now normalizes compiled and raw configs
before combining them, and no longer throws or mutates the source configs.
