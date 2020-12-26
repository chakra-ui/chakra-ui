---
"@chakra-ui/react": minor
---

Allow `extendTheme` to accept optional second argument `baseTheme` to customize:

```jsx
const theme = extendTheme(
  { colors: { red: { 500: "#ff0000" } } },
  // the base theme to customize with the above overrides
  yourTheme,
)
```

If no `baseTheme` is provided, defaults to the Chakra theme.
