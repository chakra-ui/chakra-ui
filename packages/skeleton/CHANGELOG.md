# Change Log

## 1.0.9

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/system@1.1.6

## 1.0.8

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/media-query@1.0.4
  - @chakra-ui/system@1.1.5

## 1.0.7

### Patch Changes

- [`1bc2aeb3`](https://github.com/chakra-ui/chakra-ui/commit/1bc2aeb31bac24f7c8108201a07f7aac3c1ac6ea)
  [#2980](https://github.com/chakra-ui/chakra-ui/pull/2980) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed a bug where
  `SkeletonText` kept its fixed dimensions when `isLoaded` is true.

- Updated dependencies
  [[`1286da79`](https://github.com/chakra-ui/chakra-ui/commit/1286da7977db7bd8f19e2abd03b73990737b1379)]:
  - @chakra-ui/media-query@1.0.3
  - @chakra-ui/system@1.1.4

## 1.0.6

### Patch Changes

- Updated dependencies
  [[`a9807b33`](https://github.com/chakra-ui/chakra-ui/commit/a9807b334477ac9ecd7f3637c0ff7d5fb5c46639)]:
  - @chakra-ui/system@1.1.3

## 1.0.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@1.1.2

## 1.0.4

### Patch Changes

- [`5c8f0838`](https://github.com/chakra-ui/chakra-ui/commit/5c8f08382858c0bbc77d875db52859e7c304392f)
  [#2833](https://github.com/chakra-ui/chakra-ui/pull/2833) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - SkeletonText now accepts
  the props `fadeDuration` and `speed` and animates children, like the
  `Skeleton` component.
- Updated dependencies []:
  - @chakra-ui/system@1.1.1

## 1.0.3

### Patch Changes

- [`40a4ab8d`](https://github.com/chakra-ui/chakra-ui/commit/40a4ab8dfcedabf290882936cae0e1523e5aa414)
  [#2775](https://github.com/chakra-ui/chakra-ui/pull/2775) Thanks
  [@Samic8](https://github.com/Samic8)! - ## 🐛 Bug Fix

  Prevent content from fading-in on initial render when isLoaded is already true
  (#2644)

  For example, the content would appear without the fade-in animation in this
  case:

  ```jsx
  <Skeleton isLoaded={true}>
    <h1>My Content</h1>
  </Skeleton>
  ```

- Updated dependencies
  [[`730a2da1`](https://github.com/chakra-ui/chakra-ui/commit/730a2da19b652614bc051b9f80313d211b22d1de),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/system@1.1.0
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/media-query@1.0.2
  - @chakra-ui/hooks@1.0.2

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`653f3dd6`](https://github.com/chakra-ui/chakra-ui/commit/653f3dd6f30a17e366c069666acbfd9eddb11936)]:
  - @chakra-ui/system@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6),
  [`a1ff404b`](https://github.com/chakra-ui/chakra-ui/commit/a1ff404b12a898ab97af024391a06c34da5bc69a)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/media-query@1.0.1
  - @chakra-ui/system@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/skeleton

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

**Note:** Version bump only for package @chakra-ui/skeleton

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/skeleton

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/skeleton

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/skeleton

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/skeleton

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/skeleton

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/skeleton@1.0.0-rc.0...@chakra-ui/skeleton@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/skeleton

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/skeleton@1.0.0-next.7...@chakra-ui/skeleton@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/skeleton

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/skeleton@1.0.0-next.6...@chakra-ui/skeleton@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/skeleton

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/skeleton@1.0.0-next.5...@chakra-ui/skeleton@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/skeleton

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/skeleton@1.0.0-next.4...@chakra-ui/skeleton@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/skeleton

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
