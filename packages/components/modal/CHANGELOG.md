# Change Log

## 2.2.9

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components
- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb),
  [`d5a939cc6`](https://github.com/chakra-ui/chakra-ui/commit/d5a939cc6d3f14cd4ebff16b2c11a441dc879b8f)]:
  - @chakra-ui/close-button@2.0.17
  - @chakra-ui/focus-lock@2.0.16
  - @chakra-ui/portal@2.0.15
  - @chakra-ui/transition@2.0.15

## 2.2.8

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- [`ce86e0b8c`](https://github.com/chakra-ui/chakra-ui/commit/ce86e0b8c91f811b2fbfbba400f7c5b0471a0758)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump
  `react-remove-scroll`, `react-focus-lock` and `aria-hidden` dependencies

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0),
  [`ce86e0b8c`](https://github.com/chakra-ui/chakra-ui/commit/ce86e0b8c91f811b2fbfbba400f7c5b0471a0758)]:
  - @chakra-ui/close-button@2.0.16
  - @chakra-ui/focus-lock@2.0.15
  - @chakra-ui/portal@2.0.14
  - @chakra-ui/transition@2.0.14
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/react-use-merge-refs@2.0.7
  - @chakra-ui/react-types@2.0.7
  - @chakra-ui/shared-utils@2.0.5

## 2.2.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/close-button@2.0.15

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
  - @chakra-ui/close-button@2.0.14
  - @chakra-ui/focus-lock@2.0.14
  - @chakra-ui/portal@2.0.13
  - @chakra-ui/transition@2.0.13
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/react-use-merge-refs@2.0.6
  - @chakra-ui/react-types@2.0.6
  - @chakra-ui/shared-utils@2.0.4

## 2.2.5

### Patch Changes

- [#7068](https://github.com/chakra-ui/chakra-ui/pull/7068)
  [`4dbfc1a11`](https://github.com/chakra-ui/chakra-ui/commit/4dbfc1a115a2fce51b29f3fd3baa3a823b3e359d)
  Thanks [@cereallarceny](https://github.com/cereallarceny)! - Removed
  defaultProps from components to support React 18.3.0

* [#7054](https://github.com/chakra-ui/chakra-ui/pull/7054)
  [`1025a88eb`](https://github.com/chakra-ui/chakra-ui/commit/1025a88eb428adea2797c57a756ea513a6d50762)
  Thanks [@lexanth](https://github.com/lexanth)! - Update modal a11y unit tests
  to correctly cover the portal

* Updated dependencies
  [[`4dbfc1a11`](https://github.com/chakra-ui/chakra-ui/commit/4dbfc1a115a2fce51b29f3fd3baa3a823b3e359d)]:
  - @chakra-ui/portal@2.0.12

## 2.2.4

### Patch Changes

- Updated dependencies
  [[`67ef76e32`](https://github.com/chakra-ui/chakra-ui/commit/67ef76e32369f7376ccd9242865f758157544b48)]:
  - @chakra-ui/react-types@2.0.5
  - @chakra-ui/portal@2.0.11
  - @chakra-ui/close-button@2.0.13

## 2.2.3

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/close-button@2.0.12
  - @chakra-ui/focus-lock@2.0.13
  - @chakra-ui/portal@2.0.11
  - @chakra-ui/transition@2.0.12
  - @chakra-ui/react-context@2.0.5
  - @chakra-ui/react-use-merge-refs@2.0.5
  - @chakra-ui/react-types@2.0.4

## 2.2.2

### Patch Changes

- [#6815](https://github.com/chakra-ui/chakra-ui/pull/6815)
  [`8c8420e79`](https://github.com/chakra-ui/chakra-ui/commit/8c8420e795bf7d0fb7c1f3fb725881b122918a5d)
  Thanks [@jeferson-sb](https://github.com/jeferson-sb)! - Fix issue where
  `useInert` doesn't work consistently between the Drawer and Modal

- Updated dependencies
  [[`182080e4b`](https://github.com/chakra-ui/chakra-ui/commit/182080e4b2148cfc0a0699d02012ffbfc1f4274c)]:
  - @chakra-ui/transition@2.0.11
  - @chakra-ui/close-button@2.0.11

## 2.2.1

### Patch Changes

- [#6754](https://github.com/chakra-ui/chakra-ui/pull/6754)
  [`ede395f9f`](https://github.com/chakra-ui/chakra-ui/commit/ede395f9f3e3a8b74e87fac1f350ead201a4d8cc)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Add `containerProps` to
  drawer component

* [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

* Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/close-button@2.0.11
  - @chakra-ui/focus-lock@2.0.12
  - @chakra-ui/portal@2.0.10
  - @chakra-ui/transition@2.0.10
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/react-use-merge-refs@2.0.4

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
  [[`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/close-button@2.0.10
  - @chakra-ui/focus-lock@2.0.11
  - @chakra-ui/portal@2.0.9
  - @chakra-ui/transition@2.0.9

## 2.1.7

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
  - @chakra-ui/react-use-merge-refs@2.0.3
  - @chakra-ui/close-button@2.0.9
  - @chakra-ui/focus-lock@2.0.10
  - @chakra-ui/portal@2.0.9
  - @chakra-ui/transition@2.0.9
  - @chakra-ui/react-types@2.0.3

## 2.1.6

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/close-button@2.0.8
  - @chakra-ui/focus-lock@2.0.9
  - @chakra-ui/hooks@2.0.8
  - @chakra-ui/portal@2.0.8
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/transition@2.0.8
  - @chakra-ui/utils@2.0.8

## 2.1.5

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/hooks@2.0.7
  - @chakra-ui/close-button@2.0.7
  - @chakra-ui/focus-lock@2.0.8
  - @chakra-ui/portal@2.0.7
  - @chakra-ui/react-utils@2.0.4
  - @chakra-ui/transition@2.0.7

## 2.1.4

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/close-button@2.0.6
  - @chakra-ui/focus-lock@2.0.7
  - @chakra-ui/hooks@2.0.6
  - @chakra-ui/portal@2.0.6
  - @chakra-ui/react-utils@2.0.3
  - @chakra-ui/transition@2.0.6
  - @chakra-ui/utils@2.0.6

## 2.1.3

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/close-button@2.0.5
  - @chakra-ui/focus-lock@2.0.6
  - @chakra-ui/hooks@2.0.5
  - @chakra-ui/portal@2.0.5
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/transition@2.0.5
  - @chakra-ui/utils@2.0.5

## 2.1.2

### Patch Changes

- Updated dependencies
  [[`46b495455`](https://github.com/chakra-ui/chakra-ui/commit/46b495455fc416b166db18f5098ede7752b2e3ba),
  [`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/portal@2.0.4
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/close-button@2.0.4
  - @chakra-ui/focus-lock@2.0.5
  - @chakra-ui/hooks@2.0.4
  - @chakra-ui/transition@2.0.4

## 2.1.1

### Patch Changes

- [#6267](https://github.com/chakra-ui/chakra-ui/pull/6267)
  [`47478edbe`](https://github.com/chakra-ui/chakra-ui/commit/47478edbefe1a4b74421f5a64ea9953d2d867ff3)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Add `displayName` to
  components using `forwardRef`

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`b6aa32a4b`](https://github.com/chakra-ui/chakra-ui/commit/b6aa32a4b4af82e42d98a9afa427174ab4cb4ab7),
  [`3d8e095df`](https://github.com/chakra-ui/chakra-ui/commit/3d8e095dfc696b3d903455319231e77d1c21d875),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/transition@2.0.3
  - @chakra-ui/portal@2.0.3
  - @chakra-ui/close-button@2.0.3
  - @chakra-ui/focus-lock@2.0.4
  - @chakra-ui/hooks@2.0.3

## 2.1.0

### Minor Changes

- [#6142](https://github.com/chakra-ui/chakra-ui/pull/6142)
  [`1015ec2b1`](https://github.com/chakra-ui/chakra-ui/commit/1015ec2b1b2608e78b6b33434e8a641dd05efcbe)
  Thanks [@selbekk](https://github.com/selbekk)! - Export `useDrawerContext`
  hook

## 2.0.3

### Patch Changes

- [#6155](https://github.com/chakra-ui/chakra-ui/pull/6155)
  [`b6083bb16`](https://github.com/chakra-ui/chakra-ui/commit/b6083bb16bf1f39332302d71a59bc59f886ea4eb)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Fix shifting screen when
  opening modal

* [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- [#6137](https://github.com/chakra-ui/chakra-ui/pull/6137)
  [`7de782f04`](https://github.com/chakra-ui/chakra-ui/commit/7de782f0485656a6d10099339da509084cb3ee88)
  Thanks [@Patrick-Ullrich](https://github.com/Patrick-Ullrich)! - Improve error
  messaging around style provider factory by creating a custom
  `createStylesContext` function.
- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/close-button@2.0.2
  - @chakra-ui/focus-lock@2.0.3
  - @chakra-ui/hooks@2.0.2
  - @chakra-ui/portal@2.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/transition@2.0.2
  - @chakra-ui/utils@2.0.2

## 2.0.2

### Patch Changes

- [#6079](https://github.com/chakra-ui/chakra-ui/pull/6079)
  [`703ff594f`](https://github.com/chakra-ui/chakra-ui/commit/703ff594f826207a7b3d37663caaad365212b23e)
  Thanks [@chr-ge](https://github.com/chr-ge)! - Improve TS doc comments to
  include the `@default`value for prop types

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c),
  [`703ff594f`](https://github.com/chakra-ui/chakra-ui/commit/703ff594f826207a7b3d37663caaad365212b23e)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/portal@2.0.1
  - @chakra-ui/transition@2.0.1
  - @chakra-ui/close-button@2.0.1
  - @chakra-ui/focus-lock@2.0.2
  - @chakra-ui/hooks@2.0.1

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`754649da8`](https://github.com/chakra-ui/chakra-ui/commit/754649da8696fdd98f9087d0312eba780dcc070c)]:
  - @chakra-ui/focus-lock@2.0.1

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

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- [#5963](https://github.com/chakra-ui/chakra-ui/pull/5963)
  [`520221efe`](https://github.com/chakra-ui/chakra-ui/commit/520221efe89e6bfce6f5d009790fe4f823918b38)
  Thanks [@RunDevelopment](https://github.com/RunDevelopment)! - Make
  `leastDestructiveRef` non-nullable

* [#5998](https://github.com/chakra-ui/chakra-ui/pull/5998)
  [`1d5d7b712`](https://github.com/chakra-ui/chakra-ui/commit/1d5d7b712d5643c7abf58ab560278090c0f839c1)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Upgrade dependency
  react-remove-scroll

* Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632),
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/close-button@2.0.0
  - @chakra-ui/focus-lock@2.0.0
  - @chakra-ui/hooks@2.0.0
  - @chakra-ui/portal@2.0.0
  - @chakra-ui/react-utils@2.0.0
  - @chakra-ui/transition@2.0.0
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
  - @chakra-ui/close-button@2.0.0-next.2
  - @chakra-ui/focus-lock@2.0.0-next.2
  - @chakra-ui/hooks@2.0.0-next.3
  - @chakra-ui/portal@2.0.0-next.3
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/transition@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- [#5963](https://github.com/chakra-ui/chakra-ui/pull/5963)
  [`520221efe`](https://github.com/chakra-ui/chakra-ui/commit/520221efe89e6bfce6f5d009790fe4f823918b38)
  Thanks [@RunDevelopment](https://github.com/RunDevelopment)! - Make
  `leastDestructiveRef` non-nullable

- Updated dependencies
  [[`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/hooks@2.0.0-next.2
  - @chakra-ui/portal@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/close-button@2.0.0-next.1
  - @chakra-ui/focus-lock@2.0.0-next.1
  - @chakra-ui/hooks@2.0.0-next.1
  - @chakra-ui/portal@2.0.0-next.1
  - @chakra-ui/react-utils@2.0.0-next.1
  - @chakra-ui/transition@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632)]:
  - @chakra-ui/close-button@2.0.0-next.0
  - @chakra-ui/focus-lock@2.0.0-next.0
  - @chakra-ui/hooks@2.0.0-next.0
  - @chakra-ui/portal@2.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/transition@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.11.1

### Patch Changes

- Updated dependencies
  [[`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c),
  [`aaadcd0ed`](https://github.com/chakra-ui/chakra-ui/commit/aaadcd0ed9388417b0b647d75055ede0613d3495)]:
  - @chakra-ui/hooks@1.9.1
  - @chakra-ui/transition@1.4.8
  - @chakra-ui/portal@1.3.10

## 1.11.0

### Minor Changes

- [#5402](https://github.com/chakra-ui/chakra-ui/pull/5402)
  [`232853068`](https://github.com/chakra-ui/chakra-ui/commit/232853068ab9ec95cd123ccf378b044ad7861ba1)
  Thanks [@ShumRain](https://github.com/ShumRain)! - Add `onCloseComplete` prop
  to Modal which is called when all DOM nodes of the `Modal` are removed.

### Patch Changes

- Updated dependencies
  [[`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964)]:
  - @chakra-ui/hooks@1.9.0
  - @chakra-ui/portal@1.3.9

## 1.10.10

### Patch Changes

- Updated dependencies
  [[`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)]:
  - @chakra-ui/hooks@1.8.5
  - @chakra-ui/portal@1.3.8

## 1.10.9

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/close-button@1.2.7
  - @chakra-ui/focus-lock@1.2.6
  - @chakra-ui/hooks@1.8.4
  - @chakra-ui/portal@1.3.7
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/transition@1.4.7
  - @chakra-ui/utils@1.10.4

## 1.10.8

### Patch Changes

- [#5422](https://github.com/chakra-ui/chakra-ui/pull/5422)
  [`5aa79f81c`](https://github.com/chakra-ui/chakra-ui/commit/5aa79f81c71b1ac28d1ee18b4cc28c908b68cbfb)
  Thanks [@dqn](https://github.com/dqn)! - Fix `useAriaHidden` hook dependency
  to make it work as expected

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/close-button@1.2.6
  - @chakra-ui/focus-lock@1.2.5
  - @chakra-ui/hooks@1.8.3
  - @chakra-ui/portal@1.3.6
  - @chakra-ui/transition@1.4.6

## 1.10.7

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/close-button@1.2.5
  - @chakra-ui/focus-lock@1.2.4
  - @chakra-ui/hooks@1.8.2
  - @chakra-ui/portal@1.3.5
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/transition@1.4.5
  - @chakra-ui/utils@1.10.2

## 1.10.6

### Patch Changes

- [#5499](https://github.com/chakra-ui/chakra-ui/pull/5499)
  [`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - allow framer
  motion v6 as peer dependency

- Updated dependencies
  [[`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10),
  [`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/transition@1.4.4
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/close-button@1.2.4
  - @chakra-ui/focus-lock@1.2.3
  - @chakra-ui/hooks@1.8.1
  - @chakra-ui/portal@1.3.4

## 1.10.5

### Patch Changes

- Updated dependencies
  [[`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/close-button@1.2.3
  - @chakra-ui/portal@1.3.3
  - @chakra-ui/focus-lock@1.2.2
  - @chakra-ui/transition@1.4.3

## 1.10.4

### Patch Changes

- [#5341](https://github.com/chakra-ui/chakra-ui/pull/5341)
  [`11fa4e8bf`](https://github.com/chakra-ui/chakra-ui/commit/11fa4e8bfdce0a964c3fe7ccbc340a4601b4c832)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Update
  `DrawerProps` type to include `ThemingProps` for the Drawer component

## 1.10.3

### Patch Changes

- Updated dependencies
  [[`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/hooks@1.7.2
  - @chakra-ui/portal@1.3.2

## 1.10.2

### Patch Changes

- Updated dependencies
  [[`39846457e`](https://github.com/chakra-ui/chakra-ui/commit/39846457e241e6af3d18c77cdc0ba02857fe7462)]:
  - @chakra-ui/transition@1.4.2
  - @chakra-ui/close-button@1.2.2

## 1.10.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/close-button@1.2.1
  - @chakra-ui/focus-lock@1.2.1
  - @chakra-ui/hooks@1.7.1
  - @chakra-ui/portal@1.3.1
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/transition@1.4.1
  - @chakra-ui/utils@1.9.1

## 1.10.0

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

- [#4995](https://github.com/chakra-ui/chakra-ui/pull/4995)
  [`802e0a4d2`](https://github.com/chakra-ui/chakra-ui/commit/802e0a4d2762eebd39bb337442609fc2ff75841e)
  Thanks [@jesstelford](https://github.com/jesstelford)! -
  `react-focus-lock@2.5.1` includes a dependency update of `focus-lock` from
  `0.8.1` -> `0.9.1`. The change in `focus-lock` includes a fix for performance
  in JSDOM: https://github.com/theKashey/focus-lock/pull/24

  JSDOM is used when testing react components in jest and other unit testing
  frameworks. In particular, when used with `@testing-library/react` for
  simulating real user input.

  Locally tested on an Apple M1 Air using a moderately complex `<Modal>`
  component (which contained inputs, `react-hook-form` usage, etc). Before this
  change: 20,149ms After this change: 2,347ms

  Approx. 10x performance increase.

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/close-button@1.2.0
  - @chakra-ui/focus-lock@1.2.0
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/portal@1.3.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/transition@1.4.0
  - @chakra-ui/utils@1.9.0

## 1.9.4

### Patch Changes

- [`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)
  [#4965](https://github.com/chakra-ui/chakra-ui/pull/4965) Thanks
  [@takethefake](https://github.com/takethefake)! - Allow usage of
  `framer-motion` 5.x in `peerDependency`

- Updated dependencies
  [[`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)]:
  - @chakra-ui/transition@1.3.8

## 1.9.3

### Patch Changes

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/portal@1.2.11
  - @chakra-ui/close-button@1.1.13
  - @chakra-ui/focus-lock@1.1.12
  - @chakra-ui/transition@1.3.7

## 1.9.2

### Patch Changes

- [`126bf17db`](https://github.com/chakra-ui/chakra-ui/commit/126bf17db67d6226e6d48c57ef3b69e5504eaada)
  [#4823](https://github.com/chakra-ui/chakra-ui/pull/4823) Thanks
  [@antoniel](https://github.com/antoniel)! - Fix issue where modal doesn't
  close when the escape key is pressed and `closeOnOverlayClick` is `false`

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/close-button@1.1.12
  - @chakra-ui/focus-lock@1.1.11
  - @chakra-ui/portal@1.2.10
  - @chakra-ui/transition@1.3.6

## 1.9.1

### Patch Changes

- Updated dependencies
  [[`eafb21e18`](https://github.com/chakra-ui/chakra-ui/commit/eafb21e1883cf40bfe44e143714d9a480a0cc7da)]:
  - @chakra-ui/transition@1.3.5

## 1.9.0

### Minor Changes

- [`8c61e75ec`](https://github.com/chakra-ui/chakra-ui/commit/8c61e75ec6da4ca6ce0fe413034f6aed7f685977)
  [#3837](https://github.com/chakra-ui/chakra-ui/pull/3837) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - **Drawer:** Add support for
  RTL-aware placement values. You can now pass `start` and `end` values. The
  drawer will use `left/right` placement depending on the specified
  `theme.direction` value.

### Patch Changes

- [`c1d1029bc`](https://github.com/chakra-ui/chakra-ui/commit/c1d1029bca08a9774fc3ca8d2e04a1cc5b58a43b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **Drawer**: omit
  the `motionPreset` prop type since `Drawer` only implements the `Slide`
  transition, unlike `Modal` that allows you switch its motion preset.

## 1.8.11

### Patch Changes

- Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0
  - @chakra-ui/portal@1.2.9

## 1.8.10

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/close-button@1.1.11
  - @chakra-ui/focus-lock@1.1.10
  - @chakra-ui/hooks@1.5.5
  - @chakra-ui/portal@1.2.8
  - @chakra-ui/transition@1.3.4

## 1.8.9

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/close-button@1.1.10
  - @chakra-ui/focus-lock@1.1.9
  - @chakra-ui/hooks@1.5.4
  - @chakra-ui/portal@1.2.7
  - @chakra-ui/transition@1.3.3

## 1.8.8

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
  [[`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad),
  [`e8da4c65f`](https://github.com/chakra-ui/chakra-ui/commit/e8da4c65f026f636ea26d11b7aaed63f2babf00d),
  [`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)]:
  - @chakra-ui/portal@1.2.6
  - @chakra-ui/transition@1.3.2
  - @chakra-ui/hooks@1.5.3

## 1.8.7

### Patch Changes

- [`d9f8bea60`](https://github.com/chakra-ui/chakra-ui/commit/d9f8bea6081020c1841cb0d0f094642c7ce71db6)
  [#4046](https://github.com/chakra-ui/chakra-ui/pull/4046) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - Fix link in @see doc

## 1.8.6

### Patch Changes

- Updated dependencies
  [[`c1f8d90ad`](https://github.com/chakra-ui/chakra-ui/commit/c1f8d90ad7ebd9594e9888010170cda7969f0ded)]:
  - @chakra-ui/transition@1.3.1

## 1.8.5

### Patch Changes

- [`db8adf204`](https://github.com/chakra-ui/chakra-ui/commit/db8adf20432a2e0b799c3eff9914fc8b5dfca7c6)
  [#3946](https://github.com/chakra-ui/chakra-ui/pull/3946) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix types for modal
  overlay fade config

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b199b06e3`](https://github.com/chakra-ui/chakra-ui/commit/b199b06e33924bdf98c9c13868f14172a20d0248),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/transition@1.3.0
  - @chakra-ui/hooks@1.5.2
  - @chakra-ui/close-button@1.1.9
  - @chakra-ui/focus-lock@1.1.8
  - @chakra-ui/portal@1.2.5

## 1.8.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/hooks@1.5.1
  - @chakra-ui/portal@1.2.4
  - @chakra-ui/close-button@1.1.8
  - @chakra-ui/focus-lock@1.1.7
  - @chakra-ui/transition@1.2.2

## 1.8.3

### Patch Changes

- [`9c6be11b1`](https://github.com/chakra-ui/chakra-ui/commit/9c6be11b1d95f8add314dbe214bc7ce3c67b76cd)
  [#3806](https://github.com/chakra-ui/chakra-ui/pull/3806) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  modal exceeded the viewport height on iOS

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/hooks@1.5.0
  - @chakra-ui/close-button@1.1.7
  - @chakra-ui/focus-lock@1.1.6
  - @chakra-ui/portal@1.2.3
  - @chakra-ui/transition@1.2.1

## 1.8.2

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`5617aabea`](https://github.com/chakra-ui/chakra-ui/commit/5617aabeaa6c3faef37deeebeddbc9bf3cc88088),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/transition@1.2.0
  - @chakra-ui/hooks@1.4.0
  - @chakra-ui/close-button@1.1.6
  - @chakra-ui/focus-lock@1.1.5
  - @chakra-ui/portal@1.2.2

## 1.8.1

### Patch Changes

- [`2287d82e3`](https://github.com/chakra-ui/chakra-ui/commit/2287d82e31744cd289aaf524bb9961e46003c404)
  [#3715](https://github.com/chakra-ui/chakra-ui/pull/3715) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved a peer dependency
  resolution issue reported by yarn2, npm7, and other more modern package
  managers

* [`07ddf0f27`](https://github.com/chakra-ui/chakra-ui/commit/07ddf0f276e14f900119668c87947d3e669e09af)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Omit
  scroll-behavior from drawer props

* Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`c69d2b983`](https://github.com/chakra-ui/chakra-ui/commit/c69d2b98350b57f133d6a8ea47b631cd25693aee),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/transition@1.1.2
  - @chakra-ui/hooks@1.3.1
  - @chakra-ui/portal@1.2.1
  - @chakra-ui/close-button@1.1.5
  - @chakra-ui/focus-lock@1.1.4

## 1.8.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- Updated dependencies
  [[`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/portal@1.2.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/transition@1.1.1
  - @chakra-ui/close-button@1.1.4
  - @chakra-ui/focus-lock@1.1.3

## 1.7.0

### Minor Changes

- [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)
  [#3623](https://github.com/chakra-ui/chakra-ui/pull/3623) Thanks
  [@with-heart](https://github.com/with-heart)! - Added support for
  `framer-motion` v4

### Patch Changes

- Updated dependencies
  [[`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/transition@1.1.0
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/focus-lock@1.1.2
  - @chakra-ui/close-button@1.1.3
  - @chakra-ui/portal@1.1.3

## 1.6.1

### Patch Changes

- [`79ff8e84e`](https://github.com/chakra-ui/chakra-ui/commit/79ff8e84e4a8f70d3abe969d68d8bfbb63c18471)
  [#3427](https://github.com/chakra-ui/chakra-ui/pull/3427) Thanks
  [@TheAsda](https://github.com/TheAsda)! - - Add drawer example to modal readme
  - Fix github references in drawer and alert-dialog docs
- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/close-button@1.1.2
  - @chakra-ui/portal@1.1.2
  - @chakra-ui/transition@1.0.9
  - @chakra-ui/focus-lock@1.1.1

## 1.6.0

### Minor Changes

- [`091bad84a`](https://github.com/chakra-ui/chakra-ui/commit/091bad84a928c9d7f3cba103f2a0926045d931b8)
  [#3337](https://github.com/chakra-ui/chakra-ui/pull/3337) Thanks
  [@afermon](https://github.com/afermon)! - Upgrade to react-remove-scroll@2.4.1
  and react-focus-lock@2.5.0 to fix React 17 peer dependencies compatibility

### Patch Changes

- Updated dependencies
  [[`091bad84a`](https://github.com/chakra-ui/chakra-ui/commit/091bad84a928c9d7f3cba103f2a0926045d931b8)]:
  - @chakra-ui/focus-lock@1.1.0

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/close-button@1.1.1
  - @chakra-ui/focus-lock@1.0.4
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/portal@1.1.1
  - @chakra-ui/transition@1.0.8

## 1.5.0

### Minor Changes

- [`14be4be2c`](https://github.com/chakra-ui/chakra-ui/commit/14be4be2c6f64896612cb05d7e56c2c5e4015335)
  [#3210](https://github.com/chakra-ui/chakra-ui/pull/3210) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add support for forwarding
  props to the underlying `Portal` component. Pass the `portalProps` prop to
  achive this.

  The 2 props you can pass to the portalProps are:

  - `containerRef`: `ref` for the element where to mount the portal
  - `appendToParentPortal`: If `false`, it'll opt out of portal nesting

  ```jsx
  <Modal portalProps={{ containerRef: ref }}>
    <ModalOverlay />
    <ModalContent>
      <Box>Modal content</Box>
      <Tooltip portalProps={{ appendToParentPortal: false }}>
        Some tooltip
      </Tooltip>
    </ModalContent>
  </Modal>
  ```

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca),
  [`e41e6b81b`](https://github.com/chakra-ui/chakra-ui/commit/e41e6b81bf6943fef9b34e5ddd31ee57b416a426)]:
  - @chakra-ui/close-button@1.1.0
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/portal@1.1.0
  - @chakra-ui/transition@1.0.7

## 1.4.5

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815),
  [`31881da7`](https://github.com/chakra-ui/chakra-ui/commit/31881da7314c9c464d080b7dd83edd59d8786b7c)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/portal@1.0.6
  - @chakra-ui/transition@1.0.6

## 1.4.4

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee),
  [`0d620f1d`](https://github.com/chakra-ui/chakra-ui/commit/0d620f1d46b9c72c9aef3bb15a691a249ace2eb4)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/portal@1.0.5
  - @chakra-ui/transition@1.0.5

## 1.4.3

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/portal@1.0.4
  - @chakra-ui/transition@1.0.4
  - @chakra-ui/close-button@1.0.4
  - @chakra-ui/focus-lock@1.0.3

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`a98817de`](https://github.com/chakra-ui/chakra-ui/commit/a98817de0849bf9eec89fae3faf4fbe085f21011)]:
  - @chakra-ui/portal@1.0.3

## 1.4.1

### Patch Changes

- [`a9807b33`](https://github.com/chakra-ui/chakra-ui/commit/a9807b334477ac9ecd7f3637c0ff7d5fb5c46639)
  [#2753](https://github.com/chakra-ui/chakra-ui/pull/2753) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Restored TypeScript
  autocomplete for chakra component props in Jetbrains IDEs.

* [`f7142599`](https://github.com/chakra-ui/chakra-ui/commit/f714259943a03d6e191949c7c1c68c9f9b8b49fd)
  [#2952](https://github.com/chakra-ui/chakra-ui/pull/2952) Thanks
  [@mashabow](https://github.com/mashabow)! - Disable the `ModalOverlay`
  animation as well as the `ModalContent` animation, if `motionPreset="none"`

## 1.4.0

### Minor Changes

- [`6a82a3d4`](https://github.com/chakra-ui/chakra-ui/commit/6a82a3d4f061191171a12e6d38719ba05414a86e)
  [#2888](https://github.com/chakra-ui/chakra-ui/pull/2888) Thanks
  [@ytakayanagi](https://github.com/ytakayanagi)! - Added "none" option in
  motionPreset prop to disable animation in modal component

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

- [`b8df0bf4`](https://github.com/chakra-ui/chakra-ui/commit/b8df0bf44a10512658826e5ef8e3067bc45fbc4a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  controlling focus lock across frames. A typical example is when you open a
  modal in Codesandbox, it's impossible to type in the code editor due to focus
  lock.

  `react-focus-lock` exposes a prop that prevents this from happening. We
  updated `FocusLock` and `Modal` components to allow users opt-in or opt-out of
  this behavior

  To learn more, check out this issue
  [#2479](https://github.com/chakra-ui/chakra-ui/issues/2479)

### Patch Changes

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/transition@1.0.3
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/close-button@1.0.3
  - @chakra-ui/focus-lock@1.0.2
  - @chakra-ui/hooks@1.0.2
  - @chakra-ui/portal@1.0.2

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`72bbd0db`](https://github.com/chakra-ui/chakra-ui/commit/72bbd0dbb913ba38ee2b9191d12bf73713ae4398)]:
  - @chakra-ui/close-button@1.0.2

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

### Patch Changes

- Updated dependencies
  [[`2416cf9a`](https://github.com/chakra-ui/chakra-ui/commit/2416cf9abe183a3a38adbccff794088d86a46341)]:
  - @chakra-ui/transition@1.0.2

## 1.1.0

### Minor Changes

- [`ba262ac7`](https://github.com/chakra-ui/chakra-ui/commit/ba262ac7b2e2d932bb227d4ff9181e83fbaa4149)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Added support for
  styling ModalContent or DrawerContent's container

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/close-button@1.0.1
  - @chakra-ui/focus-lock@1.0.1
  - @chakra-ui/portal@1.0.1
  - @chakra-ui/transition@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/modal

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

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-rc.0...@chakra-ui/modal@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.7...@chakra-ui/modal@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.6...@chakra-ui/modal@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.5...@chakra-ui/modal@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.4...@chakra-ui/modal@1.0.0-next.5) (2020-07-15)

### Features

- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typescript ref issues for modal
  ([821687e](https://github.com/chakra-ui/chakra-ui/commit/821687ef8948d0e925345693642a0b5b81486d74))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typescript ref issues for modal
  ([821687e](https://github.com/chakra-ui/chakra-ui/commit/821687ef8948d0e925345693642a0b5b81486d74))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- typescript ref issues for modal
  ([821687e](https://github.com/chakra-ui/chakra-ui/commit/821687ef8948d0e925345693642a0b5b81486d74))
