# Change Log

## 2.0.19

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components
- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)]:
  - @chakra-ui/form-control@2.0.17

## 2.0.18

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/form-control@2.0.16
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/object-utils@2.0.8
  - @chakra-ui/react-children-utils@2.0.6
  - @chakra-ui/shared-utils@2.0.5

## 2.0.17

### Patch Changes

- Updated dependencies
  [[`c5be1bc73`](https://github.com/chakra-ui/chakra-ui/commit/c5be1bc734e833a32c1c08c734c2ff6e6dca6f36)]:
  - @chakra-ui/object-utils@2.0.7
  - @chakra-ui/form-control@2.0.15

## 2.0.16

### Patch Changes

- [#7104](https://github.com/chakra-ui/chakra-ui/pull/7104)
  [`989b36804`](https://github.com/chakra-ui/chakra-ui/commit/989b3680460b067f2425f6a92afb6632fb86ec5e)
  Thanks [@lexanth](https://github.com/lexanth)! - Ensure input z-index
  overrides are isolated to the input

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.14

## 2.0.15

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
  [[`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef)]:
  - @chakra-ui/form-control@2.0.14
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/object-utils@2.0.6
  - @chakra-ui/react-children-utils@2.0.5
  - @chakra-ui/shared-utils@2.0.4

## 2.0.14

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.13

## 2.0.13

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/form-control@2.0.12
  - @chakra-ui/react-context@2.0.5
  - @chakra-ui/object-utils@2.0.5
  - @chakra-ui/react-children-utils@2.0.4
  - @chakra-ui/shared-utils@2.0.3

## 2.0.12

### Patch Changes

- Updated dependencies
  [[`b06b3cca6`](https://github.com/chakra-ui/chakra-ui/commit/b06b3cca679cc7083826b8629add6db6b8218928)]:
  - @chakra-ui/react-children-utils@2.0.3
  - @chakra-ui/form-control@2.0.11

## 2.0.11

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/form-control@2.0.11
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/object-utils@2.0.4
  - @chakra-ui/react-children-utils@2.0.2
  - @chakra-ui/shared-utils@2.0.2

## 2.0.10

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

- Updated dependencies
  [[`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/form-control@2.0.10

## 2.0.9

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
  - @chakra-ui/form-control@2.0.9
  - @chakra-ui/object-utils@2.0.3
  - @chakra-ui/react-children-utils@2.0.1
  - @chakra-ui/shared-utils@2.0.1

## 2.0.8

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.8
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/utils@2.0.8

## 2.0.7

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/form-control@2.0.7
  - @chakra-ui/react-utils@2.0.4

## 2.0.6

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.6
  - @chakra-ui/react-utils@2.0.3
  - @chakra-ui/utils@2.0.6

## 2.0.5

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/form-control@2.0.5
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/utils@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/form-control@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies
  [[`8bfeefbb5`](https://github.com/chakra-ui/chakra-ui/commit/8bfeefbb562fc5ada4757309db6b951c421342ad),
  [`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/form-control@2.0.3
  - @chakra-ui/utils@2.0.3

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
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1),
  [`7de782f04`](https://github.com/chakra-ui/chakra-ui/commit/7de782f0485656a6d10099339da509084cb3ee88)]:
  - @chakra-ui/form-control@2.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/utils@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/form-control@2.0.1

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

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/form-control@2.0.0
  - @chakra-ui/react-utils@2.0.0
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
  - @chakra-ui/form-control@2.0.0-next.3
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/form-control@2.0.0-next.1
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
  - @chakra-ui/form-control@2.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.4.6

### Patch Changes

- Updated dependencies
  [[`56b7e198b`](https://github.com/chakra-ui/chakra-ui/commit/56b7e198bf1b0b507da0976aef80f600ae7efeb0)]:
  - @chakra-ui/form-control@1.6.0

## 1.4.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.5.10

## 1.4.4

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.5.9

## 1.4.3

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/form-control@1.5.8
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/utils@1.10.4

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/form-control@1.5.7

## 1.4.1

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/form-control@1.5.6
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/utils@1.10.2

## 1.4.0

### Minor Changes

- [#5507](https://github.com/chakra-ui/chakra-ui/pull/5507)
  [`e390806b2`](https://github.com/chakra-ui/chakra-ui/commit/e390806b2603abb97fb5e151abd46710291025d9)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - Add new prop
  `htmlSize` to `Input` to allow the usage of the native input attribute `size`.

### Patch Changes

- [#5516](https://github.com/chakra-ui/chakra-ui/pull/5516)
  [`01a939464`](https://github.com/chakra-ui/chakra-ui/commit/01a939464a28d20ab27b38864dbc5a44078d7314)
  Thanks [@selbekk](https://github.com/selbekk)! - Apply theme styles for
  `InputLeftElement` and `InputRightElement`.

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b),
  [`f149c6c9a`](https://github.com/chakra-ui/chakra-ui/commit/f149c6c9aa04b8c0abebaa6ac8dc72c7f8ceed35)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/form-control@1.5.5

## 1.3.4

### Patch Changes

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/form-control@1.5.4

## 1.3.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.5.3

## 1.3.2

### Patch Changes

- [#5106](https://github.com/chakra-ui/chakra-ui/pull/5106)
  [`ba76b8125`](https://github.com/chakra-ui/chakra-ui/commit/ba76b8125a533b0642b12ad6388774785ad026ac)
  Thanks [@anubra266](https://github.com/anubra266)! - Fixed an issue where
  `InputGroup` passes undefined `size` and `variant` props which overrides the
  ones defined by default in a custom `Input` component.
- Updated dependencies []:
  - @chakra-ui/form-control@1.5.2

## 1.3.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/form-control@1.5.1
  - @chakra-ui/react-utils@1.2.1
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

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/form-control@1.5.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0

## 1.2.12

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/form-control@1.4.3

## 1.2.11

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/form-control@1.4.2

## 1.2.10

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.4.1

## 1.2.9

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`4981d9898`](https://github.com/chakra-ui/chakra-ui/commit/4981d9898641be3904367ef917560fef3b362720),
  [`ff4dc7c38`](https://github.com/chakra-ui/chakra-ui/commit/ff4dc7c38310367c0e89522db9e88ae069cb6c2b),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/form-control@1.4.0
  - @chakra-ui/utils@1.8.2

## 1.2.8

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/form-control@1.3.8

## 1.2.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.3.7

## 1.2.6

### Patch Changes

- Updated dependencies
  [[`620f0b7d7`](https://github.com/chakra-ui/chakra-ui/commit/620f0b7d756ffb6bfc6ddf0459e96f774ffbb9be)]:
  - @chakra-ui/form-control@1.3.6

## 1.2.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/form-control@1.3.5

## 1.2.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/form-control@1.3.4

## 1.2.3

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/form-control@1.3.3

## 1.2.2

### Patch Changes

- [`327f00644`](https://github.com/chakra-ui/chakra-ui/commit/327f00644d3336fe1e2d3152f9cc3474a18824ef)
  [#3765](https://github.com/chakra-ui/chakra-ui/pull/3765) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Remove unused padding-x
  from input element

* [`890839d9f`](https://github.com/chakra-ui/chakra-ui/commit/890839d9fe32d5ec90954c8f4c5b6c463ff0b57d)
  [#3765](https://github.com/chakra-ui/chakra-ui/pull/3765) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update input addon and
  element style handling

* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/form-control@1.3.2

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721),
  [`d86a0f6b4`](https://github.com/chakra-ui/chakra-ui/commit/d86a0f6b4cfcaaf759559325c8fe8b9376f7548b)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/form-control@1.3.1

## 1.2.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc),
  [`3cc77ce60`](https://github.com/chakra-ui/chakra-ui/commit/3cc77ce60681650436f764e28b4b2234c5ca6408),
  [`fa9350eff`](https://github.com/chakra-ui/chakra-ui/commit/fa9350eff0b907abd87cac98f9d758baed260596)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/form-control@1.3.0
  - @chakra-ui/react-utils@1.1.0

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/form-control@1.2.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/form-control@1.2.2

## 1.1.2

### Patch Changes

- [`01231ed49`](https://github.com/chakra-ui/chakra-ui/commit/01231ed4919521fbe911cb1b035f4beadb340fa5)
  [#3298](https://github.com/chakra-ui/chakra-ui/pull/3298) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Provide better typings for
  `size` and `variant` for AvatarGroup, CheckboxGroup, ButtonGroup, and
  RadioGroup.

## 1.1.1

### Patch Changes

- [`3aa2abb13`](https://github.com/chakra-ui/chakra-ui/commit/3aa2abb134368acee592970995386dfd9aa5de01)
  [#3255](https://github.com/chakra-ui/chakra-ui/pull/3255) Thanks
  [@dodas](https://github.com/dodas)! - Fixed the typo in `InputProps` interface
  due to which theming types were not correct.

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/form-control@1.2.1

## 1.1.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)]:
  - @chakra-ui/form-control@1.2.0

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.1.3

## 1.0.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@1.1.2

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/form-control@1.1.1
  - @chakra-ui/utils@1.1.0

## 1.0.3

### Patch Changes

- [`b590570f`](https://github.com/chakra-ui/chakra-ui/commit/b590570f25ae2f15fd15eeaa6de37ce0c2119609)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## 🐛 Bug Fix

  - Fixed issue where removing an Input element does not reset the input padding

- Updated dependencies
  [[`b8df0bf4`](https://github.com/chakra-ui/chakra-ui/commit/b8df0bf44a10512658826e5ef8e3067bc45fbc4a),
  [`123aaf59`](https://github.com/chakra-ui/chakra-ui/commit/123aaf59a60aaae269e2a305730a650a112c0975),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5),
  [`29c0e45e`](https://github.com/chakra-ui/chakra-ui/commit/29c0e45efb9f8f37dc2e81b56c08e2f1cedeb621)]:
  - @chakra-ui/form-control@1.1.0
  - @chakra-ui/utils@1.0.2

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`ff10bcec`](https://github.com/chakra-ui/chakra-ui/commit/ff10bceca5774769766eef3a6812a22f387dd58d)]:
  - @chakra-ui/form-control@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/form-control@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/input

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

**Note:** Version bump only for package @chakra-ui/input

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/input

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/input

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/input

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/input@1.0.0-rc.0...@chakra-ui/input@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- fix function name typos
  ([8c50098](https://github.com/chakra-ui/chakra-ui/commit/8c5009801afb83428020efcfc1e93d5a92f40107))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/input@1.0.0-next.7...@chakra-ui/input@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/input@1.0.0-next.6...@chakra-ui/input@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- issue with input element ui and css-reset
  ([cc221de](https://github.com/chakra-ui/chakra-ui/commit/cc221de6878530d572c8f80032dad150d022c81c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/input@1.0.0-next.5...@chakra-ui/input@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/input@1.0.0-next.4...@chakra-ui/input@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- close button component review
  ([921b56c](https://github.com/chakra-ui/chakra-ui/commit/921b56c662a4609970c43d84bf1069d1a937eb30))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typing for input group
  ([45509fb](https://github.com/chakra-ui/chakra-ui/commit/45509fb28d81fcbd0a7c4d361e15fe4faf4c56a4))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- close button component review
  ([921b56c](https://github.com/chakra-ui/chakra-ui/commit/921b56c662a4609970c43d84bf1069d1a937eb30))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typing for input group
  ([45509fb](https://github.com/chakra-ui/chakra-ui/commit/45509fb28d81fcbd0a7c4d361e15fe4faf4c56a4))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- close button component review
  ([921b56c](https://github.com/chakra-ui/chakra-ui/commit/921b56c662a4609970c43d84bf1069d1a937eb30))
- typing for input group
  ([45509fb](https://github.com/chakra-ui/chakra-ui/commit/45509fb28d81fcbd0a7c4d361e15fe4faf4c56a4))
