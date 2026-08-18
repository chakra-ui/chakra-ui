---
"@chakra-ui/react": patch
---

- **RadioCard**: Fix the `outline` variant losing its border width when a card
  is both checked and disabled. The checked ring is an inset box-shadow on
  `item`, and inset shadows paint below child content, so `itemControl`'s
  disabled `bg.muted` background covered it. The `outline` variant now clears
  that background when disabled, matching what `solid` already did
