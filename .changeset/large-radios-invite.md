---
"@chakra-ui/styled-system": patch
"@chakra-ui/button": patch
---

Fixed a bug that would not consider color style props on the Button component
when specified by layerStyles in the theme object. This was caused by the
getWithPriority function which would discard any styles that are already
included in the component styles props
