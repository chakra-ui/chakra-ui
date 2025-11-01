---
"@chakra-ui/react": patch
---

Fix Shadow DOM and Web Component selector handling in `globalCss`. The `:host`,
`:host-context()`, and `::slotted()` pseudo-classes now correctly transform to
top-level selectors with case-insensitive matching.
