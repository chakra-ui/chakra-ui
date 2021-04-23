---
"@chakra-ui/gatsby-plugin": major
---

Upgrading to this new major version is recommended for everyone as it fixes hot reloading in Gatsby (Fast Refresh). In the previous version changes to the shadowed `theme.js` file didn't trigger automatic reloading, and a manual reload was necessary.

## Breaking Changes

- The `isUsingColorMode` option was removed. The `ChakraProvider` will always use the `ColorModeProvider`
- The `isResettingCSS` option was renamed to `resetCSS`

Those changes were made to use the current `ChakraProvider` and align the prop names.

## Improvements

- Use `ChakraProvider` instead of the outdated `ThemeProvider` pattern
- Add `initialColorMode` to the `ColorModeScript`
- Allow Fast Refresh reloading of all theme files
- Set stricter `peerDependency` on `gatsby` (to `^2.29.3 || ^3.0.0`)
