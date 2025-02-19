# @chakra-ui/cli

## 3.8.1

## 3.8.0

## 3.7.0

## 3.6.0

### Patch Changes

- [`07f2c56`](https://github.com/chakra-ui/chakra-ui/commit/07f2c56af4e6224d419a82217f4d3351e1b6ca87)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where CLI
  doesn't properly check for existing files when adding snippets.

## 3.5.1

## 3.5.0

## 3.4.0

## 3.3.3

## 3.3.2

## 3.3.1

## 3.3.0

### Minor Changes

- [`e5ecd91`](https://github.com/chakra-ui/chakra-ui/commit/e5ecd91b6395c4d98f94c6490686b79a01a6075f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `--tsx` flag in the `snippet add` command to allow explicitly specifying
  tsx/jsx file generation.

## 3.2.5

## 3.2.4

## 3.2.3

## 3.2.2

### Patch Changes

- [#9254](https://github.com/chakra-ui/chakra-ui/pull/9254)
  [`6d4e7b6`](https://github.com/chakra-ui/chakra-ui/commit/6d4e7b6c794171392c57f394523e1298dfdc454e)
  Thanks [@TinsFox](https://github.com/TinsFox)! - Output the real version from
  `package.json`

## 3.2.1

### Patch Changes

- [`c79b7bf`](https://github.com/chakra-ui/chakra-ui/commit/c79b7bf2190c002ec9ff222e6e6ad1fbf1aa50d7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix issue where
  npmDependencies for snippets were not auto-installed
  - Support React Router 7 framework detection

## 3.2.0

### Minor Changes

- [`069e39d`](https://github.com/chakra-ui/chakra-ui/commit/069e39d793b78896291144e0dda9db7fb6d7d8fe)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `--all` flag to add all snippets. By default, we only install a
  minimal/recommended set of snippets.

  > **Recommended snippets:** provider, avatar, button, checkbox, radio,
  > input-group, slider, popover, dialog, drawer, tooltip, field

  If you want to add all snippets, you can use the `--all` flag.

### Patch Changes

- [`a3ba8e6`](https://github.com/chakra-ui/chakra-ui/commit/a3ba8e630fba4743d0a9384a7d3ea011c66c3a9a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  typegen doesn't work when CLI installed globally or run using `npx`

## 3.1.2

## 3.1.1

## 3.1.0

### Patch Changes

- [`baa3cb1`](https://github.com/chakra-ui/chakra-ui/commit/baa3cb1f7f90adb94e29875f799edbd6ccc80685)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  adding a snippet with `--outdir` still creates snippets a `src/components/ui`
  directory.

## 3.0.2

### Patch Changes

- [`bfd9cac`](https://github.com/chakra-ui/chakra-ui/commit/bfd9cac4756e599724f087842f70e6551198e956)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue with vite
  setup where `.mjs` and `mts` files were not considered.

- [#9022](https://github.com/chakra-ui/chakra-ui/pull/9022)
  [`b40eb6b`](https://github.com/chakra-ui/chakra-ui/commit/b40eb6b0b8184b7a38428d5d6a0bd7d9932e393a)
  Thanks [@Newbie012](https://github.com/Newbie012)! - Fix issue where style
  props types show as `any` when using `strictTokens`

## 3.0.1

## 3.0.0

### Minor Changes

- [`758f226`](https://github.com/chakra-ui/chakra-ui/commit/758f226e941e4ac9b644a5ab5a4900c2db728c28)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `composition` command in CLI to import ready-made compositions for faster
  development experience.

  ```sh
  Usage: chakra-ui composition [options] [command]

  Add compositions to your project for better DX

  Options:
    -h, --help                     display help for command

  Commands:
    add [options] [components...]  Add a new composition for better DX
    list                           List all compositions
    help [command]                 display help for command
  ```

- [`bfb68dc`](https://github.com/chakra-ui/chakra-ui/commit/bfb68dc319786ee7495a78527408e8d193c53e06)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `eject` command
  to import default theme into project

- [`085cacd`](https://github.com/chakra-ui/chakra-ui/commit/085cacdef4dbc853609d2930ca01382599df705c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  installing required NPM dependencies for compositions

- [`77fe01d`](https://github.com/chakra-ui/chakra-ui/commit/77fe01d3de6e07936998acce37d6f2e7d34c25ed)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Change CLI name and
  command structure.

  - Change the CLI name from `chakra-cli` to `chakra`.
  - Change `tokens` command to `typegen` to better reflect its purpose since its
    generates types for more than just the tokens.
  - Scaffold new `composition` command to help users scaffold new compositions
    easily. Compositions are snippets of Chakra UI component composition them
    easier to reuse across projects.

- [`8fc7b49`](https://github.com/chakra-ui/chakra-ui/commit/8fc7b4979739acb347ca9c662d8d242833438b51)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  conditional value in variant props.

  - Add `@default` JSDoc comment for `defaultVariants` in generated types.

- [`4ff153f`](https://github.com/chakra-ui/chakra-ui/commit/4ff153fd9b449d3e43561b7daceaadfe3c925b08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Speed up
  intellisence for style props, and add support for `strictTokens` in the CLI.

- [`d50d72c`](https://github.com/chakra-ui/chakra-ui/commit/d50d72c2bcdf147caa273f3a1aa1e0cd67da38d3)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `compositions` command to `snippet` for better intuitiveness

- [#8569](https://github.com/chakra-ui/chakra-ui/pull/8569)
  [`eb26857`](https://github.com/chakra-ui/chakra-ui/commit/eb2685735e25d6790d14d28653c792b9572c080e)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix the `boxSize` type to
  allow number values.

- [`14b6a45`](https://github.com/chakra-ui/chakra-ui/commit/14b6a45f5df2405e7e40494d4691efceed87f962)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Show the number of
  skipped snippets that already exists in outdir

### Patch Changes

- [`0eda15c`](https://github.com/chakra-ui/chakra-ui/commit/0eda15c6dc09fc777a0091be15416063dc4ad862)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Set process
  setMaxListeners to improve watch mode

- [`c074b58`](https://github.com/chakra-ui/chakra-ui/commit/c074b58770908d9ab27367578020134975ea5378)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  vite project throws due to config search

- [`0f0ed76`](https://github.com/chakra-ui/chakra-ui/commit/0f0ed76e3f06b9f3efeb7421d2283aee8aead9f7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix regression
  where files were always converted to `.jsx`

- [#8740](https://github.com/chakra-ui/chakra-ui/pull/8740)
  [`d5a225f`](https://github.com/chakra-ui/chakra-ui/commit/d5a225f1bc3eca8be67a69b78429481cf802372b)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Use correct extension
  for ESM exports

## 3.0.0-next.32

## 3.0.0-next.31

## 3.0.0-next.30

## 3.0.0-next.29

### Patch Changes

- [`0eda15c`](https://github.com/chakra-ui/chakra-ui/commit/0eda15c6dc09fc777a0091be15416063dc4ad862)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Set process
  setMaxListeners to improve watch mode

## 3.0.0-next.28

## 3.0.0-next.27

## 3.0.0-next.26

## 3.0.0-next.25

## 3.0.0-next.24

## 3.0.0-next.23

## 3.0.0-next.22

## 3.0.0-next.21

### Minor Changes

- [`14b6a45`](https://github.com/chakra-ui/chakra-ui/commit/14b6a45f5df2405e7e40494d4691efceed87f962)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Show the number of
  skipped snippets that already exists in outdir

## 3.0.0-next.20

### Patch Changes

- [`c074b58`](https://github.com/chakra-ui/chakra-ui/commit/c074b58770908d9ab27367578020134975ea5378)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix issue where
  vite project throws due to config search

## 3.0.0-next.19

## 3.0.0-next.18

### Minor Changes

- [`bfb68dc`](https://github.com/chakra-ui/chakra-ui/commit/bfb68dc319786ee7495a78527408e8d193c53e06)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `eject` command
  to import default theme into project

- [`8fc7b49`](https://github.com/chakra-ui/chakra-ui/commit/8fc7b4979739acb347ca9c662d8d242833438b51)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add support for
  conditional value in variant props.
  - Add `@default` JSDoc comment for `defaultVariants` in generated types.

## 3.0.0-next.17

## 3.0.0-next.16

### Patch Changes

- [#8740](https://github.com/chakra-ui/chakra-ui/pull/8740)
  [`d5a225f`](https://github.com/chakra-ui/chakra-ui/commit/d5a225f1bc3eca8be67a69b78429481cf802372b)
  Thanks [@Pagebakers](https://github.com/Pagebakers)! - Use correct extension
  for ESM exports

## 3.0.0-next.15

## 3.0.0-next.14

### Minor Changes

- [`d50d72c`](https://github.com/chakra-ui/chakra-ui/commit/d50d72c2bcdf147caa273f3a1aa1e0cd67da38d3)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Rename
  `compositions` command to `snippet` for better intuitiveness

## 3.0.0-next.13

## 3.0.0-next.12

### Patch Changes

- [`0f0ed76`](https://github.com/chakra-ui/chakra-ui/commit/0f0ed76e3f06b9f3efeb7421d2283aee8aead9f7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix regression
  where files were always converted to `.jsx`

## 3.0.0-next.11

### Minor Changes

- [`085cacd`](https://github.com/chakra-ui/chakra-ui/commit/085cacdef4dbc853609d2930ca01382599df705c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  installing required NPM dependencies for compositions

## 3.0.0-next.10

### Minor Changes

- [`758f226`](https://github.com/chakra-ui/chakra-ui/commit/758f226e941e4ac9b644a5ab5a4900c2db728c28)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `composition` command in CLI to import ready-made compositions for faster
  development experience.

  ```sh
  Usage: chakra-ui composition [options] [command]

  Add compositions to your project for better DX

  Options:
    -h, --help                     display help for command

  Commands:
    add [options] [components...]  Add a new composition for better DX
    list                           List all compositions
    help [command]                 display help for command
  ```

## 3.0.0-next.9

### Minor Changes

- [`77fe01d`](https://github.com/chakra-ui/chakra-ui/commit/77fe01d3de6e07936998acce37d6f2e7d34c25ed)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Change CLI name and
  command structure.

  - Change the CLI name from `chakra-cli` to `chakra`.
  - Change `tokens` command to `typegen` to better reflect its purpose since its
    generates types for more than just the tokens.
  - Scaffold new `composition` command to help users scaffold new compositions
    easily. Compositions are snippets of Chakra UI component composition them
    easier to reuse across projects.

## 3.0.0-next.8

## 3.0.0-next.7

### Minor Changes

- [`4ff153f`](https://github.com/chakra-ui/chakra-ui/commit/4ff153fd9b449d3e43561b7daceaadfe3c925b08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Speed up
  intellisence for style props, and add support for `strictTokens` in the CLI.

## 3.0.0-next.6

## 3.0.0-next.5

### Minor Changes

- [#8569](https://github.com/chakra-ui/chakra-ui/pull/8569)
  [`eb26857`](https://github.com/chakra-ui/chakra-ui/commit/eb2685735e25d6790d14d28653c792b9572c080e)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix the `boxSize` type to
  allow number values.

## 3.0.0-next.4

## 3.0.0-next.3

## 3.0.0-next.2

## 3.0.0-next.1

## 3.0.0-next.0

### Patch Changes

- Updated dependencies
  [[`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36),
  [`7b6e66a`](https://github.com/chakra-ui/chakra-ui/commit/7b6e66a15b08ad27e8458a009c3fb15ee738ca37),
  [`623e558`](https://github.com/chakra-ui/chakra-ui/commit/623e558ac22f84e6250387d0971aafe9713667a6),
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0),
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)]:
  - @chakra-ui/react@3.0.0-next.0

## 2.4.1

### Patch Changes

- [#7621](https://github.com/chakra-ui/chakra-ui/pull/7621)
  [`02968c565`](https://github.com/chakra-ui/chakra-ui/commit/02968c56538b1a1f049c2fef8c025d251a209a14)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactor theme
  typings process and fix ESM issues

## 2.4.0

### Minor Changes

- [#7494](https://github.com/chakra-ui/chakra-ui/pull/7494)
  [`27dcf2f56`](https://github.com/chakra-ui/chakra-ui/commit/27dcf2f5647c3323d1e6bee35db6cf1514c1b29d)
  Thanks [@kuroppe1819](https://github.com/kuroppe1819)! - Add support for
  nested semantic tokens in theme. It is now possible to declare semantic tokens
  by nesting objects.

  BEFORE:

  ```js
  const theme = {
    semanticTokens: {
      colors: {
        "background.pressed.base": { default: "blue.800", _dark: "blue.300" },
        "background.pressed.subtle": { default: "blue.300", _dark: "blue.700" },
      },
    },
  }
  ```

  AFTER:

  ```js
  const theme = {
    semanticTokens: {
      colors: {
        background: {
          pressed: {
            base: { default: "blue.800", _dark: "blue.300" },
            subtle: { default: "blue.300", _dark: "blue.700" },
          },
        },
      },
    },
  }
  ```

  This allows for cleaner grouping and organization of tokens.

## 2.3.1

### Patch Changes

- [`ddbb1b4c4`](https://github.com/chakra-ui/chakra-ui/commit/ddbb1b4c49b8f124c0368929357e2891265a50c0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages

## 2.3.0

### Minor Changes

- [#7127](https://github.com/chakra-ui/chakra-ui/pull/7127)
  [`ffc73f393`](https://github.com/chakra-ui/chakra-ui/commit/ffc73f393b36ca115794caa6e07d98fe95c8ba9c)
  Thanks [@lexanth](https://github.com/lexanth)! - - Added support for
  generating theme typings to use via module augmentation of the
  `@chakra-ui/styled-system` package.

  To use this feature, run the following command:

  ```bash
  chakra-cli tokens --template augmentation --out ./types/chakra-ui__styled-system.d.ts
  ```

## 2.2.1

### Patch Changes

- [#7099](https://github.com/chakra-ui/chakra-ui/pull/7099)
  [`322a9f424`](https://github.com/chakra-ui/chakra-ui/commit/322a9f4240211876bfdbe170d18f43345da00fc6)
  Thanks [@deecewan](https://github.com/deecewan)! - Support TS Config paths
  more completely

## 2.2.0

### Minor Changes

- [#5701](https://github.com/chakra-ui/chakra-ui/pull/5701)
  [`eb3bfe66d`](https://github.com/chakra-ui/chakra-ui/commit/eb3bfe66d3aecc8cf46f29ef08dc748afb83f781)
  Thanks [@lexanth](https://github.com/lexanth)! - Add the flag
  `--strict-token-types` for `@chakra-ui/cli tokens` to generate strict types
  for theme tokens (e.g. color, spacing)

  ```bash
  chakra-cli tokens --strict-token-types
  ```

  ```tsx live=false
  // before
  <Box padding="abc" />
  // valid type, but "abc" is not available in the theme

  // after
  <Box padding="abc" /> // invalid
  // Type '"abc"' is not assignable to type '"1" | "2" | ... | undefined'.
  ```

## 2.1.8

### Patch Changes

- Updated dependencies
  [[`99329e44a`](https://github.com/chakra-ui/chakra-ui/commit/99329e44a0429a225cd1dffa4b7d76b68a828f44)]:
  - @chakra-ui/utils@2.0.10

## 2.1.7

### Patch Changes

- [#6508](https://github.com/chakra-ui/chakra-ui/pull/6508)
  [`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)
  Thanks [@anubra266](https://github.com/anubra266)! - - Initial release of
  react hooks
  - Refactor all packages to reduce bundle size
  - Refactor code for proper prop doc generatation
- Updated dependencies
  [[`445661955`](https://github.com/chakra-ui/chakra-ui/commit/445661955dff1329156b535ef50c7cf27b8663a9)]:
  - @chakra-ui/utils@2.0.9

## 2.1.6

### Patch Changes

- Force release

- Updated dependencies []:
  - @chakra-ui/utils@2.0.8

## 2.1.5

### Patch Changes

- [#6465](https://github.com/chakra-ui/chakra-ui/pull/6465)
  [`67edac24a`](https://github.com/chakra-ui/chakra-ui/commit/67edac24ace3c621ecb8cc32ee545acbedaadd79)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Fix regression where
  `ThemeTypings` created by chakra-cli could not be used

- Updated dependencies
  [[`dffc18b17`](https://github.com/chakra-ui/chakra-ui/commit/dffc18b1739ad148922fe98e4335457b298c8862),
  [`99af1e29f`](https://github.com/chakra-ui/chakra-ui/commit/99af1e29fa7b8c8b0bee217227d05f695a0acb47)]:
  - @chakra-ui/utils@2.0.7

## 2.1.4

### Patch Changes

- Force new release

- Updated dependencies []:
  - @chakra-ui/utils@2.0.6

## 2.1.3

### Patch Changes

- [#6356](https://github.com/chakra-ui/chakra-ui/pull/6356)
  [`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Force release due
  to change in build configuration
  - Update package `main` and `module` entries
- Updated dependencies
  [[`1839e22eb`](https://github.com/chakra-ui/chakra-ui/commit/1839e22ebad1c2a52795eac5fd0b3eb38ae03f9c)]:
  - @chakra-ui/utils@2.0.5

## 2.1.2

### Patch Changes

- [#6286](https://github.com/chakra-ui/chakra-ui/pull/6286)
  [`a08770bf0`](https://github.com/chakra-ui/chakra-ui/commit/a08770bf04414afdcc5e2c7e8b088c75f5dd949f)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Fix importing of the default
  exported theme

* [#6267](https://github.com/chakra-ui/chakra-ui/pull/6267)
  [`47478edbe`](https://github.com/chakra-ui/chakra-ui/commit/47478edbefe1a4b74421f5a64ea9953d2d867ff3)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Update dependencies

* Updated dependencies
  [[`36ef37d58`](https://github.com/chakra-ui/chakra-ui/commit/36ef37d58220dffc4b8e35c31fdcc57042e9a859),
  [`6c15ec2c2`](https://github.com/chakra-ui/chakra-ui/commit/6c15ec2c2a32a36ecc2d169308379a6825619543)]:
  - @chakra-ui/utils@2.0.3

## 2.1.1

### Patch Changes

- [#6208](https://github.com/chakra-ui/chakra-ui/pull/6208)
  [`8798b3527`](https://github.com/chakra-ui/chakra-ui/commit/8798b352711d6436b537733db7c64730f31a1c47)
  Thanks [@itkrt2y](https://github.com/itkrt2y)! - Add --no-format option

* [#6172](https://github.com/chakra-ui/chakra-ui/pull/6172)
  [`a15f43ecc`](https://github.com/chakra-ui/chakra-ui/commit/a15f43eccf08054515f26aa33cae5992fca4d77e)
  Thanks [@MYKEU](https://github.com/MYKEU)! - Fix issue where CLI crashed due
  to lodash throttle dependency

## 2.1.0

### Minor Changes

- [#6117](https://github.com/chakra-ui/chakra-ui/pull/6117)
  [`154fee7f1`](https://github.com/chakra-ui/chakra-ui/commit/154fee7f128b242babb77f3c60a8dfd82c46d519)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - New watch flag for
  the tokens command. You can specify a directory path to watch for changes. It
  defaults to the parent dir of `<source>`, e.g. `src/theme/theme.ts` =>
  `src/theme`.

  ```shell
  > chakra-cli tokens src/theme/theme.ts --watch

  > chakra-cli tokens --help
  Usage: chakra-cli tokens [options] <source>

  Options:
    --out <path>              output file e.g. node_modules/@chakra-ui/styled-system/dist/declarations/src/theming.types.d.ts
    --strict-component-types  Generate strict types for props variant and size
    --watch [path]            Watch directory for changes and rebuild
    -h, --help                display help for command

  ```

### Patch Changes

- [`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Bump all packages
  to resolve deps issues

* [#6117](https://github.com/chakra-ui/chakra-ui/pull/6117)
  [`5ce803dde`](https://github.com/chakra-ui/chakra-ui/commit/5ce803dde0efcbe3c0abd701d6c9fea2997d36e3)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where the tokens command failed with `SyntaxError: Undefined label 'e'`.
* Updated dependencies
  [[`06f29f8cd`](https://github.com/chakra-ui/chakra-ui/commit/06f29f8cdbb10ff1da523e0d0e958b9990d041e1)]:
  - @chakra-ui/utils@2.0.2

## 2.0.0

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

* [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  dependency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f),
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7),
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/utils@2.0.0

## 2.0.0-next.2

### Major Changes

- [#5989](https://github.com/chakra-ui/chakra-ui/pull/5989)
  [`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Omit `src`
  directory from being published to npm

### Patch Changes

- Updated dependencies
  [[`ed692c0ae`](https://github.com/chakra-ui/chakra-ui/commit/ed692c0ae670bcac92b3da50d141afc6e233dee7)]:
  - @chakra-ui/utils@2.0.0-next.2

## 2.0.0-next.1

### Major Changes

- [#5882](https://github.com/chakra-ui/chakra-ui/pull/5882)
  [`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bump peer
  depencency to React and ReactDOM to >=18

### Patch Changes

- Updated dependencies
  [[`41b3119f5`](https://github.com/chakra-ui/chakra-ui/commit/41b3119f59226f7c70942d6fd0f46480f9bcf196)]:
  - @chakra-ui/utils@2.0.0-next.1

## 1.9.1-next.0

### Patch Changes

- Updated dependencies
  [[`c390af485`](https://github.com/chakra-ui/chakra-ui/commit/c390af4859bcbcf12c982c677492cd6d4960889f)]:
  - @chakra-ui/utils@2.0.0-next.0

## 1.9.0

### Minor Changes

- [#5662](https://github.com/chakra-ui/chakra-ui/pull/5662)
  [`a1e4d7951`](https://github.com/chakra-ui/chakra-ui/commit/a1e4d7951090c9622003e9176005ad3c038fdccc)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - The CLI tokens
  command now includes semantic tokens in the generated ThemeTypings

## 1.8.2

### Patch Changes

- [`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process. Root cause was a bug in our
  CI configuration.
- Updated dependencies
  [[`e1fe48cbe`](https://github.com/chakra-ui/chakra-ui/commit/e1fe48cbe37324744cfe6184d785c093cda1125e)]:
  - @chakra-ui/utils@1.10.4

## 1.8.1

### Patch Changes

- [#5536](https://github.com/chakra-ui/chakra-ui/pull/5536)
  [`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Bumped patch
  version for every package to fix release process.

- Updated dependencies
  [[`a503acabe`](https://github.com/chakra-ui/chakra-ui/commit/a503acabefcaea86cb7f40a6305830f09d2d6083)]:
  - @chakra-ui/utils@1.10.2

## 1.8.0

### Minor Changes

- [#5472](https://github.com/chakra-ui/chakra-ui/pull/5472)
  [`5bfb298bc`](https://github.com/chakra-ui/chakra-ui/commit/5bfb298bc01ba49486056a72b040ab0e068dd904)
  Thanks [@lukasbach](https://github.com/lukasbach)! - Increased scan depth for
  tokens in cli tooling

### Patch Changes

- [#5486](https://github.com/chakra-ui/chakra-ui/pull/5486)
  [`4e26a300c`](https://github.com/chakra-ui/chakra-ui/commit/4e26a300caa60b4739e09520a3112802ebe535b9)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an internal
  version number mismatch

* [#5527](https://github.com/chakra-ui/chakra-ui/pull/5527)
  [`b6ccf0dd2`](https://github.com/chakra-ui/chakra-ui/commit/b6ccf0dd2e3b72a5b50c9e1c00f1e6e3f3b68690)
  Thanks [@with-heart](https://github.com/with-heart)! - When the
  [Chakra CLI](https://chakra-ui.com/docs/theming/advanced#theme-typings) fails
  to generate theme typings, it now exits with a status code of `1`. This
  resolves an issue where failures exited with a success status code.
* Updated dependencies
  [[`24b4333d0`](https://github.com/chakra-ui/chakra-ui/commit/24b4333d008d149380785f87f4891e28584ff89b)]:
  - @chakra-ui/utils@1.10.1

## 1.7.1

### Patch Changes

- [#5372](https://github.com/chakra-ui/chakra-ui/pull/5372)
  [`472612e7a`](https://github.com/chakra-ui/chakra-ui/commit/472612e7aea64de64c6744365f7d5c6a97bcc438)
  Thanks [@selbekk](https://github.com/selbekk)! - Update README to reflect the
  change of the default `--out` path to
  `node_modules/@chakra-ui/styled-system/dist/declarations/src/theming.types.d.ts`

- Updated dependencies
  [[`1537a725f`](https://github.com/chakra-ui/chakra-ui/commit/1537a725fbc7f84979e374f546bda625fc685ac3)]:
  - @chakra-ui/utils@1.10.0

## 1.7.0

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

* [#5244](https://github.com/chakra-ui/chakra-ui/pull/5244)
  [`3f1d7cf1c`](https://github.com/chakra-ui/chakra-ui/commit/3f1d7cf1ce85e8d741035ed2f40b4da59268b4ef)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Added token scales
  `blur`, `borderStyles` and `borderWidths`.

### Patch Changes

- [#5225](https://github.com/chakra-ui/chakra-ui/pull/5225)
  [`e9bbe3bd1`](https://github.com/chakra-ui/chakra-ui/commit/e9bbe3bd1d15dacc9edbefa4e4321404558faf39)
  Thanks [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue
  where the cli fails when `prettier` is not installed

## 1.6.0

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
  - @chakra-ui/utils@1.9.0

## 1.5.3

### Patch Changes

- [`e0a004b45`](https://github.com/chakra-ui/chakra-ui/commit/e0a004b450a76915477ab3da687cf311e96c7494)
  [#4818](https://github.com/chakra-ui/chakra-ui/pull/4818) Thanks
  [@igorwessel](https://github.com/igorwessel)! - Fixed an issue where the CLI
  tokens command exited unexpectedly with:
  `SyntaxError: Cannot use import statement outside a module`

- Updated dependencies
  [[`c06d242c6`](https://github.com/chakra-ui/chakra-ui/commit/c06d242c672a10f93fab4dc2321143beae2db669),
  [`5b4d8ef24`](https://github.com/chakra-ui/chakra-ui/commit/5b4d8ef24017dab1d69aeb5016b53366bdb3bcfd)]:
  - @chakra-ui/utils@1.8.3

## 1.5.2

### Patch Changes

- [`236efcbf5`](https://github.com/chakra-ui/chakra-ui/commit/236efcbf562a966d5a3fcd0a778ee404b379d41d)
  [#4781](https://github.com/chakra-ui/chakra-ui/pull/4781) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  CLI failed with `SyntaxError: JSON5: invalid character`.

## 1.5.1

### Patch Changes

- [`c96f44e16`](https://github.com/chakra-ui/chakra-ui/commit/c96f44e1660fd0430eac0e003f1e807873776b15)
  [#4725](https://github.com/chakra-ui/chakra-ui/pull/4725) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  CLI did not resolve custom tsconfig paths.

  🚨 Please note that only the first alias target from the string array will be
  resolved.

  ```json5
  // tsconfig.json
  {
    //...
    compilerOptions: {
      baseUrl: "src",
      paths: {
        "@alias/*": ["target/*"],
        //           ^-- only the first target will be resolved
      },
    },
  }
  ```

## 1.5.0

### Minor Changes

- [`211d94de3`](https://github.com/chakra-ui/chakra-ui/commit/211d94de397e4e7c91cfe70a3bafa905c7506cbf)
  [#4258](https://github.com/chakra-ui/chakra-ui/pull/4258) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Enable esModuleInterop for
  `chakra-cli tokens`

### Patch Changes

- [`7d9cb190c`](https://github.com/chakra-ui/chakra-ui/commit/7d9cb190cda3b9b58fbd159662402f37fcf7f087)
  [#4214](https://github.com/chakra-ui/chakra-ui/pull/4214) Thanks
  [@npirotte](https://github.com/npirotte)! - Token generation supports non
  valid JS keys for components

- Updated dependencies
  [[`4a1e4d93b`](https://github.com/chakra-ui/chakra-ui/commit/4a1e4d93b0a07df7266d40bb66039385b158d3d1)]:
  - @chakra-ui/utils@1.8.1

## 1.4.0

### Minor Changes

- [`fe2557584`](https://github.com/chakra-ui/chakra-ui/commit/fe255758437b04740e1a0d8c8549afefe7dc71ce)
  [#4067](https://github.com/chakra-ui/chakra-ui/pull/4067) Thanks
  [@jrolfs](https://github.com/jrolfs)! - The `tokens` command now supports
  generating theme token type definitions from a Chakra UI theme published as a
  package:

  ```sh
  npx @chakra-ui/cli tokens <@your-org/chakra-theme-package>
  ```

  A published theme package should export a theme object as either the `default`
  export or an export named `theme`.

  ```jsx
  // chakra-theme-package/src/index.js
  import { extendTheme } from "@chakra-ui/react"

  const theme = extendTheme({})

  // as default export
  export default theme
  // as named export
  export { theme }
  ```

## 1.3.1

### Patch Changes

- [`e8f64a4a6`](https://github.com/chakra-ui/chakra-ui/commit/e8f64a4a6ab5eac862ec8127dcf6c5852a0f84dd)
  [#3941](https://github.com/chakra-ui/chakra-ui/pull/3941) Thanks
  [@jbarzegar](https://github.com/jbarzegar)! - Fixes issues with `tokens`
  command hanging forever if theme workers run into errors during runtime. Now
  when an error is discovered within a worker an `{ err: string }` object is
  passed to the parent which will cause the promise to reject. This will in
  turn, pass the same `err` upwards to allow the command to exit gracefully,
  printing the `err` in question to `stdout`
- Updated dependencies
  [[`d0f50a46e`](https://github.com/chakra-ui/chakra-ui/commit/d0f50a46ea6c2bcf06d8cad8b9b3994fd934be01),
  [`b479ff22e`](https://github.com/chakra-ui/chakra-ui/commit/b479ff22ea10c1a1393224c37c36aa6ceabc4aab),
  [`07d15eab4`](https://github.com/chakra-ui/chakra-ui/commit/07d15eab480724f8fee1a09b7cecdf1e968d9ddd)]:
  - @chakra-ui/utils@1.8.0

## 1.3.0

### Minor Changes

- [`035d5726e`](https://github.com/chakra-ui/chakra-ui/commit/035d5726e28396ef487b9801d7e2fa57677c703c)
  [#3529](https://github.com/chakra-ui/chakra-ui/pull/3529) Thanks
  [@callum-mellorreed-privitar](https://github.com/callum-mellorreed-privitar)! -
  Add support for `textStyle` and `layerStyle` theme type generation to
  `@chakra-ui/cli`

### Patch Changes

- [`4955fe4fa`](https://github.com/chakra-ui/chakra-ui/commit/4955fe4fafa7468f3788583ab4cdac5dad611591)
  [#3621](https://github.com/chakra-ui/chakra-ui/pull/3621) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  cli tokens command exited unexpectedly

- Updated dependencies
  [[`e748219f3`](https://github.com/chakra-ui/chakra-ui/commit/e748219f300f0c51b0eb304fce38b014d7bcbc86),
  [`91ef14839`](https://github.com/chakra-ui/chakra-ui/commit/91ef148397187010804eb8f30307d2ec94c32c5b)]:
  - @chakra-ui/utils@1.4.0

## 1.2.1

### Patch Changes

- [`b78345c36`](https://github.com/chakra-ui/chakra-ui/commit/b78345c366ff79e1a2b5fb77d969f9ee8ced1ac8)
  [#3309](https://github.com/chakra-ui/chakra-ui/pull/3309) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - CLI tokens command now
  ignores TS errors in your theme.ts file

## 1.2.0

### Minor Changes

- [`a97e42568`](https://github.com/chakra-ui/chakra-ui/commit/a97e42568c4470d6cd1e16b48429af93c52def49)
  [#3290](https://github.com/chakra-ui/chakra-ui/pull/3290) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Theme Typings: Add
  autocomplete for negative space values

### Patch Changes

- Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0

## 1.1.0

### Minor Changes

- [`693528a1b`](https://github.com/chakra-ui/chakra-ui/commit/693528a1b73af2eeb462371a61ff2957c6f65810)
  [#3222](https://github.com/chakra-ui/chakra-ui/pull/3222) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Package
  `@chakra-ui/cli@1.0.0` did already exist

  - Add minor bump for adding subcommand `tokens` to generate Theme Typings

    See https://chakra-ui.com/docs/theming/advanced for more info
