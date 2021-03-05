# Change Log

## 1.6.1

### Patch Changes

- [`79ff8e84e`](https://github.com/chakra-ui/chakra-ui/commit/79ff8e84e4a8f70d3abe969d68d8bfbb63c18471)
  [#3427](https://github.com/chakra-ui/chakra-ui/pull/3427) Thanks
  [@TheAsda](https://github.com/TheAsda)! - - Add drawer example to modal readme
  - Fix github references in drawer and alert-dialog docs
- Updated dependencies
  [[`83ae62905`](https://github.com/chakra-ui/chakra-ui/commit/83ae62905935fdb3104380d6fd845159b00095fa),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/hooks@1.1.5
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/close-button@1.1.2
  - @chakra-ui/portal@1.1.2
  - @chakra-ui/transition@1.0.9
  - @chakra-ui/focus-lock@1.1.1

## 1.6.0

### Minor Changes

- [`091bad84a`](https://github.com/chakra-ui/chakra-ui/commit/091bad84a928c9d7f3cba103f2a0926045d931b8)
  [#3337](https://github.com/chakra-ui/chakra-ui/pull/3337) Thanks
  [@afermon](https://github.com/afermon)! - Upgrade to react-remove-scroll@2.4.1
  and react-focus-lock@2.5.0 to fix React 17 peer dependencies compatibility

### Patch Changes

- Updated dependencies
  [[`091bad84a`](https://github.com/chakra-ui/chakra-ui/commit/091bad84a928c9d7f3cba103f2a0926045d931b8)]:
  - @chakra-ui/focus-lock@1.1.0

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/close-button@1.1.1
  - @chakra-ui/focus-lock@1.0.4
  - @chakra-ui/hooks@1.1.4
  - @chakra-ui/portal@1.1.1
  - @chakra-ui/transition@1.0.8

## 1.5.0

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
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`b572bceed`](https://github.com/chakra-ui/chakra-ui/commit/b572bceedd9fb0c41c65118f0d9ba672791932ca),
  [`e41e6b81b`](https://github.com/chakra-ui/chakra-ui/commit/e41e6b81bf6943fef9b34e5ddd31ee57b416a426)]:
  - @chakra-ui/close-button@1.1.0
  - @chakra-ui/hooks@1.1.3
  - @chakra-ui/portal@1.1.0
  - @chakra-ui/transition@1.0.7

## 1.4.5

### Patch Changes

- Updated dependencies
  [[`002a4361`](https://github.com/chakra-ui/chakra-ui/commit/002a4361bd738bef49e021a2fff2b9b6a9af5815),
  [`31881da7`](https://github.com/chakra-ui/chakra-ui/commit/31881da7314c9c464d080b7dd83edd59d8786b7c)]:
  - @chakra-ui/hooks@1.1.2
  - @chakra-ui/portal@1.0.6
  - @chakra-ui/transition@1.0.6

## 1.4.4

### Patch Changes

- Updated dependencies
  [[`02855588`](https://github.com/chakra-ui/chakra-ui/commit/02855588a4ffbc6573768052e53cc538361e91ee),
  [`0d620f1d`](https://github.com/chakra-ui/chakra-ui/commit/0d620f1d46b9c72c9aef3bb15a691a249ace2eb4)]:
  - @chakra-ui/hooks@1.1.1
  - @chakra-ui/portal@1.0.5
  - @chakra-ui/transition@1.0.5

## 1.4.3

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54),
  [`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/hooks@1.1.0
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/portal@1.0.4
  - @chakra-ui/transition@1.0.4
  - @chakra-ui/close-button@1.0.4
  - @chakra-ui/focus-lock@1.0.3

## 1.4.2

### Patch Changes

- Updated dependencies
  [[`a98817de`](https://github.com/chakra-ui/chakra-ui/commit/a98817de0849bf9eec89fae3faf4fbe085f21011)]:
  - @chakra-ui/portal@1.0.3

## 1.4.1

### Patch Changes

- [`a9807b33`](https://github.com/chakra-ui/chakra-ui/commit/a9807b334477ac9ecd7f3637c0ff7d5fb5c46639)
  [#2753](https://github.com/chakra-ui/chakra-ui/pull/2753) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Restored TypeScript
  autocomplete for chakra component props in Jetbrains IDEs.

* [`f7142599`](https://github.com/chakra-ui/chakra-ui/commit/f714259943a03d6e191949c7c1c68c9f9b8b49fd)
  [#2952](https://github.com/chakra-ui/chakra-ui/pull/2952) Thanks
  [@mashabow](https://github.com/mashabow)! - Disable the `ModalOverlay`
  animation as well as the `ModalContent` animation, if `motionPreset="none"`

## 1.4.0

### Minor Changes

- [`6a82a3d4`](https://github.com/chakra-ui/chakra-ui/commit/6a82a3d4f061191171a12e6d38719ba05414a86e)
  [#2888](https://github.com/chakra-ui/chakra-ui/pull/2888) Thanks
  [@ytakayanagi](https://github.com/ytakayanagi)! - Added "none" option in
  motionPreset prop to disable animation in modal component

### Patch Changes

- [`5cef5de4`](https://github.com/chakra-ui/chakra-ui/commit/5cef5de4f45cd58f7a29436335543cb5b40c0d70)
  [#2918](https://github.com/chakra-ui/chakra-ui/pull/2918) Thanks
  [@MohamedSayed008](https://github.com/MohamedSayed008)! - ## Button

  - Update the style props applied for `leftIcon` and `rightIcon` to support
    RTL. Changed `ml` and `mr` to `marginStart` and `marginEnd` respectively.
  - Update the style props applied when `isLoading` is `true`. Changed
    `marginRight` to `marginEnd`.

  ## Stack

  - Update `directionStyles` to use logical CSS properties for RTL support.
    Changed `marginLeft` and `marginRight` to `marginStart` and `marginEnd`
    respectively.

  ## Styled System

  - Add missing `borderStart`, and `borderEnd` for style and color.
  - Sort `Object.assign` keys in `configs/border.ts` for better readability.

  ## Other RTL Fixes

  - Alignment for close icon for `Tag`, `Modal`, and `Drawer` components to
    support RTL.

  ## Storybook

  Add RTL storybook toolbar for make it easy to test layouts.

  Packages added:

  - `@storybook/addon-toolbars`

## 1.3.0

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

- [`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)
  Thanks [@jmiazga](https://github.com/jmiazga)! - Updated framer-motion
  peerDependencies to v3

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e),
  [`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/transition@1.0.3
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/close-button@1.0.3
  - @chakra-ui/focus-lock@1.0.2
  - @chakra-ui/hooks@1.0.2
  - @chakra-ui/portal@1.0.2

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`72bbd0db`](https://github.com/chakra-ui/chakra-ui/commit/72bbd0dbb913ba38ee2b9191d12bf73713ae4398)]:
  - @chakra-ui/close-button@1.0.2

## 1.2.0

### Minor Changes

- [`28bd21d7`](https://github.com/chakra-ui/chakra-ui/commit/28bd21d793911ba56bd146dd7aaff1008a70d147)
  [#2659](https://github.com/chakra-ui/chakra-ui/pull/2659) Thanks
  [@dodas](https://github.com/dodas)! - feat(theming): enable theming for
  ModalCloseButton

  This change enables `ModalCloseButton` to be themed as part of the `Modal`
  component theme via the `closeButton` key.

  See
  https://chakra-ui.com/docs/theming/component-style#styling-multipart-components
  for more information.

### Patch Changes

- Updated dependencies
  [[`2416cf9a`](https://github.com/chakra-ui/chakra-ui/commit/2416cf9abe183a3a38adbccff794088d86a46341)]:
  - @chakra-ui/transition@1.0.2

## 1.1.0

### Minor Changes

- [`ba262ac7`](https://github.com/chakra-ui/chakra-ui/commit/ba262ac7b2e2d932bb227d4ff9181e83fbaa4149)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Added support for
  styling ModalContent or DrawerContent's container

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213),
  [`204ff7e3`](https://github.com/chakra-ui/chakra-ui/commit/204ff7e39dd37003786194704b36069ef94d56a6)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/hooks@1.0.1
  - @chakra-ui/close-button@1.0.1
  - @chakra-ui/focus-lock@1.0.1
  - @chakra-ui/portal@1.0.1
  - @chakra-ui/transition@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/modal

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

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/modal

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-rc.0...@chakra-ui/modal@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.7...@chakra-ui/modal@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.6...@chakra-ui/modal@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.5...@chakra-ui/modal@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/modal

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/modal@1.0.0-next.4...@chakra-ui/modal@1.0.0-next.5) (2020-07-15)

### Features

- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typescript ref issues for modal
  ([821687e](https://github.com/chakra-ui/chakra-ui/commit/821687ef8948d0e925345693642a0b5b81486d74))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- typescript ref issues for modal
  ([821687e](https://github.com/chakra-ui/chakra-ui/commit/821687ef8948d0e925345693642a0b5b81486d74))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- case sensitivity issues in packages
  ([b423cd8](https://github.com/chakra-ui/chakra-ui/commit/b423cd88f0ede7e37b9a9eaec63cacfc1e9e5221))
- case sensitivity issues in packages
  ([1242a46](https://github.com/chakra-ui/chakra-ui/commit/1242a4666fe0e9554b6691edcf42d366f7cff67a))
- typescript ref issues for modal
  ([821687e](https://github.com/chakra-ui/chakra-ui/commit/821687ef8948d0e925345693642a0b5b81486d74))
