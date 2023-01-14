# Change Log

## 2.0.17

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- [#7216](https://github.com/chakra-ui/chakra-ui/pull/7216)
  [`08e3ffc4a`](https://github.com/chakra-ui/chakra-ui/commit/08e3ffc4ad6f138ad06e5046320949b2c487029e)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fixed issue where
  `ReactIcon` was not exported

- Updated dependencies
  [[`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/icon@3.0.16

## 2.0.16

### Patch Changes

- Updated dependencies
  [[`c483d859d`](https://github.com/chakra-ui/chakra-ui/commit/c483d859d015d850bc871cc5156f159a7694e795)]:
  - @chakra-ui/icon@3.0.15

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
  - @chakra-ui/icon@3.0.14

## 2.0.14

### Patch Changes

- [`37b7a130a`](https://github.com/chakra-ui/chakra-ui/commit/37b7a130aaff0cbb97f206978315075eb06e5100)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `ReactIcon` to
  align with Figma UI Kit

- Updated dependencies []:
  - @chakra-ui/icon@3.0.13

## 2.0.13

### Patch Changes

- Updated dependencies
  [[`8c2af79fa`](https://github.com/chakra-ui/chakra-ui/commit/8c2af79fa44e7d93e197000bb7e67d8ff11d9f95)]:
  - @chakra-ui/icon@3.0.13

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

## 2.0.11

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)]:
  - @chakra-ui/icon@3.0.11

## 2.0.10

### Patch Changes

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
  - @chakra-ui/icon@3.0.9

## 2.0.8

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/icon@3.0.8

## 2.0.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@3.0.7

## 2.0.6

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/icon@3.0.6

## 2.0.5

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/icon@3.0.5

## 2.0.4

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@3.0.4

## 2.0.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@3.0.3

## 2.0.2

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/icon@3.0.2

## 2.0.1

### Patch Changes

- Updated dependencies []:
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
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/icon@3.0.0

## 2.0.0-next.2

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/icon@3.0.0-next.2

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

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)]:
  - @chakra-ui/icon@3.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0

## 1.1.7

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/icon@2.0.5

## 1.1.6

### Patch Changes

- Updated dependencies
  [[`c2bcba11c`](https://github.com/chakra-ui/chakra-ui/commit/c2bcba11ca60c175b35dff10a922e600c3fd065c)]:
  - @chakra-ui/icon@2.0.4

## 1.1.5

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/icon@2.0.3

## 1.1.4

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@2.0.2

## 1.1.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@2.0.1

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`17400aff6`](https://github.com/chakra-ui/chakra-ui/commit/17400aff62601c1b70dcc4e60af1fadf3915f3e0)]:
  - @chakra-ui/icon@2.0.0

## 1.1.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/icon@1.2.1

## 1.1.0

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

## 1.0.17

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.13

## 1.0.16

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.12

## 1.0.15

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.11

## 1.0.14

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.10

## 1.0.13

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.9

## 1.0.12

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.8

## 1.0.11

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.7

## 1.0.10

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.6

## 1.0.9

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.5

## 1.0.8

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.4

## 1.0.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.3

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.2

## 1.0.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.1

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)]:
  - @chakra-ui/icon@1.1.0

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/icons

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

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-rc.0...@chakra-ui/icons@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.7...@chakra-ui/icons@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.6...@chakra-ui/icons@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- **icons:** add displayName to hamburger icon
  ([045091d](https://github.com/chakra-ui/chakra-ui/commit/045091d57768270b5a9e95d457ff3ceb67600a40))
- **icons:** Fix viewBox on DragHandleIcon
  ([3ed2b9f](https://github.com/chakra-ui/chakra-ui/commit/3ed2b9ff034b6c75f6bdd55fd4606db2e52d3b8b))

### Features

- **icons:** add hamburger(menu) icon
  ([69e72fa](https://github.com/chakra-ui/chakra-ui/commit/69e72faa9b27e4f5451283feb88339fbcc0d3f46))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.5...@chakra-ui/icons@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.4...@chakra-ui/icons@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- **delete-icon:** svg path
  ([9754911](https://github.com/chakra-ui/chakra-ui/commit/9754911bf2f0cb9ae9d099c05551259547cd57ac))
- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- updated viewBox because the DownloadIcon was too small
  ([37b1f3f](https://github.com/chakra-ui/chakra-ui/commit/37b1f3f6d36ceca63af2d69e6a6a5554bb1a970b))

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
