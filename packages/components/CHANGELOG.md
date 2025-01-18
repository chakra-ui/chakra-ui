# @chakra-ui/react

## 2.10.5

### Patch Changes

- [`1efcb51`](https://github.com/chakra-ui/chakra-ui/commit/1efcb51c09353da877884b47d00e2d980e3247f0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix issue in
  React 19 where deprecation warning is shown when accessing `element.ref`

  - Fix issue where extended theme component values in responsive array get
    concatenated with base values

## 2.10.4

### Patch Changes

- [`3696f20`](https://github.com/chakra-ui/chakra-ui/commit/3696f2078c05e70eac8e8330323750e7d65fc01b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Styled
  System**: Revert support for custom conditions. It introduce performance
  regressions during style computation

  - **Slider**: Fix regression is slider thumb position
  - **Tooltip**: Fix issue wher tooltip doesn't work when react.lazy is given as
    a child

- Updated dependencies
  [[`3696f20`](https://github.com/chakra-ui/chakra-ui/commit/3696f2078c05e70eac8e8330323750e7d65fc01b)]:
  - @chakra-ui/styled-system@2.12.1
  - @chakra-ui/hooks@2.4.3
  - @chakra-ui/theme@3.4.7
  - @chakra-ui/utils@2.2.3

## 2.10.3

### Patch Changes

- [#8941](https://github.com/chakra-ui/chakra-ui/pull/8941)
  [`171b124`](https://github.com/chakra-ui/chakra-ui/commit/171b124c68c7562bbd7fb7ff427951c4322fe500)
  Thanks [@n1xx1](https://github.com/n1xx1)! - - Fix issue where Next.js dev
  server enters infinite loop when passing a react element to a styled component

  - Fix regression where wrapping `CheckboxGroup` with `FormControl` no longer
    works.
  - Fix runtime performance degradation by pre-computing the `isStyleProp`
    function

- Updated dependencies
  [[`171b124`](https://github.com/chakra-ui/chakra-ui/commit/171b124c68c7562bbd7fb7ff427951c4322fe500)]:
  - @chakra-ui/styled-system@2.12.0
  - @chakra-ui/theme@3.4.6

## 2.10.2

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

- Updated dependencies
  [[`eeeea05`](https://github.com/chakra-ui/chakra-ui/commit/eeeea05e310f7dce930287169a10873699c2ab91)]:
  - @chakra-ui/styled-system@2.11.2
  - @chakra-ui/hooks@2.4.2
  - @chakra-ui/theme@3.4.6
  - @chakra-ui/utils@2.2.2

## 2.10.1

### Patch Changes

- [`2b33382`](https://github.com/chakra-ui/chakra-ui/commit/2b33382c7d6126a6631488053dbdf3a3c786dbfb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Popover,
  Menu**: Fix issue where closing with the escape key could cause the page to
  scroll to top
- Updated dependencies
  [[`2b33382`](https://github.com/chakra-ui/chakra-ui/commit/2b33382c7d6126a6631488053dbdf3a3c786dbfb)]:
  - @chakra-ui/styled-system@2.11.1
  - @chakra-ui/hooks@2.4.1
  - @chakra-ui/theme@3.4.5
  - @chakra-ui/utils@2.2.1

## 2.10.0

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

### Patch Changes

- Updated dependencies
  [[`ac31c4b`](https://github.com/chakra-ui/chakra-ui/commit/ac31c4bbaa737cc1f947e5c2c6c2f2f228ad500b)]:
  - @chakra-ui/styled-system@2.11.0
  - @chakra-ui/hooks@2.4.0
  - @chakra-ui/utils@2.2.0
  - @chakra-ui/theme@3.4.4

## 2.9.5

### Patch Changes

- [`7033c39`](https://github.com/chakra-ui/chakra-ui/commit/7033c39d60b7b9589a4889016134d1111d87c416)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Steps**: Fix
  issue where activeStepPercent returns NaN when the number of steps is one.

  - **CircularProgress**: Fix issue where `size` prop doesn't allow responsive
    value.
  - **Transition Components**: Support `animatePresenceProps` to allow
    customizing the framer motion `AnimatePresence` component.

## 2.9.4

### Patch Changes

- Fix issue where extend theme utilities are not exported

- Updated dependencies []:
  - @chakra-ui/styled-system@2.10.3
  - @chakra-ui/hooks@2.3.3
  - @chakra-ui/theme@3.4.3
  - @chakra-ui/utils@2.1.3

## 2.9.3

### Patch Changes

- Fix extend theme functions

## 2.9.2

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/styled-system@2.10.2
  - @chakra-ui/hooks@2.3.2
  - @chakra-ui/theme@3.4.2
  - @chakra-ui/utils@2.1.2

## 2.9.1

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/styled-system@2.10.1
  - @chakra-ui/hooks@2.3.1
  - @chakra-ui/theme@3.4.1
  - @chakra-ui/utils@2.1.1

## 2.9.0

### Minor Changes

- [`c04ca6a`](https://github.com/chakra-ui/chakra-ui/commit/c04ca6a155797a74e5fffc0d52d2f701d0459463)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Export
  `CreateIconOptions`

- [#8433](https://github.com/chakra-ui/chakra-ui/pull/8433)
  [`fd5fab4`](https://github.com/chakra-ui/chakra-ui/commit/fd5fab415b8abe3d56aa5fac7304f6beeb0351ca)
  Thanks [@bhainesva](https://github.com/bhainesva)! - Export `useAlertContext`
  hook

- [`75d0293`](https://github.com/chakra-ui/chakra-ui/commit/75d0293c2efb40705817ac6b91434e4004faa68a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Force release

- [#8136](https://github.com/chakra-ui/chakra-ui/pull/8136)
  [`006d9e0`](https://github.com/chakra-ui/chakra-ui/commit/006d9e0b5e58aaa8f5ac635ea1238be6ed7e73d6)
  Thanks [@MrBr](https://github.com/MrBr)! - Export `toastStore` from `toast`
  component

- [#8310](https://github.com/chakra-ui/chakra-ui/pull/8310)
  [`c6dc139`](https://github.com/chakra-ui/chakra-ui/commit/c6dc139ee0835adb962910807e25c60c78696aa7)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Add support
  for custom theme conditions or pseudo props via `theme.conditions`

  ```ts
  // theme.ts

  const theme = extendTheme({
    conditions: {
      _closed: "[data-state='closed']", // pseudo prop
    },
  })
  ```

  This allows you to use the pseudo prop in your components

  ```jsx
  <Box data-state="closed" _closed={{ bg: "red.200" }}>
    This box is closed
  </Box>
  ```

  **For TypeScript users**, you need to use the Chakra CLI to generate the types
  for your custom conditions.

  ```sh
  pnpm chakra-cli tokens src/theme/index.ts
  ```

- [#8222](https://github.com/chakra-ui/chakra-ui/pull/8222)
  [`c583d8a`](https://github.com/chakra-ui/chakra-ui/commit/c583d8a03d813d26d14d340984e91385b6b403a2)
  Thanks [@TKYK93](https://github.com/TKYK93)! - Add default
  `preserveScrollBarGap`

- [#8754](https://github.com/chakra-ui/chakra-ui/pull/8754)
  [`b26adab`](https://github.com/chakra-ui/chakra-ui/commit/b26adab9db1b582dc9fdf5547685787eec156dd3)
  Thanks [@loren138](https://github.com/loren138)! - Add for attribute to Radio
  and Checkbox label if id is available for the input

### Patch Changes

- [#8208](https://github.com/chakra-ui/chakra-ui/pull/8208)
  [`8135ded`](https://github.com/chakra-ui/chakra-ui/commit/8135ded09b523681f33e818017a841b64a05e9c1)
  Thanks [@SamuelNoB](https://github.com/SamuelNoB)! - Fix problem with leading
  and trailing spaces when getting initials for the Avatar component

- [#8523](https://github.com/chakra-ui/chakra-ui/pull/8523)
  [`44d1469`](https://github.com/chakra-ui/chakra-ui/commit/44d1469a82e7c0e9607a4bc6db6d05ad16e7dc2a)
  Thanks [@andrey-mitko](https://github.com/andrey-mitko)! - Include "nonce"
  from "EmotionCache" inside style tag injected by color-mode.util to resolve
  Content Security Policy error

- [#8462](https://github.com/chakra-ui/chakra-ui/pull/8462)
  [`938916a`](https://github.com/chakra-ui/chakra-ui/commit/938916a0c3512fb459aa80a635ffd41239bd63ea)
  Thanks [@Philzen](https://github.com/Philzen)! - Revert breaking change by
  re-allowing disabled prop on button

- Updated dependencies
  [[`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36),
  [`52d5f3c`](https://github.com/chakra-ui/chakra-ui/commit/52d5f3ccb5732b3ba84cdc04c3258c49c38c64a9),
  [`75d0293`](https://github.com/chakra-ui/chakra-ui/commit/75d0293c2efb40705817ac6b91434e4004faa68a),
  [`c6dc139`](https://github.com/chakra-ui/chakra-ui/commit/c6dc139ee0835adb962910807e25c60c78696aa7),
  [`85a81c8`](https://github.com/chakra-ui/chakra-ui/commit/85a81c892bda2b6c49517129201690858d1289e0),
  [`c6dc139`](https://github.com/chakra-ui/chakra-ui/commit/c6dc139ee0835adb962910807e25c60c78696aa7)]:
  - @chakra-ui/theme@3.4.0
  - @chakra-ui/styled-system@2.10.0
  - @chakra-ui/hooks@2.3.0
  - @chakra-ui/utils@2.1.0
