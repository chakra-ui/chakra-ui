# Change Log

## 1.1.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/icon@1.2.1

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

### Patch Changes

- Updated dependencies
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6)]:
  - @chakra-ui/icon@1.2.0

## 1.0.17

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.13

## 1.0.16

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.12

## 1.0.15

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.11

## 1.0.14

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.10

## 1.0.13

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.9

## 1.0.12

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.8

## 1.0.11

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.7

## 1.0.10

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.6

## 1.0.9

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.5

## 1.0.8

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.4

## 1.0.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.3

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.2

## 1.0.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.1.1

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)]:
  - @chakra-ui/icon@1.1.0

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/icon@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/icons

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

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/icons

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-rc.0...@chakra-ui/icons@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.7...@chakra-ui/icons@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.6...@chakra-ui/icons@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- **icons:** add displayName to hamburger icon
  ([045091d](https://github.com/chakra-ui/chakra-ui/commit/045091d57768270b5a9e95d457ff3ceb67600a40))
- **icons:** Fix viewBox on DragHandleIcon
  ([3ed2b9f](https://github.com/chakra-ui/chakra-ui/commit/3ed2b9ff034b6c75f6bdd55fd4606db2e52d3b8b))

### Features

- **icons:** add hamburger(menu) icon
  ([69e72fa](https://github.com/chakra-ui/chakra-ui/commit/69e72faa9b27e4f5451283feb88339fbcc0d3f46))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.5...@chakra-ui/icons@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/icons@1.0.0-next.4...@chakra-ui/icons@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/icons

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- **delete-icon:** svg path
  ([9754911](https://github.com/chakra-ui/chakra-ui/commit/9754911bf2f0cb9ae9d099c05551259547cd57ac))
- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- updated viewBox because the DownloadIcon was too small
  ([37b1f3f](https://github.com/chakra-ui/chakra-ui/commit/37b1f3f6d36ceca63af2d69e6a6a5554bb1a970b))

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
