---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

- **TagsInput**: Fix overflow issue where very long tags would overflow the
  container instead of truncating with ellipsis.

- **CheckboxGroup**: Fix type issue where `CheckboxGroupProps` could not be
  passed to the `CheckboxGroup` component.
