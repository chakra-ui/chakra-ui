---
"@chakra-ui/color-mode": patch
---

Fixed color mode behavior priority in the following order:

- if `useSystemColorMode` is true system-color will be used as default - initial
  colormode is the fallback if system color mode isn't resolved

- if `--chakra-ui-color-mode` is defined through e.g. `ColorModeScript` this
  will be used

- if `colorModeManager` = `localStorage` and a value is defined for
  `chakra-ui-color-mode` this will be used

- if `initialColorMode` = `system` system-color will be used as default -
  initial colormode is the fallback if system color mode isn't resolved

- if `initialColorMode` = `'light'|'dark'` the corresponding value will be used
