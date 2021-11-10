# Change Log

## 1.2.0

### Minor Changes

- [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)
  [#3291](https://github.com/chakra-ui/chakra-ui/pull/3291) Thanks
  [@dominictwlee](https://github.com/dominictwlee)! - Support negative scale
  values for css variables.

### Patch Changes

- [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087)
  [#3245](https://github.com/chakra-ui/chakra-ui/pull/3245) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Removed `objectAssign`
  function in favor of using native `Object.assign` method. It is
  [now supported in most browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#browser_compatibility)

  This function is only used once in the `system` package as well. This PR
  simply removes it to cut bundle size of utils. Less is more 😃.

* [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285)
  [#3283](https://github.com/chakra-ui/chakra-ui/pull/3283) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update focus util to
  handle unsupported browsers (Safari), and ability to opt out of
  `requestAnimationFrame`

## 1.1.0

### Minor Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Added a `compose` function

## 1.0.2

### Patch Changes

- [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)
  [#2790](https://github.com/chakra-ui/chakra-ui/pull/2790) Thanks
  [@yuzima](https://github.com/yuzima)! - Resolved an issue where custom
  breakpoints prefixed with a number ("2xl") weren't detected

## 1.0.1

### Patch Changes

- [`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)
  [#2562](https://github.com/chakra-ui/chakra-ui/pull/2562) Thanks
  [@LaurenceGGush](https://github.com/LaurenceGGush)! - Fix memory leak in
  `utils/objects.ts`

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/utils

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

**Note:** Version bump only for package @chakra-ui/utils

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/utils

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/utils

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/utils

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/utils@1.0.0-rc.0...@chakra-ui/utils@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/utils@1.0.0-next.7...@chakra-ui/utils@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/utils@1.0.0-next.6...@chakra-ui/utils@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- prevent issue where right click triggers active css state
  ([4ea9b88](https://github.com/chakra-ui/chakra-ui/commit/4ea9b8872599168f7a6ecb078b62f3473a25b4d8))

### Features

- add popover transition and merge props util
  ([112ff7b](https://github.com/chakra-ui/chakra-ui/commit/112ff7b53d7618f9a1442efa2fb427491a5fc51c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/utils@1.0.0-next.5...@chakra-ui/utils@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/utils@1.0.0-next.4...@chakra-ui/utils@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- [#1180](https://github.com/chakra-ui/chakra-ui/issues/1180) slider moving
  incorrectly when min is odd and step is even
  ([4038ad4](https://github.com/chakra-ui/chakra-ui/commit/4038ad4b5ee52f275919b046cc916cdfe73800f8))

### Features

- **css:** allow object notation for responsive props in css
  ([08c0029](https://github.com/chakra-ui/chakra-ui/commit/08c00290034ee096ee2cb56ae1402b632cc509ad))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- fix utils test
  ([64163cd](https://github.com/chakra-ui/chakra-ui/commit/64163cd80e00f562f1dc5aef23fd25faeb19de31))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- storybook rendering issues
  ([b2281b8](https://github.com/chakra-ui/chakra-ui/commit/b2281b8685509b669c14076e4a38fe91d0a112f1))
- typo in utils readme
  ([70d4ecb](https://github.com/chakra-ui/chakra-ui/commit/70d4ecbb655c7a7b5535605211262909b68f6706))

### Features

- add more util tests
  ([f9edcf9](https://github.com/chakra-ui/chakra-ui/commit/f9edcf96fae3d55753bfd3ee86de5edebc6bac88))
- add tests for dom utls
  ([8898ef2](https://github.com/chakra-ui/chakra-ui/commit/8898ef29e0dd6cc6eb43b2393b8bd283c09264fc))
- handle null values in mapResponsive
  ([f371eb2](https://github.com/chakra-ui/chakra-ui/commit/f371eb26bc3dbb8aa538f92508dda4ea8ddffbd4))
- implement assertion test and initialize all utils test files
  ([5a077ff](https://github.com/chakra-ui/chakra-ui/commit/5a077ff02f3b748ed565aac79aaad72fe0d21f11))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))
- implement style props parser
  ([e1a6382](https://github.com/chakra-ui/chakra-ui/commit/e1a63824e85c19590ddf67069cbe40827ac0faa6))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- fix utils test
  ([64163cd](https://github.com/chakra-ui/chakra-ui/commit/64163cd80e00f562f1dc5aef23fd25faeb19de31))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- storybook rendering issues
  ([b2281b8](https://github.com/chakra-ui/chakra-ui/commit/b2281b8685509b669c14076e4a38fe91d0a112f1))
- typo in utils readme
  ([70d4ecb](https://github.com/chakra-ui/chakra-ui/commit/70d4ecbb655c7a7b5535605211262909b68f6706))

### Features

- add more util tests
  ([f9edcf9](https://github.com/chakra-ui/chakra-ui/commit/f9edcf96fae3d55753bfd3ee86de5edebc6bac88))
- add tests for dom utls
  ([8898ef2](https://github.com/chakra-ui/chakra-ui/commit/8898ef29e0dd6cc6eb43b2393b8bd283c09264fc))
- handle null values in mapResponsive
  ([f371eb2](https://github.com/chakra-ui/chakra-ui/commit/f371eb26bc3dbb8aa538f92508dda4ea8ddffbd4))
- implement assertion test and initialize all utils test files
  ([5a077ff](https://github.com/chakra-ui/chakra-ui/commit/5a077ff02f3b748ed565aac79aaad72fe0d21f11))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))
- implement style props parser
  ([e1a6382](https://github.com/chakra-ui/chakra-ui/commit/e1a63824e85c19590ddf67069cbe40827ac0faa6))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- fix utils test
  ([64163cd](https://github.com/chakra-ui/chakra-ui/commit/64163cd80e00f562f1dc5aef23fd25faeb19de31))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- storybook rendering issues
  ([b2281b8](https://github.com/chakra-ui/chakra-ui/commit/b2281b8685509b669c14076e4a38fe91d0a112f1))

### Features

- add more util tests
  ([f9edcf9](https://github.com/chakra-ui/chakra-ui/commit/f9edcf96fae3d55753bfd3ee86de5edebc6bac88))
- add tests for dom utls
  ([8898ef2](https://github.com/chakra-ui/chakra-ui/commit/8898ef29e0dd6cc6eb43b2393b8bd283c09264fc))
- implement assertion test and initialize all utils test files
  ([5a077ff](https://github.com/chakra-ui/chakra-ui/commit/5a077ff02f3b748ed565aac79aaad72fe0d21f11))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))
- implement style props parser
  ([e1a6382](https://github.com/chakra-ui/chakra-ui/commit/e1a63824e85c19590ddf67069cbe40827ac0faa6))
