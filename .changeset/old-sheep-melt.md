---
"@chakra-ui/react": minor
"@chakra-ui/styled-system": patch
"@chakra-ui/theme": minor
---

Introducing a generic TypeScript type `ChakraTheme` to improve the `extendTheme`
function even further.

```ts
import { extendTheme } from "@chakra-ui/react"

export const customTheme = extendTheme({
  // here you get autocomplete for
  //   - existing definitions from the default theme
  //   - new components (Single and MultiStyle)
  //   - CSS definitions
  //   - color hues
  //   - etc.
})

export type MyCustomTheme = typeof customTheme
```

You can get typesafe access to your custom theme like this:

```ts
import { useTheme } from "@chakra-ui/react"
import { MyCustomTheme } from "./my-custom-theme"

const MyComponent = () => {
  const customTheme = useTheme<MyCustomTheme>()
  //...
}
```
