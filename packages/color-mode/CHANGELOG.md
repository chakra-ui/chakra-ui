# Change Log

## 2.1.0

### Minor Changes

- [#6167](https://github.com/chakra-ui/chakra-ui/pull/6167)
  [`bd2683306`](https://github.com/chakra-ui/chakra-ui/commit/bd2683306db6af272c43982ecd947182bde8b727)
  Thanks [@ianmcdaniel](https://github.com/ianmcdaniel)! - Check if the
  MediaQueryList object supports the addEventListener() method, else fallback to
  the legacy .addListener() method.

## 2.0.4

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/hooks@2.0.2
  - @chakra-ui/utils@2.0.2

## 2.0.3

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/hooks@2.0.1

## 2.0.2

### Patch Changes

- [`a9727167c`](https://github.com/chakra-ui/chakra-ui/commit/a9727167c9529f5512717ccf162fdeefe37c5d8f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix return value of
  color mode script

## 2.0.1

### Patch Changes

- [#6030](https://github.com/chakra-ui/chakra-ui/pull/6030)
  [`17aeb7185`](https://github.com/chakra-ui/chakra-ui/commit/17aeb7185b7439e04abec843df186fc2b1869d6f)
  Thanks [@RagOfJoes](https://github.com/RagOfJoes)! - - Improve SSR for color
  mode by adding `manager.get()` in the default state

  - Add support `disableTransitionOnChange` option in `ColorModeProvider` and
    `theme.config` to control whether the transition of all elements should be
    temporarily disabled while the color mode changes.

  - Expose `cookieStorageManagerSSR` for users who prefer to manage color mode
    server-side. If you use this, there's no need for the `ColorModeScript`

  ```jsx live=false
  function App({ Component, pageProps }) {
    // get the `cookie` from each page `getServerSideProps` return value
    // Note: the implementation is up to you
    const manager = cookieStorageManagerSSR(pageProps.cookie)
    return (
      <ChakraProvider manager={manager}>
        <Component />
      </ChakraProvider>
    )
  }
  ```

* [#6035](https://github.com/chakra-ui/chakra-ui/pull/6035)
  [`b7bdbb482`](https://github.com/chakra-ui/chakra-ui/commit/b7bdbb482e8a1c5725596401a0c4bc29c009a0ad)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - We now provide a
  way to customize the localStorage / cookie storage key

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

- [#6035](https://github.com/chakra-ui/chakra-ui/pull/6035)
  [`fb99cd7a8`](https://github.com/chakra-ui/chakra-ui/commit/fb99cd7a87d00614a66e17a35c91dc0e02262ece)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix inconsistent
  handling across provider and script

## 2.0.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

* [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

- [#5828](https://github.com/chakra-ui/chakra-ui/pull/5828)
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Remove
  deprecations

  **Affected components or packages:**

  **Button, Icon Button, Input, NumberInput, Radio, Checkbox, Select**

  - Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

  **Checkbox**

  - Removed `defaultIsChecked`. Use `defaultChecked`

  **Color mode**

  - Removed references to `--chakra-ui-color-mode`. Use `data-theme` property
    instead

  **Hooks**

  - Removed `useEventCallback` hook

  **Input / NumberInput**

  - Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

  **Grid**

  - Removed the `area` prop from `Grid` component. Should be passed to the
    `GridItem` instead.

  **Styled system**

  - Removed the `d` style prop. Use `display` instead.
  - Removed the `isTruncated` style prop. Use `noOfLines={1}` instead.

  **Theme**

  - Removed deprecated types.

* [#5946](https://github.com/chakra-ui/chakra-ui/pull/5946)
  [`7b5bdcc58`](https://github.com/chakra-ui/chakra-ui/commit/7b5bdcc588fb41aa3288ffaa293514b9d35ebaa4)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Ensure the
  transition between light/dark modes happens instantly without transition. This
  helps to avoid a weird UX when switch modes for elements with different
  `transition` definition on the page.

  Allow user configure the storage key for the provider and script. We now
  export a `createLocalStorageManager` and `createCookieStorageManager`
  functions.

  ```jsx
  const manager = createLocalStorageManager("{storageKey}")

  function App({ Component, pageProps }) {
    return (
      <ChakraProvider colorModeManager={manager}>
        <Component {...pageProps} />
      </ChakraProvider>
    )
  }
  ```

  Add better support for cookie storage to provide better SSG experience. To use
  cookie script, you can set `type=cookie`.

  > Pro tip: You can also configure the `storageKey` from script as well

  ```jsx
  import { ColorModeScript } from "@chakra-ui/react"
  function Document() {
    return (
      <Html>
        <Head>
          <title>App</title>
        </Head>
        <Body>
          <ColorModeScript type="cookie" />
          <Main />
        </Body>
      </Html>
    )
  }
  ```

  Refactored color mode to behave consistently between provider and script. The
  new precedence is as follows:

  - Get the color mode value in the specified localStorage or cookie manager
  - If value doesn't exist, use the `initialColorMode` value specified.
    - If the initial value is `system`, then we'll compute the color mode using
      `matchMedia`
    - Else, we use the initial value as is.
  - If user specifies `useSystemColorMode: true`, then we'll subscribe to color
    mode changes from the operating system. It is no longer used to determine
    the initial color mode. To achieve that, please use
    `initialColorMode: "system"`

  Removed `--chakra-ui-color-mode` CSS variable and use `data-theme` attribute
  on the `html` element.

  Added `color-scheme` to the `html` element to ensure native form-elements
  render in the correct mode.

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`ad84d8efc`](https://github.com/chakra-ui/chakra-ui/commit/ad84d8efc7602909488272c214167794e66a0581),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632),
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/react-env@2.0.0
  - @chakra-ui/hooks@2.0.0
  - @chakra-ui/utils@2.0.0

## 2.0.0-next.4

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/react-env@2.0.0-next.2
  - @chakra-ui/hooks@2.0.0-next.3
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.3

### Major Changes

- [#5946](https://github.com/chakra-ui/chakra-ui/pull/5946)
  [`7b5bdcc58`](https://github.com/chakra-ui/chakra-ui/commit/7b5bdcc588fb41aa3288ffaa293514b9d35ebaa4)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Ensure the
  transition between light/dark modes happens instantly without transition. This
  helps to avoid a weird UX when switch modes for elements with different
  `transition` definition on the page.

  Allow user configure the storage key for the provider and script. We now
  export a `createLocalStorageManager` and `createCookieStorageManager`
  functions.

  ```jsx
  const manager = createLocalStorageManager("{storageKey}")

  function App({ Component, pageProps }) {
    return (
      <ChakraProvider colorModeManager={manager}>
        <Component {...pageProps} />
      </ChakraProvider>
    )
  }
  ```

  Add better support for cookie storage to provide better SSG experience. To use
  cookie script, you can set `type=cookie`.

  > Pro tip: You can also configure the `storageKey` from script as well

  ```jsx
  import { ColorModeScript } from "@chakra-ui/react"
  function Document() {
    return (
      <Html>
        <Head>
          <title>App</title>
        </Head>
        <Body>
          <ColorModeScript type="cookie" />
          <Main />
        </Body>
      </Html>
    )
  }
  ```

  Refactored color mode to behave consistently between provider and script. The
  new precedence is as follows:

  - Get the color mode value in the specified localStorage or cookie manager
  - If value doesn't exist, use the `initialColorMode` value specified.
    - If the initial value is `system`, then we'll compute the color mode using
      `matchMedia`
    - Else, we use the initial value as is.
  - If user specifies `useSystemColorMode: true`, then we'll subscribe to color
    mode changes from the operating system. It is no longer used to determine
    the initial color mode. To achieve that, please use
    `initialColorMode: "system"`

  Removed `--chakra-ui-color-mode` CSS variable and use `data-theme` attribute
  on the `html` element.

  Added `color-scheme` to the `html` element to ensure native form-elements
  render in the correct mode.

## 2.0.0-next.2

### Patch Changes

- Updated dependencies
  [[`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/hooks@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`ad84d8efc`](https://github.com/chakra-ui/chakra-ui/commit/ad84d8efc7602909488272c214167794e66a0581),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/react-env@2.0.0-next.1
  - @chakra-ui/hooks@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

* [#5828](https://github.com/chakra-ui/chakra-ui/pull/5828)
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Remove
  deprecations

  **Affected components or packages:**

  **Button, Icon Button, Input, NumberInput, Radio, Checkbox, Select**

  - Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

  **Checkbox**

  - Removed `defaultIsChecked`. Use `defaultChecked`

  **Color mode**

  - Removed references to `--chakra-ui-color-mode`. Use `data-theme` property
    instead

  **Hooks**

  - Removed `useEventCallback` hook

  **Input / NumberInput**

  - Removed the `isFullWidth` deprecation. Use `width=full` or `width=100%`

  **Grid**

  - Removed the `area` prop from `Grid` component. Should be passed to the
    `GridItem` instead.

  **Styled system**

  - Removed the `d` style prop. Use `display` instead.
  - Removed the `isTruncated` style prop. Use `noOfLines={1}` instead.

  **Theme**

  - Removed deprecated types.

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632)]:
  - @chakra-ui/react-env@2.0.0-next.0
  - @chakra-ui/hooks@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.4.8

### Patch Changes

- Updated dependencies
  [[`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c)]:
  - @chakra-ui/hooks@1.9.1

## 1.4.7

### Patch Changes

- Updated dependencies
  [[`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964)]:
  - @chakra-ui/hooks@1.9.0

## 1.4.6

### Patch Changes

- [#5639](https://github.com/chakra-ui/chakra-ui/pull/5639)
  [`001751162`](https://github.com/chakra-ui/chakra-ui/commit/001751162dd1922d8ab53820f405665f0785f196)
  Thanks [@sQVe](https://github.com/sQVe)! - Adds a runtime safeguard for
  `ColorModeScript`.

- Updated dependencies
  [[`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)]:
  - @chakra-ui/hooks@1.8.5

## 1.4.5

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/react-env@1.1.6
  - @chakra-ui/hooks@1.8.4
  - @chakra-ui/utils@1.10.4

## 1.4.4

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/react-env@1.1.5
  - @chakra-ui/hooks@1.8.3

## 1.4.3

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/react-env@1.1.4
  - @chakra-ui/hooks@1.8.2
  - @chakra-ui/utils@1.10.2

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/react-env@1.1.3
  - @chakra-ui/hooks@1.8.1

## 1.4.1

### Patch Changes

- [#5459](https://github.com/chakra-ui/chakra-ui/pull/5459)
  [`1bd1f2ffe`](https://github.com/chakra-ui/chakra-ui/commit/1bd1f2ffef44d810a099b001be98e3bfa229ddad)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where the ColorModeScript tried to access a non-existent variable

## 1.4.0

### Minor Changes

- [#5316](https://github.com/chakra-ui/chakra-ui/pull/5316)
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Introducing
  **semantic tokens**

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

### Patch Changes

- Updated dependencies
  [[`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/react-env@1.1.2

## 1.3.3

### Patch Changes

- Updated dependencies
  [[`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/hooks@1.7.2

## 1.3.2

### Patch Changes

- [#5105](https://github.com/chakra-ui/chakra-ui/pull/5105)
  [`35d90e9fd`](https://github.com/chakra-ui/chakra-ui/commit/35d90e9fd7c1df59a8882b8c68283ff7a026541b)
  Thanks [@takethefake](https://github.com/takethefake)! - Fixed flaky
  color-mode test

* [#5107](https://github.com/chakra-ui/chakra-ui/pull/5107)
  [`514cf24a6`](https://github.com/chakra-ui/chakra-ui/commit/514cf24a62b13a9c2a9ad64806f00b0a4cbe540e)
  Thanks [@primos63](https://github.com/primos63)! - Fixed issue where
  `DarkMode` and `LightMode` elements rerenders their children even if the child
  is memoized.

  `<LightMode>` and `<DarkMode>` components are now memoized to prevent
  unnecessary rendering of their child components.

## 1.3.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/react-env@1.1.1
  - @chakra-ui/hooks@1.7.1
  - @chakra-ui/utils@1.9.1

## 1.3.0

### Minor Changes

- [#4991](https://github.com/chakra-ui/chakra-ui/pull/4991)
  [`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update build system
  we use from a custom babel cli setup to
  [preconstruct](https://preconstruct.tools/).

  The previous build system transpiles the code in `src` directory to `dist/esm`
  and `dist/cjs` keeping the same file structure. The new build system merges
  all files in `src` and transpiles to a single `esm` and `cjs` file.

  **Potential Breaking Change:** The side effect of this is that, if you
  imported any function, component or hook using the **undocumented** approach
  like
  `import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"`,
  you'll notice that the this doesn't work anymore.

  Here's how to resolve it:

  ```jsx live=false
  // Won't work 🎇
  import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"

  // Works ✅
  import { useOutsideClick } from "@chakra-ui/hooks"
  ```

  If this affected your project, we recommend that you import hooks, functions
  or components the way it's shown in the documentation. This will help keep
  your project future-proof.

### Patch Changes

- [#4989](https://github.com/chakra-ui/chakra-ui/pull/4989)
  [`013c90d89`](https://github.com/chakra-ui/chakra-ui/commit/013c90d8928698debc6112365fbd62b85a1d7e92)
  Thanks [@takethefake](https://github.com/takethefake)! - Fixed color mode
  behavior priority in the following order:

  - if `useSystemColorMode` is true system-color will be used as default -
    initial colormode is the fallback if system color mode isn't resolved

  - if `--chakra-ui-color-mode` is defined through e.g. `ColorModeScript` this
    will be used

  - if `colorModeManager` = `localStorage` and a value is defined for
    `chakra-ui-color-mode` this will be used

  - if `initialColorMode` = `system` system-color will be used as default -
    initial colormode is the fallback if system color mode isn't resolved

  - if `initialColorMode` = `'light'|'dark'` the corresponding value will be
    used

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/react-env@1.1.0
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/utils@1.9.0

## 1.2.0

### Minor Changes

- [`71f80b67c`](https://github.com/chakra-ui/chakra-ui/commit/71f80b67c094d905c87bdc5c1766787c1543ebe7)
  [#4634](https://github.com/chakra-ui/chakra-ui/pull/4634) Thanks
  [@SkySails](https://github.com/SkySails)! - Added possibility to use the
  system preferred color scheme as value for `initialColorMode`, while still
  respecting a user's previous choice.

  As long as the user does not manually select a color mode through a website
  interaction, the theme will change when the system preference changes.

  This would easily allow for an implementation where the user can choose
  between `light`, `dark` and `system` by simply setting the `initialColorMode`
  setting to `system` and presenting the user with the three options.

## 1.1.14

### Patch Changes

- [`8f315ea5d`](https://github.com/chakra-ui/chakra-ui/commit/8f315ea5d694e0130dc2e3187ac53320cf1adcd1)
  [#4936](https://github.com/chakra-ui/chakra-ui/pull/4936) Thanks
  [@cschroeter](https://github.com/cschroeter)! - Use @chakra-ui/react-env to
  determine the correct body

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/react-env@1.0.8

## 1.1.13

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1

## 1.1.12

### Patch Changes

- Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0

## 1.1.11

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/hooks@1.5.5

## 1.1.10

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/hooks@1.5.4

## 1.1.9

### Patch Changes

- Updated dependencies
  [[`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)]:
  - @chakra-ui/hooks@1.5.3

## 1.1.8

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/hooks@1.5.2

## 1.1.7

### Patch Changes

- Updated dependencies
  [[`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/hooks@1.5.1

## 1.1.6

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/hooks@1.5.0

## 1.1.5

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/hooks@1.4.0

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/hooks@1.3.1

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/utils@1.5.0

## 1.1.2

### Patch Changes

- [`d70515fc2`](https://github.com/chakra-ui/chakra-ui/commit/d70515fc20279b5b2acf9a2db2bda0289b8c5408)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix: memoize the
  context value for `ColorModeProvider`

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0

## 1.1.0

### Minor Changes

- [`7f3bb3584`](https://github.com/chakra-ui/chakra-ui/commit/7f3bb35841f81e9e29a356b3070ac9fd28352731)
  [#3322](https://github.com/chakra-ui/chakra-ui/pull/3322) Thanks
  [@dodas](https://github.com/dodas)! - You can now customize the `nonce` of the
  `<script>` that `ColorModeScript` creates by passing `nonce` prop.

## 1.0.7

### Patch Changes

- [`9dc37ee37`](https://github.com/chakra-ui/chakra-ui/commit/9dc37ee37575650746e9b006e41428f1bf53e16c)
  [#3280](https://github.com/chakra-ui/chakra-ui/pull/3280) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where reading
  from localStorage maybe fail due to several reasons (SecurityError, Uncaught
  DOMException, TypeError, etc.)

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/hooks@1.1.4

## 1.0.6

### Patch Changes

- [`e859a9fc1`](https://github.com/chakra-ui/chakra-ui/commit/e859a9fc1bd906801a490dceeb507cca0684a192)
  [#3133](https://github.com/chakra-ui/chakra-ui/pull/3133) Thanks
  [@chrisbull](https://github.com/chrisbull)! - `useColorModeValue` defaults to
  light mode on first render if system color mode is used.

- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1

## 1.0.3

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/color-mode

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.8 (2020-10-29)

### Bug Fixes

- **toast:** allow custom render in update
  ([eb8bff9](https://github.com/chakra-ui/chakra-ui/commit/eb8bff911e6ec9de0165ab1e8f5ca10d5e022459)),
  closes [#2362](https://github.com/chakra-ui/chakra-ui/issues/2362)

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.7 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/color-mode

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/color-mode

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/color-mode

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/color-mode

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/color-mode

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/color-mode

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/color-mode@1.0.0-rc.0...@chakra-ui/color-mode@1.0.0-rc.1) (2020-08-06)

### Features

- added cookieStorageManager. still WIP
  ([9a9c305](https://github.com/chakra-ui/chakra-ui/commit/9a9c305d9c4ae7b5b44271e633c8a3bad81df066))
- added storageManager prop to ColorModeProvider. this is WIP
  ([2e9b538](https://github.com/chakra-ui/chakra-ui/commit/2e9b538f66fbd5ab70e30a55d5c7cfc43c7b6c6c))
- cleaned up some storageManager code. set color mode cookie to expire after a
  year
  ([d7ca15e](https://github.com/chakra-ui/chakra-ui/commit/d7ca15e6be9b393ed42cfc1a394d2872d7a8e5df))
- updated cookieStorageManager and next-js example to use cookieStorageManager
  ([e7df198](https://github.com/chakra-ui/chakra-ui/commit/e7df198065f041433c9f46f36b1990fc7e90a5de))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/color-mode@1.0.0-next.7...@chakra-ui/color-mode@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/color-mode

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/color-mode@1.0.0-next.6...@chakra-ui/color-mode@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- added ColorModeOptions type to theme config
  ([648d41f](https://github.com/chakra-ui/chakra-ui/commit/648d41f56b9fd501d730c55f34058e61c6a9febb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/color-mode@1.0.0-next.5...@chakra-ui/color-mode@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/color-mode

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/color-mode@1.0.0-next.4...@chakra-ui/color-mode@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/color-mode

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **color-mode:** sync value prop with state for controlled modes
  ([00881d4](https://github.com/chakra-ui/chakra-ui/commit/00881d4c592374e2015639acefdd7153cc5f872a))

### Reverts

- color mode script till we figure out a better soln
  ([26f821f](https://github.com/chakra-ui/chakra-ui/commit/26f821f4ff2565f7edcf5f809b799b9b97c1effb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **color-mode:** sync value prop with state for controlled modes
  ([00881d4](https://github.com/chakra-ui/chakra-ui/commit/00881d4c592374e2015639acefdd7153cc5f872a))

### Reverts

- color mode script till we figure out a better soln
  ([26f821f](https://github.com/chakra-ui/chakra-ui/commit/26f821f4ff2565f7edcf5f809b799b9b97c1effb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- **color-mode:** sync value prop with state for controlled modes
  ([00881d4](https://github.com/chakra-ui/chakra-ui/commit/00881d4c592374e2015639acefdd7153cc5f872a))
