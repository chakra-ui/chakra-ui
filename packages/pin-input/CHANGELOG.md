# Change Log

## 1.4.1

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/descendant@1.0.8

## 1.4.0

### Minor Changes

- [`2eb58df12`](https://github.com/chakra-ui/chakra-ui/commit/2eb58df12b2ab1bd29cd02889e2eafa406747036)
  [#3296](https://github.com/chakra-ui/chakra-ui/pull/3296) Thanks
  [@mattwells19](https://github.com/mattwells19)! - Resolved an issue where
  completing character entry in `PinInput` failed to call `onComplete`.

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/descendant@1.0.7

## 1.3.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/descendant@1.0.6

## 1.2.0

### Minor Changes

- [`f91058e3`](https://github.com/chakra-ui/chakra-ui/commit/f91058e3883f30a6f8ef8f8288e9be614333a862)
  [#3095](https://github.com/chakra-ui/chakra-ui/pull/3095) Thanks
  [@with-heart](https://github.com/with-heart)! - Added an `otp` flag to
  `PinInput` that sets the `autoComplete` value of `PinInputField` to
  `"one-time-code"`.

  ```jsx
  <PinInput otp>
    <PinInputField />
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
  ```

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/descendant@1.0.5

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/descendant@1.0.4

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/descendant@1.0.3

## 1.1.2

### Patch Changes

- [`46e24c58`](https://github.com/chakra-ui/chakra-ui/commit/46e24c5820ef2726a4fb16a190efda39fb0b075a)
  [#2880](https://github.com/chakra-ui/chakra-ui/pull/2880) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved an issue where
  `PinInputField` rendered an input with `autocomplete="not-allowed"` instead of
  `autocomplete="off"`

## 1.1.1

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

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/hooks@1.0.2
  - @chakra-ui/descendant@1.0.2

## 1.1.0

### Minor Changes

- [`f3cc344e`](https://github.com/chakra-ui/chakra-ui/commit/f3cc344e1a7dd08dc7a312e6ce039d55a80cc526)
  [#2729](https://github.com/chakra-ui/chakra-ui/pull/2729) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Move input props logic
  to parent hook and expose prop-getter `getInputProps`. This helps to co-locate
  the state logic for easier debugging

  - Added support for alpha-numeric and secret values.
  - Added `type` prop which can be either `alphanumeric` or `number`
  - Added `mask` prop to hide input value similar to `<input type='password' />`

  ```jsx
  <PinInput type="alphanumeric" mask>
    <PinInputField />
    <PinInputField />
    <PinInputField />
  </PinInput>
  ```

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/descendant@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/pin-input

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

**Note:** Version bump only for package @chakra-ui/pin-input

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/pin-input

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/pin-input

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/pin-input

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/pin-input@1.0.0-rc.0...@chakra-ui/pin-input@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/pin-input@1.0.0-next.7...@chakra-ui/pin-input@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/pin-input@1.0.0-next.6...@chakra-ui/pin-input@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/pin-input@1.0.0-next.5...@chakra-ui/pin-input@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/pin-input@1.0.0-next.4...@chakra-ui/pin-input@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/pin-input

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- remove duplicated ref
  ([77fa649](https://github.com/chakra-ui/chakra-ui/commit/77fa6496d59dde9f2ce49a6eee72de46418ade96))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- remove duplicated ref
  ([77fa649](https://github.com/chakra-ui/chakra-ui/commit/77fa6496d59dde9f2ce49a6eee72de46418ade96))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- remove duplicated ref
  ([77fa649](https://github.com/chakra-ui/chakra-ui/commit/77fa6496d59dde9f2ce49a6eee72de46418ade96))
