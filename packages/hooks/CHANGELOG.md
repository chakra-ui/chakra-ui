# Change Log

## 1.1.5

### Patch Changes

- [`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa)
  [#3373](https://github.com/chakra-ui/chakra-ui/pull/3373) Thanks
  [@tobiasz](https://github.com/tobiasz)! - ### useClipboard

  Add support to `format` - Optional string. Set the MIME type of what you want
  to copy as. Use text/html to copy as HTML, text/plain to avoid inherited
  styles showing when pasted into rich text editor.

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.1.3

### Patch Changes

- [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! -
  **useOutsideClick:**

  - Update reference to `document.addEventListener` to detect owner document
    based on `ref` passed. This would help detect outside click currently from
    within an `iframe`.

## 1.1.2

### Patch Changes

- [`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)
  [#3125](https://github.com/chakra-ui/chakra-ui/pull/3125) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fixed issue where using an
  uncontrolled RadioGroup without a defaultValue causes multiple radio options
  can be selected.

  This was caused by the `useControllableProp` hook that uses `useRef` to check
  if a value is controlled or uncontrolled.

## 1.1.1

### Patch Changes

- [`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)
  [#3056](https://github.com/chakra-ui/chakra-ui/pull/3056) Thanks
  [@with-heart](https://github.com/with-heart)! - - Resolved an issue where
  event handlers for certain components were removed after the first event
  occurred.

  - Fixed SSR issue with `useId` hook

## 1.1.0

### Minor Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Added `useCallbackRef` hook
  for persisting a value between renders and updating it if it changes.

### Patch Changes

- [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)
  [#3015](https://github.com/chakra-ui/chakra-ui/pull/3015) Thanks
  [@with-heart](https://github.com/with-heart)! - Deprecated `useLatestRef`,
  `useEventCallback`, and `useMouseDownRef`. These functions will be removed in
  a future `major` version.
- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2

## 1.0.1

### Patch Changes

- [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)
  [#2577](https://github.com/chakra-ui/chakra-ui/pull/2577) Thanks
  [@navin-moorthy](https://github.com/navin-moorthy)! - Fix setter function
  update of `value` in useControllable

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/hooks

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

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/hooks

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-rc.0...@chakra-ui/hooks@1.0.0-rc.1) (2020-08-06)

### Features

- update popper hook and use-clipboard
  ([2659f60](https://github.com/chakra-ui/chakra-ui/commit/2659f60b7d44815c7638d2bc03eb6a97ad7bc581))

### Performance Improvements

- improve popper hook
  ([d7ecb04](https://github.com/chakra-ui/chakra-ui/commit/d7ecb04baed8b6e6488321f7f2b28bed10a3a0d3))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.7...@chakra-ui/hooks@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.6...@chakra-ui/hooks@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.5...@chakra-ui/hooks@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/hooks@1.0.0-next.4...@chakra-ui/hooks@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/hooks

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- some menu bugs
  ([5f9efe1](https://github.com/chakra-ui/chakra-ui/commit/5f9efe1566f067467573a418d2ec319c9e8a607f))

### Features

- add live-region package
  ([e0efe6a](https://github.com/chakra-ui/chakra-ui/commit/e0efe6af7f501d1dd213a9d92de5710c55fe34ed))
- add setup for switch component tests
  ([d845d08](https://github.com/chakra-ui/chakra-ui/commit/d845d089a91841e6bb1b53daf9c35502c3ce2538))
- add setup for switch component tests
  ([fc0026b](https://github.com/chakra-ui/chakra-ui/commit/fc0026ba20199169df399218c15b0ca575ec4110))
- add tests for switch component
  ([a327f4a](https://github.com/chakra-ui/chakra-ui/commit/a327f4a2807ba900bc1cc62b13c7c498cb690526))
- add tests for switch component
  ([90805b3](https://github.com/chakra-ui/chakra-ui/commit/90805b3d0676409394a5ece9a1a834d156ebda51))
