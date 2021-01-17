# Change Log

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1

## 1.1.1

### Patch Changes

- [`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1)
  [#3012](https://github.com/chakra-ui/chakra-ui/pull/3012) Thanks
  [@LPVua](https://github.com/LPVua)! - Fixed FormLabel margin and textAlign to
  support rtl; fixed form error icon margin to support rtl

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/icon@1.0.3

## 1.1.0

### Minor Changes

- [`b8df0bf4`](https://github.com/chakra-ui/chakra-ui/commit/b8df0bf44a10512658826e5ef8e3067bc45fbc4a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  controlling focus lock across frames. A typical example is when you open a
  modal in Codesandbox, it's impossible to type in the code editor due to focus
  lock.

  `react-focus-lock` exposes a prop that prevents this from happening. We
  updated `FocusLock` and `Modal` components to allow users opt-in or opt-out of
  this behavior

  To learn more, check out this issue
  [#2479](https://github.com/chakra-ui/chakra-ui/issues/2479)

### Patch Changes

- [`123aaf59`](https://github.com/chakra-ui/chakra-ui/commit/123aaf59a60aaae269e2a305730a650a112c0975)
  [#2754](https://github.com/chakra-ui/chakra-ui/pull/2754) Thanks
  [@dodas](https://github.com/dodas)! - Fixed issue where `FormHelperText` was
  not rendered when its parent `FormControl` had `isInvalid` prop set to true.

* [`29c0e45e`](https://github.com/chakra-ui/chakra-ui/commit/29c0e45efb9f8f37dc2e81b56c08e2f1cedeb621)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Removed `isLoading`
  from `FormControl` prop has it doesn't add any value at the moment. We'll
  consider implementing this properly in the future.
* Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/icon@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.2

### Patch Changes

- [`ff10bcec`](https://github.com/chakra-ui/chakra-ui/commit/ff10bceca5774769766eef3a6812a22f387dd58d)
  [#2591](https://github.com/chakra-ui/chakra-ui/pull/2591) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Remove nonfunctional props
  `errorText` and `helperText` from FormControl props type definition

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/form-control

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

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/form-control

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-rc.0...@chakra-ui/form-control@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **input:** add suport for native required prop
  ([f27f8da](https://github.com/chakra-ui/chakra-ui/commit/f27f8da575fea7f1707d84a2884db080fbc94c60))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.7...@chakra-ui/form-control@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.6...@chakra-ui/form-control@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.5...@chakra-ui/form-control@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/form-control@1.0.0-next.4...@chakra-ui/form-control@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/form-control

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
