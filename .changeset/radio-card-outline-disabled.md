---
"@chakra-ui/react": patch
---

- **RadioCard**: Fix the `outline` variant losing its border width when a card
  is both checked and disabled. The checked ring is an inset box-shadow, which
  `itemControl`'s disabled background painted over
