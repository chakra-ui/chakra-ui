---
"@chakra-ui/styled-system": patch
"@chakra-ui/system": patch
---

Removed changes from PR #3615 which causes issues when trying to apply a
property which already exists. Modified toCSSObject to handle correctly merging
styles in precedence order, \_\_css, baseStyle, other(apply, layerStyles, and
textStyles), styleProps, sx and css. Each style has its CSS generated and merged
with the accumulated CSS object.
