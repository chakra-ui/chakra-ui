---
"@chakra-ui/popper": patch
---

- Wrap force update within a function to prevent null scenarios
- Add default `inset` value to prevent overflow in scenarios where `enabled` is
  `false` (i.e. when the popper is not visible)
