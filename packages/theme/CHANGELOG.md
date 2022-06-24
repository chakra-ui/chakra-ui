# Change Log

## 2.1.1

### Patch Changes

- [#5764](https://github.com/chakra-ui/chakra-ui/pull/5764)
  [`612529653`](https://github.com/chakra-ui/chakra-ui/commit/61252965371f1abc5bc6680c14bbd08f97667ea9)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Remove internal usage of
  createBreakpoints function

- Updated dependencies
  [[`612529653`](https://github.com/chakra-ui/chakra-ui/commit/61252965371f1abc5bc6680c14bbd08f97667ea9)]:
  - @chakra-ui/theme-tools@2.0.3

## 2.1.0

### Minor Changes

- [#6153](https://github.com/chakra-ui/chakra-ui/pull/6153)
  [`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Remove annoying
  focus outline by leveraging focus visible

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/anatomy@2.0.1
  - @chakra-ui/theme-tools@2.0.2
  - @chakra-ui/utils@2.0.2

## 2.0.3

### Patch Changes

- [#6063](https://github.com/chakra-ui/chakra-ui/pull/6063)
  [`695c528c9`](https://github.com/chakra-ui/chakra-ui/commit/695c528c91d403667055e4fb7aeeb2f05cbb4d1f)
  Thanks [@SpencerDuball](https://github.com/SpencerDuball)! - Tab: Add visual
  feedback for disabled state in all variants.

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/theme-tools@2.0.1

## 2.0.2

### Patch Changes

- [#6046](https://github.com/chakra-ui/chakra-ui/pull/6046)
  [`3319eca8b`](https://github.com/chakra-ui/chakra-ui/commit/3319eca8bf02b892ea345a68294110919e2963cb)
  Thanks [@Averethel](https://github.com/Averethel)! - Ensure types used by
  other chakra packages are properly exported and imported so that `src`
  directory is not referenced in the emitted type declarations.

* [#6056](https://github.com/chakra-ui/chakra-ui/pull/6056)
  [`c93f5c90b`](https://github.com/chakra-ui/chakra-ui/commit/c93f5c90b0784584a8aef54fd912afa52f549016)
  Thanks [@johannespein](https://github.com/johannespein)! - Tag component
  variants borderRadius was overwriting baseStyle eventhough borderRadius was
  same for all variants. borderRadius is now part of the baseStyle

## 2.0.1

### Patch Changes

- [#6038](https://github.com/chakra-ui/chakra-ui/pull/6038)
  [`a9099c106`](https://github.com/chakra-ui/chakra-ui/commit/a9099c106edf0364d36feedfc066c5523cb7c7c8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactor global
  theme to use semantic token to prevent flash of white

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

- [`3e6ac56be`](https://github.com/chakra-ui/chakra-ui/commit/3e6ac56be82a6117e4dee484be0956e35fc58ed1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix typescript
  errors

* [#5892](https://github.com/chakra-ui/chakra-ui/pull/5892)
  [`ef6a22549`](https://github.com/chakra-ui/chakra-ui/commit/ef6a22549ef93093602ca2913fa6defe6f617df0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Improve
  accessibility of input placeholders

* Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/anatomy@2.0.0
  - @chakra-ui/utils@2.0.0
  - @chakra-ui/theme-tools@2.0.0

## 2.0.0-next.2

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/anatomy@2.0.0-next.2
  - @chakra-ui/theme-tools@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- [`3e6ac56be`](https://github.com/chakra-ui/chakra-ui/commit/3e6ac56be82a6117e4dee484be0956e35fc58ed1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix typescript
  errors

* [#5892](https://github.com/chakra-ui/chakra-ui/pull/5892)
  [`ef6a22549`](https://github.com/chakra-ui/chakra-ui/commit/ef6a22549ef93093602ca2913fa6defe6f617df0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Improve
  accessibility of input placeholders

* Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/anatomy@2.0.0-next.1
  - @chakra-ui/theme-tools@2.0.0-next.1
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
  - @chakra-ui/anatomy@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0
  - @chakra-ui/theme-tools@2.0.0-next.0

## 1.14.1

### Patch Changes

- [#5790](https://github.com/chakra-ui/chakra-ui/pull/5790)
  [`b19c89270`](https://github.com/chakra-ui/chakra-ui/commit/b19c892702f029c078f8d5bfaf0f89b573c6cd90)
  Thanks [@ugogo](https://github.com/ugogo)! - Fix radio cursor when disabled

## 1.14.0

### Minor Changes

- [#4443](https://github.com/chakra-ui/chakra-ui/pull/4443)
  [`fbe946223`](https://github.com/chakra-ui/chakra-ui/commit/fbe94622357e22acaf8bab0eae33ceae663d7a5b)
  Thanks [@heozeop](https://github.com/heozeop)! - Add styles for new `textarea`
  element in `Editable`

### Patch Changes

- Updated dependencies
  [[`fbe946223`](https://github.com/chakra-ui/chakra-ui/commit/fbe94622357e22acaf8bab0eae33ceae663d7a5b)]:
  - @chakra-ui/anatomy@1.3.0

## 1.13.4

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/anatomy@1.2.5
  - @chakra-ui/theme-tools@1.3.6
  - @chakra-ui/utils@1.10.4

## 1.13.3

### Patch Changes

- [#5595](https://github.com/chakra-ui/chakra-ui/pull/5595)
  [`0542b8a53`](https://github.com/chakra-ui/chakra-ui/commit/0542b8a53425093f18fd86d2b55220d3fa20253a)
  Thanks [@takethefake](https://github.com/takethefake)! - Add a new multi style
  part `root` to the Accordion component. It is applied to the topmost DOM
  element.
- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a),
  [`0542b8a53`](https://github.com/chakra-ui/chakra-ui/commit/0542b8a53425093f18fd86d2b55220d3fa20253a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/anatomy@1.2.4
  - @chakra-ui/theme-tools@1.3.5

## 1.13.2

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/anatomy@1.2.3
  - @chakra-ui/theme-tools@1.3.4
  - @chakra-ui/utils@1.10.2

## 1.13.1

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b),
  [`98c5ec2bc`](https://github.com/chakra-ui/chakra-ui/commit/98c5ec2bc37fc0764446c3e4df816131418c14e1)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/anatomy@1.2.2
  - @chakra-ui/theme-tools@1.3.3

## 1.13.0

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

* [#5419](https://github.com/chakra-ui/chakra-ui/pull/5419)
  [`a5f3bfce8`](https://github.com/chakra-ui/chakra-ui/commit/a5f3bfce846b44c9a4bdcd0bb80c17eb38da75a7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add entrypoints to
  the different parts of the theme (colors, fonts, components, spacing, etc.)

  ```jsx live=false
  // Now you can use only colors from the theme
  import colors from "@chakra-ui/theme/foundations/colors"
  ```

  Here's a table of the theme parts and entrypoints

  | Part        | Entrypoint                                  |
  | ----------- | ------------------------------------------- |
  | components  | `"@chakra-ui/theme/components"`             |
  | foundations | `"@chakra-ui/theme/foundations"`            |
  | colors      | `"@chakra-ui/theme/foundations/colors"`     |
  | sizes       | `"@chakra-ui/theme/foundations/sizes"`      |
  | spacing     | `"@chakra-ui/theme/foundations/spacing"`    |
  | typography  | `"@chakra-ui/theme/foundations/typography"` |
  | radius      | `"@chakra-ui/theme/foundations/radius"`     |
  | shadows     | `"@chakra-ui/theme/foundations/shadows"`    |
  | transition  | `"@chakra-ui/theme/foundations/transition"` |
  | zIndex      | `"@chakra-ui/theme/foundations/z-index"`    |
  | blur        | `"@chakra-ui/theme/foundations/blur"`       |
  | borders     | `"@chakra-ui/theme/foundations/borders"`    |

### Patch Changes

- [#5371](https://github.com/chakra-ui/chakra-ui/pull/5371)
  [`c393dd268`](https://github.com/chakra-ui/chakra-ui/commit/c393dd26808a06a8a6bd19839f4b2f1995157315)
  Thanks [@selbekk](https://github.com/selbekk)! - refactoring(theme): Simplify
  exports

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3),
  [`ebf1d98be`](https://github.com/chakra-ui/chakra-ui/commit/ebf1d98be17128e62b0ee7867da3698781a5974d)]:
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/theme-tools@1.3.2

## 1.12.3

### Patch Changes

- [#5298](https://github.com/chakra-ui/chakra-ui/pull/5298)
  [`3199b7242`](https://github.com/chakra-ui/chakra-ui/commit/3199b724237c56dc3a9c25811a88b2bea1b36ce9)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Ensure consistent
  line height for `FormErrorMessage` and `FormHelperText`

* [#5297](https://github.com/chakra-ui/chakra-ui/pull/5297)
  [`eb5850687`](https://github.com/chakra-ui/chakra-ui/commit/eb5850687e0984d95c3dd06e57716188c69cae42)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where the `ModalFooter` was out of the viewport for `size="full"`.

## 1.12.2

### Patch Changes

- [`f15099adc`](https://github.com/chakra-ui/chakra-ui/commit/f15099adc60150781607288dbe12133c2fb84e38)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  tokens autocomplete don't show up anymore except user runs the cli command.

## 1.12.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/anatomy@1.2.1
  - @chakra-ui/theme-tools@1.3.1
  - @chakra-ui/utils@1.9.1

## 1.12.0

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

- [#5010](https://github.com/chakra-ui/chakra-ui/pull/5010)
  [`0dd56ab1b`](https://github.com/chakra-ui/chakra-ui/commit/0dd56ab1b1ec3abab20ac6d8449757ad40138f29)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Fixed an styling issue where it
  was not possible to customize the icon spacing of the `Select` component.

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/anatomy@1.2.0
  - @chakra-ui/theme-tools@1.3.0
  - @chakra-ui/utils@1.9.0

## 1.11.1

### Patch Changes

- [`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)
  [#4965](https://github.com/chakra-ui/chakra-ui/pull/4965) Thanks
  [@takethefake](https://github.com/takethefake)! - Allow usage of
  `framer-motion` 5.x in `peerDependency`

## 1.11.0

### Minor Changes

- [`e31439c98`](https://github.com/chakra-ui/chakra-ui/commit/e31439c985d71ba0b37197b18a393b0fe5cf79a4)
  [#4929](https://github.com/chakra-ui/chakra-ui/pull/4929) Thanks
  [@Mattinton](https://github.com/Mattinton)! - Made PopoverCloseButton
  themeable

### Patch Changes

- Updated dependencies
  [[`e31439c98`](https://github.com/chakra-ui/chakra-ui/commit/e31439c985d71ba0b37197b18a393b0fe5cf79a4),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/anatomy@1.1.0
  - @chakra-ui/theme-tools@1.2.3
  - @chakra-ui/utils@1.8.4

## 1.10.4

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/theme-tools@1.2.2

## 1.10.3

### Patch Changes

- [`b769e88f9`](https://github.com/chakra-ui/chakra-ui/commit/b769e88f977a4e2a8641de57beefd8220bc5dffa)
  [#4740](https://github.com/chakra-ui/chakra-ui/pull/4740) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Refactor slider theme from
  slider.tsx to slider's theme

## 1.10.2

### Patch Changes

- [`09577b088`](https://github.com/chakra-ui/chakra-ui/commit/09577b088272075f6f183bbb34d5639ac5e68cc0)
  [#4708](https://github.com/chakra-ui/chakra-ui/pull/4708) Thanks
  [@hiroppy](https://github.com/hiroppy)! - Replace `tinycolor2` with
  `@ctrl/tinycolor` to get better tree-shaking benefits

- Updated dependencies
  [[`09577b088`](https://github.com/chakra-ui/chakra-ui/commit/09577b088272075f6f183bbb34d5639ac5e68cc0),
  [`a096ccdde`](https://github.com/chakra-ui/chakra-ui/commit/a096ccdde87a52919cd6e39d985c0dd1154ffbd7),
  [`a02b0de8b`](https://github.com/chakra-ui/chakra-ui/commit/a02b0de8b14acb8282cabafe5cef885e8da0b8fb)]:
  - @chakra-ui/theme-tools@1.2.1
  - @chakra-ui/anatomy@1.0.1

## 1.10.1

### Patch Changes

- [`633df562f`](https://github.com/chakra-ui/chakra-ui/commit/633df562f4ab22ae5406d5a5cda7661171fc8a65)
  [#4576](https://github.com/chakra-ui/chakra-ui/pull/4576) Thanks
  [@takethefake](https://github.com/takethefake)! - Added `overview:"visible"`
  to `baseStyle` of `TagLabel` to avoid clipped text

- Updated dependencies
  [[`01c913309`](https://github.com/chakra-ui/chakra-ui/commit/01c913309819c342806307291d2d60aea0122ecf)]:
  - @chakra-ui/theme-tools@1.2.0

## 1.10.0

### Minor Changes

- [`ff4dc7c38`](https://github.com/chakra-ui/chakra-ui/commit/ff4dc7c38310367c0e89522db9e88ae069cb6c2b)
  [#4317](https://github.com/chakra-ui/chakra-ui/pull/4317) Thanks
  [@bhishp](https://github.com/bhishp)! - Added a `container` part to the
  `FormControl` component theme, allowing the root `FormControl` element to be
  themed.

  ```jsx
  import { extendTheme } from "@chakra-ui/react"

  export const theme = extendTheme({
    components: {
      Form: {
        variants: {
          // create a variant named "custom"
          custom: {
            // style the root `FormControl` element
            container: {
              color: "white",
              bg: "blue.900",
            },
          },
        },
      },
    },
  })
  ```

### Patch Changes

- [`2d9942d3b`](https://github.com/chakra-ui/chakra-ui/commit/2d9942d3b7221cfe9a74aefa54ec0b6451bd961b)
  [#4539](https://github.com/chakra-ui/chakra-ui/pull/4539) Thanks
  [@takethefake](https://github.com/takethefake)! - Add `container`-part to Stat
  styleConfig

* [`46d0fb099`](https://github.com/chakra-ui/chakra-ui/commit/46d0fb099f415f7f3556c657ecd05e35ec68a9de)
  [#4463](https://github.com/chakra-ui/chakra-ui/pull/4463) Thanks
  [@takethefake](https://github.com/takethefake)! - Modals with `size:full` have
  no vertical margin

* Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/theme-tools@1.1.9

## 1.9.2

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/theme-tools@1.1.8

## 1.9.1

### Patch Changes

- [`cbf8bbdf0`](https://github.com/chakra-ui/chakra-ui/commit/cbf8bbdf02eff45a57a28307ec9c3137ce845420)
  [#4157](https://github.com/chakra-ui/chakra-ui/pull/4157) Thanks
  [@vcastroi](https://github.com/vcastroi)! - Fix an issue where the distance to
  the next element below a textarea was too large in some browsers.

* [`afb9b3cfa`](https://github.com/chakra-ui/chakra-ui/commit/afb9b3cfa87076ed8897b7edd4a9d9f1e1701721)
  [#4103](https://github.com/chakra-ui/chakra-ui/pull/4103) Thanks
  [@with-heart](https://github.com/with-heart)! - Update transitions to use
  theme tokens and remove outline transitions

## 1.9.0

### Minor Changes

- [`4f1cf6d6b`](https://github.com/chakra-ui/chakra-ui/commit/4f1cf6d6b9de134806c5f24d6b1c49f5aadae9a8)
  [#3997](https://github.com/chakra-ui/chakra-ui/pull/3997) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add blur token values for
  `filter` and `backdropFilter`

  ```json
  {
    "none": 0,
    "sm": "4px",
    "base": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "40px",
    "3xl": "64px"
  }
  ```

## 1.8.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/theme-tools@1.1.7

## 1.8.4

### Patch Changes

- [`1d5e55272`](https://github.com/chakra-ui/chakra-ui/commit/1d5e55272fe1475ce6fa0ed5bdccef4218885f77)
  [#3511](https://github.com/chakra-ui/chakra-ui/pull/3511) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - The `extendTheme` function
  allows you to pass multiple overrides or extensions:

  ```js
  import {
    extendTheme,
    withDefaultColorScheme,
    withDefaultSize,
    withDefaultVariant,
    withDefaultProps,
  } from "@chakra-ui/react"

  const customTheme = extendTheme(
    {
      colors: {
        brand: {
          // ...
          500: "#b4d455",
          // ...
        },
      },
    },
    withDefaultColorScheme({ colorScheme: "brand" }),
    withDefaultSize({
      size: "lg",
      components: ["Input", "NumberInput", "PinInput"],
    }),
    withDefaultVariant({
      variant: "outline",
      components: ["Input", "NumberInput", "PinInput"],
    }),
    // or all in one:
    withDefaultProps({
      defaultProps: {
        colorScheme: "brand",
        variant: "outline",
        size: "lg",
      },
      components: ["Input", "NumberInput", "PinInput"],
    }),
    // optional:
    yourCustomBaseTheme, // defaults to our chakra default theme
  )
  ```

- Updated dependencies
  [[`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/theme-tools@1.1.6

## 1.8.3

### Patch Changes

- [`9c6be11b1`](https://github.com/chakra-ui/chakra-ui/commit/9c6be11b1d95f8add314dbe214bc7ce3c67b76cd)
  [#3806](https://github.com/chakra-ui/chakra-ui/pull/3806) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  modal exceeded the viewport height on iOS

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/theme-tools@1.1.5

## 1.8.2

### Patch Changes

- [`753b56d63`](https://github.com/chakra-ui/chakra-ui/commit/753b56d6366276f217d28131c17c41427ae7761c)
  [#3795](https://github.com/chakra-ui/chakra-ui/pull/3795) Thanks
  [@hazem3500](https://github.com/hazem3500)! - Changes incorrect `panel` part
  name in `Progress` theme file to `label`

* [`890839d9f`](https://github.com/chakra-ui/chakra-ui/commit/890839d9fe32d5ec90954c8f4c5b6c463ff0b57d)
  [#3765](https://github.com/chakra-ui/chakra-ui/pull/3765) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update input, alert and
  tabs RTL styles

* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/theme-tools@1.1.4

## 1.8.1

### Patch Changes

- [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df)
  [#3733](https://github.com/chakra-ui/chakra-ui/pull/3733) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - **Popover**

  - Moved `maxW` from popover's `popper` to `content` to allow for better
    control of the popover's width.
  - Use `width` instead of `maxW` to allow users more control of popover's width
  - Use `--popover-bg` css property to control popover and arrow background.

  ```jsx live=false
  <PopoverContent style={{ "--popover-bg": "purple" }}>
    <PopoverArrow />
  </PopoverContent>
  ```

  - Add popover arrow shadow color

  **Select**

  - Update select icon to use `insetEnd` instead of `right` for RTL.

  **Skip Link**

  - Update styles to use `insetStart` instead of `left` for RTL.

  **Table**

  - Update text align attribute to use `end` instead of `right` for RTL.

- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`c69d2b983`](https://github.com/chakra-ui/chakra-ui/commit/c69d2b98350b57f133d6a8ea47b631cd25693aee),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/theme-tools@1.1.3

## 1.8.0

### Minor Changes

- [`aba02eab1`](https://github.com/chakra-ui/chakra-ui/commit/aba02eab1b38ab6c4ea6ae170740a10f8f9f16b7)
  [#3678](https://github.com/chakra-ui/chakra-ui/pull/3678) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - ### `Switch`

  - Add `container` part
  - Use css vars to handle styles
  - Fix rtl issue

  ### `Stats` and `Table`

  - Fix rtl issue

  - Remove `0` token value from spacing tokens. 0 maps to `0` and there's no
    need to create a css custom property for that.

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/theme-tools@1.1.2

## 1.7.1

### Patch Changes

- [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b)
  [#3551](https://github.com/chakra-ui/chakra-ui/pull/3551) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - NumberInput: add `root` to
  parts, leverage css variables and update styles to be rtl friendly.

* [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)
  [#3583](https://github.com/chakra-ui/chakra-ui/pull/3583) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Refactor arrow
  components to use `data-popper-arrow` and `data-popper-arrow-inner` to define
  the arrow elements. This is used within the modifiers to update the arrow
  styles/position positioning.

  - Change `arrowSize` and `arrowShadowColor` to use CSS custom properties
    instead of passing it to `usePopper`.

  - Update component themes to use `--popper-arrow-bg` to set the background for
    the popper's arrow element.

- [`eece70293`](https://github.com/chakra-ui/chakra-ui/commit/eece70293fb095d016a1ef8f2e367422b3e02ef5)
  [#3622](https://github.com/chakra-ui/chakra-ui/pull/3622) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Added typings for the
  `theme` prop in `ThemingPropsThunk` and export a standalone type
  `ThemeComponentProps`

  ```ts
  import { ThemeComponentProps } from "@chakra-ui/react"

  function baseStyle(props: ThemeComponentProps) {
    return {
      boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.05) ${props.theme.colors.whiteAlpha[500]}`,
    }
  }
  ```

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/theme-tools@1.1.1

## 1.7.0

### Minor Changes

- [`87e42eb64`](https://github.com/chakra-ui/chakra-ui/commit/87e42eb6410846d0041a7e88e2c771d15d596f25)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add new config property
  `cssVarPrefix` to add a custom prefix for CSS variables. It defaults to
  `chakra`.

* [`f032942c8`](https://github.com/chakra-ui/chakra-ui/commit/f032942c8a2568a3a23baee0d5972834345e5fa6)
  [#3447](https://github.com/chakra-ui/chakra-ui/pull/3447) Thanks
  [@dodas](https://github.com/dodas)! - `TabPanels` component can now be styled
  from `Tabs` component theme, specifying the `tabpanels` part.

### Patch Changes

- [`7efc9c217`](https://github.com/chakra-ui/chakra-ui/commit/7efc9c217789b2b314ed629c94b947256e8cbe2c)
  [#3454](https://github.com/chakra-ui/chakra-ui/pull/3454) Thanks
  [@tomdohnal](https://github.com/tomdohnal)! - - Fix full size modal with
  y-overflowing content behaviour
  - Fix border styles for alert and number input

* [`280d0dbfd`](https://github.com/chakra-ui/chakra-ui/commit/280d0dbfdd8894ab4aa228ac7ef816008a5d0824)
  [#3439](https://github.com/chakra-ui/chakra-ui/pull/3439) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Provide proper typings for
  `ThemeOverride.components`

- [`39375c15b`](https://github.com/chakra-ui/chakra-ui/commit/39375c15b64635ea3f59d9f5ad1f31851f9f018b)
  [#3486](https://github.com/chakra-ui/chakra-ui/pull/3486) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved an issue where
  `optgroup` in dark mode was unreadable on browsers that allow `select`
  contents styling.
- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d),
  [`d77f63415`](https://github.com/chakra-ui/chakra-ui/commit/d77f63415822ad26e4f6ed133e4869c07fa72306)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/theme-tools@1.1.0

## 1.6.2

### Patch Changes

- [`e8113d3ca`](https://github.com/chakra-ui/chakra-ui/commit/e8113d3ca66e9d45ac2dbb7109ff8904cbfd1134)
  [#3340](https://github.com/chakra-ui/chakra-ui/pull/3340) Thanks
  [@MohamedSayed008](https://github.com/MohamedSayed008)! - Export `Recursive*`
  types from theme, styled-system

* [`d6808f0a4`](https://github.com/chakra-ui/chakra-ui/commit/d6808f0a4ae6ad426b498e9556c76071f7aa9848)
  [#3366](https://github.com/chakra-ui/chakra-ui/pull/3366) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Bring back the TS type
  `Theme` export and deprecated `DefaultChakraTheme`.

- [`8597f58b7`](https://github.com/chakra-ui/chakra-ui/commit/8597f58b7d5c1fe401086d28a379bc1727756c5b)
  [#3361](https://github.com/chakra-ui/chakra-ui/pull/3361) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow halved values in
  design token in spacing as mentioned in the documents

## 1.6.1

### Patch Changes

- [`f3ba8dd53`](https://github.com/chakra-ui/chakra-ui/commit/f3ba8dd53abc697c096165185764235012ada90f)
  [#3300](https://github.com/chakra-ui/chakra-ui/pull/3300) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  TypeScript types were too narrow for component defaultProps and
  ComponentMultiStyleConfig

## 1.6.0

### Minor Changes

- [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376)
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

### Patch Changes

- [`a023a269f`](https://github.com/chakra-ui/chakra-ui/commit/a023a269ffe0efdae74be3de28e41790c9a5ca8a)
  [#3278](https://github.com/chakra-ui/chakra-ui/pull/3278) Thanks
  [@dodas](https://github.com/dodas)! - Fixed an issue where a `Tooltip` with
  negative `gutter` causes flickering on hover.

* [`2861b613b`](https://github.com/chakra-ui/chakra-ui/commit/2861b613bf354e6d00de01bf12bb543b2f2c2532)
  [#3251](https://github.com/chakra-ui/chakra-ui/pull/3251) Thanks
  [@dodas](https://github.com/dodas)! - Fixed an issue in Firefox where `Input`
  overflows it's flex container.

* Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/theme-tools@1.0.4

## 1.5.0

### Minor Changes

- [`20fb74c07`](https://github.com/chakra-ui/chakra-ui/commit/20fb74c074fbb4f229c9613f91de65e824309c07)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add `8xl` to size
  tokens. It maps to `90rem`

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- [`709ca0398`](https://github.com/chakra-ui/chakra-ui/commit/709ca0398a8c82c55b85c1364d80b90c5e075257)
  [#3200](https://github.com/chakra-ui/chakra-ui/pull/3200) Thanks
  [@dodas](https://github.com/dodas)! - A `Button` with `variant="link"` has now
  `verticalAlign` set to `baseline`, instead of `middle`.

## 1.4.1

### Patch Changes

- [`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1)
  [#3012](https://github.com/chakra-ui/chakra-ui/pull/3012) Thanks
  [@LPVua](https://github.com/LPVua)! - Fixed FormLabel margin and textAlign to
  support rtl; fixed form error icon margin to support rtl

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/theme-tools@1.0.3

## 1.4.0

### Minor Changes

- [`ff7c3676`](https://github.com/chakra-ui/chakra-ui/commit/ff7c36764650dc7f01957c417eae1ec8ce356495)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add the `2xl`
  breakpoint to the theme which maps to `96em or 1536px`

## 1.3.0

### Minor Changes

- [`f192cfd6`](https://github.com/chakra-ui/chakra-ui/commit/f192cfd640302e75762bb351cec21fdf670ab898)
  [#2751](https://github.com/chakra-ui/chakra-ui/pull/2751) Thanks
  [@dodas](https://github.com/dodas)! - The `Input` component now supports "xs"
  size. This change affects all components that extend from `Input`'s theme,
  such as `Select`, `PinInput`, `Textarea` or `NumberInput`.

### Patch Changes

- [`de3d059b`](https://github.com/chakra-ui/chakra-ui/commit/de3d059bf2ee7ca2a8ba5f10051b4cd76f86847a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - This was omitted in
  the last release.

## 1.2.2

### Patch Changes

- [`85eb4090`](https://github.com/chakra-ui/chakra-ui/commit/85eb409039640949e01f3aa7353519b19a42a53f)
  [#2741](https://github.com/chakra-ui/chakra-ui/pull/2741) Thanks
  [@dodas](https://github.com/dodas)! - ## 🐛 Bug Fix

  Focus outline now takes precedence over "isInvalid" outline. This change
  affects all components that extend from `Input`'s theme, such as `Select`,
  `PinInput`, `Textarea` or `NumberInput`.

* [`080a7acc`](https://github.com/chakra-ui/chakra-ui/commit/080a7accdd321123e44df082911c6250154fdbd5)
  [#2759](https://github.com/chakra-ui/chakra-ui/pull/2759) Thanks
  [@gifaeriyanto](https://github.com/gifaeriyanto)! - Added the `container` key
  to the `parts` list so it is detected as part of the `Checkbox` component
  theme types.

* Updated dependencies []:
  - @chakra-ui/theme-tools@1.0.2

## 1.2.1

### Patch Changes

- [`72bbd0db`](https://github.com/chakra-ui/chakra-ui/commit/72bbd0dbb913ba38ee2b9191d12bf73713ae4398)
  [#2708](https://github.com/chakra-ui/chakra-ui/pull/2708) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Resolved an issue where
  `DrawerCloseButton` was not receiving its base styles when it was passed other
  styles through the `__css` property, breaking the button's positioning.

## 1.2.0

### Minor Changes

- [`28bd21d7`](https://github.com/chakra-ui/chakra-ui/commit/28bd21d793911ba56bd146dd7aaff1008a70d147)
  [#2659](https://github.com/chakra-ui/chakra-ui/pull/2659) Thanks
  [@dodas](https://github.com/dodas)! - feat(theming): enable theming for
  ModalCloseButton

  This change enables `ModalCloseButton` to be themed as part of the `Modal`
  component theme via the `closeButton` key.

  See
  https://chakra-ui.com/docs/theming/component-style#styling-multipart-components
  for more information.

* [`2192be3d`](https://github.com/chakra-ui/chakra-ui/commit/2192be3db77504addffc89cbfef62fb9e884fa5d)
  [#2635](https://github.com/chakra-ui/chakra-ui/pull/2635) Thanks
  [@jmiazga](https://github.com/jmiazga)! - feat: added theming to List,
  ListItem, and ListIcon

- [`a36ede75`](https://github.com/chakra-ui/chakra-ui/commit/a36ede7519b7193f90e4985636a06c5d483a8a62)
  [#2681](https://github.com/chakra-ui/chakra-ui/pull/2681) Thanks
  [@dodas](https://github.com/dodas)! - This change prevent shrinking of
  AlertIcon when using Alert with long text

* [`c696345a`](https://github.com/chakra-ui/chakra-ui/commit/c696345a711338a23542a7b1911a33927a9ba5f1)
  [#2602](https://github.com/chakra-ui/chakra-ui/pull/2602) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(container): add ability
  to style container component with theme api

- [`9fdc61d8`](https://github.com/chakra-ui/chakra-ui/commit/9fdc61d8801f6d76783b5c9f068525d4dfc28b20)
  [#2478](https://github.com/chakra-ui/chakra-ui/pull/2478) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(divider): add ability
  to style divider component with theme api

## 1.1.0

### Minor Changes

- [`843854ec`](https://github.com/chakra-ui/chakra-ui/commit/843854ec669367623b50a598402be343866d87a8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Update heading
  theme to relative values for line height

  - Fixed error styles for flushed input variant
    [#2508](https://github.com/chakra-ui/chakra-ui/issues/2508)

  ```jsx
  // This shows the wrong shadow on focus. Work nows 🎉
  <Input variant="flushed" isInvalid placeholder="Focus me" />
  ```

### Patch Changes

- [`892ea2ca`](https://github.com/chakra-ui/chakra-ui/commit/892ea2ca1c02b4127f4f044df33de58cc7641f5c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix orientation
  styles for Tabs when orientation prop is vertical
  [#1187](https://github.com/chakra-ui/chakra-ui/issues/1187)

  - Add support for styling the `root` tab element from theme
    [#2548](https://github.com/chakra-ui/chakra-ui/issues/2548)

- Updated dependencies []:
  - @chakra-ui/theme-tools@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/theme

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

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-rc.0...@chakra-ui/theme@1.0.0-rc.1) (2020-08-06)

### Features

- move font feature settings to stat and add default to css reset
  ([2c1ba4b](https://github.com/chakra-ui/chakra-ui/commit/2c1ba4be4b024d596ee0daf0ca1b8e3cf7c77087))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.7...@chakra-ui/theme@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.6...@chakra-ui/theme@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- added ColorModeOptions type to theme config
  ([648d41f](https://github.com/chakra-ui/chakra-ui/commit/648d41f56b9fd501d730c55f34058e61c6a9febb))
- select option issue in dark mode
  ([f36a747](https://github.com/chakra-ui/chakra-ui/commit/f36a747007451204d4895f48d0d22e5afd393d45))

### Reverts

- breakpoint handling
  ([f3ee5f1](https://github.com/chakra-ui/chakra-ui/commit/f3ee5f15c48da242c4d4d43de0dc67ff7664c81e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.5...@chakra-ui/theme@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.4...@chakra-ui/theme@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- tabs align prop didnt do anything
  ([8e56b1b](https://github.com/chakra-ui/chakra-ui/commit/8e56b1b8427bd49a91c67ca3c1da792e76ef005c))

### Features

- add popover transition
  ([73d8c4f](https://github.com/chakra-ui/chakra-ui/commit/73d8c4fc9c676c95232cd259f59cce7d38eff94b))
- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))
- add transition tokens
  ([40c8b30](https://github.com/chakra-ui/chakra-ui/commit/40c8b30f0f0219a1ed673db97c4032e721f38e53))
- add transition tokens
  ([5e190fa](https://github.com/chakra-ui/chakra-ui/commit/5e190fa70b41f6e0e063d3d68f0dd32adff754eb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.4](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.4) (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- Adding Icon to theme export
  ([85ff918](https://github.com/chakra-ui/chakra-ui/commit/85ff918c30c9d6d1165cc69884fcb44cf3e13f2a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))

### Reverts

- theme z-indexes
  ([52494e0](https://github.com/chakra-ui/chakra-ui/commit/52494e07f452ba973f76a5bdeb1dc32025fa9a1a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.3](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.3) (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))

### Reverts

- theme z-indexes
  ([52494e0](https://github.com/chakra-ui/chakra-ui/commit/52494e07f452ba973f76a5bdeb1dc32025fa9a1a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.2](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.2) (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))
