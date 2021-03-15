---
"@chakra-ui/menu": patch
"@chakra-ui/popover": patch
"@chakra-ui/theme": patch
"@chakra-ui/tooltip": patch
---

- Refactor arrow components to use `data-popper-arrow` and
  `data-popper-arrow-inner` to define the arrow elements. This is used within
  the modifiers to update the arrow styles/position positioning.

- Change `arrowSize` and `arrowShadowColor` to use CSS custom properties instead
  of passing it to `usePopper`.

- Update component themes to use `--popper-arrow-bg` to set the background for
  the popper's arrow element.
