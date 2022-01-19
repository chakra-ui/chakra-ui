# Change Log

## 1.2.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/theme-tools@1.3.1
  - @chakra-ui/utils@1.9.1

## 1.2.0

### Minor Changes

- [#4991](https://github.com/chakra-ui/chakra-ui/pull/4991)
  [`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update build system
  we use from a custom babel cli setup to
  [preconstruct](https://preconstruct.tools/).

  The previous build system transpiles the code in `src` directory to `dist/esm`
  and `dist/cjs` keeping the same file structure. The new build system merges
  all files in `src` and transpiles to a single `esm` and `cjs` file.

  **Potential Breaking Change:** The side effect of this is that, if you
  imported any function, component or hook using the **undocumented** approach
  like
  `import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"`,
  you'll notice that the this doesn't work anymore.

  Here's how to resolve it:

  ```jsx live=false
  // Won't work 🎇
  import { useOutsideClick } from "@chakra-ui/hooks/dist/use-outside-click"

  // Works ✅
  import { useOutsideClick } from "@chakra-ui/hooks"
  ```

  If this affected your project, we recommend that you import hooks, functions
  or components the way it's shown in the documentation. This will help keep
  your project future-proof.

### Patch Changes

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/theme-tools@1.3.0
  - @chakra-ui/utils@1.9.0

## 1.1.16

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/theme-tools@1.2.3
  - @chakra-ui/utils@1.8.4

## 1.1.15

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/theme-tools@1.2.2

## 1.1.14

### Patch Changes

- Updated dependencies
  [[`09577b088`](https://github.com/chakra-ui/chakra-ui/commit/09577b088272075f6f183bbb34d5639ac5e68cc0)]:
  - @chakra-ui/theme-tools@1.2.1

## 1.1.13

### Patch Changes

- Updated dependencies
  [[`01c913309`](https://github.com/chakra-ui/chakra-ui/commit/01c913309819c342806307291d2d60aea0122ecf)]:
  - @chakra-ui/theme-tools@1.2.0

## 1.1.12

### Patch Changes

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/theme-tools@1.1.9

## 1.1.11

### Patch Changes

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/theme-tools@1.1.8

## 1.1.10

### Patch Changes

- [`4c157e320`](https://github.com/chakra-ui/chakra-ui/commit/4c157e320a73b08eb89a44831a7cf434fb403bad)
  [#4057](https://github.com/chakra-ui/chakra-ui/pull/4057) Thanks
  [@mcha-dev](https://github.com/mcha-dev)! - updated @see doc links to point to
  shorthand see PR #4046 comment

* [`afb9b3cfa`](https://github.com/chakra-ui/chakra-ui/commit/afb9b3cfa87076ed8897b7edd4a9d9f1e1701721)
  [#4103](https://github.com/chakra-ui/chakra-ui/pull/4103) Thanks
  [@with-heart](https://github.com/with-heart)! - Update transitions to use
  theme tokens and remove outline transitions

## 1.1.9

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/theme-tools@1.1.7

## 1.1.8

### Patch Changes

- [`946f8eab5`](https://github.com/chakra-ui/chakra-ui/commit/946f8eab5b98036db372dc0c85c9e5354c565b58)
  [#3858](https://github.com/chakra-ui/chakra-ui/pull/3858) Thanks
  [@antoniel](https://github.com/antoniel)! - Fix hyperlink to docs

- Updated dependencies
  [[`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/theme-tools@1.1.6

## 1.1.7

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/theme-tools@1.1.5

## 1.1.6

### Patch Changes

- [`dd2257935`](https://github.com/chakra-ui/chakra-ui/commit/dd225793575ff88aa2a2114a5840150ac3cf744c)
  [#3768](https://github.com/chakra-ui/chakra-ui/pull/3768) Thanks
  [@lorenzorapetti](https://github.com/lorenzorapetti)! - Fix an issue where
  `CircularProgress` with `isIndeterminate` doesn't show the indicator
- Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/theme-tools@1.1.4

## 1.1.5

### Patch Changes

- [`1cff6f54e`](https://github.com/chakra-ui/chakra-ui/commit/1cff6f54e5d6d8d72456915f56a6a575054305dc)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue in safari
  where circular progress indicator shows a tiny bit when value is `0`
- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`c69d2b983`](https://github.com/chakra-ui/chakra-ui/commit/c69d2b98350b57f133d6a8ea47b631cd25693aee),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/theme-tools@1.1.3

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/theme-tools@1.1.2

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/theme-tools@1.1.1

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d),
  [`d77f63415`](https://github.com/chakra-ui/chakra-ui/commit/d77f63415822ad26e4f6ed133e4869c07fa72306)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/theme-tools@1.1.0

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/theme-tools@1.0.4

## 1.1.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

## 1.0.5

### Patch Changes

- [`02041efc`](https://github.com/chakra-ui/chakra-ui/commit/02041efcecd8b5f98ddd7be411c56cf12a40d343)
  [#2946](https://github.com/chakra-ui/chakra-ui/pull/2946) Thanks
  [@dodas](https://github.com/dodas)! - You can now override linear progress
  component's border radius in the theme.

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/theme-tools@1.0.3

## 1.0.3

### Patch Changes

- [`d45c4956`](https://github.com/chakra-ui/chakra-ui/commit/d45c495617ee5038b56eee89b094979b2ac96128)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Forward
  `aria-label` and `aria-labelledby` to element that has `role=progressbar`
  which is the `ProgressFilledTrack` component

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/theme-tools@1.0.2

## 1.0.1

### Patch Changes

- [`f0d03d9f`](https://github.com/chakra-ui/chakra-ui/commit/f0d03d9f6e474a1f1767643889734665c2910dc1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fixed issue where
  border radius prop doesn't apply to outer div

- Updated dependencies
  [[`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/theme-tools@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/progress

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

**Note:** Version bump only for package @chakra-ui/progress

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/progress

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/progress

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/progress

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/progress

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/progress

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/progress@1.0.0-rc.0...@chakra-ui/progress@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/progress

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/progress@1.0.0-next.7...@chakra-ui/progress@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/progress

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/progress@1.0.0-next.6...@chakra-ui/progress@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/progress

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/progress@1.0.0-next.5...@chakra-ui/progress@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/progress

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/progress@1.0.0-next.4...@chakra-ui/progress@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- zero errors in progress utils
  ([3125838](https://github.com/chakra-ui/chakra-ui/commit/3125838d05eb504427d9c18b04f449585941c7d1))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- add progress component preset styles
  ([488a65e](https://github.com/chakra-ui/chakra-ui/commit/488a65e6bfda39eec73ef80e10af014ae875201a))
- move migration file to root of progress package
  ([bc49717](https://github.com/chakra-ui/chakra-ui/commit/bc49717005370ba9d3db447ba46e094756d5f033))
- progress indicator style
  ([d798d59](https://github.com/chakra-ui/chakra-ui/commit/d798d59fc9c9b016290ab96a2b2fb928b3d059e4))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- work on progress component readme and stories
  ([02f498f](https://github.com/chakra-ui/chakra-ui/commit/02f498f6618387a0cda7ec5b9db1cfe5944fb294))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- add progress component preset styles
  ([488a65e](https://github.com/chakra-ui/chakra-ui/commit/488a65e6bfda39eec73ef80e10af014ae875201a))
- move migration file to root of progress package
  ([bc49717](https://github.com/chakra-ui/chakra-ui/commit/bc49717005370ba9d3db447ba46e094756d5f033))
- progress indicator style
  ([d798d59](https://github.com/chakra-ui/chakra-ui/commit/d798d59fc9c9b016290ab96a2b2fb928b3d059e4))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- work on progress component readme and stories
  ([02f498f](https://github.com/chakra-ui/chakra-ui/commit/02f498f6618387a0cda7ec5b9db1cfe5944fb294))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- add progress component preset styles
  ([488a65e](https://github.com/chakra-ui/chakra-ui/commit/488a65e6bfda39eec73ef80e10af014ae875201a))
- move migration file to root of progress package
  ([bc49717](https://github.com/chakra-ui/chakra-ui/commit/bc49717005370ba9d3db447ba46e094756d5f033))
- progress indicator style
  ([d798d59](https://github.com/chakra-ui/chakra-ui/commit/d798d59fc9c9b016290ab96a2b2fb928b3d059e4))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- work on progress component readme and stories
  ([02f498f](https://github.com/chakra-ui/chakra-ui/commit/02f498f6618387a0cda7ec5b9db1cfe5944fb294))
