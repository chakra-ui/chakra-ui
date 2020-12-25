---
"@chakra-ui/react": minor
---

extendTheme: added an optional second argument `baseTheme` to customize:

```jsx
const theme = extendTheme({
  // theme overrides
  colors: { red: { 500: "#ff0000" } },
  // the base theme to customize with the above overrides
  yourTheme,
})
```

If no `baseTheme` is provided, defaults to the Chakra theme.
