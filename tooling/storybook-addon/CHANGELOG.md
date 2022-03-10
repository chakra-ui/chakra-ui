# @chakra-ui/storybook-addon

## 1.0.3

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/icons@1.1.7

## 1.0.2

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/icons@1.1.5

## 1.0.1

### Patch Changes

- [#5340](https://github.com/chakra-ui/chakra-ui/pull/5340)
  [`ab247507a`](https://github.com/chakra-ui/chakra-ui/commit/ab247507ab6d30be356b657f652331801e880e52)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Added dependency to
  @chakra-ui/icons

## 1.0.0

### Major Changes

- [#5126](https://github.com/chakra-ui/chakra-ui/pull/5126)
  [`712cc3d1e`](https://github.com/chakra-ui/chakra-ui/commit/712cc3d1e6193ec7d98d195abdb124809f9b9b06)
  Thanks [@ngxCoder](https://github.com/ngxCoder)! - The official Storybook
  Addon for Chakra UI.

  ```sh
  yarn add -D @chakra-ui/storybook-addon
  ```

  ```sh
  npm i -D @chakra-ui/storybook-addon
  ```

  Add the addon to your configuration in `.storybook/main.js`:

  ```js live=false
  module.exports = {
    addons: ["@chakra-ui/storybook-addon"],
  }
  ```
