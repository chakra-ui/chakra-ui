# Change Log

## 2.0.12

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

## 2.0.11

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

## 2.0.10

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.

## 2.0.9

### Patch Changes

- [#6898](https://github.com/chakra-ui/chakra-ui/pull/6898)
  [`8705372a0`](https://github.com/chakra-ui/chakra-ui/commit/8705372a014bfd7073fe8012a46d7aa22904370b)
  Thanks [@leomelzer](https://github.com/leomelzer)! - fix(css-reset): Use dvh
  unit if supported

  This allows the user agent to dynamically adapt the height of a Modal,
  depending on what parts of the UI (e.g. address bar) are visible.

## 2.0.8

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

## 2.0.7

### Patch Changes

- [`cc0598ddc`](https://github.com/chakra-ui/chakra-ui/commit/cc0598ddcb2a4e7f84859099556c228c5ff354fe)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix css in 100vh
  polyfill

## 2.0.6

### Patch Changes

- [#6559](https://github.com/chakra-ui/chakra-ui/pull/6559)
  [`0cae42007`](https://github.com/chakra-ui/chakra-ui/commit/0cae42007308e94ef9a9fdbae3de259871ca33be)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactors the theme
  to use design tokens and css variables as much as possible.

  Improve support for `100vh` values by using a polyfill css variable
  `--chakra-vh`.

## 2.0.5

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation

## 2.0.4

### Patch Changes

- Force release

## 2.0.3

### Patch Changes

- Force new release

## 2.0.2

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries

## 2.0.1

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

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

- [#5953](https://github.com/chakra-ui/chakra-ui/pull/5953)
  [`8a57d75f2`](https://github.com/chakra-ui/chakra-ui/commit/8a57d75f2a311b0732bcf0360ef6501da05654a8)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - When using the
  focus-visible package, you can now opt out of the automatic focus style
  override by adding `data-focus-visible-disabled` to a DOM element.

## 2.0.0-next.3

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

## 2.0.0-next.2

### Patch Changes

- [#5953](https://github.com/chakra-ui/chakra-ui/pull/5953)
  [`8a57d75f2`](https://github.com/chakra-ui/chakra-ui/commit/8a57d75f2a311b0732bcf0360ef6501da05654a8)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - When using the
  focus-visible package, you can now opt out of the automatic focus style
  override by adding `data-focus-visible-disabled` to a DOM element.

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

## 1.1.3

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.

## 1.1.2

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

## 1.1.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.

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

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/css-reset

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

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-rc.0...@chakra-ui/css-reset@1.0.0-rc.1) (2020-08-06)

### Features

- add svg improvements in css reset
  ([071c329](https://github.com/chakra-ui/chakra-ui/commit/071c329ebc40a91443a07bebbbacb009c71e55fb))
- move font feature settings to stat and add default to css reset
  ([2c1ba4b](https://github.com/chakra-ui/chakra-ui/commit/2c1ba4be4b024d596ee0daf0ca1b8e3cf7c77087))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.7...@chakra-ui/css-reset@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.6...@chakra-ui/css-reset@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- issue with input element ui and css-reset
  ([cc221de](https://github.com/chakra-ui/chakra-ui/commit/cc221de6878530d572c8f80032dad150d022c81c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.5...@chakra-ui/css-reset@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.4...@chakra-ui/css-reset@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **select:** remove duplicate Select arrow in ie11
  ([c21681b](https://github.com/chakra-ui/chakra-ui/commit/c21681b982322b6af957b49ec484ac62020b90b5))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **select:** remove duplicate Select arrow in ie11
  ([c21681b](https://github.com/chakra-ui/chakra-ui/commit/c21681b982322b6af957b49ec484ac62020b90b5))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- **select:** remove duplicate Select arrow in ie11
  ([c21681b](https://github.com/chakra-ui/chakra-ui/commit/c21681b982322b6af957b49ec484ac62020b90b5))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))
