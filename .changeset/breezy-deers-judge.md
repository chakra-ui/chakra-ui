---
"@chakra-ui/css-reset": minor
"@chakra-ui/provider": minor
"@chakra-ui/theme": minor
---

Add support for scoping the css reset to specific selector.

To use this feature, pass the `resetScope` prop to the `ChakraProvider` or
`ChakraBaseProvider` component.

```jsx live=false
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider resetScope=".ck-reset">
      <App />
    </ChakraProvider>
  )
}
```
