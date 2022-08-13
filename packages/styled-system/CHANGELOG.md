# Change Log

## 2.2.6

### Patch Changes

- [#6335](https://github.com/chakra-ui/chakra-ui/pull/6335)
  [`e0913e56f`](https://github.com/chakra-ui/chakra-ui/commit/e0913e56f889a5d6ef666b0e8b1e0986955fdba3)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Improve style computation
  performance by looping over styles once.

  Previously, we had two steps in the logic (expand responsive and convert to
  css object). This can be quite expensive with large css objects (or style
  props).

  We now process both steps in a single pass.

* [#6465](https://github.com/chakra-ui/chakra-ui/pull/6465)
  [`67edac24a`](https://github.com/chakra-ui/chakra-ui/commit/67edac24ace3c621ecb8cc32ee545acbedaadd79)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Fix regression where
  `ThemeTypings` created by chakra-cli could not be used

- [#6396](https://github.com/chakra-ui/chakra-ui/pull/6396)
  [`2c9e085ea`](https://github.com/chakra-ui/chakra-ui/commit/2c9e085eaa0dfd65843951fb8240d595901c87dd)
  Thanks [@yukukotani](https://github.com/yukukotani)! - Escape symbols in css
  variable to make it works

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7

## 2.2.5

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/utils@2.0.6

## 2.2.4

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/utils@2.0.5

## 2.2.3

### Patch Changes

- [#6301](https://github.com/chakra-ui/chakra-ui/pull/6301)
  [`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)
  Thanks [@effectivetom](https://github.com/effectivetom)! - Fix incorrect
  breakpoint calculation which excluded some viewport widths from media query
  coverage
- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4

## 2.2.2

### Patch Changes

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3

## 2.2.1

### Patch Changes

- [#5764](https://github.com/chakra-ui/chakra-ui/pull/5764)
  [`612529653`](https://github.com/chakra-ui/chakra-ui/commit/61252965371f1abc5bc6680c14bbd08f97667ea9)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Remove internal usage of
  createBreakpoints function

## 2.2.0

### Minor Changes

- [#6153](https://github.com/chakra-ui/chakra-ui/pull/6153)
  [`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Remove annoying
  focus outline by leveraging focus visible

* [#6153](https://github.com/chakra-ui/chakra-ui/pull/6153)
  [`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  styling `data-focus-visible` using the `_focusVisible` pseudo prop

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/utils@2.0.2

## 2.1.1

### Patch Changes

- [#6089](https://github.com/chakra-ui/chakra-ui/pull/6089)
  [`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix media query
  calculations for responsive variants and sizes
  - Fix issue where values with `!important` can resolve to a double
    `!important` being added
- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1

## 2.1.0

### Minor Changes

- [#6050](https://github.com/chakra-ui/chakra-ui/pull/6050)
  [`ddea8d143`](https://github.com/chakra-ui/chakra-ui/commit/ddea8d143e76c0e4758e6ea4b4d881f88b34452d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  responsive variants and sizes.

  ```jsx live=false
  <Button variant={["sm", "lg"]}>Click me</Button>
  ```

  Add support for `!important` in token values as an escape hatch for overriding
  properties in responsive variants/sizes.

  ```jsx live=false
  <Button variant={["sm", "lg"]} fontSize="lg !important">
    Click me
  </Button>
  ```

  **Notes**

  - Based on how this is designed, there's no support for responsive
    `colorScheme` since it is technically not a variant
  - When using responsive sizes and variants, overriding properties via props
    might not work as expected. We use native CSS media queries to enable this
    feature so there's no "magic" under the hood. If you really want to override
    properties, you can consider using the important syntax

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

* [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- [#5935](https://github.com/chakra-ui/chakra-ui/pull/5935)
  [`5193a00c8`](https://github.com/chakra-ui/chakra-ui/commit/5193a00c8838eeb2715ce825f89f9f4dfab9a0c8)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Update `csstype` package to
  fix typings error for `colorAdjust` property

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/utils@2.0.0

## 2.0.0-next.3

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- [#5935](https://github.com/chakra-ui/chakra-ui/pull/5935)
  [`5193a00c8`](https://github.com/chakra-ui/chakra-ui/commit/5193a00c8838eeb2715ce825f89f9f4dfab9a0c8)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Update `csstype` package to
  fix typings error for `colorAdjust` property

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
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
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)]:
  - @chakra-ui/utils@2.0.0-next.0

## 1.19.0

### Minor Changes

- [#5532](https://github.com/chakra-ui/chakra-ui/pull/5532)
  [`00d5d1516`](https://github.com/chakra-ui/chakra-ui/commit/00d5d151631436777a8dc71a0b46c2be52e71631)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Updated `_dark` and
  `_light` pseudo selectors to allow semantic tokens to change with the
  `data-theme` attributes.

### Patch Changes

- [#5702](https://github.com/chakra-ui/chakra-ui/pull/5702)
  [`dc2c578f6`](https://github.com/chakra-ui/chakra-ui/commit/dc2c578f6b9686499911fa77d6b61dd0ced077ea)
  Thanks [@ardnahcivar](https://github.com/ardnahcivar)! - Added `number` type
  for text underline offset of text decoration props

## 1.18.1

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/utils@1.10.4

## 1.18.0

### Minor Changes

- [#5579](https://github.com/chakra-ui/chakra-ui/pull/5579)
  [`b0da6e666`](https://github.com/chakra-ui/chakra-ui/commit/b0da6e6665234c1584403f7f7251390c3a9433c8)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Modify theme types to make it
  possible to customize token types via TypeScript module augmentation and
  declaration merging in addition to allowing customization via the Chakra CLI.

  This makes it possible to do the following:

  - Distribute custom types with a component library based on Chakra
  - Customize theme types by hand
  - Version control your theme types

  To customize themes using the new mechanism, augment the `CustomThemeTypings`
  type in a definitions file such as `types/chakra.d.ts`:

  > ⚠️ NOTE: your `CustomThemeTypings` _must_ implement/extend
  > `BaseThemeTypings`, otherwise the types will fall back to the default Chakra
  > types (or custom output from **@chakra-ui/cli**)

  ```ts
  import { BaseThemeTypings } from "@chakra-ui/styled-system";

  type DefaultSizes = 'small' | 'medium' | 'large';

  declare module "@chakra-ui/styled-system" {
    export interface CustomThemeTypings extends BaseThemeTypings {
      // Example custom `borders` tokens
      borders: 'none' | 'thin' | 'thick';
      // ...
      // Other custom tokens
      // ...
      components: {
        Button: {
          // Example custom component sizes and variants
          sizes: DefaultSizes;
          variants: 'solid' | 'outline' | 'wacky' | 'chill';
        };
        // ...
       }
    }
  ```

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3

## 1.17.2

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/utils@1.10.2

## 1.17.1

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1

## 1.17.0

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

* [#5355](https://github.com/chakra-ui/chakra-ui/pull/5355)
  [`bb7eb18da`](https://github.com/chakra-ui/chakra-ui/commit/bb7eb18daa015efee56d55519c2ce727d5bb776a)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Export TypeScript
  types ResponsiveObject and ResponsiveArray

### Patch Changes

- [#5359](https://github.com/chakra-ui/chakra-ui/pull/5359)
  [`3b4117781`](https://github.com/chakra-ui/chakra-ui/commit/3b41177812c927c0ee37c7c0006a09f9ca031108)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Updated the
  `_placeholderShown` selector

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/utils@1.10.0

## 1.16.0

### Minor Changes

- [#4979](https://github.com/chakra-ui/chakra-ui/pull/4979)
  [`d5461a452`](https://github.com/chakra-ui/chakra-ui/commit/d5461a4522aaee47b91a1a432601556e334a71c3)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Add support
  peer pseudo style props

  You can now style an element based on the state of its general sibling (marked
  with `.peer` or `data-peer`) attribute.

  ```jsx live=false
  <>
    <input type="checkbox" data-peer />
    <Box bg="white" _peerFocus={{ bg: "green.400" }} />
  </>
  ```

  The peer properties you can apply are `_peerHover`, `_peerFocus`,
  `_peerFocusVisible`, `_peerActive`, `_peerInvalid`,
  `_peerChecked`,`_peerFocusWithin`, `_peerPlaceholderShown`, `_peerDisabled`

  ### New style props

  Added `_placeholderShown` pseudo props for styling elements when sibling
  inputs have placeholder shown.

  Added `_ltr` pseudo props for styling elements in LTR writing mode. This is
  useful for products with RTL first approach.

  Added `_mediaReduceMotion` pseudo props to apply reduce motion styles to
  elements. This is useful when you need to remove CSS animations/transitions.

* [#5307](https://github.com/chakra-ui/chakra-ui/pull/5307)
  [`213f61026`](https://github.com/chakra-ui/chakra-ui/commit/213f61026766d32f78b78dc2ccb2b2fdc472aab1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Adds style props
  for CSS scroll behavior properties: `scrollPadding`, `scrollMargin`,
  `scrollSnapAlign`, etc...

  Here's a full list of properties:

  - **Scroll Behavior:** `scrollBehavior`, `scrollSnapAlign`, `scrollSnapStop`,
    `scrollSnapType`

  - **Scroll Margin:** `scrollMargin`, `scrollMarginTop`, `scrollMarginBottom`,
    `scrollMarginLeft`, `scrollMarginRight`, `scrollMarginX`, `scrollMarginY`

  - **Scroll Padding:** `scrollPadding`, `scrollPaddingTop`,
    `scrollPaddingBottom`, `scrollPaddingLeft`, `scrollPaddingRight`,
    `scrollPaddingX`, `scrollPaddingY`

## 1.15.0

### Minor Changes

- [#5123](https://github.com/chakra-ui/chakra-ui/pull/5123)
  [`26d2a547b`](https://github.com/chakra-ui/chakra-ui/commit/26d2a547bca20e197f352c7492e3cad197b513e6)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Add support for
  style props `gap`, `columnGap` and `rowGap`. Those CSS properties are valid in
  a grid or flex context

  > For further information see
  > [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

### Patch Changes

- [#4970](https://github.com/chakra-ui/chakra-ui/pull/4970)
  [`73235af10`](https://github.com/chakra-ui/chakra-ui/commit/73235af10d8868786ec58778dda9a42b8d275599)
  Thanks [@giuseppelt](https://github.com/giuseppelt)! - Fix issue where
  `bgGradient` parser doesn't work when a position is specified

* [`f15099adc`](https://github.com/chakra-ui/chakra-ui/commit/f15099adc60150781607288dbe12133c2fb84e38)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  tokens autocomplete don't show up anymore except user runs the cli command.

- [#5192](https://github.com/chakra-ui/chakra-ui/pull/5192)
  [`a1d5e7bfa`](https://github.com/chakra-ui/chakra-ui/commit/a1d5e7bfae1b4cc749e14eed4977ae423b8bce2c)
  Thanks [@selrond](https://github.com/selrond)! - Fixed issue where multi-value
  `inset` property doesn't work.

## 1.14.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/utils@1.9.1

## 1.14.0

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
  - @chakra-ui/utils@1.9.0

## 1.13.0

### Minor Changes

- [`38b5bc627`](https://github.com/chakra-ui/chakra-ui/commit/38b5bc627c98fed4b7a55c45820785a4905c081e)
  [#4939](https://github.com/chakra-ui/chakra-ui/pull/4939) Thanks
  [@bohdan-sviripa](https://github.com/bohdan-sviripa)! - Added
  \_groupFocusVisible style prop

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4

## 1.12.3

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3

## 1.12.2

### Patch Changes

- [`1d4b1f874`](https://github.com/chakra-ui/chakra-ui/commit/1d4b1f87498c2d843cd21c24e86085d812a1de07)
  [#4460](https://github.com/chakra-ui/chakra-ui/pull/4460) Thanks
  [@primos63](https://github.com/primos63)! - Corrected parseGradient function
  so that it checks for CSS functions.

  Previously, using the CSS `calc` function would result in invalid CSS being
  generated.

  The expectation is that

  ```jsx
  <Heading bgGradient="linear(to-r, green.200, pink.500 calc(20px + 20px))">
    Chakra-UI: Create accessible React apps with speed
  </Heading>
  ```

  functions similar to `linear-gradient` which handles using a CSS function

  ```jsx
  <Heading
    bgImage="linear-gradient(
      to right,
      var(--chakra-colors-green-200)),
      var(--chakra-colors-pink-500 calc(20px + 20px))"
  >
    Chakra-UI: Create accessible React apps with speed
  </Heading>
  ```

* [`270b71ebb`](https://github.com/chakra-ui/chakra-ui/commit/270b71ebbb2bd9007d2e138e432675991d94f18d)
  [#4368](https://github.com/chakra-ui/chakra-ui/pull/4368) Thanks
  [@avendiart](https://github.com/avendiart)! - Grid props type definitions now
  correclty reflect the implemented behavior in regard to tokens.
* Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2

## 1.12.1

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1

## 1.12.0

### Minor Changes

- [`ebda07095`](https://github.com/chakra-ui/chakra-ui/commit/ebda07095bffd9b3135c5d19803a3a08397b78ef)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Added the
  `_activeStep` pseudoselector which is applied when `aria-current="step"`.
  [See the `wai-aria` documentation](https://www.w3.org/TR/wai-aria-1.2/#aria-current)
  for more information on `aria-current`.

## 1.11.1

### Patch Changes

- [`d9d66a9e8`](https://github.com/chakra-ui/chakra-ui/commit/d9d66a9e876f076ffd1c8bb531fd03e9074d325f)
  [#4048](https://github.com/chakra-ui/chakra-ui/pull/4048) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - fixed boolean condition affecting
  bgImage url

## 1.11.0

### Minor Changes

- [`773497896`](https://github.com/chakra-ui/chakra-ui/commit/773497896e65ffbbda10e75b6e0a7bb5b68c853a)
  [#3997](https://github.com/chakra-ui/chakra-ui/pull/3997) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - **Ring styles**

  Added ring style props to make it easier to style an element's focus ring
  shadows. Props are `ring`, `ringColor`, `ringOffset`, and `ringOffsetColor`.

  ```jsx live=false
  // adds a 2px box-shadow with `gray.400` color
  <Box ring="2px" ringColor="gray.400">
    Sample
  </Box>

  // adds main box-shadow + offset box-shadow
  <Box ring="2px" ringColor="gray.400" ringOffset="3px" ringOffsetColor="white">
   Sample
  </Box>
  ```

  **Filter styles**

  Added css variable based API to apply css filter properties (blur,
  backdrop-blur) to an element. Props are `filter`, `blur`, `sepia`,
  `brightness`, `invert`, `saturation`, `backdropFilter`, `backdropBlur`,
  `sepia`, `saturation`, etc.

  To use this API, you'll need to set `filter` to `auto`, same for
  `backdropFilter`.

  ```jsx live=false
  // adds a 3px blur filter to this element
  <Image src="boruto.png" filter="auto" blur="3px" />

  // adds a 3px blur and 40% saturation filter to this element
  <Image src="boruto.png" filter="auto" blur="3px" saturation={0.4} />
  ```

  **Transform styles**

  Added css variable based API to apply css transform properties (translateX,
  translateY, scale, etc.). Props are `translateX`, `translateY`, `rotate`,
  `scaleX`, `scaleY`, and `scale`.

  To use this API, you'll need to set `transform` to `auto` or `auto-gpu` (for
  the GPU accelerated version).

  ```jsx live=false
  <Circle transform="auto" translateX="4" _hover={{ translateX: "8" }}>
    <CheckIcon />
  </Circle>
  ```

  - Add `mixBlendMode`, `backgroundBlendMode`, and `bgBlendMode` props to apply
    blend modes to elements

  - Automatic wrapping of `backgroundImage` or `bgImage` props with `url()` so
    you can just pass the image URL directly.

  ```jsx live=false
  // You can now do this!
  <Box bgImage="naruto.png" />

  // This still works
  <Box bgImage="url(naruto.png)" />
  ```

  - text decoration styles: Added `textDecorationColor`, `textDecorationLine`,
    `textDecorationStyles` style props.

  - Add `isolation` style prop to create a new stacking context.

  **High Contrast Mode**

  Fixed issue where setting `outline:0` or `outline:none` and using `box-shadow`
  for focus outlines don't work in high-contrast mode.

  To fix this, we've added `outline: 2px solid transparent` whenever you set
  `outline:0` to make your components work in high-constrast mode by default.

  [Learn more](https://sarahmhigley.com/writing/whcm-quick-tips/)

  - Fix the `_dark` pseudo props to map to
    `.chakra-ui-dark &, [data-theme=dark] &, &[data-theme=dark]`.

  - Added `_light` pseudo props to map to
    `.chakra-ui-light &, [data-theme=light] &, &[data-theme=light]` for users
    that prefer to start with dark mode.

  - Added `overscroll`, `overscrollX`, and `overscrollY` style prop to manage
    overscroll behavior of an container

## 1.10.5

### Patch Changes

- [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)
  [#3850](https://github.com/chakra-ui/chakra-ui/pull/3850) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Refactored the creation of
  the theme css vars

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0

## 1.10.4

### Patch Changes

- Updated dependencies
  [[`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/utils@1.7.0

## 1.10.3

### Patch Changes

- [`a11810f70`](https://github.com/chakra-ui/chakra-ui/commit/a11810f705f0731f5ddc967a59b6899dfe8d5050)
  [#3851](https://github.com/chakra-ui/chakra-ui/pull/3851) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  transition props are not resolved correctly

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0

## 1.10.2

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2

## 1.10.1

### Patch Changes

- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1

## 1.10.0

### Minor Changes

- [`32e79f835`](https://github.com/chakra-ui/chakra-ui/commit/32e79f83545740e1df73e7ce689e4101646bb57d)
  [#3648](https://github.com/chakra-ui/chakra-ui/pull/3648) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add support for css
  variable tokens. This means you can create a css variable and reference value
  in the tokens.

  ```jsx
  // We're convert `colors.red.200` to `var(--chakra-colors-red-200)`
  <Box
    sx={{
      "--banner-color": "colors.red.200",
      "& .banner": {
        bg: "var(--banner-color)",
      },
    }}
  />
  ```

  You can also add fallback values in event the token doesn't exist:

  ```jsx
  <Box
    sx={{
      // evaluates to #fff if `colors.red.1000` doesn't exists in theme map
      "--banner-color": "colors.red.1000, #fff",
      "& .banner": {
        bg: "var(--banner-color)",
      },
    }}
  />
  ```

  This opens new possbilities with css variables, for example you can apply
  responsive token values like you would with style props.

  > TypeScript support for this is still WIP

  ```jsx
  <Box
    sx={{
      "--banner-color": ["colors.red.200", "colors.pink.400"],
      "& .banner": {
        bg: "var(--banner-color)",
      },
    }}
  />
  ```

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0

## 1.9.1

### Patch Changes

- [`a576f4de8`](https://github.com/chakra-ui/chakra-ui/commit/a576f4de850706ea7088c8a6ea687269cad05e69)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix: avoid mutation
  for `getWithPriority` to get `textStyle` and `layerStyle` working
  consistently.

## 1.9.0

### Minor Changes

- [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c)
  [#3529](https://github.com/chakra-ui/chakra-ui/pull/3529) Thanks
  [@callum-mellorreed-privitar](https://github.com/callum-mellorreed-privitar)! -
  Add support for `textStyle` and `layerStyle` theme type generation to
  `@chakra-ui/cli`

### Patch Changes

- [`c3dcaabbc`](https://github.com/chakra-ui/chakra-ui/commit/c3dcaabbcf52ab9805a622f4e9833ad26cad9318)
  [#3615](https://github.com/chakra-ui/chakra-ui/pull/3615) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix: issue where
  responsive styles defined in textstyles not overriden wiht props.

  Fix: issue where `toCSSVars` omitted the transition tokens

* [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b)
  [#3551](https://github.com/chakra-ui/chakra-ui/pull/3551) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Fix: issue where RTL
  property keys are incorrect due to `config.property` mutation.
  - Fix: change `mx` and `px` to use logical properties. Instead of mapping to
    `marginLeft` and `marginRight`, it maps to `marginInlineStart` and
    `marginInlineEnd`. Same for `px`
* Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.8.0

### Minor Changes

- [`53408372e`](https://github.com/chakra-ui/chakra-ui/commit/53408372ef6926840815a03f2ac5269e3a4757f2)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for CSS
  Variables to the core of Chakra
  - Improve style computation performance by 2.5x

### Patch Changes

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0

## 1.7.1

### Patch Changes

- [`e8113d3ca`](https://github.com/chakra-ui/chakra-ui/commit/e8113d3ca66e9d45ac2dbb7109ff8904cbfd1134)
  [#3340](https://github.com/chakra-ui/chakra-ui/pull/3340) Thanks
  [@MohamedSayed008](https://github.com/MohamedSayed008)! - Export `Recursive*`
  types from theme, styled-system

* [`4943a15c0`](https://github.com/chakra-ui/chakra-ui/commit/4943a15c084fd2e66ab0dbf273233630d006dc5a)
  [#3306](https://github.com/chakra-ui/chakra-ui/pull/3306) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where
  TypeScript did not allow custom breakpoint names in ResponsiveObject

## 1.7.0

### Minor Changes

- [`a97e42568`](https://github.com/chakra-ui/chakra-ui/commit/a97e42568c4470d6cd1e16b48429af93c52def49)
  [#3290](https://github.com/chakra-ui/chakra-ui/pull/3290) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Theme Typings: Add
  autocomplete for negative space values

* [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087)
  [#3245](https://github.com/chakra-ui/chakra-ui/pull/3245) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  `textStyle` and `layerStyle` in styled-system package. This makes it possible
  to use them in the component theme, `css` function, and `sx` prop as well.

  ```jsx
  const theme = {
    textStyles: {
      caps: {
        fontWeight: "bold",
        fontSize: "24px",
      },
    },
  }

  const styles = css({ textStyle: "caps" })(theme)
  ```

  This also works for component theme as well.

  > `layerStyle`, `textStyle` and `apply` can now take responsive values as
  > well.

  - Refactored `apply` prop handling to use the style config pattern instead of
    add it imperatively.

### Patch Changes

- [`ef34c10a0`](https://github.com/chakra-ui/chakra-ui/commit/ef34c10a0c3cfda6bafcca4aa287dfb82f130aeb)
  [#3253](https://github.com/chakra-ui/chakra-ui/pull/3253) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow numbers for
  `borderTop` and provide autocomplete for `fontWeight` prop

* [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376)
  [#3227](https://github.com/chakra-ui/chakra-ui/pull/3227) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Introducing a generic
  TypeScript type `ChakraTheme` to improve the `extendTheme` function even
  further.

  ```ts
  import { extendTheme } from "@chakra-ui/react"

  export const customTheme = extendTheme({
    // here you get autocomplete for
    //   - existing definitions from the default theme
    //   - new components (Single and MultiStyle)
    //   - CSS definitions
    //   - color hues
    //   - etc.
  })

  export type MyCustomTheme = typeof customTheme
  ```

  You can get typesafe access to your custom theme like this:

  ```ts
  import { useTheme } from "@chakra-ui/react"
  import { MyCustomTheme } from "./my-custom-theme"

  const MyComponent = () => {
    const customTheme = useTheme<MyCustomTheme>()
    //...
  }
  ```

- [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)
  [#3291](https://github.com/chakra-ui/chakra-ui/pull/3291) Thanks
  [@dominictwlee](https://github.com/dominictwlee)! - Support negative scale
  values for css variables.

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.6.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- [`e434aed4a`](https://github.com/chakra-ui/chakra-ui/commit/e434aed4a7d769d0c6e98e048b2100f0efed277a)
  [#3214](https://github.com/chakra-ui/chakra-ui/pull/3214) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fix issue where CSS color
  names are not passed correctly.

  ```jsx
  <Box backgroundColor="red">Background is red</Box>
  ```

## 1.5.0

### Minor Changes

- [`d9ec9f49`](https://github.com/chakra-ui/chakra-ui/commit/d9ec9f496bfe2f81ffb84adbed099581d5f6843e)
  [#3049](https://github.com/chakra-ui/chakra-ui/pull/3049) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Move `srOnly` prop to
  styled system props. This will deprecate the need for the visually hidden
  package. Less is more!

  ```jsx
  // If `true`, hide an element visually without hiding it from screen readers.
  <Box srOnly>Visually hidden</Box>

  // If `focusable`, the sr-only styles will be undone, making the element visible to sighted users as well as screen readers.
  <Box srOnly _active={{ srOnly: "focusable" }}>Visually hidden but shown on focus</Box>
  ```

* [`26ca4cc5`](https://github.com/chakra-ui/chakra-ui/commit/26ca4cc53b8cc0ca696f2130f832965f7dc0ee53)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add polyfill for
  `inset` style prop as the CSS `inset` doesn't work in Safari
  - Add missing style props for grid and flex layouts: `gridTemplate`,
    `gridRowStart`, `gridRowEnd`, `flexFlow`, `clipPath`

## 1.4.1

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0

## 1.4.0

### Minor Changes

- [`ff7c3676`](https://github.com/chakra-ui/chakra-ui/commit/ff7c36764650dc7f01957c417eae1ec8ce356495)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for css
  media query and dark class selectors.

  - Users can now define write styles for dark class variant

  ```jsx live=false
  <body className="dark">
    <Box bg="red.200" _dark={{ bg: "red.300" }}>
      This will be styled based on dark mode class in body
    </Box>
  </body>
  ```

  - Users can also define write styles for CSS media dark mode

  ```jsx live=false
  <Box bg="red.200" _mediaDark={{ bg: "red.300" }}>
    This will be styled based on System preference
  </Box>
  ```

  **Note to maintainers**

  > This is an initial effort to move towards using CSS instead of JS for
  > color-mode styles.
  >
  > In Chakra v2, we'll only use JS to detect the initial color mode and rely on
  > `_dark` for changing styles.

### Patch Changes

- [`6830c0e3`](https://github.com/chakra-ui/chakra-ui/commit/6830c0e36959ebd76ce1991dd89d7303ce33b0d0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Due to Safari not
  support css logical properties for `right`, and `left`, I added polyfill for
  this css logical properties.

  > Affect components: `Modal`, `Drawer`

  - Added a `directionality` helper function to encapsulate all logic for
    ltr-rtl value or style flipping.

* [`09f028e4`](https://github.com/chakra-ui/chakra-ui/commit/09f028e4f2539d51b1c9ac7f3aec422ee6848fa3)
  [#2985](https://github.com/chakra-ui/chakra-ui/pull/2985) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed a bug where rgb
  values in bgGradient did not work correctly

## 1.3.1

### Patch Changes

- [`5cef5de4`](https://github.com/chakra-ui/chakra-ui/commit/5cef5de4f45cd58f7a29436335543cb5b40c0d70)
  [#2918](https://github.com/chakra-ui/chakra-ui/pull/2918) Thanks
  [@MohamedSayed008](https://github.com/MohamedSayed008)! - ## Button

  - Update the style props applied for `leftIcon` and `rightIcon` to support
    RTL. Changed `ml` and `mr` to `marginStart` and `marginEnd` respectively.
  - Update the style props applied when `isLoading` is `true`. Changed
    `marginRight` to `marginEnd`.

  ## Stack

  - Update `directionStyles` to use logical CSS properties for RTL support.
    Changed `marginLeft` and `marginRight` to `marginStart` and `marginEnd`
    respectively.

  ## Styled System

  - Add missing `borderStart`, and `borderEnd` for style and color.
  - Sort `Object.assign` keys in `configs/border.ts` for better readability.

  ## Other RTL Fixes

  - Alignment for close icon for `Tag`, `Modal`, and `Drawer` components to
    support RTL.

  ## Storybook

  Add RTL storybook toolbar for make it easy to test layouts.

  Packages added:

  - `@storybook/addon-toolbars`

## 1.3.0

### Minor Changes

- [`a0e0bd9a`](https://github.com/chakra-ui/chakra-ui/commit/a0e0bd9a5d45fe08887f8df8d3eccc84951578df)
  [#2816](https://github.com/chakra-ui/chakra-ui/pull/2816) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add gradient support to
  chakra style props. This PR adds to props:

  - `bgGradient`: a shorthand, convenient style prop to apply theme-aware
    gradients.
  - `bgClip`: a shorthand for `background-clip` CSS attribute. Useful when
    creating text gradients.
  - `backgroundClip`: the typical `background-clip` CSS attribute. Useful when
    creating text gradients.

  ## The Background Gradient API

  To add a gradient to a component, pass the `bgGradient` prop and set its value
  following the API below:

  - `linear(<direction>, <from>, <to>)`
  - `radial(<from>, <to>)`

  and other valid css gradient properties. For linear gradients, the direction
  can be either of the following values:

  ```js
  "to-t" // 'to top'
  "to-tr" // 'to top right'
  "to-r" // 'to right'
  "to-br" // 'to bottom right'
  "to-b" // 'to bottom'
  "to-bl" // 'to bottom left'
  "to-l" // 'to left'
  "to-tl" // 'to top left'
  ```

  ```jsx
  <Box w="500px" h="200px" bgGradient="linear(to-r, gray.300, pink.200)" />
  ```

  You can use both theme-aware color tokens or raw CSS color values.

  ```jsx
  <Box w="500px" h="200px" bgGradient="linear(to-l, #7928CA, #FF0080)" />
  ```

  ### Multiple Color Stops

  This is a gradient with multiple stops

  ```jsx
  <Box w="500px" h="200px" bgGradient="radial(gray.300,yellow.400,pink.200)" />
  ```

  ## The Text Gradient API

  To add a text gradient, pass the `bgGradient` following the API and `bgClip`
  prop to `text`.

  ```jsx
  <Text
    bgGradient="linear(to-l,#7928CA,#FF0080)"
    bgClip="text"
    fontSize="7xl"
    fontWeight="extrabold"
  >
    Welcome to Chakra UI
  </Text>
  ```

* [`4fa07745`](https://github.com/chakra-ui/chakra-ui/commit/4fa077453a5c2165b695198c57366f3cc6506c37)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## Improve
  performance

  Styled system core functions use `localCompare` to sort the transformed styles
  before passing it to emotion. This seems to be slower compared to its
  alternative `Intl.Collator`.

  Here's a benchmark I ran on my Chrome, Macbook Pro:

  ```js
  // Create an array of 2000 random items
  const arr = []
  for (let i = 0; i < 2000; i++) {
    arr.push(`test-${Math.random()}`)
  }

  // #1 - localeCompare: 169.665ms
  arr.sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  )

  // #2 - collator: 10.915ms
  const collator = new Intl.Collator("en", {
    numeric: true,
    sensitivity: "base",
  })
  arr.sort((a, b) => collator.compare(a, b))
  ```

  To improve performance, I had to do the following:

  - Move the core functions from `@styled-system/core` into our own codebase (we
    could create a PR to styled-system to improve the community)
  - Rewrite the functions to TypeScript. Since they're written in JavaScript
  - Change the sorting function to use `Intl.Collator`
  - Change the `merge` function to use `lodash.mergeWith`

  To learn more, check
  [here](https://stackoverflow.com/questions/14677060/400x-sorting-speedup-by-switching-a-localecompareb-to-ab-1ab10/25775469)
  to see this benchmark.

## 1.2.0

### Minor Changes

- [`609ac595`](https://github.com/chakra-ui/chakra-ui/commit/609ac595568799c9f2c38ccbc9ef44fdc7393baa)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## 📝 Description

  Adds support for CSS logical properties and `direction` in the theme for
  future RTL optimizations.

  ## 🚀 New behavior

  Make it possible to pass css logical style props or shorthand props. For
  example, to pass bi-directional margin-left, users will change `ml` to `ms` OR
  `marginLeft` ot `marginStart`.

  ```jsx
  // not RTL friendly 🚨
  <Box ml="20px" />

  // Good ✅
  <Box marginStart="20px" />

  // or use shorthand for margin-left bi-directional ✅
  <Box ms="20px" />
  ```

  Here's a list of possible bi-directional shorthand style props you can pass in
  addition to most css logical properties:

  | Prop               | LTR value                                      | RTL value                                      |
  | ------------------ | ---------------------------------------------- | ---------------------------------------------- |
  | ms                 | marginLeft                                     | marginRight                                    |
  | marginStart        | marginLeft                                     | marginRight                                    |
  | me                 | marginRight                                    | marginLeft                                     |
  | marginEnd          | marginRight                                    | marginLeft                                     |
  | ps                 | paddingLeft                                    | paddingRight                                   |
  | paddingStart       | paddingLeft                                    | paddingRight                                   |
  | pe                 | paddingRight                                   | paddingLeft                                    |
  | paddingEnd         | paddingRight                                   | paddingLeft                                    |
  | insetStart         | left                                           | right                                          |
  | insetEnd           | right                                          | left                                           |
  | borderStartWidth   | borderLeftWidth                                | borderRightWidth                               |
  | borderEndWidth     | borderRightWidth                               | borderLeftWidth                                |
  | borderStartRadius  | borderTopLeftRadius + borderBottomLeftRadius   | borderTopRightRadius + borderBottomRightRadius |
  | borderEndRadius    | borderTopRightRadius + borderBottomRightRadius | borderTopLeftRadius + borderBottomLeftRadius   |
  | roundedStart       | borderTopLeftRadius + borderBottomLeftRadius   | borderTopRightRadius + borderBottomRightRadius |
  | roundedEnd         | borderTopRightRadius + borderBottomRightRadius | borderTopLeftRadius + borderBottomLeftRadius   |
  | roundedTopStart    | borderTopLeftRadius                            | borderTopRightRadius                           |
  | roundedTopEnd      | borderTopRightRadius                           | borderTopLeftRadius                            |
  | roundedBottomStart | borderBottomLeftRadius                         | borderBottomRightRadius                        |
  | roundedBottomEnd   | borderBottomRightRadius                        | borderBottomLeftRadius                         |

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2

## 1.1.1

### Patch Changes

- [`127baa0f`](https://github.com/chakra-ui/chakra-ui/commit/127baa0f1926bf1f8ace6f46cfdc08606fe9d347)
  [#2702](https://github.com/chakra-ui/chakra-ui/pull/2702) Thanks
  [@terryyu](https://github.com/terryyu)! - fix style prop of shortcut
  definition, closes #2700

## 1.1.0

### Minor Changes

- [`586ce3c1`](https://github.com/chakra-ui/chakra-ui/commit/586ce3c12bb3508027c36811233c539eeeb55256)
  [#2504](https://github.com/chakra-ui/chakra-ui/pull/2504) Thanks
  [@Zaynex](https://github.com/Zaynex)! - - Add `filter` to styled props
  - This makes `filter` prop available to `_groupHover` utility as well

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/styled-system

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

**Note:** Version bump only for package @chakra-ui/styled-system

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/styled-system

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/styled-system

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/styled-system

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/styled-system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/styled-system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/styled-system@1.0.0-rc.0...@chakra-ui/styled-system@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- types issue with styled system
  ([470e14c](https://github.com/chakra-ui/chakra-ui/commit/470e14c3159898b43a54237091cf8ee707ed65a5))
- **types:** resolve type export from styled-system pkg
  ([0d3bd36](https://github.com/chakra-ui/chakra-ui/commit/0d3bd36d9c0dc6d94010625b49c501847ca2e165))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/styled-system@1.0.0-next.7...@chakra-ui/styled-system@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/styled-system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/styled-system@1.0.0-next.6...@chakra-ui/styled-system@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- types issue with styled system core
  ([fc8b8d8](https://github.com/chakra-ui/chakra-ui/commit/fc8b8d8c0daba140da959303df59230304d34f8a))
- undefined issue in styled utilies
  ([42502d1](https://github.com/chakra-ui/chakra-ui/commit/42502d1f689f34fe672893104dc85d378e08a55a))

### Reverts

- breakpoint handling
  ([f3ee5f1](https://github.com/chakra-ui/chakra-ui/commit/f3ee5f15c48da242c4d4d43de0dc67ff7664c81e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/styled-system@1.0.0-next.5...@chakra-ui/styled-system@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/styled-system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.5 (2020-07-15)

### Features

- add support for css transition
  ([a41614c](https://github.com/chakra-ui/chakra-ui/commit/a41614c8e9757e5d38ddef6a356d2d8c718f406f))
- add transition tokens
  ([40c8b30](https://github.com/chakra-ui/chakra-ui/commit/40c8b30f0f0219a1ed673db97c4032e721f38e53))
- add transition tokens
  ([5e190fa](https://github.com/chakra-ui/chakra-ui/commit/5e190fa70b41f6e0e063d3d68f0dd32adff754eb))
