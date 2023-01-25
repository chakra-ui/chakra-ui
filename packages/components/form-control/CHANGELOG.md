# Change Log

## 2.0.17

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components

## 2.0.16

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/icon@3.0.16
  - @chakra-ui/react-context@2.0.7
  - @chakra-ui/react-use-merge-refs@2.0.7
  - @chakra-ui/react-types@2.0.7
  - @chakra-ui/shared-utils@2.0.5

## 2.0.15

### Patch Changes

- Updated dependencies
  [[`c483d859d`](https://github.com/chakra-ui/chakra-ui/commit/c483d859d015d850bc871cc5156f159a7694e795)]:
  - @chakra-ui/icon@3.0.15

## 2.0.14

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
  - @chakra-ui/icon@3.0.14
  - @chakra-ui/react-context@2.0.6
  - @chakra-ui/react-use-merge-refs@2.0.6
  - @chakra-ui/react-types@2.0.6
  - @chakra-ui/shared-utils@2.0.4

## 2.0.13

### Patch Changes

- Updated dependencies
  [[`8c2af79fa`](https://github.com/chakra-ui/chakra-ui/commit/8c2af79fa44e7d93e197000bb7e67d8ff11d9f95),
  [`67ef76e32`](https://github.com/chakra-ui/chakra-ui/commit/67ef76e32369f7376ccd9242865f758157544b48)]:
  - @chakra-ui/icon@3.0.13
  - @chakra-ui/react-types@2.0.5

## 2.0.12

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
  - @chakra-ui/react-use-merge-refs@2.0.5
  - @chakra-ui/react-types@2.0.4

## 2.0.11

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/icon@3.0.11
  - @chakra-ui/react-context@2.0.4
  - @chakra-ui/react-use-merge-refs@2.0.4

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
  - @chakra-ui/icon@3.0.10

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
  - @chakra-ui/react-use-merge-refs@2.0.3
  - @chakra-ui/icon@3.0.9
  - @chakra-ui/react-types@2.0.3

## 2.0.8

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/hooks@2.0.8
  - @chakra-ui/icon@3.0.8
  - @chakra-ui/react-utils@2.0.5
  - @chakra-ui/utils@2.0.8

## 2.0.7

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/hooks@2.0.7
  - @chakra-ui/icon@3.0.7
  - @chakra-ui/react-utils@2.0.4

## 2.0.6

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/hooks@2.0.6
  - @chakra-ui/icon@3.0.6
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
  - @chakra-ui/icon@3.0.5
  - @chakra-ui/react-utils@2.0.2
  - @chakra-ui/utils@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee)]:
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/hooks@2.0.4
  - @chakra-ui/icon@3.0.4

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
  - @chakra-ui/icon@3.0.3

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
  - @chakra-ui/icon@3.0.2
  - @chakra-ui/react-utils@2.0.1
  - @chakra-ui/utils@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/hooks@2.0.1
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
  - @chakra-ui/icon@3.0.0
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
  - @chakra-ui/icon@3.0.0-next.2
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
  - @chakra-ui/icon@3.0.0-next.1
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
  - @chakra-ui/icon@3.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.6.0

### Minor Changes

- [#5618](https://github.com/chakra-ui/chakra-ui/pull/5618)
  [`56b7e198b`](https://github.com/chakra-ui/chakra-ui/commit/56b7e198bf1b0b507da0976aef80f600ae7efeb0)
  Thanks [@takethefake](https://github.com/takethefake)! - Introduced
  `optionalIndicator` for `FormLabel`

  Similar to the `RequiredIndicator` the `OptionalIndicator` signalizes when a
  field is optional.

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
  - @chakra-ui/icon@2.0.5
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/utils@1.10.4

## 1.5.7

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a),
  [`c2bcba11c`](https://github.com/chakra-ui/chakra-ui/commit/c2bcba11ca60c175b35dff10a922e600c3fd065c)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/icon@2.0.4
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
  - @chakra-ui/icon@2.0.3
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/utils@1.10.2

## 1.5.5

### Patch Changes

- [#5504](https://github.com/chakra-ui/chakra-ui/pull/5504)
  [`f149c6c9a`](https://github.com/chakra-ui/chakra-ui/commit/f149c6c9aa04b8c0abebaa6ac8dc72c7f8ceed35)
  Thanks [@Andarist](https://github.com/Andarist)! - Remove redundant `useMemo`
  from `FormControl`

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/hooks@1.8.1
  - @chakra-ui/icon@2.0.2

## 1.5.4

### Patch Changes

- Updated dependencies
  [[`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/icon@2.0.1

## 1.5.3

### Patch Changes

- Updated dependencies
  [[`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/hooks@1.7.2

## 1.5.2

### Patch Changes

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
  - @chakra-ui/hooks@1.7.1
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
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/icon@1.2.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/utils@1.9.0

## 1.4.3

### Patch Changes

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/icon@1.1.13

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/icon@1.1.12

## 1.4.1

### Patch Changes

- Updated dependencies
  [[`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/hooks@1.6.0

## 1.4.0

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

- [`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0)
  [#4437](https://github.com/chakra-ui/chakra-ui/pull/4437) Thanks
  [@Toxiapo](https://github.com/Toxiapo)! - Remove code that was added as a
  workaround for pre-releases of React concurrent mode.

* [`4981d9898`](https://github.com/chakra-ui/chakra-ui/commit/4981d9898641be3904367ef917560fef3b362720)
  [#4538](https://github.com/chakra-ui/chakra-ui/pull/4538) Thanks
  [@takethefake](https://github.com/takethefake)! - if an `aria-describedby`
  property is passed it will be joined with the id's from helper-text and
  error-message instead of being overwritten.
* Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/hooks@1.5.5
  - @chakra-ui/icon@1.1.11

## 1.3.8

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/hooks@1.5.4
  - @chakra-ui/icon@1.1.10

## 1.3.7

### Patch Changes

- Updated dependencies
  [[`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)]:
  - @chakra-ui/hooks@1.5.3

## 1.3.6

### Patch Changes

- [`620f0b7d7`](https://github.com/chakra-ui/chakra-ui/commit/620f0b7d756ffb6bfc6ddf0459e96f774ffbb9be)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  FormLabel could not be used without form-control

## 1.3.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/hooks@1.5.2
  - @chakra-ui/icon@1.1.9

## 1.3.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/hooks@1.5.1
  - @chakra-ui/icon@1.1.8

## 1.3.3

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`384902e35`](https://github.com/chakra-ui/chakra-ui/commit/384902e35b186c8c8154b9569455c27f72ee0f6f)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/hooks@1.5.0
  - @chakra-ui/icon@1.1.7

## 1.3.2

### Patch Changes

- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`d1532f0b7`](https://github.com/chakra-ui/chakra-ui/commit/d1532f0b72c36d0609ee4510613d7c76f4f9c113)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/hooks@1.4.0
  - @chakra-ui/icon@1.1.6

## 1.3.1

### Patch Changes

- [`d86a0f6b4`](https://github.com/chakra-ui/chakra-ui/commit/d86a0f6b4cfcaaf759559325c8fe8b9376f7548b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Refactor form
  label to use prop getter instead of hook for better consistency
  - Replace `withFlushSync` with `scheduleMicrotask` callback to prevent
    ReactDOM warning when an element us focused by calling `.focus()`. This
    works as well in concurrent mode.
- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/hooks@1.3.1
  - @chakra-ui/icon@1.1.5

## 1.3.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

* [`fa9350eff`](https://github.com/chakra-ui/chakra-ui/commit/fa9350eff0b907abd87cac98f9d758baed260596)
  [#3689](https://github.com/chakra-ui/chakra-ui/pull/3689) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Refactor
  `useFormControlProvider` to return prop getters `getHelpTextProps`,
  `getErrorMessageProps`, and `getRootProps`.

  Detect helper text and error message using `ref` callback instead of
  `useLayoutEffect`

  Create `useFormControlProps` to provide a way to get the resolved form control
  props `isInvalid`, `isDisabled`, instead of HTML attributes. This will make it
  easier to integrate with number-input, checkbox, and switch.

  Update `aria-describedby` id to include `feedbackId` only when `isInvalid` is
  `true`,

### Patch Changes

- [`3cc77ce60`](https://github.com/chakra-ui/chakra-ui/commit/3cc77ce60681650436f764e28b4b2234c5ca6408)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix concurrent mode
  issue with setting state in focus event handler. We use `withFlushSync` helper
  to achieve this.
- Updated dependencies
  [[`623e782e8`](https://github.com/chakra-ui/chakra-ui/commit/623e782e80124297740a109e5c6c58cddc35b2eb),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/hooks@1.3.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/icon@1.1.4

## 1.2.3

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`9c143bfe5`](https://github.com/chakra-ui/chakra-ui/commit/9c143bfe5bbf180929fabb0a1b4c18d40f7fd3fc),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/hooks@1.2.0
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/icon@1.1.3

## 1.2.2

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/icon@1.1.2

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/icon@1.1.1
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

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/icon@1.1.0
  - @chakra-ui/hooks@1.1.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1

## 1.1.1

### Patch Changes

- [`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1)
  [#3012](https://github.com/chakra-ui/chakra-ui/pull/3012) Thanks
  [@LPVua](https://github.com/LPVua)! - Fixed FormLabel margin and textAlign to
  support rtl; fixed form error icon margin to support rtl

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/icon@1.0.3

## 1.1.0

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

- [`123aaf59`](https://github.com/chakra-ui/chakra-ui/commit/123aaf59a60aaae269e2a305730a650a112c0975)
  [#2754](https://github.com/chakra-ui/chakra-ui/pull/2754) Thanks
  [@dodas](https://github.com/dodas)! - Fixed issue where `FormHelperText` was
  not rendered when its parent `FormControl` had `isInvalid` prop set to true.

* [`29c0e45e`](https://github.com/chakra-ui/chakra-ui/commit/29c0e45efb9f8f37dc2e81b56c08e2f1cedeb621)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Removed `isLoading`
  from `FormControl` prop has it doesn't add any value at the moment. We'll
  consider implementing this properly in the future.
* Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/icon@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.2

### Patch Changes

- [`ff10bcec`](https://github.com/chakra-ui/chakra-ui/commit/ff10bceca5774769766eef3a6812a22f387dd58d)
  [#2591](https://github.com/chakra-ui/chakra-ui/pull/2591) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Remove nonfunctional props
  `errorText` and `helperText` from FormControl props type definition

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/form-control

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

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-rc.0...@chakra-ui/form-control@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **input:** add suport for native required prop
  ([f27f8da](https://github.com/chakra-ui/chakra-ui/commit/f27f8da575fea7f1707d84a2884db080fbc94c60))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.7...@chakra-ui/form-control@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.6...@chakra-ui/form-control@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.5...@chakra-ui/form-control@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.4...@chakra-ui/form-control@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/form-control

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
