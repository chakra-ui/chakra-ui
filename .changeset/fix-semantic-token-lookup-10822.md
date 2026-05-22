---
"@chakra-ui/react": patch
---

Fix `system.token()` returning dark-mode resolved values for semantic tokens
with light/dark conditions instead of the semantic CSS variable reference.

Also fix token dictionary bookkeeping for semantic tokens without a base value
so lookup maps stay in sync after empty tokens are removed.
