# @chakra-ui/object-utils

## 2.0.8

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

## 2.0.7

### Patch Changes

- [#6905](https://github.com/chakra-ui/chakra-ui/pull/6905)
  [`c5be1bc73`](https://github.com/chakra-ui/chakra-ui/commit/c5be1bc734e833a32c1c08c734c2ff6e6dca6f36)
  Thanks [@bertho-zero](https://github.com/bertho-zero)! - Fixed issue where
  style overrides does not respect order of precedence due to the use of
  `Object.assign`.

  To illustrate the issue, consider the following example:

  ```js
  const stylesFromTheme = {
    px: 8,
    padding: 0,
  }

  const stylesFromProps = {
    px: 4,
  }

  const style = Object.assign({}, stylesFromTheme, stylesFromProps)
  // Result: { px: 4, padding: 0 }
  // Expected: { padding: 0, px: 4 }
  ```

  The issue is that `Object.assign` will replace properties in place with values
  from the override objects. This is not the desired behavior for style
  overrides hence a custom `assignAfter` function is used instead

## 2.0.6

### Patch Changes

- [#7154](https://github.com/chakra-ui/chakra-ui/pull/7154)
  [`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## All components

  Improved the bundling setup for all components.

  - Switched to the `.mjs` file extension for correct ESM behavior
  - Switched to the latest `tsup` will uses automatic JSX runtime detection
    removing the need for manually inject classic `React` import
  - Moved `tsup` config to `package.json` since it's very minimal
  - Removed `clean-package.config.json` in favor of the `package.json` property
  - Fixed issue where Storybook addon (dark mode and RTL) was not working

## 2.0.5

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.

## 2.0.4

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

## 2.0.3

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation

## 2.0.2

### Patch Changes

- Force release

## 2.0.1

### Patch Changes

- [`0822619ee`](https://github.com/chakra-ui/chakra-ui/commit/0822619ee31c52c90b71ace59771c295cd8306ae)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Initial release
