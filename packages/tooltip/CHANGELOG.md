# Change Log

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`e1924c621`](https://github.com/chakra-ui/chakra-ui/commit/e1924c62182969a109b4900b05932caa1b73ed99),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/popper@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/visually-hidden@1.0.5
  - @chakra-ui/portal@1.1.2

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`51ad518e2`](https://github.com/chakra-ui/chakra-ui/commit/51ad518e22642076485bee3dd1f99acbf025161b)]:
  - @chakra-ui/popper@1.1.4

## 1.1.1

### Patch Changes

- [`a023a269f`](https://github.com/chakra-ui/chakra-ui/commit/a023a269ffe0efdae74be3de28e41790c9a5ca8a)
  [#3278](https://github.com/chakra-ui/chakra-ui/pull/3278) Thanks
  [@dodas](https://github.com/dodas)! - Fixed an issue where a `Tooltip` with
  negative `gutter` causes flickering on hover.
- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/visually-hidden@1.0.4
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/popper@1.1.3
  - @chakra-ui/portal@1.1.1

## 1.1.0

### Minor Changes

- [`14be4be2c`](https://github.com/chakra-ui/chakra-ui/commit/14be4be2c6f64896612cb05d7e56c2c5e4015335)
  [#3210](https://github.com/chakra-ui/chakra-ui/pull/3210) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add support for forwarding
  props to the underlying `Portal` component. Pass the `portalProps` prop to
  achive this.

  The 2 props you can pass to the portalProps are:

  - `containerRef`: `ref` for the element where to mount the portal
  - `appendToParentPortal`: If `false`, it'll opt out of portal nesting

  ```jsx
  <Modal portalProps={{ containerRef: ref }}>
    <ModalOverlay />
    <ModalContent>
      <Box>Modal content</Box>
      <Tooltip portalProps={{ appendToParentPortal: false }}>
        Some tooltip
      </Tooltip>
    </ModalContent>
  </Modal>
  ```

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca),
  [`e41e6b81b`](https://github.com/chakra-ui/chakra-ui/commit/e41e6b81bf6943fef9b34e5ddd31ee57b416a426)]:
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/portal@1.1.0
  - @chakra-ui/popper@1.1.2

## 1.0.6

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815),
  [`31881da7`](https://github.com/chakra-ui/chakra-ui/commit/31881da7314c9c464d080b7dd83edd59d8786b7c)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/portal@1.0.6
  - @chakra-ui/popper@1.1.1

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee),
  [`0d620f1d`](https://github.com/chakra-ui/chakra-ui/commit/0d620f1d46b9c72c9aef3bb15a691a249ace2eb4),
  [`032f1678`](https://github.com/chakra-ui/chakra-ui/commit/032f16788553b84685de61af5f021c395e09648f)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/portal@1.0.5
  - @chakra-ui/popper@1.1.0

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/popper@1.0.3
  - @chakra-ui/portal@1.0.4
  - @chakra-ui/visually-hidden@1.0.3

## 1.0.3

### Patch Changes

- Updated dependencies
  [[`a98817de`](https://github.com/chakra-ui/chakra-ui/commit/a98817de0849bf9eec89fae3faf4fbe085f21011)]:
  - @chakra-ui/portal@1.0.3

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
  - @chakra-ui/popper@1.0.2
  - @chakra-ui/portal@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/popper@1.0.1
  - @chakra-ui/portal@1.0.1
  - @chakra-ui/visually-hidden@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/tooltip

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

**Note:** Version bump only for package @chakra-ui/tooltip

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/tooltip

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/tooltip

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/tooltip

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/tooltip@1.0.0-rc.0...@chakra-ui/tooltip@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))
- tooltip memory leak
  ([bac0823](https://github.com/chakra-ui/chakra-ui/commit/bac082373de41243b84f19385d45427afcb4f2db))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/tooltip@1.0.0-next.7...@chakra-ui/tooltip@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/tooltip@1.0.0-next.6...@chakra-ui/tooltip@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/tooltip@1.0.0-next.5...@chakra-ui/tooltip@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/tooltip

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/tooltip@1.0.0-next.4...@chakra-ui/tooltip@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- **tooltip:** implicit object for onClose and onOpen
  ([c20fd6f](https://github.com/chakra-ui/chakra-ui/commit/c20fd6ffa45d47d8f138193292897fb755494fdc))
- **tooltip:** rename show and hide to open and close
  ([b612144](https://github.com/chakra-ui/chakra-ui/commit/b612144c179f3076113dac495f8b4af982b16cd4))

### Features

- add popover transition
  ([73d8c4f](https://github.com/chakra-ui/chakra-ui/commit/73d8c4fc9c676c95232cd259f59cce7d38eff94b))
- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))
- **tooltip-disable:** add is-disabled prop to tooltip component
  ([29c182b](https://github.com/chakra-ui/chakra-ui/commit/29c182b35dc139f09b931fafec84c0a20683ee8f))
- **tooltip-disable:** add test for is-disabled prop on tooltip
  ([dbac9dd](https://github.com/chakra-ui/chakra-ui/commit/dbac9dd7a7ba0bda7a248eb606a98019fa44ce82))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **tooltip:** don't show tooltip if label is empty
  [#601](https://github.com/chakra-ui/chakra-ui/issues/601)
  ([2905129](https://github.com/chakra-ui/chakra-ui/commit/2905129c858bfd16446fd756f2694b54dc7fac81))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **tooltip:** don't show tooltip if label is empty
  [#601](https://github.com/chakra-ui/chakra-ui/issues/601)
  ([2905129](https://github.com/chakra-ui/chakra-ui/commit/2905129c858bfd16446fd756f2694b54dc7fac81))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- **tooltip:** don't show tooltip if label is empty
  [#601](https://github.com/chakra-ui/chakra-ui/issues/601)
  ([2905129](https://github.com/chakra-ui/chakra-ui/commit/2905129c858bfd16446fd756f2694b54dc7fac81))
