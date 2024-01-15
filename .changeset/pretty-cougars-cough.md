---
"@chakra-ui/styled-system": minor
"@chakra-ui/react": minor
"@chakra-ui/theme": minor
---

Add support for custom theme conditions or pseudo props via `theme.conditions`

```ts
// theme.ts

const theme = extendTheme({
  conditions: {
    _closed: "[data-state='closed']", // pseudo prop
  },
  components: {
    CustomComponent: {
      baseStyle: {
        _closed: {
          bg: "red.200",
        },
      },
    },
  },
})
```
