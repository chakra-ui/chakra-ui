# Change Log

## 1.7.0

### Minor Changes

- [`991ea2e29`](https://github.com/chakra-ui/chakra-ui/commit/991ea2e29746a501b79591228664702ce1277235)
  [#3998](https://github.com/chakra-ui/chakra-ui/pull/3998) Thanks
  [@terrierscript](https://github.com/terrierscript)! - The `styled` function
  allows a functional `baseStyle` property:

  ```js
  import { styled } from '@chakra-ui/react'

  const MyComponent = styled('div', {
    baseStyle: (props) => ({
      bg: props.highlightColor
    })
  })

  // ...

  <MyComponent highlightColor="red.500" />
  ```

### Patch Changes

- Updated dependencies
  [[`ebda07095`](https://github.com/chakra-ui/chakra-ui/commit/ebda07095bffd9b3135c5d19803a3a08397b78ef)]:
  - @chakra-ui/styled-system@1.12.0
  - @chakra-ui/color-mode@1.1.9

## 1.6.7

### Patch Changes

- Updated dependencies
  [[`d9d66a9e8`](https://github.com/chakra-ui/chakra-ui/commit/d9d66a9e876f076ffd1c8bb531fd03e9074d325f)]:
  - @chakra-ui/styled-system@1.11.1

## 1.6.6

### Patch Changes

- [`ddd5ef4a1`](https://github.com/chakra-ui/chakra-ui/commit/ddd5ef4a1e9cc988c99b80c26579205ea4c57b2f)
  [#3985](https://github.com/chakra-ui/chakra-ui/pull/3985) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Attach CSS vars to
  `:host, :root` to fix usage in shadow dom.

- Updated dependencies
  [[`773497896`](https://github.com/chakra-ui/chakra-ui/commit/773497896e65ffbbda10e75b6e0a7bb5b68c853a)]:
  - @chakra-ui/styled-system@1.11.0

## 1.6.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/styled-system@1.10.5
  - @chakra-ui/color-mode@1.1.8

## 1.6.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/color-mode@1.1.7
  - @chakra-ui/styled-system@1.10.4

## 1.6.3

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`a11810f70`](https://github.com/chakra-ui/chakra-ui/commit/a11810f705f0731f5ddc967a59b6899dfe8d5050)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/styled-system@1.10.3
  - @chakra-ui/color-mode@1.1.6

## 1.6.2

### Patch Changes

- [`000402a2c`](https://github.com/chakra-ui/chakra-ui/commit/000402a2c720878a06a63152a332b15efd79814f)
  [#3805](https://github.com/chakra-ui/chakra-ui/pull/3805) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow passing custom props
  to useStyleConfig

* [`a73198529`](https://github.com/chakra-ui/chakra-ui/commit/a7319852908f68596600da799ef08a0e7dbb468e)
  [#3775](https://github.com/chakra-ui/chakra-ui/pull/3775) Thanks
  [@tomchentw](https://github.com/tomchentw)! - Add missing dependency issue of
  `@chakra-ui/react-utils`

* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/color-mode@1.1.5
  - @chakra-ui/styled-system@1.10.2

## 1.6.1

### Patch Changes

- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/color-mode@1.1.4
  - @chakra-ui/styled-system@1.10.1

## 1.6.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- [`36252981a`](https://github.com/chakra-ui/chakra-ui/commit/36252981a6e38ed138b5f41e0d50d01a19b4b77c)
  [#3636](https://github.com/chakra-ui/chakra-ui/pull/3636) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Fixed an issue where the
  `StylesProvider` export was not working in every environment
  - Add style config for `rotateX`, `rotateY`, `scaleX`, `scaleY`
- Updated dependencies
  [[`32e79f835`](https://github.com/chakra-ui/chakra-ui/commit/32e79f83545740e1df73e7ce689e4101646bb57d),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/styled-system@1.10.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/color-mode@1.1.3

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`a576f4de8`](https://github.com/chakra-ui/chakra-ui/commit/a576f4de850706ea7088c8a6ea687269cad05e69)]:
  - @chakra-ui/styled-system@1.9.1

## 1.5.0

### Minor Changes

- [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c)
  [#3529](https://github.com/chakra-ui/chakra-ui/pull/3529) Thanks
  [@callum-mellorreed-privitar](https://github.com/callum-mellorreed-privitar)! -
  Add support for `textStyle` and `layerStyle` theme type generation to
  `@chakra-ui/cli`

### Patch Changes

- [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b)
  [#3551](https://github.com/chakra-ui/chakra-ui/pull/3551) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix: only return an array
  in `toCSSObject` when `css` prop is passed.

- Updated dependencies
  [[`d70515fc2`](https://github.com/chakra-ui/chakra-ui/commit/d70515fc20279b5b2acf9a2db2bda0289b8c5408),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c),
  [`c3dcaabbc`](https://github.com/chakra-ui/chakra-ui/commit/c3dcaabbcf52ab9805a622f4e9833ad26cad9318),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b)]:
  - @chakra-ui/color-mode@1.1.2
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/styled-system@1.9.0

## 1.4.0

### Minor Changes

- [`53408372e`](https://github.com/chakra-ui/chakra-ui/commit/53408372ef6926840815a03f2ac5269e3a4757f2)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for CSS
  Variables to the core of Chakra
  - Improve style computation performance by 2.5x

* [`1f4d0aa4e`](https://github.com/chakra-ui/chakra-ui/commit/1f4d0aa4eff7ba3caffb0599eb81edfb223a36cc)
  [#3462](https://github.com/chakra-ui/chakra-ui/pull/3462) Thanks
  [@joe-bell](https://github.com/joe-bell)! - ### `chakra`

  Adds support for `main` in chakra factory

### Patch Changes

- Updated dependencies
  [[`53408372e`](https://github.com/chakra-ui/chakra-ui/commit/53408372ef6926840815a03f2ac5269e3a4757f2),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/styled-system@1.8.0
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/color-mode@1.1.1

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`e8113d3ca`](https://github.com/chakra-ui/chakra-ui/commit/e8113d3ca66e9d45ac2dbb7109ff8904cbfd1134),
  [`4943a15c0`](https://github.com/chakra-ui/chakra-ui/commit/4943a15c084fd2e66ab0dbf273233630d006dc5a),
  [`7f3bb3584`](https://github.com/chakra-ui/chakra-ui/commit/7f3bb35841f81e9e29a356b3070ac9fd28352731)]:
  - @chakra-ui/styled-system@1.7.1
  - @chakra-ui/color-mode@1.1.0

## 1.3.0

### Minor Changes

- [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087)
  [#3245](https://github.com/chakra-ui/chakra-ui/pull/3245) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  responsive values when using `apply`, `textStyle` and `layerStyle`.

### Patch Changes

- Updated dependencies
  [[`ef34c10a0`](https://github.com/chakra-ui/chakra-ui/commit/ef34c10a0c3cfda6bafcca4aa287dfb82f130aeb),
  [`a97e42568`](https://github.com/chakra-ui/chakra-ui/commit/a97e42568c4470d6cd1e16b48429af93c52def49),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`9dc37ee37`](https://github.com/chakra-ui/chakra-ui/commit/9dc37ee37575650746e9b006e41428f1bf53e16c),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/styled-system@1.7.0
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/color-mode@1.0.7

## 1.2.1

### Patch Changes

- [`2575d6957`](https://github.com/chakra-ui/chakra-ui/commit/2575d6957feb6da82775aacf6fe633b50ca3f81e)
  [#3221](https://github.com/chakra-ui/chakra-ui/pull/3221) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow string values for
  ThemingProps['colorScheme']

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
  [[`e434aed4a`](https://github.com/chakra-ui/chakra-ui/commit/e434aed4a7d769d0c6e98e048b2100f0efed277a),
  [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`e859a9fc1`](https://github.com/chakra-ui/chakra-ui/commit/e859a9fc1bd906801a490dceeb507cca0684a192)]:
  - @chakra-ui/styled-system@1.6.0
  - @chakra-ui/color-mode@1.0.6

## 1.1.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/color-mode@1.0.5

## 1.1.6

### Patch Changes

- Updated dependencies
  [[`d9ec9f49`](https://github.com/chakra-ui/chakra-ui/commit/d9ec9f496bfe2f81ffb84adbed099581d5f6843e),
  [`26ca4cc5`](https://github.com/chakra-ui/chakra-ui/commit/26ca4cc53b8cc0ca696f2130f832965f7dc0ee53)]:
  - @chakra-ui/styled-system@1.5.0
  - @chakra-ui/color-mode@1.0.4

## 1.1.5

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/color-mode@1.0.3
  - @chakra-ui/styled-system@1.4.1

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`ff7c3676`](https://github.com/chakra-ui/chakra-ui/commit/ff7c36764650dc7f01957c417eae1ec8ce356495),
  [`6830c0e3`](https://github.com/chakra-ui/chakra-ui/commit/6830c0e36959ebd76ce1991dd89d7303ce33b0d0),
  [`09f028e4`](https://github.com/chakra-ui/chakra-ui/commit/09f028e4f2539d51b1c9ac7f3aec422ee6848fa3)]:
  - @chakra-ui/styled-system@1.4.0

## 1.1.3

### Patch Changes

- [`a9807b33`](https://github.com/chakra-ui/chakra-ui/commit/a9807b334477ac9ecd7f3637c0ff7d5fb5c46639)
  [#2753](https://github.com/chakra-ui/chakra-ui/pull/2753) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Restored TypeScript
  autocomplete for chakra component props in Jetbrains IDEs.

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`5cef5de4`](https://github.com/chakra-ui/chakra-ui/commit/5cef5de4f45cd58f7a29436335543cb5b40c0d70)]:
  - @chakra-ui/styled-system@1.3.1

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`a0e0bd9a`](https://github.com/chakra-ui/chakra-ui/commit/a0e0bd9a5d45fe08887f8df8d3eccc84951578df),
  [`4fa07745`](https://github.com/chakra-ui/chakra-ui/commit/4fa077453a5c2165b695198c57366f3cc6506c37)]:
  - @chakra-ui/styled-system@1.3.0

## 1.1.0

### Minor Changes

- [`730a2da1`](https://github.com/chakra-ui/chakra-ui/commit/730a2da19b652614bc051b9f80313d211b22d1de)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## Pin Input

  ### 🐛 Bug Fix

  - Fix issue where copy-paste doesn't work for pin-input

  ## Number Input

  ### 🐛 Bug Fix

  - Fix issue where number input doesn't work when using with form libraries
    that use `ref` as entry point to setting initial values (e.g React hook
    form).

    We improved `useNumberInput` to sync the initial values in the `ref` passed
    to `NumberInputField` with the internal state.

  ## System

  ### 🚀 Feature

  Add support for custom `shouldForwardProp` function in the `chakra` factory
  function.

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5),
  [`609ac595`](https://github.com/chakra-ui/chakra-ui/commit/609ac595568799c9f2c38ccbc9ef44fdc7393baa)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/styled-system@1.2.0
  - @chakra-ui/color-mode@1.0.2

## 1.0.2

### Patch Changes

- [`653f3dd6`](https://github.com/chakra-ui/chakra-ui/commit/653f3dd6f30a17e366c069666acbfd9eddb11936)
  [#2709](https://github.com/chakra-ui/chakra-ui/pull/2709) Thanks
  [@with-heart](https://github.com/with-heart)! - Added default empty object
  argument values for the `props` and `opts` arguments of `useStyleConfig`.
- Updated dependencies
  [[`127baa0f`](https://github.com/chakra-ui/chakra-ui/commit/127baa0f1926bf1f8ace6f46cfdc08606fe9d347)]:
  - @chakra-ui/styled-system@1.1.1

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`586ce3c1`](https://github.com/chakra-ui/chakra-ui/commit/586ce3c12bb3508027c36811233c539eeeb55256),
  [`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/styled-system@1.1.0
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/color-mode@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/system

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

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-rc.0...@chakra-ui/system@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- connect drawer its correct theming
  ([9ed9d3a](https://github.com/chakra-ui/chakra-ui/commit/9ed9d3aea959f38198b1ba0d48c24686630aee90))

### Features

- **system:** extend props
  ([645c683](https://github.com/chakra-ui/chakra-ui/commit/645c683ef71ad5ef5b3aa60e7e2880853df1683f))
- added cookieStorageManager. still WIP
  ([9a9c305](https://github.com/chakra-ui/chakra-ui/commit/9a9c305d9c4ae7b5b44271e633c8a3bad81df066))
- cleaned up some storageManager code. set color mode cookie to expire after a
  year
  ([d7ca15e](https://github.com/chakra-ui/chakra-ui/commit/d7ca15e6be9b393ed42cfc1a394d2872d7a8e5df))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.7...@chakra-ui/system@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.6...@chakra-ui/system@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- give priority to props overrides
  ([f2fe955](https://github.com/chakra-ui/chakra-ui/commit/f2fe9553373da4734712a90fec284eea7a951dfb))
- null exception for style config
  ([c28ba5a](https://github.com/chakra-ui/chakra-ui/commit/c28ba5ac075cc5c8f30806e269ed36632c01d6ea))

### Features

- add support for single and multipart config
  ([a13d0f8](https://github.com/chakra-ui/chakra-ui/commit/a13d0f8a3d97405bde6acba1c4fc126677154a8b))

### Reverts

- breakpoint handling
  ([f3ee5f1](https://github.com/chakra-ui/chakra-ui/commit/f3ee5f15c48da242c4d4d43de0dc67ff7664c81e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.5...@chakra-ui/system@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.4...@chakra-ui/system@1.0.0-next.5) (2020-07-15)

### Performance Improvements

- improve system pkg
  ([eebec47](https://github.com/chakra-ui/chakra-ui/commit/eebec479c6c40324833cc1beed0b540c4687d805))
- some more improvements
  ([daf94a5](https://github.com/chakra-ui/chakra-ui/commit/daf94a50f6abc9773c9552ec08b5ebf5f1cb05b9))
- some more improvements
  ([3382bab](https://github.com/chakra-ui/chakra-ui/commit/3382bab224f29f082d2a9ba2b4b2721257fbdfac))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- bug i created :)
  ([352eece](https://github.com/chakra-ui/chakra-ui/commit/352eece27b7df1a061e9d365d9b54e6beeeffd90))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update border-radius style prop and fix w style prop
  ([09df03f](https://github.com/chakra-ui/chakra-ui/commit/09df03fba7321ae50d4d3107aaf89b1956ed3463))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- add support for inline-variant
  ([67bf6ad](https://github.com/chakra-ui/chakra-ui/commit/67bf6adf2bf8f3270b75f83382c2acbb8db07155))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- bug i created :)
  ([352eece](https://github.com/chakra-ui/chakra-ui/commit/352eece27b7df1a061e9d365d9b54e6beeeffd90))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update border-radius style prop and fix w style prop
  ([09df03f](https://github.com/chakra-ui/chakra-ui/commit/09df03fba7321ae50d4d3107aaf89b1956ed3463))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- add support for inline-variant
  ([67bf6ad](https://github.com/chakra-ui/chakra-ui/commit/67bf6adf2bf8f3270b75f83382c2acbb8db07155))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- bug i created :)
  ([352eece](https://github.com/chakra-ui/chakra-ui/commit/352eece27b7df1a061e9d365d9b54e6beeeffd90))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- update border-radius style prop and fix w style prop
  ([09df03f](https://github.com/chakra-ui/chakra-ui/commit/09df03fba7321ae50d4d3107aaf89b1956ed3463))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- add support for inline-variant
  ([67bf6ad](https://github.com/chakra-ui/chakra-ui/commit/67bf6adf2bf8f3270b75f83382c2acbb8db07155))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))
