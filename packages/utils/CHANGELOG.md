# Change Log

## 1.8.3

### Patch Changes

- [`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669)
  [#4795](https://github.com/chakra-ui/chakra-ui/pull/4795) Thanks
  [@Toxiapo](https://github.com/Toxiapo)! - Fixed iframe bug on firefox when
  using `getRelatedTarget` function

* [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)
  [#4803](https://github.com/chakra-ui/chakra-ui/pull/4803) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where pan-event
  utils don't work within iframe

## 1.8.2

### Patch Changes

- [`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0)
  [#4437](https://github.com/chakra-ui/chakra-ui/pull/4437) Thanks
  [@Toxiapo](https://github.com/Toxiapo)! - Remove code that was added as a
  workaround for pre-releases of React concurrent mode.

* [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)
  [#4458](https://github.com/chakra-ui/chakra-ui/pull/4458) Thanks
  [@agundermann](https://github.com/agundermann)! - Fix issues when rendering
  chakra components in different window

## 1.8.1

### Patch Changes

- [`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)
  [#4305](https://github.com/chakra-ui/chakra-ui/pull/4305) Thanks
  [@MasterGordon](https://github.com/MasterGordon)! - Fixed a circular
  dependency which was causing warnings when bundling Chakra with `rollup`.

## 1.8.0

### Minor Changes

- [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab)
  [#3930](https://github.com/chakra-ui/chakra-ui/pull/3930) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Add types for the return
  value of `pipe` function
  - Update user agent assertions

* [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)
  [#3850](https://github.com/chakra-ui/chakra-ui/pull/3850) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Add walkObject helper to
  iterate over all keys including nested

### Patch Changes

- [`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - `PanSession` class

  - Add velocity data to pointer pan event
  - Add `onSessionStart` to pan event handlers

## 1.7.0

### Minor Changes

- [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)
  [#3511](https://github.com/chakra-ui/chakra-ui/pull/3511) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Add `pipe` function
  - Add generic to `isFunction` guard

## 1.6.0

### Minor Changes

- [`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add lazy content
  utility for disclosure components like popover, menu, tab, etc.

* [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)
  [#3836](https://github.com/chakra-ui/chakra-ui/pull/3836) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add pan session class to
  handle pan gestures. This is used in the slider logic and sharable with vue
  library.

  - Perf: Throttle pan move events to once per frame which improves the slider's
    `onChange` call performance.

  - Update types for internal pointer event

## 1.5.2

### Patch Changes

- [`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - update type
  signature for `px` function

## 1.5.1

### Patch Changes

- [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update import of
  shared utils from `react-utils` to `utils`

* [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Extract functions
  from `react-utils` back to `utils` package
  - Remove `withFlushSync` function in favor of using a microtask callback
  - Import types for `warn` function

## 1.5.0

### Minor Changes

- [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `withFlushSync`
  function wrapper to help resolve concurrent mode and onFocus state issues.

  > This is a temp fix until the issue is fixed in React.

* [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

## 1.4.0

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

* [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)
  [#3583](https://github.com/chakra-ui/chakra-ui/pull/3583) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add `getCSSVar` function
  to resolve token values and return the css variable reference instead of the
  actual value. It does a lookup against `theme.__cssMap`.

  ```jsx
  const value = getCSSVar(theme, "colors", "blue.500")
  // => "var(--chakra-colors-blue.500)"

  const value = getCSSVar(theme, "colors", "tomato")
  // => "tomato" // since tomato doesn't exist in theme colors
  ```

## 1.3.0

### Minor Changes

- [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Move responsive utilities
  to utils to prevent duplicate work

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
