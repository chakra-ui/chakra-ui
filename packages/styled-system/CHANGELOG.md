# Change Log

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
