---
"@chakra-ui/media-query": patch
---

- Refactored the `useMediaQuery` hook to be more resilient and cross-browser
  friendly.

- Add support for fallback values to `useMediaQuery` to help users provide SSR
  friendly fallback when using width queries.
