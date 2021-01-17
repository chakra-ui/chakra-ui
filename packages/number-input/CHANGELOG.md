# Change Log

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/counter@1.0.4
  - @chakra-ui/form-control@1.1.2

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/form-control@1.1.1
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/counter@1.0.3
  - @chakra-ui/icon@1.0.3

## 1.0.3

### Patch Changes

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

* [`d1bd91e1`](https://github.com/chakra-ui/chakra-ui/commit/d1bd91e141fba54c1094a7f60932a060fba4949a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## 🐛 Bug Fix

  We've made it possible to override the `type` and `pattern` props passed to
  `NumberInputField` or `getInputProps`. Fixed [#2755]

  ```jsx
  <NumberInput>
    <NumberInputField type="number" pattern="-?[0-9]*" />
  </NumberInput>
  ```

* Updated dependencies
  [[`b8df0bf4`](https://github.com/chakra-ui/chakra-ui/commit/b8df0bf44a10512658826e5ef8e3067bc45fbc4a),
  [`123aaf59`](https://github.com/chakra-ui/chakra-ui/commit/123aaf59a60aaae269e2a305730a650a112c0975),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5),
  [`29c0e45e`](https://github.com/chakra-ui/chakra-ui/commit/29c0e45efb9f8f37dc2e81b56c08e2f1cedeb621)]:
  - @chakra-ui/form-control@1.1.0
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/icon@1.0.2
  - @chakra-ui/counter@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.2

### Patch Changes

- [`e1b095cd`](https://github.com/chakra-ui/chakra-ui/commit/e1b095cdb799bb3630d3cbb7891d8c7e929db0f4)
  [#2217](https://github.com/chakra-ui/chakra-ui/pull/2217) Thanks
  [@silltho](https://github.com/silltho)! - feat(number-input): uses props of
  wrapping form-control

  This change enables `NumberInput` to automatically derive various values from
  a surrounding `FormControl` if found, similar to `Input` and `Select`.

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
  - @chakra-ui/counter@1.0.1
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/number-input

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

**Note:** Version bump only for package @chakra-ui/number-input

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/number-input

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/number-input

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/number-input

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/number-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/number-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/number-input@1.0.0-rc.0...@chakra-ui/number-input@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/number-input@1.0.0-next.7...@chakra-ui/number-input@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/number-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/number-input@1.0.0-next.6...@chakra-ui/number-input@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/number-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/number-input@1.0.0-next.5...@chakra-ui/number-input@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/number-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/number-input@1.0.0-next.4...@chakra-ui/number-input@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- build issue
  ([1be70b2](https://github.com/chakra-ui/chakra-ui/commit/1be70b268e63ea06f9d8f209f0ead8d70fce290c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- updates
  ([57db7fd](https://github.com/chakra-ui/chakra-ui/commit/57db7fd9e7b7c3c6465adfe3c91677c52841963e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- updates
  ([57db7fd](https://github.com/chakra-ui/chakra-ui/commit/57db7fd9e7b7c3c6465adfe3c91677c52841963e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- updates
  ([57db7fd](https://github.com/chakra-ui/chakra-ui/commit/57db7fd9e7b7c3c6465adfe3c91677c52841963e))
