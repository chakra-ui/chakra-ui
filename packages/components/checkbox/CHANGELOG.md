# Change Log

## 2.2.10

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components
- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)]:
  - @chakra-ui/form-control@2.0.17

## 2.2.9

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/form-control@2.0.16
  - @chakra-ui/visually-hidden@2.0.15
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/react-use-callback-ref@2.0.7
  - @chakra-ui/react-use-controllable-state@2.0.8
  - @chakra-ui/react-use-merge-refs@2.0.7
  - @chakra-ui/react-use-safe-layout-effect@2.0.5
  - @chakra-ui/react-use-update-effect@2.0.7
  - @chakra-ui/react-types@2.0.7
  - @chakra-ui/shared-utils@2.0.5

## 2.2.8

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.15
  - @chakra-ui/visually-hidden@2.0.14

## 2.2.7

### Patch Changes

- [`7a62c30cc`](https://github.com/chakra-ui/chakra-ui/commit/7a62c30cc4977adf7c6021fabbd16b3bd4707e9f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update `@zag-js/*`
  dependencies to latest versions for better ESM compatibility

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.14
  - @chakra-ui/visually-hidden@2.0.14

## 2.2.6

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
  - @chakra-ui/visually-hidden@2.0.14
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/react-use-callback-ref@2.0.6
  - @chakra-ui/react-use-controllable-state@2.0.7
  - @chakra-ui/react-use-merge-refs@2.0.6
  - @chakra-ui/react-use-safe-layout-effect@2.0.4
  - @chakra-ui/react-use-update-effect@2.0.6
  - @chakra-ui/react-types@2.0.6
  - @chakra-ui/shared-utils@2.0.4

## 2.2.5

### Patch Changes

- Updated dependencies
  [[`67ef76e32`](https://github.com/chakra-ui/chakra-ui/commit/67ef76e32369f7376ccd9242865f758157544b48)]:
  - @chakra-ui/react-types@2.0.5
  - @chakra-ui/form-control@2.0.13
  - @chakra-ui/visually-hidden@2.0.13

## 2.2.4

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
  - @chakra-ui/visually-hidden@2.0.13
  - @chakra-ui/react-context@2.0.5
  - @chakra-ui/react-use-callback-ref@2.0.5
  - @chakra-ui/react-use-controllable-state@2.0.6
  - @chakra-ui/react-use-merge-refs@2.0.5
  - @chakra-ui/react-use-safe-layout-effect@2.0.3
  - @chakra-ui/react-use-update-effect@2.0.5
  - @chakra-ui/react-types@2.0.4

## 2.2.3

### Patch Changes

- [#6929](https://github.com/chakra-ui/chakra-ui/pull/6929)
  [`1377b7280`](https://github.com/chakra-ui/chakra-ui/commit/1377b7280e398aadf70b54c7846a36136c7bd772)
  Thanks [@yukukotani](https://github.com/yukukotani)! - Replaced
  `framer-motion` with css animation

- Updated dependencies
  [[`132a98958`](https://github.com/chakra-ui/chakra-ui/commit/132a98958be64e46619b1e280ca6405d0a833cb0)]:
  - @chakra-ui/visually-hidden@2.0.12
  - @chakra-ui/form-control@2.0.11

## 2.2.2

### Patch Changes

- [#6784](https://github.com/chakra-ui/chakra-ui/pull/6784)
  [`91698604c`](https://github.com/chakra-ui/chakra-ui/commit/91698604c78a360b90a946c2f2072c514c98ebc5)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Allow checkbox
  control and root's style to be overriden from theme

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.11
  - @chakra-ui/visually-hidden@2.0.11

## 2.2.1

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/form-control@2.0.11
  - @chakra-ui/visually-hidden@2.0.11
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/react-use-callback-ref@2.0.4
  - @chakra-ui/react-use-controllable-state@2.0.5
  - @chakra-ui/react-use-merge-refs@2.0.4
  - @chakra-ui/react-use-safe-layout-effect@2.0.2
  - @chakra-ui/react-use-update-effect@2.0.4

## 2.2.0

### Minor Changes

- [#6679](https://github.com/chakra-ui/chakra-ui/pull/6679)
  [`1b89467f6`](https://github.com/chakra-ui/chakra-ui/commit/1b89467f6a1dae072e16884431d898497fa2e571)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Allow control of
  `framer-motion` elements via the `motionProps` prop.

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
  [[`a4df8b70c`](https://github.com/chakra-ui/chakra-ui/commit/a4df8b70c9ade7c331ba6b8d1b422e74b5b8e8c1),
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/react-use-controllable-state@2.0.4
  - @chakra-ui/form-control@2.0.10
  - @chakra-ui/visually-hidden@2.0.10

## 2.1.8

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
  - @chakra-ui/react-use-callback-ref@2.0.3
  - @chakra-ui/react-use-controllable-state@2.0.3
  - @chakra-ui/react-use-merge-refs@2.0.3
  - @chakra-ui/react-use-safe-layout-effect@2.0.1
  - @chakra-ui/react-use-update-effect@2.0.3
  - @chakra-ui/form-control@2.0.9
  - @chakra-ui/visually-hidden@2.0.9
  - @chakra-ui/react-types@2.0.3

## 2.1.7

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.8
  - @chakra-ui/hooks@2.0.8
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/utils@2.0.8
  - @chakra-ui/visually-hidden@2.0.8

## 2.1.6

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/hooks@2.0.7
  - @chakra-ui/form-control@2.0.7
  - @chakra-ui/react-utils@2.0.4
  - @chakra-ui/visually-hidden@2.0.7

## 2.1.5

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/form-control@2.0.6
  - @chakra-ui/hooks@2.0.6
  - @chakra-ui/react-utils@2.0.3
  - @chakra-ui/utils@2.0.6
  - @chakra-ui/visually-hidden@2.0.6

## 2.1.4

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/form-control@2.0.5
  - @chakra-ui/hooks@2.0.5
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/utils@2.0.5
  - @chakra-ui/visually-hidden@2.0.5

## 2.1.3

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/form-control@2.0.4
  - @chakra-ui/hooks@2.0.4
  - @chakra-ui/visually-hidden@2.0.4

## 2.1.2

### Patch Changes

- Updated dependencies
  [[`8bfeefbb5`](https://github.com/chakra-ui/chakra-ui/commit/8bfeefbb562fc5ada4757309db6b951c421342ad),
  [`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/form-control@2.0.3
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/hooks@2.0.3
  - @chakra-ui/visually-hidden@2.0.3

## 2.1.1

### Patch Changes

- [#6194](https://github.com/chakra-ui/chakra-ui/pull/6194)
  [`dd621e46d`](https://github.com/chakra-ui/chakra-ui/commit/dd621e46d73b4b267a8cf2d31879a36e85f701d1)
  Thanks [@anubra266](https://github.com/anubra266)! - fixed issue where switch
  cannot be toggled when text is selectedd

## 2.1.0

### Minor Changes

- [#6153](https://github.com/chakra-ui/chakra-ui/pull/6153)
  [`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Remove annoying
  focus outline by leveraging focus visible

* [#6153](https://github.com/chakra-ui/chakra-ui/pull/6153)
  [`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Track focus visible
  and add `data-focus-visible` to `getCheckboxProps`

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1),
  [`7de782f04`](https://github.com/chakra-ui/chakra-ui/commit/7de782f0485656a6d10099339da509084cb3ee88)]:
  - @chakra-ui/form-control@2.0.2
  - @chakra-ui/hooks@2.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/utils@2.0.2
  - @chakra-ui/visually-hidden@2.0.2

## 2.0.2

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/form-control@2.0.1
  - @chakra-ui/hooks@2.0.1
  - @chakra-ui/visually-hidden@2.0.1

## 2.0.1

### Patch Changes

- [`7eaf538a4`](https://github.com/chakra-ui/chakra-ui/commit/7eaf538a4db9e168408e114f80a2c2898cf4fd47)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  checkbox doesn't reset the the form reset event is triggered

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
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632),
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/form-control@2.0.0
  - @chakra-ui/hooks@2.0.0
  - @chakra-ui/react-utils@2.0.0
  - @chakra-ui/utils@2.0.0
  - @chakra-ui/visually-hidden@2.0.0

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
  - @chakra-ui/hooks@2.0.0-next.3
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2
  - @chakra-ui/visually-hidden@2.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- Updated dependencies
  [[`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/hooks@2.0.0-next.2
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
  - @chakra-ui/hooks@2.0.0-next.1
  - @chakra-ui/react-utils@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1
  - @chakra-ui/visually-hidden@2.0.0-next.1

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
  - @chakra-ui/form-control@2.0.0-next.0
  - @chakra-ui/hooks@2.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0
  - @chakra-ui/visually-hidden@2.0.0-next.0

## 1.7.1

### Patch Changes

- [#5827](https://github.com/chakra-ui/chakra-ui/pull/5827)
  [`c220af152`](https://github.com/chakra-ui/chakra-ui/commit/c220af15274377575d03900f0baaa1c0a1400778)
  Thanks [@Jason-Hendry](https://github.com/Jason-Hendry)! - Fix issue where
  Create React App template fails with newer versions of `framer-motion`

* [#5790](https://github.com/chakra-ui/chakra-ui/pull/5790)
  [`b19c89270`](https://github.com/chakra-ui/chakra-ui/commit/b19c892702f029c078f8d5bfaf0f89b573c6cd90)
  Thanks [@ugogo](https://github.com/ugogo)! - Fix radio cursor when disabled

* Updated dependencies
  [[`56b7e198b`](https://github.com/chakra-ui/chakra-ui/commit/56b7e198bf1b0b507da0976aef80f600ae7efeb0),
  [`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c)]:
  - @chakra-ui/form-control@1.6.0
  - @chakra-ui/hooks@1.9.1

## 1.7.0

### Minor Changes

- [#5736](https://github.com/chakra-ui/chakra-ui/pull/5736)
  [`a7be72918`](https://github.com/chakra-ui/chakra-ui/commit/a7be72918f1e74ce20eb31544433e4321caf5c78)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  passing `inputProps` to underlying input element

### Patch Changes

- Updated dependencies
  [[`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964)]:
  - @chakra-ui/hooks@1.9.0
  - @chakra-ui/form-control@1.5.10

## 1.6.8

### Patch Changes

- Updated dependencies
  [[`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)]:
  - @chakra-ui/hooks@1.8.5
  - @chakra-ui/form-control@1.5.9

## 1.6.7

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/form-control@1.5.8
  - @chakra-ui/hooks@1.8.4
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/utils@1.10.4
  - @chakra-ui/visually-hidden@1.1.6

## 1.6.6

### Patch Changes

- [#5564](https://github.com/chakra-ui/chakra-ui/pull/5564)
  [`44c9fab5b`](https://github.com/chakra-ui/chakra-ui/commit/44c9fab5b0e34484c9afb858a553d4a2aa30209d)
  Thanks [@santialbo](https://github.com/santialbo)! - Add `FormControl` support
  for `useCheckbox`

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/form-control@1.5.7
  - @chakra-ui/hooks@1.8.3
  - @chakra-ui/visually-hidden@1.1.5

## 1.6.5

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/hooks@1.8.2
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/utils@1.10.2
  - @chakra-ui/visually-hidden@1.1.4

## 1.6.4

### Patch Changes

- [#5499](https://github.com/chakra-ui/chakra-ui/pull/5499)
  [`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - allow framer
  motion v6 as peer dependency

* [#5502](https://github.com/chakra-ui/chakra-ui/pull/5502)
  [`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)
  Thanks [@nikolovlazar](https://github.com/nikolovlazar)! - Fixing a bug that
  happens when using the useCheckboxGroup hook with number values instead of
  string values
* Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/hooks@1.8.1
  - @chakra-ui/visually-hidden@1.1.3

## 1.6.3

### Patch Changes

- [#5375](https://github.com/chakra-ui/chakra-ui/pull/5375)
  [`c9c54aee1`](https://github.com/chakra-ui/chakra-ui/commit/c9c54aee1e45c2ca96f7c032400ffeb06c57e341)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - Added a
  `CheckboxState` type to the `useCheckbox` hook to improve usability and
  documentation
- Updated dependencies
  [[`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/visually-hidden@1.1.2

## 1.6.2

### Patch Changes

- [#4918](https://github.com/chakra-ui/chakra-ui/pull/4918)
  [`756682037`](https://github.com/chakra-ui/chakra-ui/commit/756682037a6bd291f75d96b25d37e8eebcc71dbb)
  Thanks [@linxianxi](https://github.com/linxianxi)! - Fix issue where focus
  styles persists when `isDisabled` is set to `true` and checkbox has focus.
- Updated dependencies
  [[`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/hooks@1.7.2

## 1.6.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/hooks@1.7.1
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/utils@1.9.1
  - @chakra-ui/visually-hidden@1.1.1

## 1.6.0

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
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0
  - @chakra-ui/visually-hidden@1.1.0

## 1.5.10

### Patch Changes

- [`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)
  [#4965](https://github.com/chakra-ui/chakra-ui/pull/4965) Thanks
  [@takethefake](https://github.com/takethefake)! - Allow usage of
  `framer-motion` 5.x in `peerDependency`

## 1.5.9

### Patch Changes

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/visually-hidden@1.0.16

## 1.5.8

### Patch Changes

- [`00ef98a33`](https://github.com/chakra-ui/chakra-ui/commit/00ef98a335a96b4db10bed9e2620f0b839203096)
  [#4642](https://github.com/chakra-ui/chakra-ui/pull/4642) Thanks
  [@takethefake](https://github.com/takethefake)! - Fix issue where `tabIndex`
  property isn't passed to the underlying input element

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/visually-hidden@1.0.15

## 1.5.7

### Patch Changes

- [`726105acb`](https://github.com/chakra-ui/chakra-ui/commit/726105acb38f34290fff53d2dc520b5fbd299061)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add state `data-*`
  attributes to the checkbox `container` to allow user style the `_checked`,
  `_invalid` and `_disabled` states

## 1.5.6

### Patch Changes

- Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0

## 1.5.5

### Patch Changes

- [`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0)
  [#4437](https://github.com/chakra-ui/chakra-ui/pull/4437) Thanks
  [@Toxiapo](https://github.com/Toxiapo)! - Remove code that was added as a
  workaround for pre-releases of React concurrent mode.

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/hooks@1.5.5
  - @chakra-ui/visually-hidden@1.0.14

## 1.5.4

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/hooks@1.5.4
  - @chakra-ui/visually-hidden@1.0.13

## 1.5.3

### Patch Changes

- [`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad)
  [#4057](https://github.com/chakra-ui/chakra-ui/pull/4057) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - updated @see doc links to point to
  shorthand see PR #4046 comment

* [`afb9b3cfa`](https://github.com/chakra-ui/chakra-ui/commit/afb9b3cfa87076ed8897b7edd4a9d9f1e1701721)
  [#4103](https://github.com/chakra-ui/chakra-ui/pull/4103) Thanks
  [@with-heart](https://github.com/with-heart)! - Update transitions to use
  theme tokens and remove outline transitions

* Updated dependencies
  [[`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)]:
  - @chakra-ui/hooks@1.5.3

## 1.5.2

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/hooks@1.5.2
  - @chakra-ui/visually-hidden@1.0.12

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/hooks@1.5.1
  - @chakra-ui/visually-hidden@1.0.11

## 1.5.0

### Minor Changes

- [`fbc125258`](https://github.com/chakra-ui/chakra-ui/commit/fbc12525822190e1ea5eced874ef3fdfafdabfb3)
  [#3778](https://github.com/chakra-ui/chakra-ui/pull/3778) Thanks
  [@kristian240](https://github.com/kristian240)! - Add `isDisabled` prop to
  `CheckboxGroup`

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/hooks@1.5.0
  - @chakra-ui/visually-hidden@1.0.10

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/hooks@1.4.0
  - @chakra-ui/visually-hidden@1.0.9

## 1.4.1

### Patch Changes

- [`38706f731`](https://github.com/chakra-ui/chakra-ui/commit/38706f731372783bb05f01b5755a1753fab16f9e)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Replace
  `withFlushSync` with microtask callback to prevent ReactDOM warning.

* [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update import of
  shared utils from `react-utils` to `utils`

* Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/hooks@1.3.1
  - @chakra-ui/visually-hidden@1.0.8

## 1.4.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

* [`69ae9f68e`](https://github.com/chakra-ui/chakra-ui/commit/69ae9f68e6f56e9b21660590b7a307f16b5695e8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add
  `getRootProps` to usecheckbox hook to manage props passed to checkbox
  container.

  - Forward `onFocus` and `onBlur` props to the input element for better
    integration with form libraries.

  - Ensure the checkbox works when the root element is not `label`. This helps
    to fix the current accessibility issues with the `Switch` component.

### Patch Changes

- Updated dependencies
  [[`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/visually-hidden@1.0.7

## 1.3.0

### Minor Changes

- [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)
  [#3623](https://github.com/chakra-ui/chakra-ui/pull/3623) Thanks
  [@with-heart](https://github.com/with-heart)! - Added support for
  `framer-motion` v4

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/visually-hidden@1.0.6

## 1.2.4

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/visually-hidden@1.0.5

## 1.2.3

### Patch Changes

- [`b99b8674f`](https://github.com/chakra-ui/chakra-ui/commit/b99b8674f1c1874d5805cb3ad2e893c0d852374f)
  [#3364](https://github.com/chakra-ui/chakra-ui/pull/3364) Thanks
  [@grahhham](https://github.com/grahhham)! - - Improve the semantic HTML
  structure of checkbox. `label` is a phrasing content element and should not
  contain block element `div`.
  - Replaced `div` with `span` which is an inline element.

## 1.2.2

### Patch Changes

- [`01231ed49`](https://github.com/chakra-ui/chakra-ui/commit/01231ed4919521fbe911cb1b035f4beadb340fa5)
  [#3298](https://github.com/chakra-ui/chakra-ui/pull/3298) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Provide better typings for
  `size` and `variant` for AvatarGroup, CheckboxGroup, ButtonGroup, and
  RadioGroup.

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/visually-hidden@1.0.4
  - @chakra-ui/hooks@1.1.4

## 1.2.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- [`4e193f721`](https://github.com/chakra-ui/chakra-ui/commit/4e193f721fd51fd7e8d5f0fdc399a2784276a158)
  [#3180](https://github.com/chakra-ui/chakra-ui/pull/3180) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved an issue where
  `Checkbox` used inside `CheckboxGroup` would call the group's `onChange`
  handler twice
- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2

## 1.1.2

### Patch Changes

- [`26f28512`](https://github.com/chakra-ui/chakra-ui/commit/26f285129f6c739b24bf28ede71a5358ba4dbf9f)
  [#3080](https://github.com/chakra-ui/chakra-ui/pull/3080) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update styles to use css
  logical style props

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/visually-hidden@1.0.3

## 1.1.0

### Minor Changes

- [`1e6db1e0`](https://github.com/chakra-ui/chakra-ui/commit/1e6db1e068c6bc0a4c6c6893d1716d284dcbb8f8)
  [#2876](https://github.com/chakra-ui/chakra-ui/pull/2876) Thanks
  [@with-heart](https://github.com/with-heart)! - Deprecated the
  `defaultIsChecked` prop on `Radio` and `Checkbox` in favor of
  `defaultChecked`, which mirrors the default React prop name for this
  functionality. `defaultIsChecked` will continue to work, but may be removed in
  future versions.

## 1.0.2

### Patch Changes

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/visually-hidden@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/visually-hidden@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/checkbox

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

**Note:** Version bump only for package @chakra-ui/checkbox

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/checkbox

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/checkbox

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-rc.0...@chakra-ui/checkbox@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.7...@chakra-ui/checkbox@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.6...@chakra-ui/checkbox@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.5...@chakra-ui/checkbox@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.4...@chakra-ui/checkbox@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- tests and typing for checkbox
  ([153155f](https://github.com/chakra-ui/chakra-ui/commit/153155f78db9fe2a338282f7cc58fbb4e22d59c1))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typos
  ([c75c1da](https://github.com/chakra-ui/chakra-ui/commit/c75c1da311e88cbc6c8950bf3db362a68bbf85b0))
- working on checkbox group component
  ([66ac9ce](https://github.com/chakra-ui/chakra-ui/commit/66ac9ce11f089742d5bb7c128bf097d811a2904d))
- **checkbox:** add default empty props to useCheckbox
  ([0ba0f43](https://github.com/chakra-ui/chakra-ui/commit/0ba0f43899646d7d2dbe495098a48a913da80871))
- **checkbox:** remove Checkbox.base
  ([3c38699](https://github.com/chakra-ui/chakra-ui/commit/3c386994d8e018c6226ab3434184552c81b5b189))

### Features

- update stories for radio component
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- tests and typing for checkbox
  ([153155f](https://github.com/chakra-ui/chakra-ui/commit/153155f78db9fe2a338282f7cc58fbb4e22d59c1))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typos
  ([c75c1da](https://github.com/chakra-ui/chakra-ui/commit/c75c1da311e88cbc6c8950bf3db362a68bbf85b0))
- working on checkbox group component
  ([66ac9ce](https://github.com/chakra-ui/chakra-ui/commit/66ac9ce11f089742d5bb7c128bf097d811a2904d))
- **checkbox:** add default empty props to useCheckbox
  ([0ba0f43](https://github.com/chakra-ui/chakra-ui/commit/0ba0f43899646d7d2dbe495098a48a913da80871))
- **checkbox:** remove Checkbox.base
  ([3c38699](https://github.com/chakra-ui/chakra-ui/commit/3c386994d8e018c6226ab3434184552c81b5b189))

### Features

- update stories for radio component
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- tests and typing for checkbox
  ([153155f](https://github.com/chakra-ui/chakra-ui/commit/153155f78db9fe2a338282f7cc58fbb4e22d59c1))
- typos
  ([c75c1da](https://github.com/chakra-ui/chakra-ui/commit/c75c1da311e88cbc6c8950bf3db362a68bbf85b0))
- working on checkbox group component
  ([66ac9ce](https://github.com/chakra-ui/chakra-ui/commit/66ac9ce11f089742d5bb7c128bf097d811a2904d))
- **checkbox:** add default empty props to useCheckbox
  ([0ba0f43](https://github.com/chakra-ui/chakra-ui/commit/0ba0f43899646d7d2dbe495098a48a913da80871))
- **checkbox:** remove Checkbox.base
  ([3c38699](https://github.com/chakra-ui/chakra-ui/commit/3c386994d8e018c6226ab3434184552c81b5b189))

### Features

- update stories for radio component
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))
