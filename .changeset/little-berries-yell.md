---
"@chakra-ui/react": minor
---

- **Button**: Add `shouldWrapChildren` prop to button component to prevent
  issues with translation extensions that modify the DOM.

- **Provider**: Expose minimal provider component to help with reducing bundle
  size. The base theme only consist of tokens and no components.

```tsx
// chakra-provider.tsx
import { baseTheme } from "@chakra-ui/theme"
import { Provider } from "@chakra-ui/react/provider"

export const ChakraProvider = ({ children }) => {
  return <Provider theme={baseTheme}>{children}</Provider>
}
```

- **Extend Theme**: Expose `createExtendTheme` factory to allow for creating
  extend theme functions for minimal provider.

```tsx
// extend-theme.ts
import { baseTheme } from "@chakra-ui/theme"
import { createExtendTheme } from "@chakra-ui/react/extend-theme"

export const extendTheme = createExtendTheme(baseTheme)
```
