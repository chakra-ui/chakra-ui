---
"@chakra-ui/input": patch
---

Fixed an issue where `InputGroup` passes undefined `size` and `variant` props
which overrides the ones defined by default in a custom `Input` component.
