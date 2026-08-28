---
"@chakra-ui/react": patch
---

Fix the style cache ignoring property order, so style objects and recipe
variants passed in a different order could get another call site's result. This
was the cause of SSR hydration mismatches on `className`.
