# Change Log

## 1.1.8

### Patch Changes

- Updated dependencies
  [[`f1d024749`](https://github.com/chakra-ui/chakra-ui/commit/f1d02474983dc8277e767dc729abc3cbb02cfe10)]:
  - @chakra-ui/react@1.8.2

## 1.1.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.8.1

## 1.1.6

### Patch Changes

- Updated dependencies
  [[`1b31b374c`](https://github.com/chakra-ui/chakra-ui/commit/1b31b374cbf413a551b8bd288da69e35c6bb8379)]:
  - @chakra-ui/react@1.8.0

## 1.1.5

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.7.5

## 1.1.4

### Patch Changes

- [#4835](https://github.com/chakra-ui/chakra-ui/pull/4835)
  [`12c31713c`](https://github.com/chakra-ui/chakra-ui/commit/12c31713c8c5df11bd7e3a16a5cf94311513dc2b)
  Thanks [@igorwessel](https://github.com/igorwessel)! - Upgrade
  `@testing-library/react-hooks` to test SSR. This was used to debug and fix
  issues with the `useId` hook.
- Updated dependencies []:
  - @chakra-ui/react@1.7.4

## 1.1.3

### Patch Changes

- Updated dependencies
  [[`6efe10f21`](https://github.com/chakra-ui/chakra-ui/commit/6efe10f21077992acf0edd0a97f8d877bf97180c)]:
  - @chakra-ui/react@1.7.3

## 1.1.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.7.2

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/react@1.7.1

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
  - @chakra-ui/react@1.7.0

## 1.0.37

### Patch Changes

- Updated dependencies
  [[`04774e219`](https://github.com/chakra-ui/chakra-ui/commit/04774e2196b9f3e8edd77f779e8c15981e8d8135)]:
  - @chakra-ui/react@1.6.12

## 1.0.36

### Patch Changes

- Updated dependencies
  [[`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/react@1.6.11

## 1.0.35

### Patch Changes

- Updated dependencies
  [[`1cfa2be4b`](https://github.com/chakra-ui/chakra-ui/commit/1cfa2be4b443ae4af8e5ec208cfe2c0fde23dde3)]:
  - @chakra-ui/react@1.6.10

## 1.0.34

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.6.9

## 1.0.33

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.6.8

## 1.0.32

### Patch Changes

- Updated dependencies
  [[`52640a1fd`](https://github.com/chakra-ui/chakra-ui/commit/52640a1fd9089e3c0ffc5dc8e42fcfa7a5752904),
  [`e7a732755`](https://github.com/chakra-ui/chakra-ui/commit/e7a732755e8b2447d3193225ba8265f78a9d1d81)]:
  - @chakra-ui/react@1.6.7

## 1.0.31

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.6.6

## 1.0.30

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.6.5

## 1.0.29

### Patch Changes

- Updated dependencies
  [[`aa374ffcb`](https://github.com/chakra-ui/chakra-ui/commit/aa374ffcb4003efd88eb6a62e10723ea9fbfa3d0)]:
  - @chakra-ui/react@1.6.4

## 1.0.28

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.6.3

## 1.0.27

### Patch Changes

- Updated dependencies
  [[`ddd5ef4a1`](https://github.com/chakra-ui/chakra-ui/commit/ddd5ef4a1e9cc988c99b80c26579205ea4c57b2f)]:
  - @chakra-ui/react@1.6.2

## 1.0.26

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.6.1

## 1.0.25

### Patch Changes

- Updated dependencies
  [[`1d5e55272`](https://github.com/chakra-ui/chakra-ui/commit/1d5e55272fe1475ce6fa0ed5bdccef4218885f77)]:
  - @chakra-ui/react@1.6.0

## 1.0.24

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.5.2

## 1.0.23

### Patch Changes

- Updated dependencies
  [[`09aa19b23`](https://github.com/chakra-ui/chakra-ui/commit/09aa19b23544f612ac54c22ad0b344d66b871674),
  [`81a40231f`](https://github.com/chakra-ui/chakra-ui/commit/81a40231f12461dcca0fa0cd3c4e9e2c0497a04d)]:
  - @chakra-ui/react@1.5.1

## 1.0.22

### Patch Changes

- Updated dependencies
  [[`ac21d798a`](https://github.com/chakra-ui/chakra-ui/commit/ac21d798a0759b45de02c6821804f40f492fd80e),
  [`2287d82e3`](https://github.com/chakra-ui/chakra-ui/commit/2287d82e31744cd289aaf524bb9961e46003c404)]:
  - @chakra-ui/react@1.5.0

## 1.0.21

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.4.2

## 1.0.20

### Patch Changes

- Updated dependencies
  [[`a576f4de8`](https://github.com/chakra-ui/chakra-ui/commit/a576f4de850706ea7088c8a6ea687269cad05e69)]:
  - @chakra-ui/react@1.4.1

## 1.0.19

### Patch Changes

- Updated dependencies
  [[`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92),
  [`64e8466b5`](https://github.com/chakra-ui/chakra-ui/commit/64e8466b528a027c915b7d2d5f474b08a0800e92)]:
  - @chakra-ui/react@1.4.0

## 1.0.18

### Patch Changes

- Updated dependencies
  [[`92adc0dc1`](https://github.com/chakra-ui/chakra-ui/commit/92adc0dc10e609d14439b95ed304a2731247d084)]:
  - @chakra-ui/react@1.3.4

## 1.0.17

### Patch Changes

- Updated dependencies
  [[`5a8d8c054`](https://github.com/chakra-ui/chakra-ui/commit/5a8d8c054aa3ecdfac51e355b61ac1ae6214f2d5),
  [`8597f58b7`](https://github.com/chakra-ui/chakra-ui/commit/8597f58b7d5c1fe401086d28a379bc1727756c5b)]:
  - @chakra-ui/react@1.3.3

## 1.0.16

### Patch Changes

- Updated dependencies
  [[`f3ba8dd53`](https://github.com/chakra-ui/chakra-ui/commit/f3ba8dd53abc697c096165185764235012ada90f)]:
  - @chakra-ui/react@1.3.2

## 1.0.15

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.3.1

## 1.0.14

### Patch Changes

- Updated dependencies
  [[`0100edbf0`](https://github.com/chakra-ui/chakra-ui/commit/0100edbf05c108c7d4725616dbbe9788a39da809),
  [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376)]:
  - @chakra-ui/react@1.3.0

## 1.0.13

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.2.1

## 1.0.12

### Patch Changes

- Updated dependencies
  [[`408096ca3`](https://github.com/chakra-ui/chakra-ui/commit/408096ca377197e46e2c9eb13e0ea33c46355b38),
  [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`fa2083807`](https://github.com/chakra-ui/chakra-ui/commit/fa2083807f8372dc054261a214d66545ab7cac14)]:
  - @chakra-ui/react@1.2.0

## 1.0.11

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.6

## 1.0.10

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.5

## 1.0.9

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.4

## 1.0.8

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.3

## 1.0.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.2

## 1.0.6

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.1.1

## 1.0.5

### Patch Changes

- Updated dependencies
  [[`6a410f77`](https://github.com/chakra-ui/chakra-ui/commit/6a410f778f534e00e01fdf0d3ce1ffdd1d7b138e),
  [`a0e0bd9a`](https://github.com/chakra-ui/chakra-ui/commit/a0e0bd9a5d45fe08887f8df8d3eccc84951578df),
  [`916588a5`](https://github.com/chakra-ui/chakra-ui/commit/916588a5bbb771ff3f07b0ceb160bef57cdd6a8a)]:
  - @chakra-ui/react@1.1.0

## 1.0.4

### Patch Changes

- Updated dependencies
  [[`5bff79a1`](https://github.com/chakra-ui/chakra-ui/commit/5bff79a1ba6989d279fc432d5040c72cd75b392e)]:
  - @chakra-ui/react@1.0.4

## 1.0.3

### Patch Changes

- Updated dependencies
  [[`0d0ed051`](https://github.com/chakra-ui/chakra-ui/commit/0d0ed0513ac1094833f1e0294f655af122682ff4)]:
  - @chakra-ui/react@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies
  [[`cfd3b325`](https://github.com/chakra-ui/chakra-ui/commit/cfd3b32564066076529811c5350aff6be565b7a3)]:
  - @chakra-ui/react@1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/react@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/test-utils

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

**Note:** Version bump only for package @chakra-ui/test-utils

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/test-utils

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/test-utils

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/test-utils

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/test-utils@1.0.0-rc.0...@chakra-ui/test-utils@1.0.0-rc.1) (2020-08-06)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/test-utils@1.0.0-next.7...@chakra-ui/test-utils@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/test-utils@1.0.0-next.6...@chakra-ui/test-utils@1.0.0-next.7) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/test-utils@1.0.0-next.5...@chakra-ui/test-utils@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/test-utils@1.0.0-next.4...@chakra-ui/test-utils@1.0.0-next.5) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/test-utils

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
