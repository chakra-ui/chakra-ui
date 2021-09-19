---
"@chakra-ui/popper": minor
---

`usePopper` now accepts a `direction` prop so it can handle placement for RTL
languages. Values such as `top-start`, `top-end`, `bottom-start` and
`bottom-end` will be flipped depending on the theme's direction value.

In addition to the default `popper.js` placement, you can pass `start-start`,
`start-end`, `end-start` and `end-end`. This will resolve to the equivalent
`popper.js` placement as well.
