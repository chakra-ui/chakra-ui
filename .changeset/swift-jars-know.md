---
"@chakra-ui/styled-system": patch
---

- Fix: issue where rtl property keys are incorrect due to `config.property`
  mutation.
- Fix: change `mx` and `px` to use logical properties. Instead of mapping to
  `marginLeft` and `marginRight`, it maps to `marginInlineStart` and
  `marginInlineEnd`. Same for `px`
