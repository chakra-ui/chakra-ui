---
"@chakra-ui/menu": minor
---

- The `MenuItem` now accepts a `commandSpacing` prop that can be used to adjust
  the space between the command and label.

- Add support `rootProps` to `MenuList` so it's possible override the styles for
  root container for menu list. Common use case is to change the applied
  `zIndex` of the menulist.

- Make it possible to override `zIndex` by passing props to `MenuList`
