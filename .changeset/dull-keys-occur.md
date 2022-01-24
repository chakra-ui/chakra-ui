---
"@chakra-ui/styled-system": minor
"@chakra-ui/theme": minor
"@chakra-ui/color-mode": minor
---

Introducing **semantic tokens**

Semantic tokens provide the ability to create css variables which can change
with a CSS condition.

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    900: "#171923",
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="gray.900">will always be gray.900</Text>
  </ChakraProvider>
)
```

```tsx live=false
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
  colors: {
    50: "#F7FAFC",
    900: "#171923",
  },
  semanticTokens: {
    colors: {
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
})

const App = () => (
  <ChakraProvider theme={customTheme}>
    <Text color="text">
      will be gray.900 in light mode and gray.50 in dark mode
    </Text>
  </ChakraProvider>
)
```

```tsx live=false
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    red: {
      100: "#ff0010",
      400: "#ff0040",
      500: "#ff0050",
      700: "#ff0070",
      800: "#ff0080",
    },
  },
  semanticTokens: {
    colors: {
      error: "red.500", // create a token alias
      success: "red.100",
      primary: {
        // set variable conditionally with pseudo selectors like `_dark` and `_light`
        // use `default` to define fallback value
        default: "red.500",
        _dark: "red.400",
      },
      secondary: {
        default: "red.800",
        _dark: "red.700",
      },
    },
  },
})
```
