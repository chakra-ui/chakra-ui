# Change Log

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

* [`2192be3d`](https://github.com/chakra-ui/chakra-ui/commit/2192be3db77504addffc89cbfef62fb9e884fa5d)
  [#2635](https://github.com/chakra-ui/chakra-ui/pull/2635) Thanks
  [@jmiazga](https://github.com/jmiazga)! - feat: added theming to List,
  ListItem, and ListIcon

- [`a36ede75`](https://github.com/chakra-ui/chakra-ui/commit/a36ede7519b7193f90e4985636a06c5d483a8a62)
  [#2681](https://github.com/chakra-ui/chakra-ui/pull/2681) Thanks
  [@dodas](https://github.com/dodas)! - This change prevent shrinking of
  AlertIcon when using Alert with long text

* [`c696345a`](https://github.com/chakra-ui/chakra-ui/commit/c696345a711338a23542a7b1911a33927a9ba5f1)
  [#2602](https://github.com/chakra-ui/chakra-ui/pull/2602) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(container): add ability
  to style container component with theme api

- [`9fdc61d8`](https://github.com/chakra-ui/chakra-ui/commit/9fdc61d8801f6d76783b5c9f068525d4dfc28b20)
  [#2478](https://github.com/chakra-ui/chakra-ui/pull/2478) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(divider): add ability
  to style divider component with theme api

## 1.1.0

### Minor Changes

- [`843854ec`](https://github.com/chakra-ui/chakra-ui/commit/843854ec669367623b50a598402be343866d87a8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Update heading
  theme to relative values for line height

  - Fixed error styles for flushed input variant
    [#2508](https://github.com/chakra-ui/chakra-ui/issues/2508)

  ```jsx
  // This shows the wrong shadow on focus. Work nows 🎉
  <Input variant="flushed" isInvalid placeholder="Focus me" />
  ```

### Patch Changes

- [`892ea2ca`](https://github.com/chakra-ui/chakra-ui/commit/892ea2ca1c02b4127f4f044df33de58cc7641f5c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix orientation
  styles for Tabs when orientation prop is vertical
  [#1187](https://github.com/chakra-ui/chakra-ui/issues/1187)

  - Add support for styling the `root` tab element from theme
    [#2548](https://github.com/chakra-ui/chakra-ui/issues/2548)

- Updated dependencies []:
  - @chakra-ui/theme-tools@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/theme

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

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-rc.0...@chakra-ui/theme@1.0.0-rc.1) (2020-08-06)

### Features

- move font feature settings to stat and add default to css reset
  ([2c1ba4b](https://github.com/chakra-ui/chakra-ui/commit/2c1ba4be4b024d596ee0daf0ca1b8e3cf7c77087))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.7...@chakra-ui/theme@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.6...@chakra-ui/theme@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- added ColorModeOptions type to theme config
  ([648d41f](https://github.com/chakra-ui/chakra-ui/commit/648d41f56b9fd501d730c55f34058e61c6a9febb))
- select option issue in dark mode
  ([f36a747](https://github.com/chakra-ui/chakra-ui/commit/f36a747007451204d4895f48d0d22e5afd393d45))

### Reverts

- breakpoint handling
  ([f3ee5f1](https://github.com/chakra-ui/chakra-ui/commit/f3ee5f15c48da242c4d4d43de0dc67ff7664c81e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.5...@chakra-ui/theme@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.4...@chakra-ui/theme@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- tabs align prop didnt do anything
  ([8e56b1b](https://github.com/chakra-ui/chakra-ui/commit/8e56b1b8427bd49a91c67ca3c1da792e76ef005c))

### Features

- add popover transition
  ([73d8c4f](https://github.com/chakra-ui/chakra-ui/commit/73d8c4fc9c676c95232cd259f59cce7d38eff94b))
- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))
- add transition tokens
  ([40c8b30](https://github.com/chakra-ui/chakra-ui/commit/40c8b30f0f0219a1ed673db97c4032e721f38e53))
- add transition tokens
  ([5e190fa](https://github.com/chakra-ui/chakra-ui/commit/5e190fa70b41f6e0e063d3d68f0dd32adff754eb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.4](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.4) (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- Adding Icon to theme export
  ([85ff918](https://github.com/chakra-ui/chakra-ui/commit/85ff918c30c9d6d1165cc69884fcb44cf3e13f2a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))

### Reverts

- theme z-indexes
  ([52494e0](https://github.com/chakra-ui/chakra-ui/commit/52494e07f452ba973f76a5bdeb1dc32025fa9a1a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.3](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.3) (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))

### Reverts

- theme z-indexes
  ([52494e0](https://github.com/chakra-ui/chakra-ui/commit/52494e07f452ba973f76a5bdeb1dc32025fa9a1a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.2](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.2) (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))
