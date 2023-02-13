# Change Log

## 2.0.21

### Patch Changes

- Updated dependencies
  [[`ba7be75c2`](https://github.com/chakra-ui/chakra-ui/commit/ba7be75c2b8f7a38987781f6a0dd30086af7e2f7)]:
  - @chakra-ui/react-use-size@2.0.9

## 2.0.20

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components

## 2.0.19

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/react-use-callback-ref@2.0.7
  - @chakra-ui/react-use-controllable-state@2.0.8
  - @chakra-ui/react-use-latest-ref@2.0.5
  - @chakra-ui/react-use-merge-refs@2.0.7
  - @chakra-ui/react-use-pan-event@2.0.9
  - @chakra-ui/react-use-size@2.0.8
  - @chakra-ui/react-use-update-effect@2.0.7
  - @chakra-ui/number-utils@2.0.7
  - @chakra-ui/react-types@2.0.7

## 2.0.18

### Patch Changes

- Updated dependencies
  [[`7a62c30cc`](https://github.com/chakra-ui/chakra-ui/commit/7a62c30cc4977adf7c6021fabbd16b3bd4707e9f),
  [`9cdd43733`](https://github.com/chakra-ui/chakra-ui/commit/9cdd43733469e834740ec589a73f0d546c1e6b5b)]:
  - @chakra-ui/react-use-size@2.0.7
  - @chakra-ui/react-use-pan-event@2.0.8

## 2.0.17

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
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/react-use-callback-ref@2.0.6
  - @chakra-ui/react-use-controllable-state@2.0.7
  - @chakra-ui/react-use-latest-ref@2.0.4
  - @chakra-ui/react-use-merge-refs@2.0.6
  - @chakra-ui/react-use-pan-event@2.0.7
  - @chakra-ui/react-use-size@2.0.6
  - @chakra-ui/react-use-update-effect@2.0.6
  - @chakra-ui/number-utils@2.0.6
  - @chakra-ui/react-types@2.0.6

## 2.0.16

### Patch Changes

- [#7095](https://github.com/chakra-ui/chakra-ui/pull/7095)
  [`40779c6b1`](https://github.com/chakra-ui/chakra-ui/commit/40779c6b1195bf208f7be20d838ea5f22716231b)
  Thanks [@Tisks](https://github.com/Tisks)! - Expose `RangeSliderState` and
  `RangeSliderActions` types to improve documentation

## 2.0.15

### Patch Changes

- [#7068](https://github.com/chakra-ui/chakra-ui/pull/7068)
  [`4dbfc1a11`](https://github.com/chakra-ui/chakra-ui/commit/4dbfc1a115a2fce51b29f3fd3baa3a823b3e359d)
  Thanks [@cereallarceny](https://github.com/cereallarceny)! - Removed
  defaultProps from components to support React 18.3.0

## 2.0.14

### Patch Changes

- [#6979](https://github.com/chakra-ui/chakra-ui/pull/6979)
  [`36ac52021`](https://github.com/chakra-ui/chakra-ui/commit/36ac520213d42e379857aa421240fc85e3b71523)
  Thanks [@Tisks](https://github.com/Tisks)! - Expose `SliderActions` and
  `SliderState` types to improve documentation

- Updated dependencies
  [[`67ef76e32`](https://github.com/chakra-ui/chakra-ui/commit/67ef76e32369f7376ccd9242865f758157544b48)]:
  - @chakra-ui/react-types@2.0.5

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
  - @chakra-ui/react-context@2.0.5
  - @chakra-ui/react-use-callback-ref@2.0.5
  - @chakra-ui/react-use-controllable-state@2.0.6
  - @chakra-ui/react-use-latest-ref@2.0.3
  - @chakra-ui/react-use-merge-refs@2.0.5
  - @chakra-ui/react-use-pan-event@2.0.6
  - @chakra-ui/react-use-size@2.0.5
  - @chakra-ui/react-use-update-effect@2.0.5
  - @chakra-ui/number-utils@2.0.5
  - @chakra-ui/react-types@2.0.4

## 2.0.12

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

* [#6753](https://github.com/chakra-ui/chakra-ui/pull/6753)
  [`f48718aa8`](https://github.com/chakra-ui/chakra-ui/commit/f48718aa81fa406dbcc8aaea5a94007d85d54349)
  Thanks [@anubra266](https://github.com/anubra266)! - Fixed issues with slider
  state updates

* Updated dependencies
  [[`f48718aa8`](https://github.com/chakra-ui/chakra-ui/commit/f48718aa81fa406dbcc8aaea5a94007d85d54349),
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290),
  [`5d583e663`](https://github.com/chakra-ui/chakra-ui/commit/5d583e6636029f7777a9db630799a741ff637edd)]:
  - @chakra-ui/react-use-latest-ref@2.0.2
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/react-use-callback-ref@2.0.4
  - @chakra-ui/react-use-controllable-state@2.0.5
  - @chakra-ui/react-use-merge-refs@2.0.4
  - @chakra-ui/react-use-pan-event@2.0.5
  - @chakra-ui/react-use-size@2.0.4
  - @chakra-ui/react-use-update-effect@2.0.4
  - @chakra-ui/number-utils@2.0.4

## 2.0.11

### Patch Changes

- Updated dependencies
  [[`a4df8b70c`](https://github.com/chakra-ui/chakra-ui/commit/a4df8b70c9ade7c331ba6b8d1b422e74b5b8e8c1),
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/react-use-controllable-state@2.0.4

## 2.0.10

### Patch Changes

- [`5e6c3fd65`](https://github.com/chakra-ui/chakra-ui/commit/5e6c3fd652446540a3e9825c0d0f1f556d2e17b8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Allow slider mark
  to be themable

- Updated dependencies []:
  - @chakra-ui/react-use-pan-event@2.0.4

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
  - @chakra-ui/react-use-callback-ref@2.0.3
  - @chakra-ui/react-use-controllable-state@2.0.3
  - @chakra-ui/react-use-merge-refs@2.0.3
  - @chakra-ui/react-use-pan-event@2.0.3
  - @chakra-ui/react-use-size@2.0.3
  - @chakra-ui/react-use-update-effect@2.0.3
  - @chakra-ui/number-utils@2.0.3
  - @chakra-ui/react-types@2.0.3

## 2.0.8

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/react-context@2.0.2
  - @chakra-ui/react-use-callback-ref@2.0.2
  - @chakra-ui/react-use-controllable-state@2.0.2
  - @chakra-ui/react-use-merge-refs@2.0.2
  - @chakra-ui/react-use-pan-event@2.0.2
  - @chakra-ui/react-use-size@2.0.2
  - @chakra-ui/react-use-update-effect@2.0.2
  - @chakra-ui/number-utils@2.0.2
  - @chakra-ui/react-types@2.0.2

## 2.0.7

### Patch Changes

- Updated dependencies
  [[`3ecbf060e`](https://github.com/chakra-ui/chakra-ui/commit/3ecbf060e5ca4a7e545c206fd9025ad29ca50b43),
  [`597966e46`](https://github.com/chakra-ui/chakra-ui/commit/597966e46f6d0a8cd3f82eafa3f54d5ca9c97127),
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12),
  [`70872f2c2`](https://github.com/chakra-ui/chakra-ui/commit/70872f2c2254186bbcc1964897fe660eb1c1b010)]:
  - @chakra-ui/react-use-update-effect@2.0.1
  - @chakra-ui/number-utils@2.0.1
  - @chakra-ui/react-types@2.0.1
  - @chakra-ui/react-use-size@2.0.1
  - @chakra-ui/react-use-callback-ref@2.0.1
  - @chakra-ui/react-use-controllable-state@2.0.1
  - @chakra-ui/react-context@2.0.1
  - @chakra-ui/react-use-merge-refs@2.0.1
  - @chakra-ui/react-use-pan-event@2.0.1

## 2.0.6

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/hooks@2.0.6
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
  - @chakra-ui/hooks@2.0.5
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/utils@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/hooks@2.0.4

## 2.0.3

### Patch Changes

- [#6281](https://github.com/chakra-ui/chakra-ui/pull/6281)
  [`8bfeefbb5`](https://github.com/chakra-ui/chakra-ui/commit/8bfeefbb562fc5ada4757309db6b951c421342ad)
  Thanks [@ShumRain](https://github.com/ShumRain)! - Export `useStyles`
  equivalent for multipart component styles. Accordion exports
  `useAccordionStyles`, Alert exports `useAlertStyles`, and so on.
- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/hooks@2.0.3

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
  - @chakra-ui/hooks@2.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/utils@2.0.2

## 2.0.1

### Patch Changes

- [#6079](https://github.com/chakra-ui/chakra-ui/pull/6079)
  [`703ff594f`](https://github.com/chakra-ui/chakra-ui/commit/703ff594f826207a7b3d37663caaad365212b23e)
  Thanks [@chr-ge](https://github.com/chr-ge)! - Improve TS doc comments to
  include the `@default`value for prop types

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/hooks@2.0.1

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

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632),
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196),
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)]:
  - @chakra-ui/hooks@2.0.0
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
  - @chakra-ui/hooks@2.0.0-next.3
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

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
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/hooks@2.0.0-next.1
  - @chakra-ui/react-utils@2.0.0-next.1
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
  - @chakra-ui/hooks@2.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.5.11

### Patch Changes

- Updated dependencies
  [[`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c)]:
  - @chakra-ui/hooks@1.9.1

## 1.5.10

### Patch Changes

- Updated dependencies
  [[`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964)]:
  - @chakra-ui/hooks@1.9.0

## 1.5.9

### Patch Changes

- Updated dependencies
  [[`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)]:
  - @chakra-ui/hooks@1.8.5

## 1.5.8

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/hooks@1.8.4
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/utils@1.10.4

## 1.5.7

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/hooks@1.8.3

## 1.5.6

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

## 1.5.5

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/hooks@1.8.1

## 1.5.4

### Patch Changes

- [#5362](https://github.com/chakra-ui/chakra-ui/pull/5362)
  [`787857861`](https://github.com/chakra-ui/chakra-ui/commit/7878578614ef774cdc78c2b5d892024d1d982048)
  Thanks [@sohamsshah](https://github.com/sohamsshah)! - fix a minor edge-case
  for calculating the `index` in use-range-slider

- Updated dependencies
  [[`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0

## 1.5.3

### Patch Changes

- [#5265](https://github.com/chakra-ui/chakra-ui/pull/5265)
  [`1b8e31eba`](https://github.com/chakra-ui/chakra-ui/commit/1b8e31eba557db1cdabfd2b2761a1558e2f38b34)
  Thanks [@primos63](https://github.com/primos63)! - Allow classNames specified
  on `Slider` and `SliderFilledTrack` to be added to the class list
- Updated dependencies
  [[`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/hooks@1.7.2

## 1.5.2

### Patch Changes

- [#5081](https://github.com/chakra-ui/chakra-ui/pull/5081)
  [`002e3a488`](https://github.com/chakra-ui/chakra-ui/commit/002e3a48887c2ceb37bafceb8d4aa248b8dfa22f)
  Thanks [@burhanuday](https://github.com/burhanuday)! - Fixed a bug where a
  thumb would not move in case of stacked thumbs

## 1.5.1

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

- [#5020](https://github.com/chakra-ui/chakra-ui/pull/5020)
  [`c7277cdf7`](https://github.com/chakra-ui/chakra-ui/commit/c7277cdf715626926b3c12cfdc62a230b00609f0)
  Thanks [@burhanuday](https://github.com/burhanuday)! - fixed the bug in
  RangeSlider where an index out of bounds error would occur incase of stacked
  thumb
- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0

## 1.4.2

### Patch Changes

- [`9d845f2d2`](https://github.com/chakra-ui/chakra-ui/commit/9d845f2d22d9b8a7e392bda08073c847ab748491)
  [#4852](https://github.com/chakra-ui/chakra-ui/pull/4852) Thanks
  [@antenna-three](https://github.com/antenna-three)! - Fix issue where sliding
  on a range slider without focusing sometimes fail.

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4

## 1.4.1

### Patch Changes

- [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)
  [#4803](https://github.com/chakra-ui/chakra-ui/pull/4803) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where value
  can't be changed when range-slider thumbs are stacked

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1

## 1.4.0

### Minor Changes

- [`b769e88f9`](https://github.com/chakra-ui/chakra-ui/commit/b769e88f977a4e2a8641de57beefd8220bc5dffa)
  [#4740](https://github.com/chakra-ui/chakra-ui/pull/4740) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Move hard-coded styles
  to slider's theme

  - Add support for multithumb slider. We now have `useRangeSlider`,
    `RangeSlider` and `RangeSlider*` components

  ```jsx live=false
  <RangeSlider>
    <RangeSliderTrack>
      <RangeSliderFilledTrack />
    </RangeSliderTrack>
    <RangeSliderThumb index={0} />
    <RangeSliderThumb index={1} />
  </RangeSlider>
  ```

## 1.3.0

### Minor Changes

- [`74fada62b`](https://github.com/chakra-ui/chakra-ui/commit/74fada62b9e2cc389615855a8ad48041f2c45973)
  [#3837](https://github.com/chakra-ui/chakra-ui/pull/3837) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - Add `RTL` support by using the
  theme's direction ("ltr" or "rtl") to set the default `isReversed` property
  when the `orientation` is `horizontal`

## 1.2.9

### Patch Changes

- [`ed8301181`](https://github.com/chakra-ui/chakra-ui/commit/ed830118114231624eb1538f183134a5741a16f7)
  [#4564](https://github.com/chakra-ui/chakra-ui/pull/4564) Thanks
  [@trabuchhobbes](https://github.com/trabuchhobbes)! - Fix issue where slider
  thumb gets focus when `onChangeEnd` changes.

* [`6532f97eb`](https://github.com/chakra-ui/chakra-ui/commit/6532f97eb13105e126881f709f48f1270ac7f5c9)
  [#4575](https://github.com/chakra-ui/chakra-ui/pull/4575) Thanks
  [@takethefake](https://github.com/takethefake)! - Call `onChangeStart`/
  `onChangeEnd` when clicking somewhere in the `SliderTrack` without dragging
  the `DragHandle`
* Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0

## 1.2.8

### Patch Changes

- [`2172e610b`](https://github.com/chakra-ui/chakra-ui/commit/2172e610b2a5c6e3867e83d142be2d1a19b7355d)
  [#4370](https://github.com/chakra-ui/chakra-ui/pull/4370) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where slider
  thumb doesn't show active state in firefox

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/hooks@1.5.5

## 1.2.7

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/hooks@1.5.4

## 1.2.6

### Patch Changes

- [`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad)
  [#4057](https://github.com/chakra-ui/chakra-ui/pull/4057) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - updated @see doc links to point to
  shorthand see PR #4046 comment

- Updated dependencies
  [[`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)]:
  - @chakra-ui/hooks@1.5.3

## 1.2.5

### Patch Changes

- [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix issue where
  `onChangeStart` doesnt get called
  - Fix issue where slider thumb remains tabbable when `isDisabled={true}`
  - Fix issue where `onChangeEnd` doesn't get called when you click anywhere on
    the track
- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/hooks@1.5.2

## 1.2.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/hooks@1.5.1

## 1.2.3

### Patch Changes

- - Fix issue where slider doesnt work after first slide
  - Avoid exccess onChange calls
- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/hooks@1.5.0

## 1.2.2

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/hooks@1.4.0

## 1.2.1

### Patch Changes

- [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update import of
  shared utils from `react-utils` to `utils`

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/hooks@1.3.1

## 1.2.0

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
  - @chakra-ui/react-utils@1.1.0

## 1.1.3

### Patch Changes

- [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update focus utils
  to use `nextTick` option since its default value is now false in the focus
  utils

  > `@internal` use only

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0

## 1.1.2

### Patch Changes

- [`0e93767f1`](https://github.com/chakra-ui/chakra-ui/commit/0e93767f1dfca00e5843d7ffab5eb3f038cec7fe)
  [#2895](https://github.com/chakra-ui/chakra-ui/pull/2895) Thanks
  [@with-heart](https://github.com/with-heart)! - fix(slider): call onChangeEnd
  even if value doesn't change

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/hooks@1.1.4

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

**Note:** Version bump only for package @chakra-ui/slider

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

**Note:** Version bump only for package @chakra-ui/slider

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/slider

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/slider

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/slider

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/slider

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/slider

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/slider@1.0.0-rc.0...@chakra-ui/slider@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/slider

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/slider@1.0.0-next.7...@chakra-ui/slider@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/slider

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/slider@1.0.0-next.6...@chakra-ui/slider@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- prevent issue where right click triggers active css state
  ([4ea9b88](https://github.com/chakra-ui/chakra-ui/commit/4ea9b8872599168f7a6ecb078b62f3473a25b4d8))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/slider@1.0.0-next.5...@chakra-ui/slider@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/slider

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/slider@1.0.0-next.4...@chakra-ui/slider@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- [#1180](https://github.com/chakra-ui/chakra-ui/issues/1180) slider moving
  incorrectly when min is odd and step is even
  ([4038ad4](https://github.com/chakra-ui/chakra-ui/commit/4038ad4b5ee52f275919b046cc916cdfe73800f8))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

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
