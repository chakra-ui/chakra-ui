# @chakra-ui/react

## 2.9.2

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/styled-system@2.10.2
  - @chakra-ui/hooks@2.3.2
  - @chakra-ui/theme@3.4.2
  - @chakra-ui/utils@2.1.2

## 2.9.1

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/styled-system@2.10.1
  - @chakra-ui/hooks@2.3.1
  - @chakra-ui/theme@3.4.1
  - @chakra-ui/utils@2.1.1

## 2.9.0

### Minor Changes

- [`c04ca6a`](https://github.com/chakra-ui/chakra-ui/commit/c04ca6a155797a74e5fffc0d52d2f701d0459463)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Export
  `CreateIconOptions`

- [#8433](https://github.com/chakra-ui/chakra-ui/pull/8433)
  [`fd5fab4`](https://github.com/chakra-ui/chakra-ui/commit/fd5fab415b8abe3d56aa5fac7304f6beeb0351ca)
  Thanks [@bhainesva](https://github.com/bhainesva)! - Export `useAlertContext`
  hook

- [`75d0293`](https://github.com/chakra-ui/chakra-ui/commit/75d0293c2efb40705817ac6b91434e4004faa68a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Force release

- [#8136](https://github.com/chakra-ui/chakra-ui/pull/8136)
  [`006d9e0`](https://github.com/chakra-ui/chakra-ui/commit/006d9e0b5e58aaa8f5ac635ea1238be6ed7e73d6)
  Thanks [@MrBr](https://github.com/MrBr)! - Export `toastStore` from `toast`
  component

- [#8310](https://github.com/chakra-ui/chakra-ui/pull/8310)
  [`c6dc139`](https://github.com/chakra-ui/chakra-ui/commit/c6dc139ee0835adb962910807e25c60c78696aa7)
  Thanks [@TylerAPfledderer](https://github.com/TylerAPfledderer)! - Add support
  for custom theme conditions or pseudo props via `theme.conditions`

  ```ts
  // theme.ts

  const theme = extendTheme({
    conditions: {
      _closed: "[data-state='closed']", // pseudo prop
    },
  })
  ```

  This allows you to use the pseudo prop in your components

  ```jsx
  <Box data-state="closed" _closed={{ bg: "red.200" }}>
    This box is closed
  </Box>
  ```

  **For TypeScript users**, you need to use the Chakra CLI to generate the types
  for your custom conditions.

  ```sh
  pnpm chakra-cli tokens src/theme/index.ts
  ```

- [#8222](https://github.com/chakra-ui/chakra-ui/pull/8222)
  [`c583d8a`](https://github.com/chakra-ui/chakra-ui/commit/c583d8a03d813d26d14d340984e91385b6b403a2)
  Thanks [@TKYK93](https://github.com/TKYK93)! - Add default
  `preserveScrollBarGap`

- [#8754](https://github.com/chakra-ui/chakra-ui/pull/8754)
  [`b26adab`](https://github.com/chakra-ui/chakra-ui/commit/b26adab9db1b582dc9fdf5547685787eec156dd3)
  Thanks [@loren138](https://github.com/loren138)! - Add for attribute to Radio
  and Checkbox label if id is available for the input

### Patch Changes

- [#8208](https://github.com/chakra-ui/chakra-ui/pull/8208)
  [`8135ded`](https://github.com/chakra-ui/chakra-ui/commit/8135ded09b523681f33e818017a841b64a05e9c1)
  Thanks [@SamuelNoB](https://github.com/SamuelNoB)! - Fix problem with leading
  and trailing spaces when getting initials for the Avatar component

- [#8523](https://github.com/chakra-ui/chakra-ui/pull/8523)
  [`44d1469`](https://github.com/chakra-ui/chakra-ui/commit/44d1469a82e7c0e9607a4bc6db6d05ad16e7dc2a)
  Thanks [@andrey-mitko](https://github.com/andrey-mitko)! - Include "nonce"
  from "EmotionCache" inside style tag injected by color-mode.util to resolve
  Content Security Policy error

- [#8462](https://github.com/chakra-ui/chakra-ui/pull/8462)
  [`938916a`](https://github.com/chakra-ui/chakra-ui/commit/938916a0c3512fb459aa80a635ffd41239bd63ea)
  Thanks [@Philzen](https://github.com/Philzen)! - Revert breaking change by
  re-allowing disabled prop on button

- Updated dependencies
  [[`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36),
  [`52d5f3c`](https://github.com/chakra-ui/chakra-ui/commit/52d5f3ccb5732b3ba84cdc04c3258c49c38c64a9),
  [`75d0293`](https://github.com/chakra-ui/chakra-ui/commit/75d0293c2efb40705817ac6b91434e4004faa68a),
  [`c6dc139`](https://github.com/chakra-ui/chakra-ui/commit/c6dc139ee0835adb962910807e25c60c78696aa7),
  [`85a81c8`](https://github.com/chakra-ui/chakra-ui/commit/85a81c892bda2b6c49517129201690858d1289e0),
  [`c6dc139`](https://github.com/chakra-ui/chakra-ui/commit/c6dc139ee0835adb962910807e25c60c78696aa7)]:
  - @chakra-ui/theme@3.4.0
  - @chakra-ui/styled-system@2.10.0
  - @chakra-ui/hooks@2.3.0
  - @chakra-ui/utils@2.1.0
