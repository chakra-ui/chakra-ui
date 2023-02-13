# Change Log

## 2.1.16

### Patch Changes

- Updated dependencies
  [[`12811f264`](https://github.com/chakra-ui/chakra-ui/commit/12811f264751829f2495d8adbbefb677e9583358)]:
  - @chakra-ui/breakpoint-utils@2.0.8
  - @chakra-ui/icon@3.0.16

## 2.1.15

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components

## 2.1.14

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`292864aba`](https://github.com/chakra-ui/chakra-ui/commit/292864abae83833a826b2fe4a9d69ddcfe7fbe17),
  [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/breakpoint-utils@2.0.7
  - @chakra-ui/icon@3.0.16
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/object-utils@2.0.8
  - @chakra-ui/react-children-utils@2.0.6
  - @chakra-ui/shared-utils@2.0.5

## 2.1.13

### Patch Changes

- Updated dependencies
  [[`c5be1bc73`](https://github.com/chakra-ui/chakra-ui/commit/c5be1bc734e833a32c1c08c734c2ff6e6dca6f36),
  [`c483d859d`](https://github.com/chakra-ui/chakra-ui/commit/c483d859d015d850bc871cc5156f159a7694e795)]:
  - @chakra-ui/object-utils@2.0.7
  - @chakra-ui/icon@3.0.15

## 2.1.12

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

- Updated dependencies
  [[`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef),
  [`0eedc151c`](https://github.com/chakra-ui/chakra-ui/commit/0eedc151caec8dbdb53e4e5e8354e2310553c19f)]:
  - @chakra-ui/icon@3.0.14
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/breakpoint-utils@2.0.6
  - @chakra-ui/object-utils@2.0.6
  - @chakra-ui/react-children-utils@2.0.5
  - @chakra-ui/shared-utils@2.0.4

## 2.1.11

### Patch Changes

- Updated dependencies
  [[`8c2af79fa`](https://github.com/chakra-ui/chakra-ui/commit/8c2af79fa44e7d93e197000bb7e67d8ff11d9f95)]:
  - @chakra-ui/icon@3.0.13

## 2.1.10

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/icon@3.0.12
  - @chakra-ui/react-context@2.0.5
  - @chakra-ui/breakpoint-utils@2.0.5
  - @chakra-ui/object-utils@2.0.5
  - @chakra-ui/react-children-utils@2.0.4
  - @chakra-ui/shared-utils@2.0.3

## 2.1.9

### Patch Changes

- Updated dependencies
  [[`b06b3cca6`](https://github.com/chakra-ui/chakra-ui/commit/b06b3cca679cc7083826b8629add6db6b8218928)]:
  - @chakra-ui/react-children-utils@2.0.3
  - @chakra-ui/icon@3.0.11

## 2.1.8

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/icon@3.0.11
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/breakpoint-utils@2.0.4
  - @chakra-ui/object-utils@2.0.4
  - @chakra-ui/react-children-utils@2.0.2
  - @chakra-ui/shared-utils@2.0.2

## 2.1.7

### Patch Changes

- [#6644](https://github.com/chakra-ui/chakra-ui/pull/6644)
  [`a9b004c42`](https://github.com/chakra-ui/chakra-ui/commit/a9b004c42ec31a525c3f5f2b8e987d55093fd35d)
  Thanks [@SpencerKaiser](https://github.com/SpencerKaiser)! - Fixing an issue
  with `Highlight`

* [#6684](https://github.com/chakra-ui/chakra-ui/pull/6684)
  [`59391bb95`](https://github.com/chakra-ui/chakra-ui/commit/59391bb95b05a13feeb9fe84b0cdb027519460ce)
  Thanks [@anubra266](https://github.com/anubra266)! - Prevent Stack from
  crashing when there's a lot of children

  NB: This does not help improve loading and refresh performance otherwise,
  libraries like `react-virtualized` should be used to handle large lists.

- [#6666](https://github.com/chakra-ui/chakra-ui/pull/6666)
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Add missing
  component/function docs and relative docsite links.

  Ensures that all Components, functions, and hooks that have detailed pages on
  the Chakra site have corresponding JSDocs and links back to the docsite via
  IDE intellisense.

  Includes adding or fixing links within these docs to related WAI-ARIA
  patterns.

- Updated dependencies
  [[`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/icon@3.0.10

## 2.1.6

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation
- Updated dependencies
  [[`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)]:
  - @chakra-ui/react-context@2.0.3
  - @chakra-ui/icon@3.0.9
  - @chakra-ui/breakpoint-utils@2.0.3
  - @chakra-ui/object-utils@2.0.3
  - @chakra-ui/react-children-utils@2.0.1
  - @chakra-ui/shared-utils@2.0.1

## 2.1.5

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/icon@3.0.8
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/utils@2.0.8

## 2.1.4

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/icon@3.0.7
  - @chakra-ui/react-utils@2.0.4

## 2.1.3

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/icon@3.0.6
  - @chakra-ui/react-utils@2.0.3
  - @chakra-ui/utils@2.0.6

## 2.1.2

### Patch Changes

- [#6410](https://github.com/chakra-ui/chakra-ui/pull/6410)
  [`cf5d21810`](https://github.com/chakra-ui/chakra-ui/commit/cf5d218104904d321b477858a4d9988506a582f5)
  Thanks [@brenopolanski](https://github.com/brenopolanski)! - Add missing `key`
  in `Highlight` component to avoid React warnings

* [#6357](https://github.com/chakra-ui/chakra-ui/pull/6357)
  [`fcbf5e7a0`](https://github.com/chakra-ui/chakra-ui/commit/fcbf5e7a0855a32add9843f572103aa849f7202a)
  Thanks [@takethefake](https://github.com/takethefake)! - Adjust `Highlight` to
  not show any highlights if `query` is empty

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/icon@3.0.5
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/utils@2.0.5

## 2.1.1

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/icon@3.0.4

## 2.1.0

### Minor Changes

- [`778919455`](https://github.com/chakra-ui/chakra-ui/commit/7789194552404db8fe576c4d82ccfd0b940dd401)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add new highlight
  text component to emphasize any part of a string with the `mark` tag.

  ```jsx live=false
  <Text fontWeight="semibold">
    <Highlight
      query={"with speed"}
      styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
    >
      Create accessible React apps with speed
    </Highlight>
  </Text>
  ```

### Patch Changes

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/icon@3.0.3

## 2.0.3

### Patch Changes

- [#6200](https://github.com/chakra-ui/chakra-ui/pull/6200)
  [`198904c02`](https://github.com/chakra-ui/chakra-ui/commit/198904c02577ddcc37b97af58cf4693072e4cde8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - SimpleGrid: Fix
  issue where `minChildWidth` doesn't work with size tokens

## 2.0.2

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

* [#6137](https://github.com/chakra-ui/chakra-ui/pull/6137)
  [`7de782f04`](https://github.com/chakra-ui/chakra-ui/commit/7de782f0485656a6d10099339da509084cb3ee88)
  Thanks [@Patrick-Ullrich](https://github.com/Patrick-Ullrich)! - Improve error
  messaging around style provider factory by creating a custom
  `createStylesContext` function.
* Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/icon@3.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/utils@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/icon@3.0.1

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

### Minor Changes

- [#5964](https://github.com/chakra-ui/chakra-ui/pull/5964)
  [`eab820e23`](https://github.com/chakra-ui/chakra-ui/commit/eab820e23d4b24c3fc693d7aacd09a5704bf75df)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Revert `zIndex` of `LinkOverlay`
  and `LinkBox`

### Patch Changes

- [#5970](https://github.com/chakra-ui/chakra-ui/pull/5970)
  [`0f10f9555`](https://github.com/chakra-ui/chakra-ui/commit/0f10f9555a07106bb3737f7e900c36d81507c926)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  setting zero value for either x or y causes all spacing to be collapse (and
  not work)
- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/icon@3.0.0
  - @chakra-ui/react-utils@2.0.0
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
  - @chakra-ui/icon@3.0.0-next.2
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.3

### Patch Changes

- [#5970](https://github.com/chakra-ui/chakra-ui/pull/5970)
  [`0f10f9555`](https://github.com/chakra-ui/chakra-ui/commit/0f10f9555a07106bb3737f7e900c36d81507c926)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  setting zero value for either x or y causes all spacing to be collapse (and
  not work)

## 2.0.0-next.2

### Minor Changes

- [#5964](https://github.com/chakra-ui/chakra-ui/pull/5964)
  [`eab820e23`](https://github.com/chakra-ui/chakra-ui/commit/eab820e23d4b24c3fc693d7aacd09a5704bf75df)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Restore zIndex of LinkOverlay
  from LinkBox

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/icon@3.0.0-next.1
  - @chakra-ui/react-utils@2.0.0-next.1
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
  - @chakra-ui/icon@3.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.8.0

### Minor Changes

- [#5772](https://github.com/chakra-ui/chakra-ui/pull/5772)
  [`7fa1e22c6`](https://github.com/chakra-ui/chakra-ui/commit/7fa1e22c63cdd77364a6bb31d7a60459fd945e3c)
  Thanks [@mix3d](https://github.com/mix3d)! - Add support for vertical and
  horizontal spacing options in the Wrap component.

  ```jsx live=false
  <Wrap spacingX="2" spacingY="4">
    <Box />
    <Box />
    <Box />
    <Box />
  </Wrap>
  ```

  > Falls back to the `spacing` prop for by default

## 1.7.8

### Patch Changes

- [#5679](https://github.com/chakra-ui/chakra-ui/pull/5679)
  [`1c14e0de8`](https://github.com/chakra-ui/chakra-ui/commit/1c14e0de84a7eb92482ba0ba2e04b27d738af804)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Fix buttons zIndex within LinkBox
  and usage of LinkOverlay

* [#5737](https://github.com/chakra-ui/chakra-ui/pull/5737)
  [`e93b9f8c3`](https://github.com/chakra-ui/chakra-ui/commit/e93b9f8c3e695b56dbf927b37b4b13ded660451b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Remove `noreferrer`
  attribute from link component

## 1.7.7

### Patch Changes

- [#5632](https://github.com/chakra-ui/chakra-ui/pull/5632)
  [`e4a990d41`](https://github.com/chakra-ui/chakra-ui/commit/e4a990d41ec4e48a3d92840e0d74cbbf4b17670c)
  Thanks [@m4x3d](https://github.com/m4x3d)! - Fixed zIndex in LinkOverlay so
  that content in LinkBox can have an opacity below 1

## 1.7.6

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/icon@2.0.5
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/utils@1.10.4

## 1.7.5

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a),
  [`c2bcba11c`](https://github.com/chakra-ui/chakra-ui/commit/c2bcba11ca60c175b35dff10a922e600c3fd065c)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/icon@2.0.4

## 1.7.4

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/icon@2.0.3
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/utils@1.10.2

## 1.7.3

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/icon@2.0.2

## 1.7.2

### Patch Changes

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/icon@2.0.1

## 1.7.1

### Patch Changes

- [#5276](https://github.com/chakra-ui/chakra-ui/pull/5276)
  [`5f9407742`](https://github.com/chakra-ui/chakra-ui/commit/5f940774223c5b747a5b6eccff7657eabbe34776)
  Thanks [@prashanth-cpaul](https://github.com/prashanth-cpaul)! - ### Add
  support for `area` prop on `GridItem`

  Deprecated `area` prop on `Grid` and added support for `area` prop to be used
  with `GridItem` instead. This allows for usage of `GridItem`'s that have named
  template areas to be used in conjunction with a `Grid` that has a defined
  template area.

  ```jsx live=false
  <Grid templateAreas='"one two three"'>
    <GridItem area="one">one</GridItem>
    <GridItem area="two">two</GridItem>
    <GridItem area="three">three</GridItem>
  </Grid>
  ```

## 1.7.0

### Minor Changes

- [#5137](https://github.com/chakra-ui/chakra-ui/pull/5137)
  [`e624a277a`](https://github.com/chakra-ui/chakra-ui/commit/e624a277ac7f75af9ec5c1d2cc010b54c165f430)
  Thanks [@Patrick-Ullrich](https://github.com/Patrick-Ullrich)! - Improve error
  message when using `ListItem` without wrapping in `List`.

## 1.6.0

### Minor Changes

- [#5123](https://github.com/chakra-ui/chakra-ui/pull/5123)
  [`26d2a547b`](https://github.com/chakra-ui/chakra-ui/commit/26d2a547bca20e197f352c7492e3cad197b513e6)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Add support for
  style props `gap`, `columnGap` and `rowGap`. Those CSS properties are valid in
  a grid or flex context

  > For further information see
  > [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

### Patch Changes

- [`f565841c6`](https://github.com/chakra-ui/chakra-ui/commit/f565841c6215a5a187dc4ea18d9188277ff2ce4e)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix TS issue with
  Grid component due to the native `gap`, `rowGap` and `columnGap` we added to
  styled system.
- Updated dependencies
  [[`17400aff6`](https://github.com/chakra-ui/chakra-ui/commit/17400aff62601c1b70dcc4e60af1fadf3915f3e0)]:
  - @chakra-ui/icon@2.0.0

## 1.5.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/icon@1.2.1
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/utils@1.9.1

## 1.5.0

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
  - @chakra-ui/icon@1.2.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0

## 1.4.11

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/icon@1.1.13

## 1.4.10

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/icon@1.1.12

## 1.4.9

### Patch Changes

- [`83eecb75f`](https://github.com/chakra-ui/chakra-ui/commit/83eecb75f5bec58ea60e800122ce63c3d96c6a25)
  [#4560](https://github.com/chakra-ui/chakra-ui/pull/4560) Thanks
  [@take](https://github.com/take)! - Fix url for `LinkBox` component

## 1.4.8

### Patch Changes

- [`a8dcdfdb6`](https://github.com/chakra-ui/chakra-ui/commit/a8dcdfdb636e0c9624e171bb155302723504e290)
  [#4452](https://github.com/chakra-ui/chakra-ui/pull/4452) Thanks
  [@jamesopti](https://github.com/jamesopti)! - fix(Stack): Ensure that when
  cloning children, their provided keys are preferred over index. This prevents
  them from being destroyed and recreated when a child's position in the list
  changes.
- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/icon@1.1.11

## 1.4.7

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/icon@1.1.10

## 1.4.6

### Patch Changes

- [`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad)
  [#4057](https://github.com/chakra-ui/chakra-ui/pull/4057) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - updated @see doc links to point to
  shorthand see PR #4046 comment

## 1.4.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/icon@1.1.9

## 1.4.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/icon@1.1.8

## 1.4.3

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/icon@1.1.7

## 1.4.2

### Patch Changes

- [`3bc27c018`](https://github.com/chakra-ui/chakra-ui/commit/3bc27c0183d06f8e0d38ab8e6d7d793f20e883c8)
  [#3765](https://github.com/chakra-ui/chakra-ui/pull/3765) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix RTL styles for
  OrderedList and UnorderedList

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/icon@1.1.6

## 1.4.1

### Patch Changes

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/icon@1.1.5

## 1.4.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- [`1d85e4729`](https://github.com/chakra-ui/chakra-ui/commit/1d85e472918346f1eb4ba7aed5291b9e7254e1f8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix: remove
  redundant `role` attribute from divider

* [`f1612df7b`](https://github.com/chakra-ui/chakra-ui/commit/f1612df7bbaf68286c11d30c89d671cbe526c9c5)
  [#3665](https://github.com/chakra-ui/chakra-ui/pull/3665) Thanks
  [@burhanuday](https://github.com/burhanuday)! - fixed the bug where a margin
  bottom would get applied to direction=row of stack

- [`c71cb7b08`](https://github.com/chakra-ui/chakra-ui/commit/c71cb7b088a1d4c2a27a8c2d58d8573d9c2224c7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  AbsoluteCenter doesn't have `position: absolute`

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/icon@1.1.4

## 1.3.3

### Patch Changes

- [`da443cd67`](https://github.com/chakra-ui/chakra-ui/commit/da443cd67289122d661bdab802d0ccb3740eb707)
  [#3584](https://github.com/chakra-ui/chakra-ui/pull/3584) Thanks
  [@isBatak](https://github.com/isBatak)! - Fix: aspect ratio SSR `<style/>` tag
  display

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/icon@1.1.3

## 1.3.2

### Patch Changes

- [`f60e5c174`](https://github.com/chakra-ui/chakra-ui/commit/f60e5c174e07730cf073f2bf53ac6e0c8a66d0c1)
  [#3509](https://github.com/chakra-ui/chakra-ui/pull/3509) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Simplify wrap style
  management to use CSS custom properties.

* [`dedc2d45f`](https://github.com/chakra-ui/chakra-ui/commit/dedc2d45fd8e568f9162bcf406b3059819eff6ff)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - `SimpleGrid`: Avoid grid
  blow by adding `minmax(0, 1fr)`

* Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/icon@1.1.2

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/icon@1.1.1

## 1.3.0

### Minor Changes

- [`f90d8be54`](https://github.com/chakra-ui/chakra-ui/commit/f90d8be545069ebedc42f13cb293c26c35eb0d3b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **Bug Fixes:**

  - Update transform style for `AbsoluteCenter` when `axis` is `both`

  **Features:**

  - Add `shouldWrapChildren` to `Wrap` component to make it possible use `Wrap`
    directly without thinking about `WrapItem`.

  - Update `LinkBox` and `LinkOverlay` components and make them public in docs.

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)]:
  - @chakra-ui/icon@1.1.0

## 1.2.0

### Minor Changes

- [`df66d58e`](https://github.com/chakra-ui/chakra-ui/commit/df66d58e163c285f33649cfd2a480b810e9599a2)
  [#3137](https://github.com/chakra-ui/chakra-ui/pull/3137) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Add `AbsoluteCenter`
  component to help manage centering of an element relative to its parent
  dimensions.

  It requires a parent that has `position: relative` to work correctly.

  Here's how it works:

  ```jsx
  <Box position="relative" w="600px" h="400px">
    <img src="some-image.png" />
    {/** This will be centered relative to `Box` */}
    <AbsoluteCenter>
      <PlayButton />
    </AbsoluteCenter>
  </Box>
  ```

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/icon@1.0.3

## 1.1.2

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

## 1.1.1

### Patch Changes

- [`aeb5e521`](https://github.com/chakra-ui/chakra-ui/commit/aeb5e5214970e7fd239629226dd06f6058b8c697)
  [#2794](https://github.com/chakra-ui/chakra-ui/pull/2794) Thanks
  [@with-heart](https://github.com/with-heart)! - Enabled ref forwarding for
  `ListItem`

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/icon@1.0.2

## 1.1.0

### Minor Changes

- [`2192be3d`](https://github.com/chakra-ui/chakra-ui/commit/2192be3db77504addffc89cbfef62fb9e884fa5d)
  [#2635](https://github.com/chakra-ui/chakra-ui/pull/2635) Thanks
  [@jmiazga](https://github.com/jmiazga)! - feat: added theming to List,
  ListItem, and ListIcon

* [`c696345a`](https://github.com/chakra-ui/chakra-ui/commit/c696345a711338a23542a7b1911a33927a9ba5f1)
  [#2602](https://github.com/chakra-ui/chakra-ui/pull/2602) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(container): add ability
  to style container component with theme api

- [`9fdc61d8`](https://github.com/chakra-ui/chakra-ui/commit/9fdc61d8801f6d76783b5c9f068525d4dfc28b20)
  [#2478](https://github.com/chakra-ui/chakra-ui/pull/2478) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(divider): add ability
  to style divider component with theme api

### Patch Changes

- [`6b527414`](https://github.com/chakra-ui/chakra-ui/commit/6b52741456f71ba4ec8cfe3e6307796d195adf5b)
  [#2589](https://github.com/chakra-ui/chakra-ui/pull/2589) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - fix prop type interface
  for stack

## 1.0.1

### Patch Changes

- [`b3594802`](https://github.com/chakra-ui/chakra-ui/commit/b3594802714115c762013174badd5b838217be6f)
  [#2522](https://github.com/chakra-ui/chakra-ui/pull/2522) Thanks
  [@Qrymy](https://github.com/Qrymy)! - ## Stack

  - Fix Stack divider keys issue
  - Fix issue where stack with divider doesn't respond to both responsive
    spacing and responsive direction

  This wasn't working in v1 but now works 🎉

  ```jsx
  <Stack
    spacing={["10px", "60px"]}
    divider={<StackDivider borderColor="gray.200" />}
    direction={["column", "row"]}
  >
    <Box bgColor="red.500">First</Box>
    <Box bgColor="blue.500">Second</Box>
    <Box bgColor="yellow.500">Third</Box>
  </Stack>
  ```

  - Make it possible the regular `Divider` component within `Stack` by extending
    the `__css` internal style prop

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/layout

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

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-rc.0...@chakra-ui/layout@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- fix function name typos
  ([8c50098](https://github.com/chakra-ui/chakra-ui/commit/8c5009801afb83428020efcfc1e93d5a92f40107))
- issue with radio and radio group name
  ([4e09ebb](https://github.com/chakra-ui/chakra-ui/commit/4e09ebbf73d8f940a56703761914c2461e7a451f))
- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.7...@chakra-ui/layout@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.6...@chakra-ui/layout@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- link type inference with as prop
  ([6fd3d52](https://github.com/chakra-ui/chakra-ui/commit/6fd3d52df8147e949ed2e1ae460977f290fd149d))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.5...@chakra-ui/layout@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.4...@chakra-ui/layout@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- fixed margin bug for Stack column-reverse and row-reverse
  ([3d1d872](https://github.com/chakra-ui/chakra-ui/commit/3d1d8728fabea1b3da9bf11c40e32ca0e348eef9))
- stack key issue [#1129](https://github.com/chakra-ui/chakra-ui/issues/1129)
  ([2f5361a](https://github.com/chakra-ui/chakra-ui/commit/2f5361a06ab4fd8347d106425252c3ed5dcba0b9))
- updated Stack to allow 'row-reverse' and 'column-reverse' for direction prop
  ([1180b6b](https://github.com/chakra-ui/chakra-ui/commit/1180b6b7b97ba33c5b9506f65cec59ac4e37048f))

### Features

- allow AspectRatio to take a responsive value for its ratio prop
  ([941aa68](https://github.com/chakra-ui/chakra-ui/commit/941aa68ea5db6295698344f47274ef6ef9cf7b31))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- **stack:** default align-items css value
  ([ab8b4f4](https://github.com/chakra-ui/chakra-ui/commit/ab8b4f4f0c0cc21cfa0af119a629bcbfddcd909c))
- **stack:** no default value for align prop
  ([cdd2f7b](https://github.com/chakra-ui/chakra-ui/commit/cdd2f7b4b7b8815fdc602571e01ee82107fff05f))
- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- UnorderedList was not rendering bullets
  ([4a532b5](https://github.com/chakra-ui/chakra-ui/commit/4a532b559719583cd644294b62ebc16fe8a88ccc))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- added forwardRef to HStack and VStack
  ([dace172](https://github.com/chakra-ui/chakra-ui/commit/dace172c851210d12e0d841a62f3532fd0974203))
- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))
