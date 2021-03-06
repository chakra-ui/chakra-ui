---
"@chakra-ui/react": minor
"@chakra-ui/theme": patch
---

The `extendTheme` function allows you to pass multiple overrides or extensions:

```js
import {
  extendTheme,
  theme as baseTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react"

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "red" }),
  baseTheme,
)
```
