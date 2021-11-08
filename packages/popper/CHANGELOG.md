# Change Log

## 2.3.1

### Patch Changes

- [`c3f016149`](https://github.com/chakra-ui/chakra-ui/commit/c3f01614929d2f68a39cf78111d17f4f4c684706)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Remove default `[]`
  value for modifiers and moved it into `createPopper` definition. This allows
  memoized modifiers to work correctly in user-land when used with
  `useCallback`.

## 2.3.0

### Minor Changes

- [`4146a9051`](https://github.com/chakra-ui/chakra-ui/commit/4146a9051a5151532503e31c464193e9d118dd26)
  [#3837](https://github.com/chakra-ui/chakra-ui/pull/3837) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - `usePopper` now accepts a
  `direction` prop so it can handle placement for RTL languages. Values such as
  `top-start`, `top-end`, `bottom-start` and `bottom-end` will be flipped
  depending on the theme's direction value.

  In addition to the default `popper.js` placement, you can pass `start-start`,
  `start-end`, `end-start` and `end-end`. This will resolve to the equivalent
  `popper.js` placement as well.

## 2.2.1

### Patch Changes

- [`5afa7ef49`](https://github.com/chakra-ui/chakra-ui/commit/5afa7ef49c7e3b01bce932e252865226b9511b39)
  [#4180](https://github.com/chakra-ui/chakra-ui/pull/4180) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Wrap force update within
  a function to prevent null scenarios
  - Add default `inset` value to prevent overflow in scenarios where `enabled`
    is `false` (i.e. when the popper is not visible)

## 2.2.0

### Minor Changes

- [`5e24481fc`](https://github.com/chakra-ui/chakra-ui/commit/5e24481fc73b0097d0bac900479d7cc145a92670)
  [#4026](https://github.com/chakra-ui/chakra-ui/pull/4026) Thanks
  [@dodas](https://github.com/dodas)! - Add `enabled` option to `usePopper`
  hook.

  The `popper.js` instance will not be created until this option is `true`.

  `Menu`, `Popover` and `Tooltip` components now use this option, so the
  `popper.js` instance is created only once the popper is open. This should
  significantly improve render and scroll performance.

## 2.1.2

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f)]:
  - @chakra-ui/react-utils@1.1.2

## 2.1.1

### Patch Changes

- [`1615af488`](https://github.com/chakra-ui/chakra-ui/commit/1615af4881a6f37cffb7ea15078cf7ab6a4e4c79)
  [#3786](https://github.com/chakra-ui/chakra-ui/pull/3786) Thanks
  [@navarroaxel](https://github.com/navarroaxel)! - Update README for the
  `popper.js` wrapper.

## 2.1.0

### Minor Changes

- [`75817ec42`](https://github.com/chakra-ui/chakra-ui/commit/75817ec428ca3c078660a7c7f2a1c1b578c474df)
  [#3733](https://github.com/chakra-ui/chakra-ui/pull/3733) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add prop getters for
  popper and arrow for better ssr support

  Replace `utils` dependency with `react-utils`

### Patch Changes

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0

## 2.0.0

### Major Changes

- [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)
  [#3583](https://github.com/chakra-ui/chakra-ui/pull/3583) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Refactor the positioning
  logic to improve stability and leverage CSS custom properties

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.1.5

### Patch Changes

- [`e1924c621`](https://github.com/chakra-ui/chakra-ui/commit/e1924c62182969a109b4900b05932caa1b73ed99)
  [#3477](https://github.com/chakra-ui/chakra-ui/pull/3477) Thanks
  [@tomdohnal](https://github.com/tomdohnal)! - make the react-popper state in
  sync with the internal popper instance state

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0

## 1.1.4

### Patch Changes

- [`51ad518e2`](https://github.com/chakra-ui/chakra-ui/commit/51ad518e22642076485bee3dd1f99acbf025161b)
  [#3343](https://github.com/chakra-ui/chakra-ui/pull/3343) Thanks
  [@dodas](https://github.com/dodas)! - The Popper.js instance is now created
  only once it is actually needed for positioning.

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/hooks@1.1.4

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2

## 1.1.0

### Minor Changes

- [`032f1678`](https://github.com/chakra-ui/chakra-ui/commit/032f16788553b84685de61af5f021c395e09648f)
  [#3022](https://github.com/chakra-ui/chakra-ui/pull/3022) Thanks
  [@dodas](https://github.com/dodas)! - Added `enabled` property to `usePopper`.
  Popper won't be updated while it is set to `false`.

  `Menu` now uses this option to not update its position while it's closed.

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

**Note:** Version bump only for package @chakra-ui/popper

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

**Note:** Version bump only for package @chakra-ui/popper

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/popper

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/popper

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/popper

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/popper

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/popper

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popper@1.0.0-rc.0...@chakra-ui/popper@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))

### Features

- update popper hook and use-clipboard
  ([2659f60](https://github.com/chakra-ui/chakra-ui/commit/2659f60b7d44815c7638d2bc03eb6a97ad7bc581))

### Performance Improvements

- improve popper hook
  ([d7ecb04](https://github.com/chakra-ui/chakra-ui/commit/d7ecb04baed8b6e6488321f7f2b28bed10a3a0d3))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popper@1.0.0-next.7...@chakra-ui/popper@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/popper

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popper@1.0.0-next.6...@chakra-ui/popper@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/popper

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popper@1.0.0-next.5...@chakra-ui/popper@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/popper

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/popper@1.0.0-next.4...@chakra-ui/popper@1.0.0-next.5) (2020-07-15)

### Features

- add support for css transition
  ([a41614c](https://github.com/chakra-ui/chakra-ui/commit/a41614c8e9757e5d38ddef6a356d2d8c718f406f))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issue in popper package
  ([be247e0](https://github.com/chakra-ui/chakra-ui/commit/be247e0f50c5dd374ac156f96ab99a3d645f251d))
- focus management for popover
  ([c3259cc](https://github.com/chakra-ui/chakra-ui/commit/c3259ccac7ebf9102888506d510f3f52cf343906))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issue in popper package
  ([be247e0](https://github.com/chakra-ui/chakra-ui/commit/be247e0f50c5dd374ac156f96ab99a3d645f251d))
- focus management for popover
  ([c3259cc](https://github.com/chakra-ui/chakra-ui/commit/c3259ccac7ebf9102888506d510f3f52cf343906))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issue in popper package
  ([be247e0](https://github.com/chakra-ui/chakra-ui/commit/be247e0f50c5dd374ac156f96ab99a3d645f251d))
- focus management for popover
  ([c3259cc](https://github.com/chakra-ui/chakra-ui/commit/c3259ccac7ebf9102888506d510f3f52cf343906))
