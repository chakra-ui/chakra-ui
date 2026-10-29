---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

- **NumberInput**: Fix `NumberInput.Control` overflowing into the label when
  `NumberInput.Label` is used inside `NumberInput.Root`. The control is now
  anchored to the bottom of the root and sized to the input height.
