# @chakra-ui/provider

## 2.1.0

### Minor Changes

- [#7232](https://github.com/chakra-ui/chakra-ui/pull/7232)
  [`1d1f202e7`](https://github.com/chakra-ui/chakra-ui/commit/1d1f202e7f44c606659809dcb6f83746a68ac1e6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add
  `disableEnvironment` option to disable the environment injected span

### Patch Changes

- [#7248](https://github.com/chakra-ui/chakra-ui/pull/7248)
  [`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Improved JS Doc
  comments to include default values
  - Fixed regression in exported components
- Updated dependencies
  [[`c57b00f80`](https://github.com/chakra-ui/chakra-ui/commit/c57b00f80f177c2a165dc3e879e30e362b0806fb),
  [`1d1f202e7`](https://github.com/chakra-ui/chakra-ui/commit/1d1f202e7f44c606659809dcb6f83746a68ac1e6)]:
  - @chakra-ui/react-env@3.0.0
  - @chakra-ui/portal@2.0.15

## 2.0.30

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`3ce311ac7`](https://github.com/chakra-ui/chakra-ui/commit/3ce311ac796bc7f24d7b92bf52f5f207348963cc),
  [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/system@2.4.0
  - @chakra-ui/css-reset@2.0.12
  - @chakra-ui/react-env@2.0.13
  - @chakra-ui/portal@2.0.14
  - @chakra-ui/utils@2.0.15

## 2.0.29

### Patch Changes

- Updated dependencies
  [[`c5be1bc73`](https://github.com/chakra-ui/chakra-ui/commit/c5be1bc734e833a32c1c08c734c2ff6e6dca6f36)]:
  - @chakra-ui/system@2.3.8

## 2.0.28

### Patch Changes

- Updated dependencies
  [[`9cdd43733`](https://github.com/chakra-ui/chakra-ui/commit/9cdd43733469e834740ec589a73f0d546c1e6b5b),
  [`2d8f36c1d`](https://github.com/chakra-ui/chakra-ui/commit/2d8f36c1d100bb729aa735cbea4a338550cb2bfc)]:
  - @chakra-ui/utils@2.0.14
  - @chakra-ui/system@2.3.7

## 2.0.27

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

- Updated dependencies
  [[`2d7398a01`](https://github.com/chakra-ui/chakra-ui/commit/2d7398a0142b5bdd3f68ce05bd159fc824cda5ef),
  [`0eedc151c`](https://github.com/chakra-ui/chakra-ui/commit/0eedc151caec8dbdb53e4e5e8354e2310553c19f)]:
  - @chakra-ui/css-reset@2.0.11
  - @chakra-ui/react-env@2.0.12
  - @chakra-ui/portal@2.0.13
  - @chakra-ui/system@2.3.6
  - @chakra-ui/utils@2.0.13

## 2.0.26

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.3.5

## 2.0.25

### Patch Changes

- Updated dependencies
  [[`4dbfc1a11`](https://github.com/chakra-ui/chakra-ui/commit/4dbfc1a115a2fce51b29f3fd3baa3a823b3e359d)]:
  - @chakra-ui/portal@2.0.12

## 2.0.24

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.3.4
  - @chakra-ui/portal@2.0.11

## 2.0.23

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.3.3

## 2.0.22

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`2a86d6c35`](https://github.com/chakra-ui/chakra-ui/commit/2a86d6c353e88d86b46030a53130a062433f30b2),
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/system@2.3.2
  - @chakra-ui/css-reset@2.0.10
  - @chakra-ui/react-env@2.0.11
  - @chakra-ui/portal@2.0.11
  - @chakra-ui/utils@2.0.12

## 2.0.21

### Patch Changes

- Updated dependencies
  [[`8705372a0`](https://github.com/chakra-ui/chakra-ui/commit/8705372a014bfd7073fe8012a46d7aa22904370b)]:
  - @chakra-ui/css-reset@2.0.9
  - @chakra-ui/system@2.3.1

## 2.0.20

### Patch Changes

- Updated dependencies
  [[`87f5c275e`](https://github.com/chakra-ui/chakra-ui/commit/87f5c275e42c36ff806f553f80ae559fad4182ef)]:
  - @chakra-ui/system@2.3.0

## 2.0.19

### Patch Changes

- [#6648](https://github.com/chakra-ui/chakra-ui/pull/6648)
  [`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Declare package exports
  @see https://webpack.js.org/guides/package-exports/

- Updated dependencies
  [[`9de39921b`](https://github.com/chakra-ui/chakra-ui/commit/9de39921b983ad0eb2df7195e3b683c2e2e9e290),
  [`d945b9a7d`](https://github.com/chakra-ui/chakra-ui/commit/d945b9a7da3056017cda0cdd552af40fa1426070)]:
  - @chakra-ui/css-reset@2.0.8
  - @chakra-ui/react-env@2.0.10
  - @chakra-ui/portal@2.0.10
  - @chakra-ui/system@2.2.12
  - @chakra-ui/utils@2.0.11

## 2.0.18

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.2.11

## 2.0.17

### Patch Changes

- Updated dependencies
  [[`99329e44a`](https://github.com/chakra-ui/chakra-ui/commit/99329e44a0429a225cd1dffa4b7d76b68a828f44),
  [`c2d1c362f`](https://github.com/chakra-ui/chakra-ui/commit/c2d1c362f5bf2dfc3fa27fa8a987c1d037e12479),
  [`3e1b3f6b6`](https://github.com/chakra-ui/chakra-ui/commit/3e1b3f6b6a7398b71ac08339110f075695fbae94)]:
  - @chakra-ui/utils@2.0.10
  - @chakra-ui/system@2.2.10
  - @chakra-ui/portal@2.0.9

## 2.0.16

### Patch Changes

- Updated dependencies
  [[`cc0598ddc`](https://github.com/chakra-ui/chakra-ui/commit/cc0598ddcb2a4e7f84859099556c228c5ff354fe)]:
  - @chakra-ui/css-reset@2.0.7
  - @chakra-ui/system@2.2.9

## 2.0.15

### Patch Changes

- [#6559](https://github.com/chakra-ui/chakra-ui/pull/6559)
  [`0cae42007`](https://github.com/chakra-ui/chakra-ui/commit/0cae42007308e94ef9a9fdbae3de259871ca33be)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactors the theme
  to use design tokens and css variables as much as possible.

  Improve support for `100vh` values by using a polyfill css variable
  `--chakra-vh`.

- Updated dependencies
  [[`0cae42007`](https://github.com/chakra-ui/chakra-ui/commit/0cae42007308e94ef9a9fdbae3de259871ca33be)]:
  - @chakra-ui/css-reset@2.0.6
  - @chakra-ui/system@2.2.8

## 2.0.14

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation
- Updated dependencies
  [[`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)]:
  - @chakra-ui/css-reset@2.0.5
  - @chakra-ui/react-env@2.0.9
  - @chakra-ui/portal@2.0.9
  - @chakra-ui/system@2.2.7
  - @chakra-ui/utils@2.0.9

## 2.0.13

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/css-reset@2.0.4
  - @chakra-ui/react-env@2.0.8
  - @chakra-ui/portal@2.0.8
  - @chakra-ui/system@2.2.6
  - @chakra-ui/utils@2.0.8

## 2.0.12

### Patch Changes

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`239a3cd40`](https://github.com/chakra-ui/chakra-ui/commit/239a3cd403271af66119fdfd28ee8f284cd43e0d),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7
  - @chakra-ui/react-env@2.0.7
  - @chakra-ui/system@2.2.5
  - @chakra-ui/portal@2.0.7

## 2.0.11

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/css-reset@2.0.3
  - @chakra-ui/react-env@2.0.6
  - @chakra-ui/portal@2.0.6
  - @chakra-ui/system@2.2.4
  - @chakra-ui/utils@2.0.6

## 2.0.10

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/css-reset@2.0.2
  - @chakra-ui/react-env@2.0.5
  - @chakra-ui/portal@2.0.5
  - @chakra-ui/system@2.2.3
  - @chakra-ui/utils@2.0.5

## 2.0.9

### Patch Changes

- Updated dependencies
  [[`46b495455`](https://github.com/chakra-ui/chakra-ui/commit/46b495455fc416b166db18f5098ede7752b2e3ba),
  [`c11743b47`](https://github.com/chakra-ui/chakra-ui/commit/c11743b47f38f8f38a21b120add3a9cf765b81ee),
  [`fb3c09325`](https://github.com/chakra-ui/chakra-ui/commit/fb3c09325d7bf58aed13c6d0fb1f72b92ff0ef3a)]:
  - @chakra-ui/portal@2.0.4
  - @chakra-ui/utils@2.0.4
  - @chakra-ui/react-env@2.0.4
  - @chakra-ui/system@2.2.2

## 2.0.8

### Patch Changes

- Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`3d8e095df`](https://github.com/chakra-ui/chakra-ui/commit/3d8e095dfc696b3d903455319231e77d1c21d875),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3
  - @chakra-ui/react-env@2.0.3
  - @chakra-ui/portal@2.0.3
  - @chakra-ui/system@2.2.1

## 2.0.7

### Patch Changes

- Updated dependencies
  [[`104eead49`](https://github.com/chakra-ui/chakra-ui/commit/104eead495b2d5997beeb2bb797f4bc1d562f59e),
  [`612529653`](https://github.com/chakra-ui/chakra-ui/commit/61252965371f1abc5bc6680c14bbd08f97667ea9)]:
  - @chakra-ui/system@2.2.0

## 2.0.6

### Patch Changes

- Updated dependencies
  [[`f9a84d637`](https://github.com/chakra-ui/chakra-ui/commit/f9a84d6370f0f460f491c36c53077c2087eb7580)]:
  - @chakra-ui/system@2.1.3

## 2.0.5

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

- Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1),
  [`7de782f04`](https://github.com/chakra-ui/chakra-ui/commit/7de782f0485656a6d10099339da509084cb3ee88)]:
  - @chakra-ui/css-reset@2.0.1
  - @chakra-ui/react-env@2.0.2
  - @chakra-ui/portal@2.0.2
  - @chakra-ui/system@2.1.2
  - @chakra-ui/utils@2.0.2

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c),
  [`703ff594f`](https://github.com/chakra-ui/chakra-ui/commit/703ff594f826207a7b3d37663caaad365212b23e),
  [`7e05d36cf`](https://github.com/chakra-ui/chakra-ui/commit/7e05d36cf1c65142e035d43142488792911f8a7f),
  [`f77e3c98f`](https://github.com/chakra-ui/chakra-ui/commit/f77e3c98f72fa17353e9fdad4c51810e83d9cb1c)]:
  - @chakra-ui/utils@2.0.1
  - @chakra-ui/portal@2.0.1
  - @chakra-ui/system@2.1.1
  - @chakra-ui/react-env@2.0.1

## 2.0.3

### Patch Changes

- Updated dependencies
  [[`ddea8d143`](https://github.com/chakra-ui/chakra-ui/commit/ddea8d143e76c0e4758e6ea4b4d881f88b34452d)]:
  - @chakra-ui/system@2.1.0

## 2.0.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.0.1

## 2.0.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

* [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`ad84d8efc`](https://github.com/chakra-ui/chakra-ui/commit/ad84d8efc7602909488272c214167794e66a0581),
  [`8a57d75f2`](https://github.com/chakra-ui/chakra-ui/commit/8a57d75f2a311b0732bcf0360ef6501da05654a8),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/css-reset@2.0.0
  - @chakra-ui/react-env@2.0.0
  - @chakra-ui/portal@2.0.0
  - @chakra-ui/system@2.0.0
  - @chakra-ui/utils@2.0.0

## 2.0.0-next.4

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/css-reset@2.0.0-next.3
  - @chakra-ui/react-env@2.0.0-next.2
  - @chakra-ui/portal@2.0.0-next.3
  - @chakra-ui/system@2.0.0-next.4
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.3

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@2.0.0-next.3

## 2.0.0-next.2

### Patch Changes

- Updated dependencies
  [[`8a57d75f2`](https://github.com/chakra-ui/chakra-ui/commit/8a57d75f2a311b0732bcf0360ef6501da05654a8)]:
  - @chakra-ui/css-reset@2.0.0-next.2
  - @chakra-ui/portal@2.0.0-next.2
  - @chakra-ui/system@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`ad84d8efc`](https://github.com/chakra-ui/chakra-ui/commit/ad84d8efc7602909488272c214167794e66a0581),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/react-env@2.0.0-next.1
  - @chakra-ui/css-reset@2.0.0-next.1
  - @chakra-ui/portal@2.0.0-next.1
  - @chakra-ui/system@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)]:
  - @chakra-ui/css-reset@2.0.0-next.0
  - @chakra-ui/react-env@2.0.0-next.0
  - @chakra-ui/portal@2.0.0-next.0
  - @chakra-ui/system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.7.14

### Patch Changes

- Updated dependencies
  [[`a3b04dc1a`](https://github.com/chakra-ui/chakra-ui/commit/a3b04dc1ae49ad0d804bddc17fdca3afa218665c)]:
  - @chakra-ui/hooks@1.9.1
  - @chakra-ui/portal@1.3.10
  - @chakra-ui/system@1.12.1

## 1.7.13

### Patch Changes

- Updated dependencies
  [[`73a06ae8c`](https://github.com/chakra-ui/chakra-ui/commit/73a06ae8ce1bee644e10f245edcf2f9f2b773964),
  [`cedec803f`](https://github.com/chakra-ui/chakra-ui/commit/cedec803fb05b5d92ef32c67352265fc7636500c)]:
  - @chakra-ui/hooks@1.9.0
  - @chakra-ui/system@1.12.0
  - @chakra-ui/portal@1.3.9

## 1.7.12

### Patch Changes

- Updated dependencies
  [[`5cd5cff35`](https://github.com/chakra-ui/chakra-ui/commit/5cd5cff35e4837539d83a2157a07585d461b0aac)]:
  - @chakra-ui/hooks@1.8.5
  - @chakra-ui/system@1.11.2
  - @chakra-ui/portal@1.3.8

## 1.7.11

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/css-reset@1.1.3
  - @chakra-ui/react-env@1.1.6
  - @chakra-ui/hooks@1.8.4
  - @chakra-ui/portal@1.3.7
  - @chakra-ui/system@1.11.1
  - @chakra-ui/utils@1.10.4

## 1.7.10

### Patch Changes

- Updated dependencies
  [[`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a),
  [`e5e0f255c`](https://github.com/chakra-ui/chakra-ui/commit/e5e0f255c95f5e41c3b17adbda28fd09f7251642)]:
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/system@1.11.0
  - @chakra-ui/react-env@1.1.5
  - @chakra-ui/hooks@1.8.3
  - @chakra-ui/portal@1.3.6

## 1.7.9

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/css-reset@1.1.2
  - @chakra-ui/react-env@1.1.4
  - @chakra-ui/hooks@1.8.2
  - @chakra-ui/portal@1.3.5
  - @chakra-ui/system@1.10.3
  - @chakra-ui/utils@1.10.2

## 1.7.8

### Patch Changes

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b),
  [`78251dab8`](https://github.com/chakra-ui/chakra-ui/commit/78251dab83e34747b719ee746394ec43aeceffef)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/system@1.10.2
  - @chakra-ui/react-env@1.1.3
  - @chakra-ui/hooks@1.8.1
  - @chakra-ui/portal@1.3.4

## 1.7.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@1.10.1

## 1.7.6

### Patch Changes

- Updated dependencies
  [[`4944a4a2b`](https://github.com/chakra-ui/chakra-ui/commit/4944a4a2b0160b23d4e06f767c809565ff1d5b35),
  [`cbad002e7`](https://github.com/chakra-ui/chakra-ui/commit/cbad002e7bdb439a0dfeada82ebfb5b529e145fe),
  [`6e259a1f7`](https://github.com/chakra-ui/chakra-ui/commit/6e259a1f7008a00f7be096e6b315cb9d62ef9748),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3),
  [`5a845d5f5`](https://github.com/chakra-ui/chakra-ui/commit/5a845d5f535ba886063e3f4099a27d0794084c54)]:
  - @chakra-ui/system@1.10.0
  - @chakra-ui/hooks@1.8.0
  - @chakra-ui/utils@1.10.0
  - @chakra-ui/portal@1.3.3
  - @chakra-ui/react-env@1.1.2

## 1.7.5

### Patch Changes

- Updated dependencies
  [[`d2d9af846`](https://github.com/chakra-ui/chakra-ui/commit/d2d9af8464d627d0ab854ad64a42d3c0be81d67d)]:
  - @chakra-ui/system@1.9.1

## 1.7.4

### Patch Changes

- Updated dependencies
  [[`ae6fd7a25`](https://github.com/chakra-ui/chakra-ui/commit/ae6fd7a25c543d089d500e328596b399d85afe8e),
  [`801008e27`](https://github.com/chakra-ui/chakra-ui/commit/801008e276812a6f94f2f5dc634bcbfe01d23026),
  [`8a0e5bdbc`](https://github.com/chakra-ui/chakra-ui/commit/8a0e5bdbccb7fa10dd4cd7b909ca60991fce81a0)]:
  - @chakra-ui/system@1.9.0
  - @chakra-ui/hooks@1.7.2
  - @chakra-ui/portal@1.3.2

## 1.7.3

### Patch Changes

- Updated dependencies
  [[`586eb6090`](https://github.com/chakra-ui/chakra-ui/commit/586eb6090fe9013936cd83a61bb5091814bcb906)]:
  - @chakra-ui/system@1.8.3

## 1.7.2

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@1.8.2

## 1.7.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/css-reset@1.1.1
  - @chakra-ui/react-env@1.1.1
  - @chakra-ui/hooks@1.7.1
  - @chakra-ui/portal@1.3.1
  - @chakra-ui/system@1.8.1
  - @chakra-ui/utils@1.9.1

## 1.7.0

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
  - @chakra-ui/css-reset@1.1.0
  - @chakra-ui/react-env@1.1.0
  - @chakra-ui/hooks@1.7.0
  - @chakra-ui/portal@1.3.0
  - @chakra-ui/system@1.8.0
  - @chakra-ui/utils@1.9.0

## 1.6.11

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/system@1.7.6

## 1.6.10

### Patch Changes

- Updated dependencies
  [[`5fe9b552b`](https://github.com/chakra-ui/chakra-ui/commit/5fe9b552bcae55935d1ab8ffde86b701075e6e6a),
  [`ed79a9cfb`](https://github.com/chakra-ui/chakra-ui/commit/ed79a9cfb35fec67bfe95bbc2a04a11d0d00fbfe),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f)]:
  - @chakra-ui/hooks@1.6.2
  - @chakra-ui/system@1.7.5
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/portal@1.2.11
  - @chakra-ui/react-env@1.0.8

## 1.6.9

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`a9d1dc4ac`](https://github.com/chakra-ui/chakra-ui/commit/a9d1dc4ac874825f292d874ad4eadaf060fed436),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/hooks@1.6.1
  - @chakra-ui/react-env@1.0.7
  - @chakra-ui/portal@1.2.10
  - @chakra-ui/system@1.7.4

## 1.6.8

### Patch Changes

- [`17c84be66`](https://github.com/chakra-ui/chakra-ui/commit/17c84be66fcb68e77a838cbb900315caaaf61d26)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Resolve
  dependency issues caused by previous release
  - Add `ChakraProviderProps` type what was removed in previous release

## 1.6.7

### Patch Changes

- [`52640a1fd`](https://github.com/chakra-ui/chakra-ui/commit/52640a1fd9089e3c0ffc5dc8e42fcfa7a5752904)
  [#4594](https://github.com/chakra-ui/chakra-ui/pull/4594) Thanks
  [@feychenie](https://github.com/feychenie)! - Move ChakraProvider to a
  separate package `@chakra-ui/provider`

- Updated dependencies
  [[`01c913309`](https://github.com/chakra-ui/chakra-ui/commit/01c913309819c342806307291d2d60aea0122ecf),
  [`28af4c030`](https://github.com/chakra-ui/chakra-ui/commit/28af4c0308e234871548c0857e946e33ff18a130)]:
  - @chakra-ui/system@1.7.3
  - @chakra-ui/hooks@1.6.0
