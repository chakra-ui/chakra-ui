---
"@chakra-ui/theme": patch
"@chakra-ui/close-button": patch
---

Resolved an issue where `DrawerCloseButton` was not receiving its base styles
when it was passed other styles through the `__css` property, breaking the
button's positioning.
