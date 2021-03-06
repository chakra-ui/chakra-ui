# Change Log

## 1.2.4

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/visually-hidden@1.0.5

## 1.2.3

### Patch Changes

- [`b99b8674f`](https://github.com/chakra-ui/chakra-ui/commit/b99b8674f1c1874d5805cb3ad2e893c0d852374f)
  [#3364](https://github.com/chakra-ui/chakra-ui/pull/3364) Thanks
  [@grahhham](https://github.com/grahhham)! - - Improve the semantic HTML
  structure of checkbox. `label` is a phrasing content element and should not
  contain block element `div`.
  - Replaced `div` with `span` which is an inline element.

## 1.2.2

### Patch Changes

- [`01231ed49`](https://github.com/chakra-ui/chakra-ui/commit/01231ed4919521fbe911cb1b035f4beadb340fa5)
  [#3298](https://github.com/chakra-ui/chakra-ui/pull/3298) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Provide better typings for
  `size` and `variant` for AvatarGroup, CheckboxGroup, ButtonGroup, and
  RadioGroup.

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/visually-hidden@1.0.4
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

- [`4e193f721`](https://github.com/chakra-ui/chakra-ui/commit/4e193f721fd51fd7e8d5f0fdc399a2784276a158)
  [#3180](https://github.com/chakra-ui/chakra-ui/pull/3180) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved an issue where
  `Checkbox` used inside `CheckboxGroup` would call the group's `onChange`
  handler twice
- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2

## 1.1.2

### Patch Changes

- [`26f28512`](https://github.com/chakra-ui/chakra-ui/commit/26f285129f6c739b24bf28ede71a5358ba4dbf9f)
  [#3080](https://github.com/chakra-ui/chakra-ui/pull/3080) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update styles to use css
  logical style props

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/visually-hidden@1.0.3

## 1.1.0

### Minor Changes

- [`1e6db1e0`](https://github.com/chakra-ui/chakra-ui/commit/1e6db1e068c6bc0a4c6c6893d1716d284dcbb8f8)
  [#2876](https://github.com/chakra-ui/chakra-ui/pull/2876) Thanks
  [@with-heart](https://github.com/with-heart)! - Deprecated the
  `defaultIsChecked` prop on `Radio` and `Checkbox` in favor of
  `defaultChecked`, which mirrors the default React prop name for this
  functionality. `defaultIsChecked` will continue to work, but may be removed in
  future versions.

## 1.0.2

### Patch Changes

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/visually-hidden@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/visually-hidden@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/checkbox

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

**Note:** Version bump only for package @chakra-ui/checkbox

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/checkbox

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/checkbox

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-rc.0...@chakra-ui/checkbox@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.7...@chakra-ui/checkbox@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.6...@chakra-ui/checkbox@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.5...@chakra-ui/checkbox@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/checkbox@1.0.0-next.4...@chakra-ui/checkbox@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/checkbox

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- tests and typing for checkbox
  ([153155f](https://github.com/chakra-ui/chakra-ui/commit/153155f78db9fe2a338282f7cc58fbb4e22d59c1))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typos
  ([c75c1da](https://github.com/chakra-ui/chakra-ui/commit/c75c1da311e88cbc6c8950bf3db362a68bbf85b0))
- working on checkbox group component
  ([66ac9ce](https://github.com/chakra-ui/chakra-ui/commit/66ac9ce11f089742d5bb7c128bf097d811a2904d))
- **checkbox:** add default empty props to useCheckbox
  ([0ba0f43](https://github.com/chakra-ui/chakra-ui/commit/0ba0f43899646d7d2dbe495098a48a913da80871))
- **checkbox:** remove Checkbox.base
  ([3c38699](https://github.com/chakra-ui/chakra-ui/commit/3c386994d8e018c6226ab3434184552c81b5b189))

### Features

- update stories for radio component
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- tests and typing for checkbox
  ([153155f](https://github.com/chakra-ui/chakra-ui/commit/153155f78db9fe2a338282f7cc58fbb4e22d59c1))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typos
  ([c75c1da](https://github.com/chakra-ui/chakra-ui/commit/c75c1da311e88cbc6c8950bf3db362a68bbf85b0))
- working on checkbox group component
  ([66ac9ce](https://github.com/chakra-ui/chakra-ui/commit/66ac9ce11f089742d5bb7c128bf097d811a2904d))
- **checkbox:** add default empty props to useCheckbox
  ([0ba0f43](https://github.com/chakra-ui/chakra-ui/commit/0ba0f43899646d7d2dbe495098a48a913da80871))
- **checkbox:** remove Checkbox.base
  ([3c38699](https://github.com/chakra-ui/chakra-ui/commit/3c386994d8e018c6226ab3434184552c81b5b189))

### Features

- update stories for radio component
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- tests and typing for checkbox
  ([153155f](https://github.com/chakra-ui/chakra-ui/commit/153155f78db9fe2a338282f7cc58fbb4e22d59c1))
- typos
  ([c75c1da](https://github.com/chakra-ui/chakra-ui/commit/c75c1da311e88cbc6c8950bf3db362a68bbf85b0))
- working on checkbox group component
  ([66ac9ce](https://github.com/chakra-ui/chakra-ui/commit/66ac9ce11f089742d5bb7c128bf097d811a2904d))
- **checkbox:** add default empty props to useCheckbox
  ([0ba0f43](https://github.com/chakra-ui/chakra-ui/commit/0ba0f43899646d7d2dbe495098a48a913da80871))
- **checkbox:** remove Checkbox.base
  ([3c38699](https://github.com/chakra-ui/chakra-ui/commit/3c386994d8e018c6226ab3434184552c81b5b189))

### Features

- update stories for radio component
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))
