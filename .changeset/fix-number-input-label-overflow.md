---
"@chakra-ui/react": patch
---

- Fix `NumberInput.Control` overflow when `NumberInput.Label` is used inside
  `NumberInput.Root`
- The control is now anchored to the input height via `--input-height` instead
  of spanning the full root height
