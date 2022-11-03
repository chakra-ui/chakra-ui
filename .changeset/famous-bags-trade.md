---
"@chakra-ui/accordion": minor
"@chakra-ui/menu": minor
"@chakra-ui/modal": minor
"@chakra-ui/popover": minor
"@chakra-ui/progress": minor
"@chakra-ui/react-use-reduced-motion": minor
"@chakra-ui/styled-system": minor
"@chakra-ui/system": minor
"@chakra-ui/theme": minor
"@chakra-ui/toast": minor
"@chakra-ui/tooltip": minor
"@chakra-ui/transition": minor
---

Refactored `ThemeConfig` type: added a new `useReducedMotion` property.

Adding support for disabling animations when the `theme.config.useReducedMotion`
is set to `true`.

Adding support for overriding the theme's `useReducedMotion` value on a
component level by providing the `reduceMotion` prop, which is just a boolean.
