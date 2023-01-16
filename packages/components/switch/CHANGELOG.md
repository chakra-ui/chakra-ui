# Change Log

## 2.0.22

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components
- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)]:
  - @chakra-ui/checkbox@2.2.10

## 2.0.21

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/checkbox@2.2.9
  - @chakra-ui/shared-utils@2.0.5

## 2.0.20

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/checkbox@2.2.8

## 2.0.19

### Patch Changes

- Updated dependencies
  [[`7a62c30cc`](https://github.com/chakra-ui/chakra-ui/commit/7a62c30cc4977adf7c6021fabbd16b3bd4707e9f)]:
  - @chakra-ui/checkbox@2.2.7

## 2.0.18

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
  - @chakra-ui/checkbox@2.2.6
  - @chakra-ui/shared-utils@2.0.4

## 2.0.17

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/checkbox@2.2.5

## 2.0.16

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/checkbox@2.2.4

## 2.0.15

### Patch Changes

- Updated dependencies
  [[`1377b7280`](https://github.com/chakra-ui/chakra-ui/commit/1377b7280e398aadf70b54c7846a36136c7bd772)]:
  - @chakra-ui/checkbox@2.2.3

## 2.0.14

### Patch Changes

- Updated dependencies
  [[`91698604c`](https://github.com/chakra-ui/chakra-ui/commit/91698604c78a360b90a946c2f2072c514c98ebc5)]:
  - @chakra-ui/checkbox@2.2.2

## 2.0.13

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/checkbox@2.2.1

## 2.0.12

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
  [[`1b89467f6`](https://github.com/chakra-ui/chakra-ui/commit/1b89467f6a1dae072e16884431d898497fa2e571),
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/checkbox@2.2.0

## 2.0.11

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation
- Updated dependencies
  [[`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)]:
  - @chakra-ui/checkbox@2.1.8

## 2.0.10

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/checkbox@2.1.7
  - @chakra-ui/utils@2.0.8

## 2.0.9

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/checkbox@2.1.6

## 2.0.8

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/checkbox@2.1.5
  - @chakra-ui/utils@2.0.6

## 2.0.7

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/checkbox@2.1.4
  - @chakra-ui/utils@2.0.5

## 2.0.6

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/checkbox@2.1.3

## 2.0.5

### Patch Changes

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/checkbox@2.1.2

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`dd621e46d`](https://github.com/chakra-ui/chakra-ui/commit/dd621e46d73b4b267a8cf2d31879a36e85f701d1)]:
  - @chakra-ui/checkbox@2.1.1

## 2.0.3

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25),
  [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1),
  [`bcbfcbcce`](https://github.com/chakra-ui/chakra-ui/commit/bcbfcbcceebe6749d0e8fe6ebddb566121fdff25)]:
  - @chakra-ui/checkbox@2.1.0
  - @chakra-ui/utils@2.0.2

## 2.0.2

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/checkbox@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`7eaf538a4`](https://github.com/chakra-ui/chakra-ui/commit/7eaf538a4db9e168408e114f80a2c2898cf4fd47)]:
  - @chakra-ui/checkbox@2.0.1

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
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/checkbox@2.0.0
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
  - @chakra-ui/checkbox@2.0.0-next.3
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/checkbox@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/checkbox@2.0.0-next.1
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
  - @chakra-ui/checkbox@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.3.10

### Patch Changes

- Updated dependencies
  [[`c220af152`](https://github.com/chakra-ui/chakra-ui/commit/c220af15274377575d03900f0baaa1c0a1400778),
  [`b19c89270`](https://github.com/chakra-ui/chakra-ui/commit/b19c892702f029c078f8d5bfaf0f89b573c6cd90)]:
  - @chakra-ui/checkbox@1.7.1

## 1.3.9

### Patch Changes

- Updated dependencies
  [[`a7be72918`](https://github.com/chakra-ui/chakra-ui/commit/a7be72918f1e74ce20eb31544433e4321caf5c78)]:
  - @chakra-ui/checkbox@1.7.0

## 1.3.8

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/checkbox@1.6.8

## 1.3.7

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/checkbox@1.6.7
  - @chakra-ui/utils@1.10.4

## 1.3.6

### Patch Changes

- [#5500](https://github.com/chakra-ui/chakra-ui/pull/5500)
  [`c5eb9c03c`](https://github.com/chakra-ui/chakra-ui/commit/c5eb9c03cd6925f8624ba48a406205d64000a2d1)
  Thanks [@kk21](https://github.com/kk21)! - Fixed a UI issue where the Switch
  component rendered a few pixels off the baseline.
- Updated dependencies
  [[`44c9fab5b`](https://github.com/chakra-ui/chakra-ui/commit/44c9fab5b0e34484c9afb858a553d4a2aa30209d),
  [`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/checkbox@1.6.6
  - @chakra-ui/utils@1.10.3

## 1.3.5

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/checkbox@1.6.5
  - @chakra-ui/utils@1.10.2

## 1.3.4

### Patch Changes

- [#5499](https://github.com/chakra-ui/chakra-ui/pull/5499)
  [`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10)
  Thanks [@noobinthisgame](https://github.com/noobinthisgame)! - allow framer
  motion v6 as peer dependency

* [#5432](https://github.com/chakra-ui/chakra-ui/pull/5432)
  [`98c5ec2bc`](https://github.com/chakra-ui/chakra-ui/commit/98c5ec2bc37fc0764446c3e4df816131418c14e1)
  Thanks [@Methuselah96](https://github.com/Methuselah96)! - Add missing peer
  dependencies

* Updated dependencies
  [[`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10),
  [`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/checkbox@1.6.4
  - @chakra-ui/utils@1.10.1

## 1.3.3

### Patch Changes

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3),
  [`c9c54aee1`](https://github.com/chakra-ui/chakra-ui/commit/c9c54aee1e45c2ca96f7c032400ffeb06c57e341)]:
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/checkbox@1.6.3

## 1.3.2

### Patch Changes

- Updated dependencies
  [[`756682037`](https://github.com/chakra-ui/chakra-ui/commit/756682037a6bd291f75d96b25d37e8eebcc71dbb)]:
  - @chakra-ui/checkbox@1.6.2

## 1.3.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/checkbox@1.6.1
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
  - @chakra-ui/checkbox@1.6.0
  - @chakra-ui/utils@1.9.0

## 1.2.13

### Patch Changes

- Updated dependencies
  [[`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)]:
  - @chakra-ui/checkbox@1.5.10

## 1.2.12

### Patch Changes

- [`f5b00bdc2`](https://github.com/chakra-ui/chakra-ui/commit/f5b00bdc26d107c68469c9d15914cf6280fd7fd1)
  [#4950](https://github.com/chakra-ui/chakra-ui/pull/4950) Thanks
  [@JTBrinkmann](https://github.com/JTBrinkmann)! - Fix issue where focusing the
  Switch could lead to unexpected page scrolls.

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/checkbox@1.5.9

## 1.2.11

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd),
  [`00ef98a33`](https://github.com/chakra-ui/chakra-ui/commit/00ef98a335a96b4db10bed9e2620f0b839203096)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/checkbox@1.5.8

## 1.2.10

### Patch Changes

- Updated dependencies
  [[`726105acb`](https://github.com/chakra-ui/chakra-ui/commit/726105acb38f34290fff53d2dc520b5fbd299061)]:
  - @chakra-ui/checkbox@1.5.7

## 1.2.9

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/checkbox@1.5.6

## 1.2.8

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/checkbox@1.5.5
  - @chakra-ui/utils@1.8.2

## 1.2.7

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/checkbox@1.5.4

## 1.2.6

### Patch Changes

- Updated dependencies
  [[`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad),
  [`afb9b3cfa`](https://github.com/chakra-ui/chakra-ui/commit/afb9b3cfa87076ed8897b7edd4a9d9f1e1701721)]:
  - @chakra-ui/checkbox@1.5.3

## 1.2.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/checkbox@1.5.2

## 1.2.4

### Patch Changes

- Updated dependencies
  [[`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/checkbox@1.5.1

## 1.2.3

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`fbc125258`](https://github.com/chakra-ui/chakra-ui/commit/fbc12525822190e1ea5eced874ef3fdfafdabfb3),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/checkbox@1.5.0

## 1.2.2

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/checkbox@1.4.2

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`38706f731`](https://github.com/chakra-ui/chakra-ui/commit/38706f731372783bb05f01b5755a1753fab16f9e),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/checkbox@1.4.1
  - @chakra-ui/utils@1.5.1

## 1.2.0

### Minor Changes

- [`eed076c4b`](https://github.com/chakra-ui/chakra-ui/commit/eed076c4b373efa80cf55f541774c08a7366b846)
  [#3678](https://github.com/chakra-ui/chakra-ui/pull/3678) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Fix use `getRootProps`
  from useCheckbox for the root element and memoize styles
  - Add support for `children` prop as a way to add an accessible label.

* [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc),
  [`69ae9f68e`](https://github.com/chakra-ui/chakra-ui/commit/69ae9f68e6f56e9b21660590b7a307f16b5695e8)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/checkbox@1.4.0

## 1.1.5

### Patch Changes

- Updated dependencies
  [[`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/checkbox@1.3.0
  - @chakra-ui/utils@1.4.0

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/checkbox@1.2.4

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`b99b8674f`](https://github.com/chakra-ui/chakra-ui/commit/b99b8674f1c1874d5805cb3ad2e893c0d852374f)]:
  - @chakra-ui/checkbox@1.2.3

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`01231ed49`](https://github.com/chakra-ui/chakra-ui/commit/01231ed4919521fbe911cb1b035f4beadb340fa5)]:
  - @chakra-ui/checkbox@1.2.2

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/checkbox@1.2.1

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
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`4e193f721`](https://github.com/chakra-ui/chakra-ui/commit/4e193f721fd51fd7e8d5f0fdc399a2784276a158)]:
  - @chakra-ui/checkbox@1.2.0

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/checkbox@1.1.3

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`26f28512`](https://github.com/chakra-ui/chakra-ui/commit/26f285129f6c739b24bf28ede71a5358ba4dbf9f)]:
  - @chakra-ui/checkbox@1.1.2

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/checkbox@1.1.1

## 1.0.3

### Patch Changes

- Updated dependencies
  [[`1e6db1e0`](https://github.com/chakra-ui/chakra-ui/commit/1e6db1e068c6bc0a4c6c6893d1716d284dcbb8f8)]:
  - @chakra-ui/checkbox@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/checkbox@1.0.2
  - @chakra-ui/utils@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/checkbox@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/switch

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

**Note:** Version bump only for package @chakra-ui/switch

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/switch

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/switch

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/switch

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/switch@1.0.0-rc.0...@chakra-ui/switch@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/switch@1.0.0-next.7...@chakra-ui/switch@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/switch@1.0.0-next.6...@chakra-ui/switch@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/switch@1.0.0-next.5...@chakra-ui/switch@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/switch@1.0.0-next.4...@chakra-ui/switch@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/switch

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- import statement in tests and stories for switch component
  ([e107dd9](https://github.com/chakra-ui/chakra-ui/commit/e107dd993229fdfd8131d36bf94688213466d903))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typos
  ([07f1205](https://github.com/chakra-ui/chakra-ui/commit/07f12056c9c49ab2d179a13c446294bae10bd152))
- typos
  ([25867c4](https://github.com/chakra-ui/chakra-ui/commit/25867c4d89de95f46b1a96cce8c0bc5d79c29b94))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- import statement in tests and stories for switch component
  ([e107dd9](https://github.com/chakra-ui/chakra-ui/commit/e107dd993229fdfd8131d36bf94688213466d903))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typos
  ([07f1205](https://github.com/chakra-ui/chakra-ui/commit/07f12056c9c49ab2d179a13c446294bae10bd152))
- typos
  ([25867c4](https://github.com/chakra-ui/chakra-ui/commit/25867c4d89de95f46b1a96cce8c0bc5d79c29b94))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- import statement in tests and stories for switch component
  ([e107dd9](https://github.com/chakra-ui/chakra-ui/commit/e107dd993229fdfd8131d36bf94688213466d903))
- typos
  ([07f1205](https://github.com/chakra-ui/chakra-ui/commit/07f12056c9c49ab2d179a13c446294bae10bd152))
- typos
  ([25867c4](https://github.com/chakra-ui/chakra-ui/commit/25867c4d89de95f46b1a96cce8c0bc5d79c29b94))
