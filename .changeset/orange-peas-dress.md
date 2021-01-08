---
"@chakra-ui/styled-system": patch
---

- Due to Safari not support css logical properties for `right`, and `left`, I
  added polyfill for this css logical properties.

> Affect components: `Modal`, `Drawer`

- Added a `directionality` helper function to encapsulate all logic for ltr-rtl
  value or style flipping.
