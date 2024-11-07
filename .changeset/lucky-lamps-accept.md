---
"@chakra-ui/storybook-addon": patch
"@chakra-ui/gatsby-plugin": patch
"@chakra-ui/styled-system": patch
"@chakra-ui/theme-tools": patch
"@chakra-ui/react": patch
"@chakra-ui/props-docs": patch
"@chakra-ui/test-utils": patch
"@chakra-ui/anatomy": patch
"@chakra-ui/next-js": patch
"@chakra-ui/hooks": patch
"@chakra-ui/icons": patch
"@chakra-ui/theme": patch
"@chakra-ui/utils": patch
"@chakra-ui/cli": patch
---

- **Styled System**: Revert support for custom conditions. It introduce
  performance regressions during style computation

- **Slider**: Fix regression is slider thumb position

- **Tooltip**: Fix issue wher tooltip doesn't work when react.lazy is given as a
  child
