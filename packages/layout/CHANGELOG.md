# Change Log

## 1.3.2

### Patch Changes

- [`f60e5c174`](https://github.com/chakra-ui/chakra-ui/commit/f60e5c174e07730cf073f2bf53ac6e0c8a66d0c1)
  [#3509](https://github.com/chakra-ui/chakra-ui/pull/3509) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Simplify wrap style
  management to use CSS custom properties.

* [`dedc2d45f`](https://github.com/chakra-ui/chakra-ui/commit/dedc2d45fd8e568f9162bcf406b3059819eff6ff)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - `SimpleGrid`: Avoid grid
  blow by adding `minmax(0, 1fr)`

* Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/icon@1.1.2

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/icon@1.1.1

## 1.3.0

### Minor Changes

- [`f90d8be54`](https://github.com/chakra-ui/chakra-ui/commit/f90d8be545069ebedc42f13cb293c26c35eb0d3b)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - **Bug Fixes:**

  - Update transform style for `AbsoluteCenter` when `axis` is `both`

  **Features:**

  - Add `shouldWrapChildren` to `Wrap` component to make it possible use `Wrap`
    directly without thinking about `WrapItem`.

  - Update `LinkBox` and `LinkOverlay` components and make them public in docs.

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)]:
  - @chakra-ui/icon@1.1.0

## 1.2.0

### Minor Changes

- [`df66d58e`](https://github.com/chakra-ui/chakra-ui/commit/df66d58e163c285f33649cfd2a480b810e9599a2)
  [#3137](https://github.com/chakra-ui/chakra-ui/pull/3137) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Add `AbsoluteCenter`
  component to help manage centering of an element relative to its parent
  dimensions.

  It requires a parent that has `position: relative` to work correctly.

  Here's how it works:

  ```jsx
  <Box position="relative" w="600px" h="400px">
    <img src="some-image.png" />
    {/** This will be centered relative to `Box` */}
    <AbsoluteCenter>
      <PlayButton />
    </AbsoluteCenter>
  </Box>
  ```

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/icon@1.0.3

## 1.1.2

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

## 1.1.1

### Patch Changes

- [`aeb5e521`](https://github.com/chakra-ui/chakra-ui/commit/aeb5e5214970e7fd239629226dd06f6058b8c697)
  [#2794](https://github.com/chakra-ui/chakra-ui/pull/2794) Thanks
  [@with-heart](https://github.com/with-heart)! - Enabled ref forwarding for
  `ListItem`

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/icon@1.0.2

## 1.1.0

### Minor Changes

- [`2192be3d`](https://github.com/chakra-ui/chakra-ui/commit/2192be3db77504addffc89cbfef62fb9e884fa5d)
  [#2635](https://github.com/chakra-ui/chakra-ui/pull/2635) Thanks
  [@jmiazga](https://github.com/jmiazga)! - feat: added theming to List,
  ListItem, and ListIcon

* [`c696345a`](https://github.com/chakra-ui/chakra-ui/commit/c696345a711338a23542a7b1911a33927a9ba5f1)
  [#2602](https://github.com/chakra-ui/chakra-ui/pull/2602) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(container): add ability
  to style container component with theme api

- [`9fdc61d8`](https://github.com/chakra-ui/chakra-ui/commit/9fdc61d8801f6d76783b5c9f068525d4dfc28b20)
  [#2478](https://github.com/chakra-ui/chakra-ui/pull/2478) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(divider): add ability
  to style divider component with theme api

### Patch Changes

- [`6b527414`](https://github.com/chakra-ui/chakra-ui/commit/6b52741456f71ba4ec8cfe3e6307796d195adf5b)
  [#2589](https://github.com/chakra-ui/chakra-ui/pull/2589) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - fix prop type interface
  for stack

## 1.0.1

### Patch Changes

- [`b3594802`](https://github.com/chakra-ui/chakra-ui/commit/b3594802714115c762013174badd5b838217be6f)
  [#2522](https://github.com/chakra-ui/chakra-ui/pull/2522) Thanks
  [@Qrymy](https://github.com/Qrymy)! - ## Stack

  - Fix Stack divider keys issue
  - Fix issue where stack with divider doesn't respond to both responsive
    spacing and responsive direction

  This wasn't working in v1 but now works 🎉

  ```jsx
  <Stack
    spacing={["10px", "60px"]}
    divider={<StackDivider borderColor="gray.200" />}
    direction={["column", "row"]}
  >
    <Box bgColor="red.500">First</Box>
    <Box bgColor="blue.500">Second</Box>
    <Box bgColor="yellow.500">Third</Box>
  </Stack>
  ```

  - Make it possible the regular `Divider` component within `Stack` by extending
    the `__css` internal style prop

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/layout

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

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/layout

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-rc.0...@chakra-ui/layout@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- fix function name typos
  ([8c50098](https://github.com/chakra-ui/chakra-ui/commit/8c5009801afb83428020efcfc1e93d5a92f40107))
- issue with radio and radio group name
  ([4e09ebb](https://github.com/chakra-ui/chakra-ui/commit/4e09ebbf73d8f940a56703761914c2461e7a451f))
- stack key issue and yarn2 deps issue
  ([d6cb6b8](https://github.com/chakra-ui/chakra-ui/commit/d6cb6b8fd964729efdf41b1e29c888a3c101316c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.7...@chakra-ui/layout@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.6...@chakra-ui/layout@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- link type inference with as prop
  ([6fd3d52](https://github.com/chakra-ui/chakra-ui/commit/6fd3d52df8147e949ed2e1ae460977f290fd149d))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.5...@chakra-ui/layout@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/layout

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/layout@1.0.0-next.4...@chakra-ui/layout@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- fixed margin bug for Stack column-reverse and row-reverse
  ([3d1d872](https://github.com/chakra-ui/chakra-ui/commit/3d1d8728fabea1b3da9bf11c40e32ca0e348eef9))
- stack key issue [#1129](https://github.com/chakra-ui/chakra-ui/issues/1129)
  ([2f5361a](https://github.com/chakra-ui/chakra-ui/commit/2f5361a06ab4fd8347d106425252c3ed5dcba0b9))
- updated Stack to allow 'row-reverse' and 'column-reverse' for direction prop
  ([1180b6b](https://github.com/chakra-ui/chakra-ui/commit/1180b6b7b97ba33c5b9506f65cec59ac4e37048f))

### Features

- allow AspectRatio to take a responsive value for its ratio prop
  ([941aa68](https://github.com/chakra-ui/chakra-ui/commit/941aa68ea5db6295698344f47274ef6ef9cf7b31))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- **stack:** default align-items css value
  ([ab8b4f4](https://github.com/chakra-ui/chakra-ui/commit/ab8b4f4f0c0cc21cfa0af119a629bcbfddcd909c))
- **stack:** no default value for align prop
  ([cdd2f7b](https://github.com/chakra-ui/chakra-ui/commit/cdd2f7b4b7b8815fdc602571e01ee82107fff05f))
- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- UnorderedList was not rendering bullets
  ([4a532b5](https://github.com/chakra-ui/chakra-ui/commit/4a532b559719583cd644294b62ebc16fe8a88ccc))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- added forwardRef to HStack and VStack
  ([dace172](https://github.com/chakra-ui/chakra-ui/commit/dace172c851210d12e0d841a62f3532fd0974203))
- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- GripProps export conflict
  ([79b15b1](https://github.com/chakra-ui/chakra-ui/commit/79b15b1e92f4f1280f12fca5742f94193af07dd4))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **stack:** add support for responsive direction and divider
  ([074f317](https://github.com/chakra-ui/chakra-ui/commit/074f3176218ecc57b944f6d2f04622d3e741ae00))
