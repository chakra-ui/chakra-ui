# Change Log

## 1.1.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.

## 1.1.0

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

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/css-reset

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

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/css-reset

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-rc.0...@chakra-ui/css-reset@1.0.0-rc.1) (2020-08-06)

### Features

- add svg improvements in css reset
  ([071c329](https://github.com/chakra-ui/chakra-ui/commit/071c329ebc40a91443a07bebbbacb009c71e55fb))
- move font feature settings to stat and add default to css reset
  ([2c1ba4b](https://github.com/chakra-ui/chakra-ui/commit/2c1ba4be4b024d596ee0daf0ca1b8e3cf7c77087))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.7...@chakra-ui/css-reset@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.6...@chakra-ui/css-reset@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- issue with input element ui and css-reset
  ([cc221de](https://github.com/chakra-ui/chakra-ui/commit/cc221de6878530d572c8f80032dad150d022c81c))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.5...@chakra-ui/css-reset@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/css-reset@1.0.0-next.4...@chakra-ui/css-reset@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/css-reset

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **select:** remove duplicate Select arrow in ie11
  ([c21681b](https://github.com/chakra-ui/chakra-ui/commit/c21681b982322b6af957b49ec484ac62020b90b5))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- **select:** remove duplicate Select arrow in ie11
  ([c21681b](https://github.com/chakra-ui/chakra-ui/commit/c21681b982322b6af957b49ec484ac62020b90b5))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- **select:** remove duplicate Select arrow in ie11
  ([c21681b](https://github.com/chakra-ui/chakra-ui/commit/c21681b982322b6af957b49ec484ac62020b90b5))
- use pseudo element instead of pseudo class
  ([756cdae](https://github.com/chakra-ui/chakra-ui/commit/756cdaeb1f72f7dcbda45124b78696c7638c80de))
