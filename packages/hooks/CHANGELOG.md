# Change Log

## 3.0.0-next.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/utils@3.0.0-next.5

## 3.0.0-next.4

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/utils@3.0.0-next.4

## 3.0.0-next.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/utils@3.0.0-next.3

## 3.0.0-next.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/utils@3.0.0-next.2

## 3.0.0-next.1

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/utils@3.0.0-next.1

## 3.0.0-next.0

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/utils@3.0.0-next.0

## 2.2.1

### Patch Changes

- [`63431c1ef`](https://github.com/chakra-ui/chakra-ui/commit/63431c1ef3b7e8ac9b97c94ca025dd54b9aa3338)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue with use
  client directive in next.js

## 2.2.0

### Minor Changes

- [#7379](https://github.com/chakra-ui/chakra-ui/pull/7379)
  [`169d71679`](https://github.com/chakra-ui/chakra-ui/commit/169d71679ed22d2245240b4018a906d220d502f8)
  Thanks [@DimovyM](https://github.com/DimovyM)! - Added option to listen
  context menu click in useOutsideClick

## 2.1.6

### Patch Changes

- [`2e07db479`](https://github.com/chakra-ui/chakra-ui/commit/2e07db479222b70609ed6945fa81bc728aad8755)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **useClipboard**:
  Improve reactivity by ensuring it uses the latest reference of the passed
  `value`

## 2.1.5

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- [`b427ef966`](https://github.com/chakra-ui/chakra-ui/commit/b427ef9668d9ee000f44eb0cdd4d0a5ae9f396ec)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  `useDimension` uses stale value of node reference

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/react-utils@2.0.12
  - @chakra-ui/utils@2.0.15

## 2.1.4

### Patch Changes

- Updated dependencies
  [[`9cdd43733`](https://github.com/chakra-ui/chakra-ui/commit/9cdd43733469e834740ec589a73f0d546c1e6b5b)]:
  - @chakra-ui/utils@2.0.14
  - @chakra-ui/react-utils@2.0.11

## 2.1.3

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
  - @chakra-ui/react-utils@2.0.10
  - @chakra-ui/utils@2.0.13

## 2.1.2

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/react-utils@2.0.9
  - @chakra-ui/utils@2.0.12

## 2.1.1

### Patch Changes

- [#6863](https://github.com/chakra-ui/chakra-ui/pull/6863)
  [`49dc149cc`](https://github.com/chakra-ui/chakra-ui/commit/49dc149cc600af83dcde4fa9b6a34a6b14dca837)
  Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue where focus
  sometimes moved back to the open element when it was intentionally moved away
  from it.

## 2.1.0

### Minor Changes

- [#6763](https://github.com/chakra-ui/chakra-ui/pull/6763)
  [`ed7f878b3`](https://github.com/chakra-ui/chakra-ui/commit/ed7f878b3463cc5a83d67a7aed6dd6fc5a0570f6)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - Added
  `setValue` as function exposed by `useClipboard` to enable control over the
  value after first initialization

## 2.0.11

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290),
  [`d945b9a7d`](https://github.com/chakra-ui/chakra-ui/commit/d945b9a7da3056017cda0cdd552af40fa1426070)]:
  - @chakra-ui/react-utils@2.0.8
  - @chakra-ui/utils@2.0.11

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
  [[`99329e44a`](https://github.com/chakra-ui/chakra-ui/commit/99329e44a0429a225cd1dffa4b7d76b68a828f44)]:
  - @chakra-ui/utils@2.0.10
  - @chakra-ui/react-utils@2.0.7

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
  - @chakra-ui/react-utils@2.0.6
  - @chakra-ui/utils@2.0.9

## 2.0.8

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/utils@2.0.8

## 2.0.7

### Patch Changes

- [#6457](https://github.com/chakra-ui/chakra-ui/pull/6457)
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Deprecate
  `useDimensions` in favor of the `useSize` hook

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/react-utils@2.0.4

## 2.0.6

### Patch Changes

- Force new release

- Updated dependencies []:
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
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/utils@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3

## 2.0.2

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/utils@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1

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

- [#5940](https://github.com/chakra-ui/chakra-ui/pull/5940)
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798)
  Thanks [@morellodev](https://github.com/morellodev)! - Fixed issue in
  `useDisclosure` where `aria-expanded` in `getButtonProps` returned a fixed
  value.

* [#5954](https://github.com/chakra-ui/chakra-ui/pull/5954)
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where `useOutsideClick` ignored clicks outside of the `body` element
* Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
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
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- [#5940](https://github.com/chakra-ui/chakra-ui/pull/5940)
  [`8991ac13e`](https://github.com/chakra-ui/chakra-ui/commit/8991ac13e5ec71cc1fbd09610981913b7efe9798)
  Thanks [@morellodev](https://github.com/morellodev)! - [useDisclosure] Return
  a dynamic "aria-hidden" value from getButtonProps #5939

* [#5954](https://github.com/chakra-ui/chakra-ui/pull/5954)
  [`d32aea176`](https://github.com/chakra-ui/chakra-ui/commit/d32aea176b66b4d5206df10530c011f8eaa2e42d)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where `useOutsideClick` ignored clicks outside of the `body` element

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
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
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.9.1

### Patch Changes

- [#5739](https://github.com/chakra-ui/chakra-ui/pull/5739)
  [`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c)
  Thanks [@ambar](https://github.com/ambar)! - Improve stability of `useBoolean`
  hook to ensure setter object reference stays the same

## 1.9.0

### Minor Changes

- [#5199](https://github.com/chakra-ui/chakra-ui/pull/5199)
  [`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964)
  Thanks [@mlajtos](https://github.com/mlajtos)! - Control whether Tooltip can
  be closed with Esc key

## 1.8.5

### Patch Changes

- [#5623](https://github.com/chakra-ui/chakra-ui/pull/5623)
  [`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)
  Thanks [@Brennvo](https://github.com/Brennvo)! - Fixed an issue where the prop
  `isLazy` did not work as expected. This was achieved by updating the hook
  `useAnimationState`.

## 1.8.4

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/utils@1.10.4

## 1.8.3

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/utils@1.10.3

## 1.8.2

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/utils@1.10.2

## 1.8.1

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1

## 1.8.0

### Minor Changes

- [#5442](https://github.com/chakra-ui/chakra-ui/pull/5442)
  [`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add
  `useAnimationState` hook to help track motion component animations. Used in
  popopover and menu lazy modes

### Patch Changes

- [#5445](https://github.com/chakra-ui/chakra-ui/pull/5445)
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748)
  Thanks [@rjokelai](https://github.com/rjokelai)! - fix useConst types when
  using init function

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/utils@1.10.0

## 1.7.2

### Patch Changes

- [#5237](https://github.com/chakra-ui/chakra-ui/pull/5237)
  [`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026)
  Thanks [@navarroaxel](https://github.com/navarroaxel)! - Add a comment about
  `useState` alternative

* [#4835](https://github.com/chakra-ui/chakra-ui/pull/4835)
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)
  Thanks [@igorwessel](https://github.com/igorwessel)! - Fixed a issue where
  `useId` generated inconsistent id values between client and server (SSR).

## 1.7.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/utils@1.9.1

## 1.7.0

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
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0

## 1.6.2

### Patch Changes

- [`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a)
  [#4822](https://github.com/chakra-ui/chakra-ui/pull/4822) Thanks
  [@takethefake](https://github.com/takethefake)! - used useCallbackRef for
  onOpenProp/onCloseProp in useDisclosure

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4

## 1.6.1

### Patch Changes

- [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436)
  [#4803](https://github.com/chakra-ui/chakra-ui/pull/4803) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Forward `threshold`
  options from `usePanSession` to `PanSession` class

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3

## 1.6.0

### Minor Changes

- [`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)
  [#4595](https://github.com/chakra-ui/chakra-ui/pull/4595) Thanks
  [@margalit](https://github.com/margalit)! - - Added an enabled prop to the
  `useOutsideClick` hook to conditionally attach event handlers.

  - Updated the `useMenu` hook to only enable the `useOutsideClick` hook when
    the menu is open.

## 1.5.5

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2

## 1.5.4

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1

## 1.5.3

### Patch Changes

- [`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)
  [#4166](https://github.com/chakra-ui/chakra-ui/pull/4166) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix inconsisent id
  generation between client and server

## 1.5.2

### Patch Changes

- [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - `usePanGesture`:
  Add `onPanSessionEnd` to pan event handlers and mark as internal
  - `useDimensions`: Remove `ref` from effect dependency list
- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0

## 1.5.0

### Minor Changes

- [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)
  [#3836](https://github.com/chakra-ui/chakra-ui/pull/3836) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add pan session hook
  `usePanGesture` for detecting pan gestures

  - Update `useLatestRef` to inline value updates. Not concurrent mode safe but
    works for now.

  - Add `useEventListenerMap` to provide an elegant way of attaching several
    pointer event to the `document` or an element.

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0

## 1.4.0

### Minor Changes

- [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  passing function that returns element to `useEventListener` and
  `usePointerEvent`

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1

## 1.3.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- [`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb)
  [#3408](https://github.com/chakra-ui/chakra-ui/pull/3408) Thanks
  [@dodas](https://github.com/dodas)! - `useControllableState`: The `onChange`
  callback will be called only if the new value isn't equal to the current one.
- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/react-utils@1.1.0

## 1.2.0

### Minor Changes

- [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Pointer Events

  Add unified pointer event management utils and hook for interal use only.

  The hook is called `usePointerEvent`, it works pretty similar to
  `useEventListener` except that does two things:

  - Unifies the pointer event system and ensure that only one of `onMouse*`,
    `onTouch*`, or `onPointer*` handler runs
  - Provide event information about the pointer event like `x` and `y` position
    depending on the pointer type.

  > Credits to `framer-motion` for doing the hard work for this utilities

  - Added `useFocusOnPointerDown` to get Safari to detect the correct
    `event.relatedTarget` when you blur a focused element.

  ### Focus Management

  Set `preventScroll` option to be `true` by default, setting focus on an
  element should happen without scrolling the page (in most cases).

  Set `nextTick` to `undefined` by default and update all components that use
  next tick to use `{ nextTick: true }`.

### Patch Changes

- [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update focus utils
  to use `nextTick` option since its default value is now false in the focus
  utils

  > `@internal` use only

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.1.5

### Patch Changes

- [`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa)
  [#3373](https://github.com/chakra-ui/chakra-ui/pull/3373) Thanks
  [@tobiasz](https://github.com/tobiasz)! - ### useClipboard

  Add support to `format` - Optional string. Set the MIME type of what you want
  to copy as. Use text/html to copy as HTML, text/plain to avoid inherited
  styles showing when pasted into rich text editor.

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.1.3

### Patch Changes

- [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! -
  **useOutsideClick:**

  - Update reference to `document.addEventListener` to detect owner document
    based on `ref` passed. This would help detect outside click currently from
    within an `iframe`.

## 1.1.2

### Patch Changes

- [`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)
  [#3125](https://github.com/chakra-ui/chakra-ui/pull/3125) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fixed issue where using an
  uncontrolled RadioGroup without a defaultValue causes multiple radio options
  can be selected.

  This was caused by the `useControllableProp` hook that uses `useRef` to check
  if a value is controlled or uncontrolled.

## 1.1.1

### Patch Changes

- [`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)
  [#3056](https://github.com/chakra-ui/chakra-ui/pull/3056) Thanks
  [@with-heart](https://github.com/with-heart)! - - Resolved an issue where
  event handlers for certain components were removed after the first event
  occurred.

  - Fixed SSR issue with `useId` hook

## 1.1.0

### Minor Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Added `useCallbackRef` hook
  for persisting a value between renders and updating it if it changes.

### Patch Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Deprecated `useLatestRef`,
  `useEventCallback`, and `useMouseDownRef`. These functions will be removed in
  a future `major` version.
- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2

## 1.0.1

### Patch Changes

- [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)
  [#2577](https://github.com/chakra-ui/chakra-ui/pull/2577) Thanks
  [@navin-moorthy](https://github.com/navin-moorthy)! - Fix setter function
  update of `value` in useControllable

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/hooks

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

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-rc.0...@chakra-ui/hooks@1.0.0-rc.1) (2020-08-06)

### Features

- update popper hook and use-clipboard
  ([2659f60](https://github.com/chakra-ui/chakra-ui/commit/2659f60b7d44815c7638d2bc03eb6a97ad7bc581))

### Performance Improvements

- improve popper hook
  ([d7ecb04](https://github.com/chakra-ui/chakra-ui/commit/d7ecb04baed8b6e6488321f7f2b28bed10a3a0d3))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.7...@chakra-ui/hooks@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.6...@chakra-ui/hooks@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.5...@chakra-ui/hooks@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.4...@chakra-ui/hooks@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))
