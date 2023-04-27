# @chakra-ui/theme-utils

## 2.0.16

### Patch Changes

- Updated dependencies
  [[`7b67fd58c`](https://github.com/chakra-ui/chakra-ui/commit/7b67fd58c74765831d1fda016aafae15a49617a5),
  [`379f347a8`](https://github.com/chakra-ui/chakra-ui/commit/379f347a891f131c39a436b5738221105300ad76),
  [`c2f0d1bb2`](https://github.com/chakra-ui/chakra-ui/commit/c2f0d1bb2a07fe6af5e53a1f216d80c9a7d6df72),
  [`27dcf2f56`](https://github.com/chakra-ui/chakra-ui/commit/27dcf2f5647c3323d1e6bee35db6cf1514c1b29d),
  [`49a29a238`](https://github.com/chakra-ui/chakra-ui/commit/49a29a238439242e0959d74ebf48c84411581288),
  [`82ec66459`](https://github.com/chakra-ui/chakra-ui/commit/82ec66459283ef24a422955952efa1f8d267af2c),
  [`49a29a238`](https://github.com/chakra-ui/chakra-ui/commit/49a29a238439242e0959d74ebf48c84411581288)]:
  - @chakra-ui/theme@3.1.0
  - @chakra-ui/styled-system@2.9.0

## 2.0.15

### Patch Changes

- Updated dependencies
  [[`93d3119a6`](https://github.com/chakra-ui/chakra-ui/commit/93d3119a60ffaf541bd4fc66ee639965145b662c),
  [`6a3c8435d`](https://github.com/chakra-ui/chakra-ui/commit/6a3c8435d156a7a1790248e295f8931b2f8ad274),
  [`93d3119a6`](https://github.com/chakra-ui/chakra-ui/commit/93d3119a60ffaf541bd4fc66ee639965145b662c),
  [`68ceb28ae`](https://github.com/chakra-ui/chakra-ui/commit/68ceb28aee0c54dbe9835ac455cc33229e0ff10b),
  [`fe882dc2f`](https://github.com/chakra-ui/chakra-ui/commit/fe882dc2f4f249aa011ffcf3da7dcda4d21275b1)]:
  - @chakra-ui/theme@3.0.1
  - @chakra-ui/styled-system@2.8.0

## 2.0.14

### Patch Changes

- Updated dependencies
  [[`1dac7eec0`](https://github.com/chakra-ui/chakra-ui/commit/1dac7eec081e1d3ac3aa5583f5b22094a6a3f5c0),
  [`c7ad1bf12`](https://github.com/chakra-ui/chakra-ui/commit/c7ad1bf1211ad704420eccf39a3de548b784f964)]:
  - @chakra-ui/theme@3.0.0
  - @chakra-ui/styled-system@2.7.0

## 2.0.13

### Patch Changes

- Updated dependencies
  [[`0f8a50054`](https://github.com/chakra-ui/chakra-ui/commit/0f8a50054b8b480bb523dd0964bb31a9e061f8c6),
  [`0eeadd3c2`](https://github.com/chakra-ui/chakra-ui/commit/0eeadd3c2cd799e5c9beba7fb6fb2067f2c023fb),
  [`b6e0a6a81`](https://github.com/chakra-ui/chakra-ui/commit/b6e0a6a818645d13d7dc3dfd9200e30d293c3e24)]:
  - @chakra-ui/theme@2.3.0

## 2.0.12

### Patch Changes

- Updated dependencies
  [[`600ec1108`](https://github.com/chakra-ui/chakra-ui/commit/600ec1108e3657b610ce05f6bce47bfd666465f8)]:
  - @chakra-ui/styled-system@2.6.2
  - @chakra-ui/theme@2.2.5

## 2.0.11

### Patch Changes

- Updated dependencies
  [[`70ec88d49`](https://github.com/chakra-ui/chakra-ui/commit/70ec88d498fc26f8fdd0f28021d3d7d8c661a3d1)]:
  - @chakra-ui/styled-system@2.6.1
  - @chakra-ui/theme@2.2.5

## 2.0.10

### Patch Changes

- Updated dependencies
  [[`3548c6fb7`](https://github.com/chakra-ui/chakra-ui/commit/3548c6fb7893e5db1178a15e104f9ae0e209781b),
  [`12811f264`](https://github.com/chakra-ui/chakra-ui/commit/12811f264751829f2495d8adbbefb677e9583358)]:
  - @chakra-ui/styled-system@2.6.0
  - @chakra-ui/theme@2.2.5

## 2.0.9

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

- Updated dependencies
  [[`97fa1d854`](https://github.com/chakra-ui/chakra-ui/commit/97fa1d8541688518768aed9e54ed6ce26b6cd73a),
  [`292864aba`](https://github.com/chakra-ui/chakra-ui/commit/292864abae83833a826b2fe4a9d69ddcfe7fbe17),
  [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)]:
  - @chakra-ui/theme@2.2.5
  - @chakra-ui/styled-system@2.5.2
  - @chakra-ui/shared-utils@2.0.5

## 2.0.8

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/theme@2.2.4

## 2.0.7

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
  [`0eedc151c`](https://github.com/chakra-ui/chakra-ui/commit/0eedc151caec8dbdb53e4e5e8354e2310553c19f),
  [`96287f8c2`](https://github.com/chakra-ui/chakra-ui/commit/96287f8c2cd0642c69529b6384f0bf338ad8476d)]:
  - @chakra-ui/theme@2.2.3
  - @chakra-ui/styled-system@2.5.1
  - @chakra-ui/shared-utils@2.0.4

## 2.0.6

### Patch Changes

- Updated dependencies
  [[`37b7a130a`](https://github.com/chakra-ui/chakra-ui/commit/37b7a130aaff0cbb97f206978315075eb06e5100)]:
  - @chakra-ui/styled-system@2.5.0
  - @chakra-ui/theme@2.2.2

## 2.0.5

### Patch Changes

- [#6997](https://github.com/chakra-ui/chakra-ui/pull/6997)
  [`4d5501b82`](https://github.com/chakra-ui/chakra-ui/commit/4d5501b82b6fe215f1a7d205250325c0a2221337)
  Thanks [@anubra266](https://github.com/anubra266)! - Add `ChakraBaseProvider`,
  a minimal version of `ChakraProvider` that supplies just the theme tokens, and
  ignores components.

  Historically, one of the biggest causes of the large initial JS payload is the
  size of the component themes. With this approach, you get to apply the theme
  for just the component you need by using `extendBaseTheme`.

  > Base theme refers to the minimal theme for just the design tokens

  ```jsx live=false
  import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react"
  import { Button } from "@chakra-ui/theme/components"

  const theme = extendBaseTheme({
    components: {
      Button,
    },
  })

  function App() {
    return (
      <ChakraBaseProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraBaseProvider>
    )
  }
  ```

- Updated dependencies
  [[`eb3bfe66d`](https://github.com/chakra-ui/chakra-ui/commit/eb3bfe66d3aecc8cf46f29ef08dc748afb83f781),
  [`4d5501b82`](https://github.com/chakra-ui/chakra-ui/commit/4d5501b82b6fe215f1a7d205250325c0a2221337),
  [`1a4dad7a4`](https://github.com/chakra-ui/chakra-ui/commit/1a4dad7a4f15e24e0f529b8f8277346d0399c3fc),
  [`eb82598c2`](https://github.com/chakra-ui/chakra-ui/commit/eb82598c27e97d0e7a77412d3ecc95918a2b73fa),
  [`9e3d91fd7`](https://github.com/chakra-ui/chakra-ui/commit/9e3d91fd73b1cadc14f98b6c834c0e6faf134bd2),
  [`bf7704112`](https://github.com/chakra-ui/chakra-ui/commit/bf7704112ebb2aba675084706c8364a755ad10e3)]:
  - @chakra-ui/styled-system@2.4.0
  - @chakra-ui/theme@2.2.2

## 2.0.4

### Patch Changes

- Updated dependencies
  [[`cbd09c31f`](https://github.com/chakra-ui/chakra-ui/commit/cbd09c31ff7134157906dbaeaaea5a920185e36a)]:
  - @chakra-ui/theme@2.2.1

## 2.0.3

### Patch Changes

- [#6945](https://github.com/chakra-ui/chakra-ui/pull/6945)
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)
  Thanks [@anddoutoi](https://github.com/anddoutoi)! - Fix issue where using
  `@chakra-ui/react` in a TypeScript project with `"type": "module"` in
  `package.json` and `"moduleResolution": "Node16"` in `tsconfig.json` cannot
  find the types.
- Updated dependencies
  [[`9c7db55f4`](https://github.com/chakra-ui/chakra-ui/commit/9c7db55f486280ef81adc97cf597a9101db2ceb2),
  [`2a86d6c35`](https://github.com/chakra-ui/chakra-ui/commit/2a86d6c353e88d86b46030a53130a062433f30b2),
  [`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/theme@2.2.0
  - @chakra-ui/styled-system@2.3.5

## 2.0.2

### Patch Changes

- Updated dependencies
  [[`f3b66694f`](https://github.com/chakra-ui/chakra-ui/commit/f3b66694f054491dcf8830ec48cd0e4ee77490e0)]:
  - @chakra-ui/theme@2.1.15

## 2.0.1

### Patch Changes

- [#6590](https://github.com/chakra-ui/chakra-ui/pull/6590)
  [`5e44868ed`](https://github.com/chakra-ui/chakra-ui/commit/5e44868ed0b86b15ef7892a249a24865d900fe57)
  Thanks [@anubra266](https://github.com/anubra266)! - Moved `extendTheme`
  utilities to a dedicated package (`@chakra-ui/theme-utils`)

- Updated dependencies
  [[`58856c739`](https://github.com/chakra-ui/chakra-ui/commit/58856c739c536474cc23a94809082a9d549c71a3)]:
  - @chakra-ui/theme@2.1.14
