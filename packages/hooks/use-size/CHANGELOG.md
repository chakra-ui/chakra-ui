# @chakra-ui/react-use-size

## 2.0.9

### Patch Changes

- [#7295](https://github.com/chakra-ui/chakra-ui/pull/7295)
  [`ba7be75c2`](https://github.com/chakra-ui/chakra-ui/commit/ba7be75c2b8f7a38987781f6a0dd30086af7e2f7)
  Thanks [@renovate](https://github.com/apps/renovate)! - Update
  dependency` @zag-js/element-size` to `v0.3.1`

## 2.0.8

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

## 2.0.7

### Patch Changes

- [`7a62c30cc`](https://github.com/chakra-ui/chakra-ui/commit/7a62c30cc4977adf7c6021fabbd16b3bd4707e9f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Update `@zag-js/*`
  dependencies to latest versions for better ESM compatibility

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

- [#6457](https://github.com/chakra-ui/chakra-ui/pull/6457)
  [`04ff824ac`](https://github.com/chakra-ui/chakra-ui/commit/04ff824ac2f69aaa82d08bf2905ad4667327db12)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Initial release
