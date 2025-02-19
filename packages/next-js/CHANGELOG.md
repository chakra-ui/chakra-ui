# @chakra-ui/next-js

## 2.4.4

### Patch Changes

- [#9593](https://github.com/chakra-ui/chakra-ui/pull/9593)
  [`6d78072`](https://github.com/chakra-ui/chakra-ui/commit/6d78072fbacbf7e826891f138b328360ff04c9c0)
  Thanks [@isBatak](https://github.com/isBatak)! - Use
  `__unsafe_useEmotionCache` Instead of `withEmotionCache`. This fixes this
  issue: [#9579](https://github.com/chakra-ui/chakra-ui/issues/9579)

## 2.4.3

### Patch Changes

- [`3696f20`](https://github.com/chakra-ui/chakra-ui/commit/3696f2078c05e70eac8e8330323750e7d65fc01b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Styled
  System**: Revert support for custom conditions. It introduce performance
  regressions during style computation

  - **Slider**: Fix regression is slider thumb position
  - **Tooltip**: Fix issue wher tooltip doesn't work when react.lazy is given as
    a child

## 2.4.2

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

## 2.4.1

### Patch Changes

- [`2b33382`](https://github.com/chakra-ui/chakra-ui/commit/2b33382c7d6126a6631488053dbdf3a3c786dbfb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **Popover,
  Menu**: Fix issue where closing with the escape key could cause the page to
  scroll to top

## 2.4.0

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

## 2.3.4

### Patch Changes

- [#8879](https://github.com/chakra-ui/chakra-ui/pull/8879)
  [`9d5ae00`](https://github.com/chakra-ui/chakra-ui/commit/9d5ae007466655205376c8dca5d39c48722d24a1)
  Thanks [@nzws](https://github.com/nzws)! - Fix issue where emitted ESM doesn't
  resolve correctly due to missing tsconfig.json

## 2.3.3

### Patch Changes

- Fix issue where extend theme utilities are not exported

## 2.3.2

### Patch Changes

- Force release

## 2.3.1

### Patch Changes

- Force release

## 2.3.0

### Minor Changes

- [`75d0293`](https://github.com/chakra-ui/chakra-ui/commit/75d0293c2efb40705817ac6b91434e4004faa68a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Force release

### Patch Changes

- [#8132](https://github.com/chakra-ui/chakra-ui/pull/8132)
  [`96fac31`](https://github.com/chakra-ui/chakra-ui/commit/96fac317bbd4df316e96527ef8a0fef3c4550a71)
  Thanks [@ernieMrtnz](https://github.com/ernieMrtnz)! - adds nonce to added
  style from emotion cache

- [`6e2b976`](https://github.com/chakra-ui/chakra-ui/commit/6e2b976d5bb932bfd9399eacd2819c0bb9d56445)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  image component does not work due to interop issue with `next/image`

## 2.2.0

### Minor Changes

- [#8028](https://github.com/chakra-ui/chakra-ui/pull/8028)
  [`61f965a41`](https://github.com/chakra-ui/chakra-ui/commit/61f965a4143012658156d362e809fdd9b0a616f5)
  Thanks [@klausbadelt](https://github.com/klausbadelt)! - add isExternal to
  types

## 2.1.5

### Patch Changes

- [`e16ee11eb`](https://github.com/chakra-ui/chakra-ui/commit/e16ee11eb1d9849d91604251fe83c96b60166913)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where DOM
  image props are not forwarded to Image component

## 2.1.4

### Patch Changes

- [`5a755971a`](https://github.com/chakra-ui/chakra-ui/commit/5a755971a6ede83de28c9a670df3d5e2d67bcaee)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `isExternal` to
  Link component

- [`38acfe89c`](https://github.com/chakra-ui/chakra-ui/commit/38acfe89c5d1f1edc67bbc44e2edd38980ca3e08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump emotion
  version to `11.11.x` to support css cascade layers

## 2.1.3

### Patch Changes

- [#7563](https://github.com/chakra-ui/chakra-ui/pull/7563)
  [`9800a37f4`](https://github.com/chakra-ui/chakra-ui/commit/9800a37f4fe89def6426ab93558a6a255eeb2c54)
  Thanks [@Zaroxii](https://github.com/Zaroxii)! - Add loading props to the
  @chakra-ui/next-js.

- [#7595](https://github.com/chakra-ui/chakra-ui/pull/7595)
  [`1b044474b`](https://github.com/chakra-ui/chakra-ui/commit/1b044474bd04ed3cb36d7d7540d756305a573a9c)
  Thanks [@Haritaso](https://github.com/Haritaso)! - Fix issue where some prop
  was not forwarded to the underlying component.

## 2.1.2

### Patch Changes

- [`f8f5280bc`](https://github.com/chakra-ui/chakra-ui/commit/f8f5280bc5fbdc3fc4a30307313e48c7c160c738)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `fill` prop was not forwarded to the underlying component.

- [#7506](https://github.com/chakra-ui/chakra-ui/pull/7506)
  [`68ceb28ae`](https://github.com/chakra-ui/chakra-ui/commit/68ceb28aee0c54dbe9835ac455cc33229e0ff10b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issues with TS
  5.0

## 2.1.1

### Patch Changes

- [`be28f5d0b`](https://github.com/chakra-ui/chakra-ui/commit/be28f5d0ba3a14d9a6b6bd9e059b922d25cdb260)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  theming related props (variant, size) could not be passed to the `Link`
  component

## 2.1.0

### Minor Changes

- [`46bd14641`](https://github.com/chakra-ui/chakra-ui/commit/46bd146415ba8232ac1106e1714608704ca73712)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add `Image`
  component that supercharges the Next.js optimized image with Chakra style
  props.

  - Add ESM interop for `createCache` to avoid server-related errors

## 2.0.1

### Patch Changes

- [#7329](https://github.com/chakra-ui/chakra-ui/pull/7329)
  [`b2b5d3545`](https://github.com/chakra-ui/chakra-ui/commit/b2b5d35452bf8a7a6ed16fba0f76e1037ce9986d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Introducing a new
  Next.js integration package that provides a smoother experience when using
  Chakra UI in your Next.js 13 apps.

  This package provides 2 main features:

  - **CacheProvider**: This component composes the Emotion.js' cache provider
    with the `useServerInsertedHTML` hook from `next/navigation`.

    This is necessary to ensure that computed styles are included in the initial
    server payload (during streaming).

    The `use client` directive is still required to be added to the top of the
    page-related file. This is a limitation of CSS-in-JS libraries and Emotion
    for now.

    > Note: Make sure to include the `<head>` tag in your layout component
    > otherwise it will not work.

    ```jsx live=false
    // app/layout.tsx
    "use client"
    import { CacheProvider } from "@chakra-ui/next-js"
    import { ChakraProvider } from "@chakra-ui/react"

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode,
    }) {
      return (
        <html lang="en">
          <head />
          <body>
            <CacheProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </CacheProvider>
          </body>
        </html>
      )
    }
    ```

  - **Link**: This component combines the functionality of the Next.js `Link`
    and Chakra UI `Link` components.

  ```jsx live=false
  // app/page.tsx
  "use client"
  import { Link } from "@chakra-ui/next-js"

  export default function Page() {
    return (
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
    )
  }
  ```

  > Support for `next/image` coming soon!
