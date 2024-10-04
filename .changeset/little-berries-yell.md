---
"@chakra-ui/react": minor
"@chakra-ui/props-docs": minor
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

- **Extend Theme**:

  - Expose `createExtendTheme` factory to allow for creating extend theme
    functions for minimal provider.

    ```tsx
    // extend-theme.ts
    import { baseTheme } from "@chakra-ui/theme"
    import { createExtendTheme } from "@chakra-ui/react/extend-theme"

    export const extendTheme = createExtendTheme(baseTheme)
    ```

  - Fix issue where overrding the heading theme with an object syntax led to
    incorrect theme result.

- **Styling**

  - Add support for `_complete`, `_incomplete` and `_current` pseudo selectors.

    - `_complete` maps to `&[data-complete]`
    - `_incomplete` maps to `&[data-incomplete]`
    - `_current` maps to `&[data-current]`

  - Add support for color tokens in `textFillColor` property.

- **Checkbox**: Fix issue where iconSize and iconColor doesn't take effect until
  a custom size is used.

- **Steps**:

  - Fix issue where some style components show a TS Error when passing the `sx`
    prop.
  - Fix issue where accessing the useSteps methods gives an unbound-method TS
    error.

- **Avatar**: Fix avatar image fallback alt when no name is supplied. You can
  now use the `iconLabel` prop to set a custom alt text.

- **Shadow DOM**: Improve outside click detection when Menu and Popover is
  rendered in shadow DOM.

- **Menu**: Add support for `iconPlacement` in `MenuItemOption` component to
  allow for customizing the placement of the check icon.

- **Popover**: Fix issue where passing `shadowColor` to `PopoverArrow` shows a
  React warning.

- **Modal, Drawer**: Fix issue where closeOnOverlayClick doesn't work in Preact.
