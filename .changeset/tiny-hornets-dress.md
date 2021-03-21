---
"@chakra-ui/react": minor
"@chakra-ui/theme": patch
---

The `extendTheme` function allows you to pass multiple overrides or extensions:

```js
import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
  withDefaultVariant,
  withDefaultProps,
} from "@chakra-ui/react"

const customTheme = extendTheme(
  {
    colors: {
      brand: {
        // ...
        500: "#b4d455",
        // ...
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" }),
  withDefaultSize({
    size: "lg",
    components: ["Input", "NumberInput", "PinInput"],
  }),
  withDefaultVariant({
    variant: "outline",
    components: ["Input", "NumberInput", "PinInput"],
  }),
  // or all in one:
  withDefaultProps({
    defaultProps: {
      colorSchem: "brand",
      variant: "outline",
      size: "lg",
    },
    components: ["Input", "NumberInput", "PinInput"],
  }),
  // optional:
  yourCustomBaseTheme, // defaults to our chakra default theme
)
```
