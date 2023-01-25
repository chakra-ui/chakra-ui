# Change Log

## 3.2.11

### Patch Changes

- [#7232](https://github.com/chakra-ui/chakra-ui/pull/7232)
  [`1d1f202e7`](https://github.com/chakra-ui/chakra-ui/commit/1d1f202e7f44c606659809dcb6f83746a68ac1e6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactored code to
  match new env implementation

- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb),
  [`1d1f202e7`](https://github.com/chakra-ui/chakra-ui/commit/1d1f202e7f44c606659809dcb6f83746a68ac1e6)]:
  - @chakra-ui/react-env@3.0.0

## 3.2.10

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`292864aba`](https://github.com/chakra-ui/chakra-ui/commit/292864abae83833a826b2fe4a9d69ddcfe7fbe17),
  [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/breakpoint-utils@2.0.7
  - @chakra-ui/react-env@2.0.13
  - @chakra-ui/shared-utils@2.0.5

## 3.2.9

### Patch Changes

- [#7154](https://github.com/chakra-ui/chakra-ui/pull/7154)
  [`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## All components

  Improved the bundling setup for all components.

  - Switched to the `.mjs` file extension for correct ESM behavior
  - Switched to the latest `tsup` will uses automatic JSX runtime detection
    removing the need for manually inject classic `React` import
  - Moved `tsup` config to `package.json` since it's very minimal
  - Removed `clean-package.config.json` in favor of the `package.json` property
  - Fixed issue where Storybook addon (dark mode and RTL) was not working

- [#6744](https://github.com/chakra-ui/chakra-ui/pull/6744)
  [`0eedc151c`](https://github.com/chakra-ui/chakra-ui/commit/0eedc151caec8dbdb53e4e5e8354e2310553c19f)
  Thanks [@joseph082](https://github.com/joseph082)! - Reduced gaps in media
  queries for breakpoints which excluded some viewport widths from media query
  coverage
- Updated dependencies
  [[`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef),
  [`0eedc151c`](https://github.com/chakra-ui/chakra-ui/commit/0eedc151caec8dbdb53e4e5e8354e2310553c19f)]:
  - @chakra-ui/react-env@2.0.12
  - @chakra-ui/breakpoint-utils@2.0.6
  - @chakra-ui/shared-utils@2.0.4

## 3.2.8

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/react-env@2.0.11
  - @chakra-ui/breakpoint-utils@2.0.5

## 3.2.7

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/react-env@2.0.10
  - @chakra-ui/breakpoint-utils@2.0.4

## 3.2.6

### Patch Changes

- [#6666](https://github.com/chakra-ui/chakra-ui/pull/6666)
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Add missing
  component/function docs and relative docsite links.

  Ensures that all Components, functions, and hooks that have detailed pages on
  the Chakra site have corresponding JSDocs and links back to the docsite via
  IDE intellisense.

  Includes adding or fixing links within these docs to related WAI-ARIA
  patterns.

## 3.2.5

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation
- Updated dependencies
  [[`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)]:
  - @chakra-ui/react-env@2.0.9
  - @chakra-ui/breakpoint-utils@2.0.3

## 3.2.4

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/react-env@2.0.8
  - @chakra-ui/utils@2.0.8

## 3.2.3

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`239a3cd40`](https://github.com/chakra-ui/chakra-ui/commit/239a3cd403271af66119fdfd28ee8f284cd43e0d),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/react-env@2.0.7

## 3.2.2

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/react-env@2.0.6
  - @chakra-ui/utils@2.0.6

## 3.2.1

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/react-env@2.0.5
  - @chakra-ui/utils@2.0.5

## 3.2.0

### Minor Changes

- [#6308](https://github.com/chakra-ui/chakra-ui/pull/6308)
  [`4beff94be`](https://github.com/chakra-ui/chakra-ui/commit/4beff94be65026ddb1d8c06c9e96f9eae195f352)
  Thanks [@n-harada](https://github.com/n-harada)! - fix getClosestValue to
  return nullable closest break point value

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee),
  [`fb3c09325`](https://github.com/chakra-ui/chakra-ui/commit/fb3c09325d7bf58aed13c6d0fb1f72b92ff0ef3a)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/react-env@2.0.4

## 3.1.2

### Patch Changes

- [#6171](https://github.com/chakra-ui/chakra-ui/pull/6171)
  [`3d8e095df`](https://github.com/chakra-ui/chakra-ui/commit/3d8e095dfc696b3d903455319231e77d1c21d875)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Fix hydration issues when
  using `Suspense`

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`3d8e095df`](https://github.com/chakra-ui/chakra-ui/commit/3d8e095dfc696b3d903455319231e77d1c21d875),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/react-env@2.0.3

## 3.1.1

### Patch Changes

- [#5764](https://github.com/chakra-ui/chakra-ui/pull/5764)
  [`612529653`](https://github.com/chakra-ui/chakra-ui/commit/61252965371f1abc5bc6680c14bbd08f97667ea9)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Remove internal usage of
  createBreakpoints function

## 3.1.0

### Minor Changes

- [#6157](https://github.com/chakra-ui/chakra-ui/pull/6157)
  [`95bcaf1ff`](https://github.com/chakra-ui/chakra-ui/commit/95bcaf1ffbf2ad499a50c31b55847a314ce95069)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  client-side rendered (CSR) apps to get the correct value on first render.

  > Affected hooks: `useMediaQuery`, `useBreakpoint`, `useBreakpointValue`.

  These hooks are built work in server-side rendering (SSR) applications by
  default. You might notice a quick flash of incorrect media query value when
  you use them.

  If you're creating a CSR-only app, you can now leverage the `ssr` argument to
  get the correct value on first render.

  ```jsx live=false
  const [isMobile] = useMediaQuery("(max-width: 768px)", {
    // you can now pass `ssr: false`
    ssr: false,
  })

  const buttonSize = useBreakpointValue(
    { base: "sm", lg: "md" },
    // you can now pass `ssr: false`
    { ssr: false },
  )

  // you can now pass `ssr: false`
  const breakpoint = useBreakpoint({ ssr: false })
  ```

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/react-env@2.0.2
  - @chakra-ui/utils@2.0.2

## 3.0.2

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/react-env@2.0.1

## 3.0.1

### Patch Changes

- [#6069](https://github.com/chakra-ui/chakra-ui/pull/6069)
  [`a799a4467`](https://github.com/chakra-ui/chakra-ui/commit/a799a4467704c9489427df896ffdeae42de99505)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix regression in
  use-media-query hook in SSR envrionments where it throws hydration mismatch

## 3.0.0

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

* [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- [#5891](https://github.com/chakra-ui/chakra-ui/pull/5891)
  [`258fd9a61`](https://github.com/chakra-ui/chakra-ui/commit/258fd9a617d9224a0d6626399aad2b59efa15ace)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Refactored the
  `useMediaQuery` hook to be more resilient and cross-browser friendly.

  - Add support for fallback values to `useMediaQuery` to help users provide SSR
    friendly fallback when using width queries.

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`ad84d8efc`](https://github.com/chakra-ui/chakra-ui/commit/ad84d8efc7602909488272c214167794e66a0581),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/react-env@2.0.0
  - @chakra-ui/utils@2.0.0

## 3.0.0-next.2

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/react-env@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 3.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- [#5891](https://github.com/chakra-ui/chakra-ui/pull/5891)
  [`258fd9a61`](https://github.com/chakra-ui/chakra-ui/commit/258fd9a617d9224a0d6626399aad2b59efa15ace)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Refactored the
  `useMediaQuery` hook to be more resilient and cross-browser friendly.

  - Add support for fallback values to `useMediaQuery` to help users provide SSR
    friendly fallback when using width queries.

- Updated dependencies
  [[`ad84d8efc`](https://github.com/chakra-ui/chakra-ui/commit/ad84d8efc7602909488272c214167794e66a0581),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/react-env@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1

## 3.0.0-next.0

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
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/theme@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 2.0.4

### Patch Changes

- [#5651](https://github.com/chakra-ui/chakra-ui/pull/5651)
  [`d6bed344f`](https://github.com/chakra-ui/chakra-ui/commit/d6bed344f30af50c84d3ed802ec3f0c981586588)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - - Fixed an issue
  that undefined is returned when calling the hook `useBreakpoint` with
  `defaultValue` specified in SSR

  - Fixed an issue where the value of `useBreakpointValue` in CSR did not match
    SSR.

## 2.0.3

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/react-env@1.1.6
  - @chakra-ui/utils@1.10.4

## 2.0.2

### Patch Changes

- [#5574](https://github.com/chakra-ui/chakra-ui/pull/5574)
  [`eca771a9a`](https://github.com/chakra-ui/chakra-ui/commit/eca771a9ad53edc52365f70eb0e6b19bc54d8e18)
  Thanks [@nikolovlazar](https://github.com/nikolovlazar)! - Added props
  descriptions to Show / Hide components

* [#5576](https://github.com/chakra-ui/chakra-ui/pull/5576)
  [`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where the hook `useBreakpoint` did not update after the first page load.

- [#5625](https://github.com/chakra-ui/chakra-ui/pull/5625)
  [`99c92df93`](https://github.com/chakra-ui/chakra-ui/commit/99c92df9331e6a0c5667b77e5a605343efccc6b3)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where the `useBreakpointValue` hook did not work as expected with custom
  breakpoints
- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/react-env@1.1.5

## 2.0.1

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/react-env@1.1.4
  - @chakra-ui/utils@1.10.2

## 2.0.0

### Major Changes

- [#5474](https://github.com/chakra-ui/chakra-ui/pull/5474)
  [`85aec4f7a`](https://github.com/chakra-ui/chakra-ui/commit/85aec4f7abbd7a289e7ad82c3dcfc465d84184ed)
  Thanks [@Edjevw12](https://github.com/Edjevw12)! - Support useMediaQuery for
  older browsers. Conditionally check if the MediaQueryList object supports the
  addEventListener() method, else fallback to the legacy .addListener() method.

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/react-env@1.1.3

## 1.2.4

### Patch Changes

- [#5355](https://github.com/chakra-ui/chakra-ui/pull/5355)
  [`22171af7f`](https://github.com/chakra-ui/chakra-ui/commit/22171af7f78b41d37171dbd4d1307ef82ea880b6)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Update typings for
  useBreakpointValue parameter

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/react-env@1.1.2

## 1.2.3

### Patch Changes

- [#5234](https://github.com/chakra-ui/chakra-ui/pull/5234)
  [`bc2613a9a`](https://github.com/chakra-ui/chakra-ui/commit/bc2613a9ab8273c844ed071947164f0a82ad9ea4)
  Thanks [@nxtman123](https://github.com/nxtman123)! - `useBreakpointValue`
  returns the correct value on first tick, if `matchMedia` is available

## 1.2.2

### Patch Changes

- [#5135](https://github.com/chakra-ui/chakra-ui/pull/5135)
  [`53e2df4f9`](https://github.com/chakra-ui/chakra-ui/commit/53e2df4f9cbe7fc2fad69d1ee49a1e788811467a)
  Thanks [@primos63](https://github.com/primos63)! - Improved performance and
  behavior of `useMediaQuery` hook.

## 1.2.1

### Patch Changes

- [#5074](https://github.com/chakra-ui/chakra-ui/pull/5074)
  [`042994eb0`](https://github.com/chakra-ui/chakra-ui/commit/042994eb0866e4f49cc286f64f54962f613a4423)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Fix issue where
  `useColorModePreference` returned incorrect values due to array destructuring.

* [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
* Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/react-env@1.1.1
  - @chakra-ui/utils@1.9.1

## 1.2.0

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

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/react-env@1.1.0
  - @chakra-ui/utils@1.9.0

## 1.1.5

### Patch Changes

- [`97bad87c7`](https://github.com/chakra-ui/chakra-ui/commit/97bad87c7b8b4ff31f705a9d55b392385d921a33)
  [#4807](https://github.com/chakra-ui/chakra-ui/pull/4807) Thanks
  [@primos63](https://github.com/primos63)! - Corrected eslint errors.

* [`f2df9cfc1`](https://github.com/chakra-ui/chakra-ui/commit/f2df9cfc1c3c2ef3f3b74ec2849079fd726cd84c)
  [#4807](https://github.com/chakra-ui/chakra-ui/pull/4807) Thanks
  [@primos63](https://github.com/primos63)! - Fix an issue where the
  `useMediaQuery` was not updating the array of booleans correctly when resizing
  the viewport.

  It also removes deprecated calls `addListener` and `removeListener` in favor
  of the recommended `addEventListener` and `removeEventListener` calls.

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/react-env@1.0.8

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/react-env@1.0.7

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/react-env@1.0.6

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/react-env@1.0.5

## 1.1.0

### Minor Changes

- [`31ec6466c`](https://github.com/chakra-ui/chakra-ui/commit/31ec6466c2ddc7fffb8e8dfa0f7f241f189f96eb)
  [#4029](https://github.com/chakra-ui/chakra-ui/pull/4029) Thanks
  [@jesstelford](https://github.com/jesstelford)! - `useBreakpointValue()` now
  supports receiving a `defaultBreakpoint` as the second argument to support
  SSR/SSG.

## 1.0.14

### Patch Changes

- [`760607680`](https://github.com/chakra-ui/chakra-ui/commit/76060768093b056a8d645b981da12f147bb7cf0f)
  [#4038](https://github.com/chakra-ui/chakra-ui/pull/4038) Thanks
  [@cschroeter](https://github.com/cschroeter)! - fix(media-query): fix an issue
  with useBreakpointValue

## 1.0.13

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0

## 1.0.12

### Patch Changes

- Updated dependencies
  [[`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/utils@1.7.0

## 1.0.11

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0

## 1.0.10

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2

## 1.0.9

### Patch Changes

- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1

## 1.0.8

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0

## 1.0.7

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.0.6

### Patch Changes

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0

## 1.0.3

### Patch Changes

- [`1286da79`](https://github.com/chakra-ui/chakra-ui/commit/1286da7977db7bd8f19e2abd03b73990737b1379)
  [#2992](https://github.com/chakra-ui/chakra-ui/pull/2992) Thanks
  [@ljosberinn](https://github.com/ljosberinn)! - fix(media-query): fixes
  useBreakpoinValue infinite loop due to bug in createMediaQueries

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2

## 1.0.1

### Patch Changes

- [`a1ff404b`](https://github.com/chakra-ui/chakra-ui/commit/a1ff404b12a898ab97af024391a06c34da5bc69a)
  [#2540](https://github.com/chakra-ui/chakra-ui/pull/2540) Thanks
  [@stellarhoof](https://github.com/stellarhoof)! - Fix match media on
  useBreakpoint when no default value is provided

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/media-query

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

**Note:** Version bump only for package @chakra-ui/media-query

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/media-query

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/media-query

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/media-query

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/media-query

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/media-query

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/media-query@1.0.0-rc.0...@chakra-ui/media-query@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **media-query:** create media queries using breakpoint name keys only
  ([1f1413f](https://github.com/chakra-ui/chakra-ui/commit/1f1413f297c08d819e56b5649258c18472f9177a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/media-query@1.0.0-next.7...@chakra-ui/media-query@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/media-query

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/media-query@1.0.0-next.6...@chakra-ui/media-query@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/media-query

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/media-query@1.0.0-next.5...@chakra-ui/media-query@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/media-query

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/media-query@1.0.0-next.4...@chakra-ui/media-query@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/media-query

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **media-query:** add breakpoint value, animation, and color mode utils
  ([9487655](https://github.com/chakra-ui/chakra-ui/commit/9487655f315656b7bf58fe81e4b6ce90d546caf0))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
