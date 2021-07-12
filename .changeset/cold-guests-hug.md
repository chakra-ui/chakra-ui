---
"@chakra-ui/button": patch
---

Resolved an issue where a `Button` in loading state didn't consider the width of
`leftIcon` and `rightIcon`, resulting in layout shifts when the button leaves
the loading state. Buttons now render with the same width regardless of state.
