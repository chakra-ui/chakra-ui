# Change Log

## 1.2.4

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/form-control@1.2.2
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
  - @chakra-ui/form-control@1.2.1
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

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/form-control@1.2.0
  - @chakra-ui/hooks@1.1.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/form-control@1.1.3

## 1.1.2

### Patch Changes

- [`26f28512`](https://github.com/chakra-ui/chakra-ui/commit/26f285129f6c739b24bf28ede71a5358ba4dbf9f)
  [#3080](https://github.com/chakra-ui/chakra-ui/pull/3080) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update styles to use css
  logical style props

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/form-control@1.1.2

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/form-control@1.1.1
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

### Patch Changes

- [`f09a1cbf`](https://github.com/chakra-ui/chakra-ui/commit/f09a1cbf2eaef537b31b1f2fdf1e7c685e1926bb)
  [#2875](https://github.com/chakra-ui/chakra-ui/pull/2875) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved an issue where
  uncontrolled `Radio` components used outside of `RadioGroup` were not working

## 1.0.3

### Patch Changes

- [`0f1e34f2`](https://github.com/chakra-ui/chakra-ui/commit/0f1e34f2c2263de687343184fd143a6377a42176)
  [#2737](https://github.com/chakra-ui/chakra-ui/pull/2737) Thanks
  [@gifaeriyanto](https://github.com/gifaeriyanto)! - ### 🚀 Feature

  Add support for styling the radio container in the theme

- Updated dependencies
  [[`b8df0bf4`](https://github.com/chakra-ui/chakra-ui/commit/b8df0bf44a10512658826e5ef8e3067bc45fbc4a),
  [`123aaf59`](https://github.com/chakra-ui/chakra-ui/commit/123aaf59a60aaae269e2a305730a650a112c0975),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5),
  [`29c0e45e`](https://github.com/chakra-ui/chakra-ui/commit/29c0e45efb9f8f37dc2e81b56c08e2f1cedeb621)]:
  - @chakra-ui/form-control@1.1.0
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/visually-hidden@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.2

### Patch Changes

- [`58e26653`](https://github.com/chakra-ui/chakra-ui/commit/58e26653134caee1dd2caddb9014f7a90dc4eb7e)
  [#2658](https://github.com/chakra-ui/chakra-ui/pull/2658) Thanks
  [@jmiazga](https://github.com/jmiazga)! - This change enables `Radio` to
  automatically derive various values from a surrounding `FormControl` if found,
  similar to `Input` and `Select`.
- Updated dependencies
  [[`ff10bcec`](https://github.com/chakra-ui/chakra-ui/commit/ff10bceca5774769766eef3a6812a22f387dd58d)]:
  - @chakra-ui/form-control@1.0.2

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

**Note:** Version bump only for package @chakra-ui/radio

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

**Note:** Version bump only for package @chakra-ui/radio

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/radio

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/radio

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/radio

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/radio

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/radio

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/radio@1.0.0-rc.0...@chakra-ui/radio@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- issue with radio and radio group name
  ([4e09ebb](https://github.com/chakra-ui/chakra-ui/commit/4e09ebbf73d8f940a56703761914c2461e7a451f))
- **radio:** set default isChecked prop value
  ([7341c0e](https://github.com/chakra-ui/chakra-ui/commit/7341c0ebb7371b05f3d6f27e8682205ac2c6cc5f))
- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/radio@1.0.0-next.7...@chakra-ui/radio@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/radio

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/radio@1.0.0-next.6...@chakra-ui/radio@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/radio

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/radio@1.0.0-next.5...@chakra-ui/radio@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/radio

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/radio@1.0.0-next.4...@chakra-ui/radio@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/radio

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- empty radio hook props
  ([71d9471](https://github.com/chakra-ui/chakra-ui/commit/71d9471559008f7f935a0ce7ed2832e366861b34))
- error with layout prop names
  ([c281535](https://github.com/chakra-ui/chakra-ui/commit/c281535eed070cb859cfc71fc1c636fcd12ca68e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update radio group default value in migration and readme files
  ([271ced2](https://github.com/chakra-ui/chakra-ui/commit/271ced297be7e6dcf67e0917ebaf4aa72e056971))
- **radio-group:** call querySelector from rootNode directly
  ([94d96d3](https://github.com/chakra-ui/chakra-ui/commit/94d96d32b98b5553af6a27776164c12e2b9a3c62))

### Features

- update stories for radio componet
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- empty radio hook props
  ([71d9471](https://github.com/chakra-ui/chakra-ui/commit/71d9471559008f7f935a0ce7ed2832e366861b34))
- error with layout prop names
  ([c281535](https://github.com/chakra-ui/chakra-ui/commit/c281535eed070cb859cfc71fc1c636fcd12ca68e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update radio group default value in migration and readme files
  ([271ced2](https://github.com/chakra-ui/chakra-ui/commit/271ced297be7e6dcf67e0917ebaf4aa72e056971))
- **radio-group:** call querySelector from rootNode directly
  ([94d96d3](https://github.com/chakra-ui/chakra-ui/commit/94d96d32b98b5553af6a27776164c12e2b9a3c62))

### Features

- update stories for radio componet
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- update radio group default value in migration and readme files
  ([271ced2](https://github.com/chakra-ui/chakra-ui/commit/271ced297be7e6dcf67e0917ebaf4aa72e056971))
- **radio-group:** call querySelector from rootNode directly
  ([94d96d3](https://github.com/chakra-ui/chakra-ui/commit/94d96d32b98b5553af6a27776164c12e2b9a3c62))
- empty radio hook props
  ([71d9471](https://github.com/chakra-ui/chakra-ui/commit/71d9471559008f7f935a0ce7ed2832e366861b34))
- error with layout prop names
  ([c281535](https://github.com/chakra-ui/chakra-ui/commit/c281535eed070cb859cfc71fc1c636fcd12ca68e))

### Features

- update stories for radio componet
  ([3effca4](https://github.com/chakra-ui/chakra-ui/commit/3effca435a04bcaa7b33d16cd20f441950fc2e3c))
