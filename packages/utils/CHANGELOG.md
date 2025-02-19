# @chakra-ui/utils

## 2.2.4

### Patch Changes

- [#9593](https://github.com/chakra-ui/chakra-ui/pull/9593)
  [`6d78072`](https://github.com/chakra-ui/chakra-ui/commit/6d78072fbacbf7e826891f138b328360ff04c9c0)
  Thanks [@isBatak](https://github.com/isBatak)! - Use
  `__unsafe_useEmotionCache` Instead of `withEmotionCache`. This fixes this
  issue: [#9579](https://github.com/chakra-ui/chakra-ui/issues/9579)

## 2.2.3

### Patch Changes

- [`3696f20`](https://github.com/chakra-ui/chakra-ui/commit/3696f2078c05e70eac8e8330323750e7d65fc01b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Styled
  System**: Revert support for custom conditions. It introduce performance
  regressions during style computation

  - **Slider**: Fix regression is slider thumb position
  - **Tooltip**: Fix issue wher tooltip doesn't work when react.lazy is given as
    a child

## 2.2.2

### Patch Changes

- [`eeeea05`](https://github.com/chakra-ui/chakra-ui/commit/eeeea05e310f7dce930287169a10873699c2ab91)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Remove unused
  `react-lorem-component` dependency which was causing a warning during install.

  - Fix issue where `useId` and `useConst` was not exported from the hooks
    package.
  - **Popover**: Fix issue where popover doesn't use the correct zIndex token.
  - **Skeleton**: Add support for overriding animation via the `animation` prop.
  - **PinInput**: Allow passing `index` to `PinInputField` to set current `id`
    in SSR.
  - **Popover**: Fix issue where popover not closing on outside click when it's
    not focused
  - **Menu**

    - Fix issue where menu doesn't focus the first item consistently when
      `isLazy` is `true`
    - Fix issue where menu doesn't scroll the focused item into view when using
      the keyboard.

  - **Descendants**: Fix issue were `createDescendantContext` does not create a
    fresh new context on each render.
  - **Slider**: Fix issue where slider thumb flickers when used within tabs.
  - **useSize**: Add support for `enabled` and `fallback` options.
  - **Next.js**: Fix issue where importing components in the Next.js app dir
    would throw an RSC error.
  - **useClipboard**

    - Use `navigator.clipboard.writeText` when supported instead of
      `document.execCommand` for better browser compatibility.
    - Add support passing valueToCopy in the `onCopy` function.

  - **Tabs**: Fix issue where `TabPanel` doesn't respect custom child key.
  - **Theme**: Fix issue where multi style config did not allow readonly strings
    for parts.

## 2.2.1

### Patch Changes

- [`2b33382`](https://github.com/chakra-ui/chakra-ui/commit/2b33382c7d6126a6631488053dbdf3a3c786dbfb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Popover,
  Menu**: Fix issue where closing with the escape key could cause the page to
  scroll to top

## 2.2.0

### Minor Changes

- [`ac31c4b`](https://github.com/chakra-ui/chakra-ui/commit/ac31c4bbaa737cc1f947e5c2c6c2f2f228ad500b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Button**: Add
  `shouldWrapChildren` prop to button component to prevent issues with
  translation extensions that modify the DOM.

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

    - Add support for `_complete`, `_incomplete` and `_current` pseudo
      selectors.

      - `_complete` maps to `&[data-complete]`
      - `_incomplete` maps to `&[data-incomplete]`
      - `_current` maps to `&[data-current]`

    - Add support for color tokens in `textFillColor` property.

  - **Checkbox**: Fix issue where iconSize and iconColor doesn't take effect
    until a custom size is used.
  - **Steps**:

    - Fix issue where some style components show a TS Error when passing the
      `sx` prop.
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
  - **Modal, Drawer**: Fix issue where closeOnOverlayClick doesn't work in
    Preact.
  - Fix regression where `keyframes` was not exported from `@chakra-ui/react`.

## 2.1.3

### Patch Changes

- Fix issue where extend theme utilities are not exported

## 2.1.2

### Patch Changes

- Force release

## 2.1.1

### Patch Changes

- Force release

## 2.1.0

### Minor Changes

- [`75d0293`](https://github.com/chakra-ui/chakra-ui/commit/75d0293c2efb40705817ac6b91434e4004faa68a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Force release
