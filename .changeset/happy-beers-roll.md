---
"@chakra-ui/color-mode": patch
---

We now provide a way to customize the localStorage / cookie storage key

```jsx live=false
import { createLocalStorageManager } from "@chakra-ui/react"

const manager = createLocalStorageManager("my-key")

// in root
function App() {
  return <ChakraProvider colorModeManager={manager} />
}

// in script
function Document() {
  return <ColorModeScript storageKey="my-key" />
}
```
