# Change Log

## 2.1.0

### Minor Changes

- [#6050](https://github.com/chakra-ui/chakra-ui/pull/6050)
  [`ddea8d143`](https://github.com/chakra-ui/chakra-ui/commit/ddea8d143e76c0e4758e6ea4b4d881f88b34452d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  responsive variants and sizes.

  ```jsx live=false
  <Button variant={["sm", "lg"]}>Click me</Button>
  ```

  Add support for `!important` in token values as an escape hatch for overriding
  properties in responsive variants/sizes.

  ```jsx live=false
  <Button variant={["sm", "lg"]} fontSize="lg !important">
    Click me
  </Button>
  ```

  **Notes**

  - Based on how this is designed, there's no support for responsive
    `colorScheme` since it is technically not a variant
  - When using responsive sizes and variants, overriding properties via props
    might not work as expected. We use native CSS media queries to enable this
    feature so there's no "magic" under the hood. If you really want to override
    properties, you can consider using the important syntax

### Patch Changes

- Updated dependencies
  [[`ddea8d143`](https://github.com/chakra-ui/chakra-ui/commit/ddea8d143e76c0e4758e6ea4b4d881f88b34452d)]:
  - @chakra-ui/styled-system@2.1.0

## 2.0.2

### Patch Changes

- Updated dependencies
  [[`a9727167c`](https://github.com/chakra-ui/chakra-ui/commit/a9727167c9529f5512717ccf162fdeefe37c5d8f)]:
  - @chakra-ui/color-mode@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies
  [[`17aeb7185`](https://github.com/chakra-ui/chakra-ui/commit/17aeb7185b7439e04abec843df186fc2b1869d6f),
  [`b7bdbb482`](https://github.com/chakra-ui/chakra-ui/commit/b7bdbb482e8a1c5725596401a0c4bc29c009a0ad),
  [`fb99cd7a8`](https://github.com/chakra-ui/chakra-ui/commit/fb99cd7a87d00614a66e17a35c91dc0e02262ece)]:
  - @chakra-ui/color-mode@2.0.1

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
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632),
  [`7b5bdcc58`](https://github.com/chakra-ui/chakra-ui/commit/7b5bdcc588fb41aa3288ffaa293514b9d35ebaa4),
  [`5193a00c8`](https://github.com/chakra-ui/chakra-ui/commit/5193a00c8838eeb2715ce825f89f9f4dfab9a0c8),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/color-mode@2.0.0
  - @chakra-ui/react-utils@2.0.0
  - @chakra-ui/styled-system@2.0.0
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
  - @chakra-ui/color-mode@2.0.0-next.4
  - @chakra-ui/react-utils@2.0.0-next.2
  - @chakra-ui/styled-system@2.0.0-next.3
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.3

### Patch Changes

- Updated dependencies
  [[`7b5bdcc58`](https://github.com/chakra-ui/chakra-ui/commit/7b5bdcc588fb41aa3288ffaa293514b9d35ebaa4)]:
  - @chakra-ui/color-mode@2.0.0-next.3

## 2.0.0-next.2

### Patch Changes

- Updated dependencies
  [[`5193a00c8`](https://github.com/chakra-ui/chakra-ui/commit/5193a00c8838eeb2715ce825f89f9f4dfab9a0c8)]:
  - @chakra-ui/styled-system@2.0.0-next.2
  - @chakra-ui/color-mode@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/color-mode@2.0.0-next.1
  - @chakra-ui/react-utils@2.0.0-next.1
  - @chakra-ui/styled-system@2.0.0-next.1
  - @chakra-ui/utils@2.0.0-next.1

## 2.0.0-next.0

### Major Changes

- [#5879](https://github.com/chakra-ui/chakra-ui/pull/5879)
  [`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump all packages
  to next major for Chakra UI version 2.

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`1a47fd27e`](https://github.com/chakra-ui/chakra-ui/commit/1a47fd27e6e37ff5d149e0469888eed0ec306632)]:
  - @chakra-ui/color-mode@2.0.0-next.0
  - @chakra-ui/react-utils@2.0.0-next.0
  - @chakra-ui/styled-system@2.0.0-next.0
  - @chakra-ui/utils@2.0.0-next.0

## 1.12.1

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/color-mode@1.4.8

## 1.12.0

### Minor Changes

- [#5532](https://github.com/chakra-ui/chakra-ui/pull/5532)
  [`cedec803f`](https://github.com/chakra-ui/chakra-ui/commit/cedec803fb05b5d92ef32c67352265fc7636500c)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Added
  `[data-theme]` to the CSS variables root selector. This allows the semantic
  tokens to change according to `data-theme="dark"` and `data-theme="light"` DOM
  element attributes.

### Patch Changes

- Updated dependencies
  [[`00d5d1516`](https://github.com/chakra-ui/chakra-ui/commit/00d5d151631436777a8dc71a0b46c2be52e71631),
  [`dc2c578f6`](https://github.com/chakra-ui/chakra-ui/commit/dc2c578f6b9686499911fa77d6b61dd0ced077ea)]:
  - @chakra-ui/styled-system@1.19.0
  - @chakra-ui/color-mode@1.4.7

## 1.11.2

### Patch Changes

- Updated dependencies
  [[`001751162`](https://github.com/chakra-ui/chakra-ui/commit/001751162dd1922d8ab53820f405665f0785f196)]:
  - @chakra-ui/color-mode@1.4.6

## 1.11.1

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/color-mode@1.4.5
  - @chakra-ui/react-utils@1.2.3
  - @chakra-ui/styled-system@1.18.1
  - @chakra-ui/utils@1.10.4

## 1.11.0

### Minor Changes

- [#5508](https://github.com/chakra-ui/chakra-ui/pull/5508)
  [`e5e0f255c`](https://github.com/chakra-ui/chakra-ui/commit/e5e0f255c95f5e41c3b17adbda28fd09f7251642)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Allow all
  `JSX.IntrinsicElements` for the chakra factory. This allows to use
  [every DOM element](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/30a2f70db2f9ac223fd923ff1f8bcc175c082fd0/types/react/index.d.ts#L3111-L3288)
  with the shorthand version:

  ```jsx live=false
  <chakra.header>Header</chakra.header>
  <chakra.main>Main</chakra.main>
  <chakra.footer>Many more</chakra.footer>
  ```

### Patch Changes

- Updated dependencies
  [[`b0da6e666`](https://github.com/chakra-ui/chakra-ui/commit/b0da6e6665234c1584403f7f7251390c3a9433c8),
  [`a870e6b94`](https://github.com/chakra-ui/chakra-ui/commit/a870e6b94367b7c6448d5c5c5aa8577e33e15e3a)]:
  - @chakra-ui/styled-system@1.18.0
  - @chakra-ui/utils@1.10.3
  - @chakra-ui/color-mode@1.4.4

## 1.10.3

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/color-mode@1.4.3
  - @chakra-ui/react-utils@1.2.2
  - @chakra-ui/styled-system@1.17.2
  - @chakra-ui/utils@1.10.2

## 1.10.2

### Patch Changes

- [#5195](https://github.com/chakra-ui/chakra-ui/pull/5195)
  [`78251dab8`](https://github.com/chakra-ui/chakra-ui/commit/78251dab83e34747b719ee746394ec43aeceffef)
  Thanks [@andrewmtam](https://github.com/andrewmtam)! - Disallow props that do
  not exist in the prop interface

- Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1
  - @chakra-ui/color-mode@1.4.2
  - @chakra-ui/styled-system@1.17.1

## 1.10.1

### Patch Changes

- Updated dependencies
  [[`1bd1f2ffe`](https://github.com/chakra-ui/chakra-ui/commit/1bd1f2ffef44d810a099b001be98e3bfa229ddad)]:
  - @chakra-ui/color-mode@1.4.1

## 1.10.0

### Minor Changes

- [#5358](https://github.com/chakra-ui/chakra-ui/pull/5358)
  [`4944a4a2b`](https://github.com/chakra-ui/chakra-ui/commit/4944a4a2b0160b23d4e06f767c809565ff1d5b35)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Add React component
  `<CSSVars root=":host, :root" />` to allow rehoisting CSS vars

### Patch Changes

- [#5374](https://github.com/chakra-ui/chakra-ui/pull/5374)
  [`5a845d5f5`](https://github.com/chakra-ui/chakra-ui/commit/5a845d5f535ba886063e3f4099a27d0794084c54)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Updated type
  `ThemingProps` to allow string values for the props `variant` and `size` even
  on components which are not in the default theme.
- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3),
  [`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3),
  [`3b4117781`](https://github.com/chakra-ui/chakra-ui/commit/3b41177812c927c0ee37c7c0006a09f9ca031108),
  [`bb7eb18da`](https://github.com/chakra-ui/chakra-ui/commit/bb7eb18daa015efee56d55519c2ce727d5bb776a)]:
  - @chakra-ui/styled-system@1.17.0
  - @chakra-ui/color-mode@1.4.0
  - @chakra-ui/utils@1.10.0

## 1.9.1

### Patch Changes

- [#5342](https://github.com/chakra-ui/chakra-ui/pull/5342)
  [`d2d9af846`](https://github.com/chakra-ui/chakra-ui/commit/d2d9af8464d627d0ab854ad64a42d3c0be81d67d)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an TypeScript
  issue where the ThemingProps type was too strict

## 1.9.0

### Minor Changes

- [#5243](https://github.com/chakra-ui/chakra-ui/pull/5243)
  [`ae6fd7a25`](https://github.com/chakra-ui/chakra-ui/commit/ae6fd7a25c543d089d500e328596b399d85afe8e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Use the feature
  flag `--strict-component-types` for `@chakra-ui/cli tokens` to generate strict
  component type for the theming props `variant` and `size`.

  ```bash
  chakra-cli tokens --strict-component-types
  ```

  ```tsx live=false
  // before
  <Button variant="abc" />
  // valid type but variant is not available in the theme

  // after
  <Button variant="abc" /> // invalid
  // Type '"abc"' is not assignable to type '"link" | "outline" | "ghost" | "solid" | "unstyled" | undefined'.
  ```

### Patch Changes

- Updated dependencies
  [[`d5461a452`](https://github.com/chakra-ui/chakra-ui/commit/d5461a4522aaee47b91a1a432601556e334a71c3),
  [`213f61026`](https://github.com/chakra-ui/chakra-ui/commit/213f61026766d32f78b78dc2ccb2b2fdc472aab1)]:
  - @chakra-ui/styled-system@1.16.0
  - @chakra-ui/color-mode@1.3.3

## 1.8.3

### Patch Changes

- [#5117](https://github.com/chakra-ui/chakra-ui/pull/5117)
  [`586eb6090`](https://github.com/chakra-ui/chakra-ui/commit/586eb6090fe9013936cd83a61bb5091814bcb906)
  Thanks [@primos63](https://github.com/primos63)! - Allow retrieving breakpoint
  tokens when using useToken

- Updated dependencies
  [[`26d2a547b`](https://github.com/chakra-ui/chakra-ui/commit/26d2a547bca20e197f352c7492e3cad197b513e6),
  [`73235af10`](https://github.com/chakra-ui/chakra-ui/commit/73235af10d8868786ec58778dda9a42b8d275599),
  [`f15099adc`](https://github.com/chakra-ui/chakra-ui/commit/f15099adc60150781607288dbe12133c2fb84e38),
  [`a1d5e7bfa`](https://github.com/chakra-ui/chakra-ui/commit/a1d5e7bfae1b4cc749e14eed4977ae423b8bce2c)]:
  - @chakra-ui/styled-system@1.15.0

## 1.8.2

### Patch Changes

- Updated dependencies
  [[`35d90e9fd`](https://github.com/chakra-ui/chakra-ui/commit/35d90e9fd7c1df59a8882b8c68283ff7a026541b),
  [`514cf24a6`](https://github.com/chakra-ui/chakra-ui/commit/514cf24a62b13a9c2a9ad64806f00b0a4cbe540e)]:
  - @chakra-ui/color-mode@1.3.2

## 1.8.1

### Patch Changes

- [#5075](https://github.com/chakra-ui/chakra-ui/pull/5075)
  [`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)
  Thanks [@cschroeter](https://github.com/cschroeter)! - Update babel config to
  transpile soruces for older browsers. This fixes issues with CRA and
  Storybook.
- Updated dependencies
  [[`b28142946`](https://github.com/chakra-ui/chakra-ui/commit/b281429462a099b7fd7f9352e837cd28d1a2da0e)]:
  - @chakra-ui/color-mode@1.3.1
  - @chakra-ui/react-utils@1.2.1
  - @chakra-ui/styled-system@1.14.1
  - @chakra-ui/utils@1.9.1

## 1.8.0

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
  [[`6095eaf9a`](https://github.com/chakra-ui/chakra-ui/commit/6095eaf9ac64a7e4d9f934bcb530bae2a92111a6),
  [`013c90d89`](https://github.com/chakra-ui/chakra-ui/commit/013c90d8928698debc6112365fbd62b85a1d7e92)]:
  - @chakra-ui/color-mode@1.3.0
  - @chakra-ui/react-utils@1.2.0
  - @chakra-ui/styled-system@1.14.0
  - @chakra-ui/utils@1.9.0

## 1.7.6

### Patch Changes

- Updated dependencies
  [[`71f80b67c`](https://github.com/chakra-ui/chakra-ui/commit/71f80b67c094d905c87bdc5c1766787c1543ebe7)]:
  - @chakra-ui/color-mode@1.2.0

## 1.7.5

### Patch Changes

- [`ed79a9cfb`](https://github.com/chakra-ui/chakra-ui/commit/ed79a9cfb35fec67bfe95bbc2a04a11d0d00fbfe)
  [#4842](https://github.com/chakra-ui/chakra-ui/pull/4842) Thanks
  [@takethefake](https://github.com/takethefake)! - Fixed a bug in `useToken`
  where it wasn't possible to resolve some tokens which contain dots like
  `useToken('space','1.5')`. (see #4834)
- Updated dependencies
  [[`38b5bc627`](https://github.com/chakra-ui/chakra-ui/commit/38b5bc627c98fed4b7a55c45820785a4905c081e),
  [`cd0893c56`](https://github.com/chakra-ui/chakra-ui/commit/cd0893c561d8c72b69db7c03d10adae752468a4f),
  [`8f315ea5d`](https://github.com/chakra-ui/chakra-ui/commit/8f315ea5d694e0130dc2e3187ac53320cf1adcd1)]:
  - @chakra-ui/styled-system@1.13.0
  - @chakra-ui/utils@1.8.4
  - @chakra-ui/color-mode@1.1.14

## 1.7.4

### Patch Changes

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3
  - @chakra-ui/color-mode@1.1.13
  - @chakra-ui/styled-system@1.12.3

## 1.7.3

### Patch Changes

- [`01c913309`](https://github.com/chakra-ui/chakra-ui/commit/01c913309819c342806307291d2d60aea0122ecf)
  [#4611](https://github.com/chakra-ui/chakra-ui/pull/4611) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Update `useStyleConfig` to
  read parts array from the new anatomy class

- Updated dependencies []:
  - @chakra-ui/color-mode@1.1.12

## 1.7.2

### Patch Changes

- [`d3d85956c`](https://github.com/chakra-ui/chakra-ui/commit/d3d85956c776b4768cfe21dabcf9292e01875d74)
  [#4511](https://github.com/chakra-ui/chakra-ui/pull/4511) Thanks
  [@jrolfs](https://github.com/jrolfs)! - Fix type definitions for `apply` prop.

  The `apply` prop supports responsive styles:

  ```tsx
  // Before: type error, expects `string` for `apply`
  <Text apply={{ sm: 'styles.h3', lg: 'styles.h4' }}>

  // After: no type error, expects `ResponsiveValue<string>` for `apply`
  <Text apply={{ sm: 'styles.h3', lg: 'styles.h4' }}>
  ```

- Updated dependencies
  [[`4c1071969`](https://github.com/chakra-ui/chakra-ui/commit/4c1071969a9b41a952b374f9990ac0bb89d24fa0),
  [`1d4b1f874`](https://github.com/chakra-ui/chakra-ui/commit/1d4b1f87498c2d843cd21c24e86085d812a1de07),
  [`270b71ebb`](https://github.com/chakra-ui/chakra-ui/commit/270b71ebbb2bd9007d2e138e432675991d94f18d),
  [`43f66097b`](https://github.com/chakra-ui/chakra-ui/commit/43f66097b39f1c37a4627dd6ca8a85555f35b95c)]:
  - @chakra-ui/utils@1.8.2
  - @chakra-ui/styled-system@1.12.2
  - @chakra-ui/color-mode@1.1.11

## 1.7.1

### Patch Changes

- [`56e99313e`](https://github.com/chakra-ui/chakra-ui/commit/56e99313e1177978c9842e55696be15c5bbfe8d9)
  [#4265](https://github.com/chakra-ui/chakra-ui/pull/4265) Thanks
  [@m0nae](https://github.com/m0nae)! - Fix issue where undefined style props
  (such as `borderRadius`) would not fallback to the default styles
- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1
  - @chakra-ui/color-mode@1.1.10
  - @chakra-ui/styled-system@1.12.1

## 1.7.0

### Minor Changes

- [`991ea2e29`](https://github.com/chakra-ui/chakra-ui/commit/991ea2e29746a501b79591228664702ce1277235)
  [#3998](https://github.com/chakra-ui/chakra-ui/pull/3998) Thanks
  [@terrierscript](https://github.com/terrierscript)! - The `styled` function
  allows a functional `baseStyle` property:

  ```js
  import { styled } from '@chakra-ui/react'

  const MyComponent = styled('div', {
    baseStyle: (props) => ({
      bg: props.highlightColor
    })
  })

  // ...

  <MyComponent highlightColor="red.500" />
  ```

### Patch Changes

- Updated dependencies
  [[`ebda07095`](https://github.com/chakra-ui/chakra-ui/commit/ebda07095bffd9b3135c5d19803a3a08397b78ef)]:
  - @chakra-ui/styled-system@1.12.0
  - @chakra-ui/color-mode@1.1.9

## 1.6.7

### Patch Changes

- Updated dependencies
  [[`d9d66a9e8`](https://github.com/chakra-ui/chakra-ui/commit/d9d66a9e876f076ffd1c8bb531fd03e9074d325f)]:
  - @chakra-ui/styled-system@1.11.1

## 1.6.6

### Patch Changes

- [`ddd5ef4a1`](https://github.com/chakra-ui/chakra-ui/commit/ddd5ef4a1e9cc988c99b80c26579205ea4c57b2f)
  [#3985](https://github.com/chakra-ui/chakra-ui/pull/3985) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Attach CSS vars to
  `:host, :root` to fix usage in shadow dom.

- Updated dependencies
  [[`773497896`](https://github.com/chakra-ui/chakra-ui/commit/773497896e65ffbbda10e75b6e0a7bb5b68c853a)]:
  - @chakra-ui/styled-system@1.11.0

## 1.6.5

### Patch Changes

- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0
  - @chakra-ui/styled-system@1.10.5
  - @chakra-ui/color-mode@1.1.8

## 1.6.4

### Patch Changes

- Updated dependencies
  [[`82f08867f`](https://github.com/chakra-ui/chakra-ui/commit/82f08867fa4825d647a3b9cc805220d9364f2f3f),
  [`e9ac4cc76`](https://github.com/chakra-ui/chakra-ui/commit/e9ac4cc7629cd79efc753b4e3353bacdad46cd7d)]:
  - @chakra-ui/react-utils@1.1.2
  - @chakra-ui/utils@1.7.0
  - @chakra-ui/color-mode@1.1.7
  - @chakra-ui/styled-system@1.10.4

## 1.6.3

### Patch Changes

- Updated dependencies
  [[`0974e547c`](https://github.com/chakra-ui/chakra-ui/commit/0974e547c29e4efc1ba4d1eb1507d0dad7d7a77a),
  [`59ea894a7`](https://github.com/chakra-ui/chakra-ui/commit/59ea894a7e03d16cd7a1b89d00816eafa9fab65d),
  [`a11810f70`](https://github.com/chakra-ui/chakra-ui/commit/a11810f705f0731f5ddc967a59b6899dfe8d5050)]:
  - @chakra-ui/utils@1.6.0
  - @chakra-ui/styled-system@1.10.3
  - @chakra-ui/color-mode@1.1.6

## 1.6.2

### Patch Changes

- [`000402a2c`](https://github.com/chakra-ui/chakra-ui/commit/000402a2c720878a06a63152a332b15efd79814f)
  [#3805](https://github.com/chakra-ui/chakra-ui/pull/3805) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow passing custom props
  to useStyleConfig

* [`a73198529`](https://github.com/chakra-ui/chakra-ui/commit/a7319852908f68596600da799ef08a0e7dbb468e)
  [#3775](https://github.com/chakra-ui/chakra-ui/pull/3775) Thanks
  [@tomchentw](https://github.com/tomchentw)! - Add missing dependency issue of
  `@chakra-ui/react-utils`

* Updated dependencies
  [[`8b5eb9654`](https://github.com/chakra-ui/chakra-ui/commit/8b5eb9654affe562795d38a19f732f84732a949d)]:
  - @chakra-ui/utils@1.5.2
  - @chakra-ui/color-mode@1.1.5
  - @chakra-ui/styled-system@1.10.2

## 1.6.1

### Patch Changes

- Updated dependencies
  [[`1a04a41bd`](https://github.com/chakra-ui/chakra-ui/commit/1a04a41bd2285069011a738fff422ba1a6fcce94),
  [`e481ba491`](https://github.com/chakra-ui/chakra-ui/commit/e481ba4914a7f163d93d4c22e2e457f1afb08721)]:
  - @chakra-ui/utils@1.5.1
  - @chakra-ui/color-mode@1.1.4
  - @chakra-ui/styled-system@1.10.1

## 1.6.0

### Minor Changes

- [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)
  [#3674](https://github.com/chakra-ui/chakra-ui/pull/3674) Thanks
  [@codebender828](https://github.com/codebender828)! - Extract all React based
  utilities and types into `@chakra-ui/react-utils`

### Patch Changes

- [`36252981a`](https://github.com/chakra-ui/chakra-ui/commit/36252981a6e38ed138b5f41e0d50d01a19b4b77c)
  [#3636](https://github.com/chakra-ui/chakra-ui/pull/3636) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Fixed an issue where the
  `StylesProvider` export was not working in every environment
  - Add style config for `rotateX`, `rotateY`, `scaleX`, `scaleY`
- Updated dependencies
  [[`32e79f835`](https://github.com/chakra-ui/chakra-ui/commit/32e79f83545740e1df73e7ce689e4101646bb57d),
  [`a58b724e9`](https://github.com/chakra-ui/chakra-ui/commit/a58b724e9c8656044f866b658f378662f2a44b46),
  [`b724a9dd9`](https://github.com/chakra-ui/chakra-ui/commit/b724a9dd9429d02c0b2c7f7deac66d3553100bdc)]:
  - @chakra-ui/styled-system@1.10.0
  - @chakra-ui/utils@1.5.0
  - @chakra-ui/color-mode@1.1.3

## 1.5.1

### Patch Changes

- Updated dependencies
  [[`a576f4de8`](https://github.com/chakra-ui/chakra-ui/commit/a576f4de850706ea7088c8a6ea687269cad05e69)]:
  - @chakra-ui/styled-system@1.9.1

## 1.5.0

### Minor Changes

- [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c)
  [#3529](https://github.com/chakra-ui/chakra-ui/pull/3529) Thanks
  [@callum-mellorreed-privitar](https://github.com/callum-mellorreed-privitar)! -
  Add support for `textStyle` and `layerStyle` theme type generation to
  `@chakra-ui/cli`

### Patch Changes

- [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b)
  [#3551](https://github.com/chakra-ui/chakra-ui/pull/3551) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Fix: only return an array
  in `toCSSObject` when `css` prop is passed.

- Updated dependencies
  [[`d70515fc2`](https://github.com/chakra-ui/chakra-ui/commit/d70515fc20279b5b2acf9a2db2bda0289b8c5408),
  [`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c),
  [`c3dcaabbc`](https://github.com/chakra-ui/chakra-ui/commit/c3dcaabbcf52ab9805a622f4e9833ad26cad9318),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b),
  [`96139067d`](https://github.com/chakra-ui/chakra-ui/commit/96139067daa4b9a606b60c73f28a88ccd99d983b)]:
  - @chakra-ui/color-mode@1.1.2
  - @chakra-ui/utils@1.4.0
  - @chakra-ui/styled-system@1.9.0

## 1.4.0

### Minor Changes

- [`53408372e`](https://github.com/chakra-ui/chakra-ui/commit/53408372ef6926840815a03f2ac5269e3a4757f2)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for CSS
  Variables to the core of Chakra
  - Improve style computation performance by 2.5x

* [`1f4d0aa4e`](https://github.com/chakra-ui/chakra-ui/commit/1f4d0aa4eff7ba3caffb0599eb81edfb223a36cc)
  [#3462](https://github.com/chakra-ui/chakra-ui/pull/3462) Thanks
  [@joe-bell](https://github.com/joe-bell)! - ### `chakra`

  Adds support for `main` in chakra factory

### Patch Changes

- Updated dependencies
  [[`53408372e`](https://github.com/chakra-ui/chakra-ui/commit/53408372ef6926840815a03f2ac5269e3a4757f2),
  [`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d)]:
  - @chakra-ui/styled-system@1.8.0
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/color-mode@1.1.1

## 1.3.1

### Patch Changes

- Updated dependencies
  [[`e8113d3ca`](https://github.com/chakra-ui/chakra-ui/commit/e8113d3ca66e9d45ac2dbb7109ff8904cbfd1134),
  [`4943a15c0`](https://github.com/chakra-ui/chakra-ui/commit/4943a15c084fd2e66ab0dbf273233630d006dc5a),
  [`7f3bb3584`](https://github.com/chakra-ui/chakra-ui/commit/7f3bb35841f81e9e29a356b3070ac9fd28352731)]:
  - @chakra-ui/styled-system@1.7.1
  - @chakra-ui/color-mode@1.1.0

## 1.3.0

### Minor Changes

- [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087)
  [#3245](https://github.com/chakra-ui/chakra-ui/pull/3245) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  responsive values when using `apply`, `textStyle` and `layerStyle`.

### Patch Changes

- Updated dependencies
  [[`ef34c10a0`](https://github.com/chakra-ui/chakra-ui/commit/ef34c10a0c3cfda6bafcca4aa287dfb82f130aeb),
  [`a97e42568`](https://github.com/chakra-ui/chakra-ui/commit/a97e42568c4470d6cd1e16b48429af93c52def49),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`9dc37ee37`](https://github.com/chakra-ui/chakra-ui/commit/9dc37ee37575650746e9b006e41428f1bf53e16c),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/styled-system@1.7.0
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/color-mode@1.0.7

## 1.2.1

### Patch Changes

- [`2575d6957`](https://github.com/chakra-ui/chakra-ui/commit/2575d6957feb6da82775aacf6fe633b50ca3f81e)
  [#3221](https://github.com/chakra-ui/chakra-ui/pull/3221) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow string values for
  ThemingProps['colorScheme']

## 1.2.0

### Minor Changes

- [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- Updated dependencies
  [[`e434aed4a`](https://github.com/chakra-ui/chakra-ui/commit/e434aed4a7d769d0c6e98e048b2100f0efed277a),
  [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a),
  [`e859a9fc1`](https://github.com/chakra-ui/chakra-ui/commit/e859a9fc1bd906801a490dceeb507cca0684a192)]:
  - @chakra-ui/styled-system@1.6.0
  - @chakra-ui/color-mode@1.0.6

## 1.1.7

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/color-mode@1.0.5

## 1.1.6

### Patch Changes

- Updated dependencies
  [[`d9ec9f49`](https://github.com/chakra-ui/chakra-ui/commit/d9ec9f496bfe2f81ffb84adbed099581d5f6843e),
  [`26ca4cc5`](https://github.com/chakra-ui/chakra-ui/commit/26ca4cc53b8cc0ca696f2130f832965f7dc0ee53)]:
  - @chakra-ui/styled-system@1.5.0
  - @chakra-ui/color-mode@1.0.4

## 1.1.5

### Patch Changes

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/color-mode@1.0.3
  - @chakra-ui/styled-system@1.4.1

## 1.1.4

### Patch Changes

- Updated dependencies
  [[`ff7c3676`](https://github.com/chakra-ui/chakra-ui/commit/ff7c36764650dc7f01957c417eae1ec8ce356495),
  [`6830c0e3`](https://github.com/chakra-ui/chakra-ui/commit/6830c0e36959ebd76ce1991dd89d7303ce33b0d0),
  [`09f028e4`](https://github.com/chakra-ui/chakra-ui/commit/09f028e4f2539d51b1c9ac7f3aec422ee6848fa3)]:
  - @chakra-ui/styled-system@1.4.0

## 1.1.3

### Patch Changes

- [`a9807b33`](https://github.com/chakra-ui/chakra-ui/commit/a9807b334477ac9ecd7f3637c0ff7d5fb5c46639)
  [#2753](https://github.com/chakra-ui/chakra-ui/pull/2753) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Restored TypeScript
  autocomplete for chakra component props in Jetbrains IDEs.

## 1.1.2

### Patch Changes

- Updated dependencies
  [[`5cef5de4`](https://github.com/chakra-ui/chakra-ui/commit/5cef5de4f45cd58f7a29436335543cb5b40c0d70)]:
  - @chakra-ui/styled-system@1.3.1

## 1.1.1

### Patch Changes

- Updated dependencies
  [[`a0e0bd9a`](https://github.com/chakra-ui/chakra-ui/commit/a0e0bd9a5d45fe08887f8df8d3eccc84951578df),
  [`4fa07745`](https://github.com/chakra-ui/chakra-ui/commit/4fa077453a5c2165b695198c57366f3cc6506c37)]:
  - @chakra-ui/styled-system@1.3.0

## 1.1.0

### Minor Changes

- [`730a2da1`](https://github.com/chakra-ui/chakra-ui/commit/730a2da19b652614bc051b9f80313d211b22d1de)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ## Pin Input

  ### 🐛 Bug Fix

  - Fix issue where copy-paste doesn't work for pin-input

  ## Number Input

  ### 🐛 Bug Fix

  - Fix issue where number input doesn't work when using with form libraries
    that use `ref` as entry point to setting initial values (e.g React hook
    form).

    We improved `useNumberInput` to sync the initial values in the `ref` passed
    to `NumberInputField` with the internal state.

  ## System

  ### 🚀 Feature

  Add support for custom `shouldForwardProp` function in the `chakra` factory
  function.

### Patch Changes

- Updated dependencies
  [[`e73878ee`](https://github.com/chakra-ui/chakra-ui/commit/e73878ee686c11d3f94ad6ac61b19ae9508d75a5),
  [`609ac595`](https://github.com/chakra-ui/chakra-ui/commit/609ac595568799c9f2c38ccbc9ef44fdc7393baa)]:
  - @chakra-ui/utils@1.0.2
  - @chakra-ui/styled-system@1.2.0
  - @chakra-ui/color-mode@1.0.2

## 1.0.2

### Patch Changes

- [`653f3dd6`](https://github.com/chakra-ui/chakra-ui/commit/653f3dd6f30a17e366c069666acbfd9eddb11936)
  [#2709](https://github.com/chakra-ui/chakra-ui/pull/2709) Thanks
  [@with-heart](https://github.com/with-heart)! - Added default empty object
  argument values for the `props` and `opts` arguments of `useStyleConfig`.
- Updated dependencies
  [[`127baa0f`](https://github.com/chakra-ui/chakra-ui/commit/127baa0f1926bf1f8ace6f46cfdc08606fe9d347)]:
  - @chakra-ui/styled-system@1.1.1

## 1.0.1

### Patch Changes

- Updated dependencies
  [[`586ce3c1`](https://github.com/chakra-ui/chakra-ui/commit/586ce3c12bb3508027c36811233c539eeeb55256),
  [`5c482483`](https://github.com/chakra-ui/chakra-ui/commit/5c482483ce24fc798540c9792a15e06772eae213)]:
  - @chakra-ui/styled-system@1.1.0
  - @chakra-ui/utils@1.0.1
  - @chakra-ui/color-mode@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/system

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

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/system

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-rc.0...@chakra-ui/system@1.0.0-rc.1) (2020-08-06)

### Bug Fixes

- **variables:** drop unused imports
  ([552b2e9](https://github.com/chakra-ui/chakra-ui/commit/552b2e9b7510963db509a5724af5361ef07c8ecb))
- connect drawer its correct theming
  ([9ed9d3a](https://github.com/chakra-ui/chakra-ui/commit/9ed9d3aea959f38198b1ba0d48c24686630aee90))

### Features

- **system:** extend props
  ([645c683](https://github.com/chakra-ui/chakra-ui/commit/645c683ef71ad5ef5b3aa60e7e2880853df1683f))
- added cookieStorageManager. still WIP
  ([9a9c305](https://github.com/chakra-ui/chakra-ui/commit/9a9c305d9c4ae7b5b44271e633c8a3bad81df066))
- cleaned up some storageManager code. set color mode cookie to expire after a
  year
  ([d7ca15e](https://github.com/chakra-ui/chakra-ui/commit/d7ca15e6be9b393ed42cfc1a394d2872d7a8e5df))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.7...@chakra-ui/system@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.6...@chakra-ui/system@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- give priority to props overrides
  ([f2fe955](https://github.com/chakra-ui/chakra-ui/commit/f2fe9553373da4734712a90fec284eea7a951dfb))
- null exception for style config
  ([c28ba5a](https://github.com/chakra-ui/chakra-ui/commit/c28ba5ac075cc5c8f30806e269ed36632c01d6ea))

### Features

- add support for single and multipart config
  ([a13d0f8](https://github.com/chakra-ui/chakra-ui/commit/a13d0f8a3d97405bde6acba1c4fc126677154a8b))

### Reverts

- breakpoint handling
  ([f3ee5f1](https://github.com/chakra-ui/chakra-ui/commit/f3ee5f15c48da242c4d4d43de0dc67ff7664c81e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.5...@chakra-ui/system@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/system

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/system@1.0.0-next.4...@chakra-ui/system@1.0.0-next.5) (2020-07-15)

### Performance Improvements

- improve system pkg
  ([eebec47](https://github.com/chakra-ui/chakra-ui/commit/eebec479c6c40324833cc1beed0b540c4687d805))
- some more improvements
  ([daf94a5](https://github.com/chakra-ui/chakra-ui/commit/daf94a50f6abc9773c9552ec08b5ebf5f1cb05b9))
- some more improvements
  ([3382bab](https://github.com/chakra-ui/chakra-ui/commit/3382bab224f29f082d2a9ba2b4b2721257fbdfac))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.4 (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- bug i created :)
  ([352eece](https://github.com/chakra-ui/chakra-ui/commit/352eece27b7df1a061e9d365d9b54e6beeeffd90))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update border-radius style prop and fix w style prop
  ([09df03f](https://github.com/chakra-ui/chakra-ui/commit/09df03fba7321ae50d4d3107aaf89b1956ed3463))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- add support for inline-variant
  ([67bf6ad](https://github.com/chakra-ui/chakra-ui/commit/67bf6adf2bf8f3270b75f83382c2acbb8db07155))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.3 (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- bug i created :)
  ([352eece](https://github.com/chakra-ui/chakra-ui/commit/352eece27b7df1a061e9d365d9b54e6beeeffd90))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))
- update border-radius style prop and fix w style prop
  ([09df03f](https://github.com/chakra-ui/chakra-ui/commit/09df03fba7321ae50d4d3107aaf89b1956ed3463))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- add support for inline-variant
  ([67bf6ad](https://github.com/chakra-ui/chakra-ui/commit/67bf6adf2bf8f3270b75f83382c2acbb8db07155))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-next.2 (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- bug i created :)
  ([352eece](https://github.com/chakra-ui/chakra-ui/commit/352eece27b7df1a061e9d365d9b54e6beeeffd90))
- resolver functions for css
  ([ffb4cfd](https://github.com/chakra-ui/chakra-ui/commit/ffb4cfd52e1aaabaebab7b548bf570b01daaf5a6))
- style issue with progress bar
  ([b0e430a](https://github.com/chakra-ui/chakra-ui/commit/b0e430a5adffd88a56cce10555bad89d61ad686b))
- update border-radius style prop and fix w style prop
  ([09df03f](https://github.com/chakra-ui/chakra-ui/commit/09df03fba7321ae50d4d3107aaf89b1956ed3463))
- update core css support
  ([499a6a1](https://github.com/chakra-ui/chakra-ui/commit/499a6a1ddf3111b2f528b1661f17896bf6948abd))

### Features

- add support for inline-variant
  ([67bf6ad](https://github.com/chakra-ui/chakra-ui/commit/67bf6adf2bf8f3270b75f83382c2acbb8db07155))
- add support for line-clamp
  ([1173ca6](https://github.com/chakra-ui/chakra-ui/commit/1173ca6974e8b9fcf27aa301bd1accece07ca5fc))
