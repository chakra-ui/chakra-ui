---
"@chakra-ui/react": patch
---

**useMediaQuery**: Fix issue where partial media queries like `aspect-ratio < 1`
doesn't return the correct result.

> **Good to know**: Partial media queries like `aspect-ratio < 1` resolves to
> `aspect-ratio < 1 / 1` in the browser.
