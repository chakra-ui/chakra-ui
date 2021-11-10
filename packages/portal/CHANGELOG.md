# Change Log

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/hooks@1.1.4

## 1.1.0

### Minor Changes

- [`e41e6b81b`](https://github.com/chakra-ui/chakra-ui/commit/e41e6b81bf6943fef9b34e5ddd31ee57b416a426)
  [#3210](https://github.com/chakra-ui/chakra-ui/pull/3210) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for changing
  the container that portal is appended to. You can now pass `containerRef` to
  portal.

  - Update portal `README.md` and tests.
  - Add support for `appendToParentPortal={false}` to opt out of nested portals.
  - Fix issue with portal `zIndex` container where it renders elements outside
    of view.
  - Renamed `getContainer` prop to `containerRef` to make it possible to pass
    the `ref` directly. This affects the `Modal` component primarily

  ```jsx live=false
  // Before
  <Portal getContainer={() => ref.current}>{/** Content */}</Portal>

  // After
  <Portal containerRef={ref}>{/** Content */}</Portal>
  ```

### Patch Changes

- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca)]:
  - @chakra-ui/hooks@1.1.3

## 1.0.6

### Patch Changes

- [`31881da7`](https://github.com/chakra-ui/chakra-ui/commit/31881da7314c9c464d080b7dd83edd59d8786b7c)
  [#3126](https://github.com/chakra-ui/chakra-ui/pull/3126) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - fix(portal-manager):
  portal z-index wrapper squashing portaled elements

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815)]:
  - @chakra-ui/hooks@1.1.2

## 1.0.5

### Patch Changes

- [`0d620f1d`](https://github.com/chakra-ui/chakra-ui/commit/0d620f1d46b9c72c9aef3bb15a691a249ace2eb4)
  [#3079](https://github.com/chakra-ui/chakra-ui/pull/3079) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fixed issue where adding
  `portalZIndex` to `ChakraProvider` makes app unusable

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee)]:
  - @chakra-ui/hooks@1.1.1

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0

## 1.0.3

### Patch Changes

- [`a98817de`](https://github.com/chakra-ui/chakra-ui/commit/a98817de0849bf9eec89fae3faf4fbe085f21011)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix issue where
  `Portal` and `PortalManager` renders elements outside of view.

  - Fixed issue where elements within portal used in an `iframe` got rendered
    outside of the `iframe`. `Portal` now smartly detects it's document owner
    and attaches its node to the correct `document.body`

  - Removed extra DOM node `PortalManager` creates. Less is more!

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

**Note:** Version bump only for package @chakra-ui/portal

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

**Note:** Version bump only for package @chakra-ui/portal

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/portal

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/portal

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/portal

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/portal@1.0.0-rc.0...@chakra-ui/portal@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/portal@1.0.0-next.7...@chakra-ui/portal@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/portal@1.0.0-next.6...@chakra-ui/portal@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/portal@1.0.0-next.5...@chakra-ui/portal@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/portal@1.0.0-next.4...@chakra-ui/portal@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/portal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
