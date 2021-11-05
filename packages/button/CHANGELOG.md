# Change Log

## 1.4.6

### Patch Changes

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/spinner@1.1.14

## 1.4.5

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/spinner@1.1.13

## 1.4.4

### Patch Changes

- [`21531b59d`](https://github.com/chakra-ui/chakra-ui/commit/21531b59dba938be1b4ee9d3a5f43f4e10d3f783)
  [#4767](https://github.com/chakra-ui/chakra-ui/pull/4767) Thanks
  [@gluck](https://github.com/gluck)! - Added missing `@chakra-ui/react-utils`
  import

## 1.4.3

### Patch Changes

- [`87ffdd1cb`](https://github.com/chakra-ui/chakra-ui/commit/87ffdd1cb615e9d4bc8a9af66fb6ae9ef1563caf)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  composing `Button` with framer-motion's `motion` factory breaks
  animation/transition

## 1.4.2

### Patch Changes

- [`bafcc39aa`](https://github.com/chakra-ui/chakra-ui/commit/bafcc39aa80964928a69215ab16e0f24f33bea95)
  [#4353](https://github.com/chakra-ui/chakra-ui/pull/4353) Thanks
  [@dsumer](https://github.com/dsumer)! - Resolved an issue where a `Button` in
  loading state didn't consider the width of `leftIcon` and `rightIcon`,
  resulting in layout shifts when the button leaves the loading state. Buttons
  now render with the same width regardless of state.
- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/spinner@1.1.12

## 1.4.1

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/spinner@1.1.11

## 1.4.0

### Minor Changes

- [`7e3d3ff35`](https://github.com/chakra-ui/chakra-ui/commit/7e3d3ff356b9f2e875790cd7a96ddfce83034737)
  [#3904](https://github.com/chakra-ui/chakra-ui/pull/3904) Thanks
  [@antoniel](https://github.com/antoniel)! - Add className prop to button load
  spinner

### Patch Changes

- [`afb9b3cfa`](https://github.com/chakra-ui/chakra-ui/commit/afb9b3cfa87076ed8897b7edd4a9d9f1e1701721)
  [#4103](https://github.com/chakra-ui/chakra-ui/pull/4103) Thanks
  [@with-heart](https://github.com/with-heart)! - Update transitions to use
  theme tokens and remove outline transitions

* [`ff946d73e`](https://github.com/chakra-ui/chakra-ui/commit/ff946d73e121aba4b2ff2740ea22440a1c5fdb85)
  [#4245](https://github.com/chakra-ui/chakra-ui/pull/4245) Thanks
  [@Mattinton](https://github.com/Mattinton)! - fix(icon-button): update
  IconButton to use theme borderRadius

* Updated dependencies
  [[`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad)]:
  - @chakra-ui/spinner@1.1.10

## 1.3.2

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/spinner@1.1.9

## 1.3.1

### Patch Changes

- [`ad8a7b9f1`](https://github.com/chakra-ui/chakra-ui/commit/ad8a7b9f1064bba04a8f9cc022de2d773ab1e331)
  [#3875](https://github.com/chakra-ui/chakra-ui/pull/3875) Thanks
  [@antoniel](https://github.com/antoniel)! - Resolved an issue where the `type`
  prop of the `Button` component was set to `undefined`.
- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/spinner@1.1.8

## 1.3.0

### Minor Changes

- [`aec2aaf9d`](https://github.com/chakra-ui/chakra-ui/commit/aec2aaf9d6e7fb43855ae7e3b238ee043ec2c533)
  [#3732](https://github.com/chakra-ui/chakra-ui/pull/3732) Thanks
  [@jatin33](https://github.com/jatin33)! - Added `spinnerPlacement` prop to
  allow changing the spinner placement for the button when `isLoading` is
  `true`. Spinner placement can be either `start` or `end`

  ```jsx live=false
  <Button isLoading spinnerPlacement="end">
    Click me
  </Button>
  ```

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/spinner@1.1.7

## 1.2.2

### Patch Changes

- [`3ff53e4e3`](https://github.com/chakra-ui/chakra-ui/commit/3ff53e4e3857b94c4fc18b8e02cf914bdff860e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix alignment of
  icon inside button

* [`9fcccbe34`](https://github.com/chakra-ui/chakra-ui/commit/9fcccbe348f87fb4a386450e5327bb578e14cb16)
  [#3765](https://github.com/chakra-ui/chakra-ui/pull/3765) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update button group styles
  to use rtl-friendly equivalent

* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d),
  [`3ff53e4e3`](https://github.com/chakra-ui/chakra-ui/commit/3ff53e4e3857b94c4fc18b8e02cf914bdff860e1)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/spinner@1.1.6

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`87a03b320`](https://github.com/chakra-ui/chakra-ui/commit/87a03b320b62e639ca4a891186f202cb839a8402),
  [`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/react-utils@1.1.1
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/spinner@1.1.5

## 1.2.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/react-utils@1.1.0
  - @chakra-ui/spinner@1.1.4

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/spinner@1.1.3

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/spinner@1.1.2

## 1.1.2

### Patch Changes

- [`01231ed49`](https://github.com/chakra-ui/chakra-ui/commit/01231ed4919521fbe911cb1b035f4beadb340fa5)
  [#3298](https://github.com/chakra-ui/chakra-ui/pull/3298) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Provide better typings for
  `size` and `variant` for AvatarGroup, CheckboxGroup, ButtonGroup, and
  RadioGroup.

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/spinner@1.1.1

## 1.1.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)]:
  - @chakra-ui/spinner@1.1.0

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/spinner@1.0.3

## 1.0.3

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

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/spinner@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/spinner@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/button

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

**Note:** Version bump only for package @chakra-ui/button

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/button

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/button

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/button

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/button

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/button

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/button@1.0.0-rc.0...@chakra-ui/button@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **button:** issue where spinner is not centered on lg button
  ([4245722](https://github.com/chakra-ui/chakra-ui/commit/4245722f560334dc24d714ba36daf49f78de9486))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/button@1.0.0-next.7...@chakra-ui/button@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/button

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/button@1.0.0-next.6...@chakra-ui/button@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/button

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/button@1.0.0-next.5...@chakra-ui/button@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/button

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/button@1.0.0-next.4...@chakra-ui/button@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/button

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- button ignores `type` prop when `as` prop is used
  ([ba60c8b](https://github.com/chakra-ui/chakra-ui/commit/ba60c8b22930eade8f2f0c6f6884e8121a0cae5c))
- **button:** remove negative margin on icons
  ([4ed6c4b](https://github.com/chakra-ui/chakra-ui/commit/4ed6c4bc0699c1054fdd27985e1bc931a99ae055))
- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- force uppercase package directories to lowercase
  ([3704992](https://github.com/chakra-ui/chakra-ui/commit/370499278a526e37bc6ac7d2bc30879425441f46))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- force uppercase package directories to lowercase
  ([3704992](https://github.com/chakra-ui/chakra-ui/commit/370499278a526e37bc6ac7d2bc30879425441f46))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- force uppercase package directories to lowercase
  ([3704992](https://github.com/chakra-ui/chakra-ui/commit/370499278a526e37bc6ac7d2bc30879425441f46))
