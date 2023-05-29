---
"@chakra-ui/provider": minor
---

Add support for disabling global styles via the `disableGlobalStyle` prop on the
`ChakraProvider`.

This is useful for scenarios where user needs to scope all global styles + css
reset to a specific element.

```jsx live=false
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider disableGlobalStyle>
      <App />
    </ChakraProvider>
  )
}
```
