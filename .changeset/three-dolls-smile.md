---
"@chakra-ui/system": major
---

Nested Styles are now deep merged.

Previously we've used `Object.assign` to merge different Style-soruces
(sx,\_\_css,baseStyle, component-style-props).

This was fine when using 1 dimensional objects, since the latter always
overwrote the previous value.

With the usage of `pseudos` like `_dark`, `_selected`,... a simple
`Object.assign` isn't sufficient, since those props are always overridden.

This change introduces a deep-merge of those styles.
