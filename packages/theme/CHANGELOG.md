# Change Log

## 1.7.0

### Minor Changes

- [`87e42eb64`](https://github.com/chakra-ui/chakra-ui/commit/87e42eb6410846d0041a7e88e2c771d15d596f25)
  [#3463](https://github.com/chakra-ui/chakra-ui/pull/3463) Thanks
  [@segunadebayo](https://github.com/segunadebayo)! - Add new config property
  `cssVarPrefix` to add a custom prefix for CSS variables. It defaults to
  `chakra`.

* [`f032942c8`](https://github.com/chakra-ui/chakra-ui/commit/f032942c8a2568a3a23baee0d5972834345e5fa6)
  [#3447](https://github.com/chakra-ui/chakra-ui/pull/3447) Thanks
  [@dodas](https://github.com/dodas)! - `TabPanels` component can now be styled
  from `Tabs` component theme, specifying the `tabpanels` part.

### Patch Changes

- [`7efc9c217`](https://github.com/chakra-ui/chakra-ui/commit/7efc9c217789b2b314ed629c94b947256e8cbe2c)
  [#3454](https://github.com/chakra-ui/chakra-ui/pull/3454) Thanks
  [@tomdohnal](https://github.com/tomdohnal)! - - Fix full size modal with
  y-overflowing content behaviour
  - Fix border styles for alert and number input

* [`280d0dbfd`](https://github.com/chakra-ui/chakra-ui/commit/280d0dbfdd8894ab4aa228ac7ef816008a5d0824)
  [#3439](https://github.com/chakra-ui/chakra-ui/pull/3439) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Provide proper typings for
  `ThemeOverride.components`

- [`39375c15b`](https://github.com/chakra-ui/chakra-ui/commit/39375c15b64635ea3f59d9f5ad1f31851f9f018b)
  [#3486](https://github.com/chakra-ui/chakra-ui/pull/3486) Thanks
  [@with-heart](https://github.com/with-heart)! - Resolved an issue where
  `optgroup` in dark mode was unreadable on browsers that allow `select`
  contents styling.
- Updated dependencies
  [[`87cc23e14`](https://github.com/chakra-ui/chakra-ui/commit/87cc23e14814e02cbbfc9737c2356cef682ddd5d),
  [`d77f63415`](https://github.com/chakra-ui/chakra-ui/commit/d77f63415822ad26e4f6ed133e4869c07fa72306)]:
  - @chakra-ui/utils@1.3.0
  - @chakra-ui/theme-tools@1.1.0

## 1.6.2

### Patch Changes

- [`e8113d3ca`](https://github.com/chakra-ui/chakra-ui/commit/e8113d3ca66e9d45ac2dbb7109ff8904cbfd1134)
  [#3340](https://github.com/chakra-ui/chakra-ui/pull/3340) Thanks
  [@MohamedSayed008](https://github.com/MohamedSayed008)! - Export `Recursive*`
  types from theme, styled-system

* [`d6808f0a4`](https://github.com/chakra-ui/chakra-ui/commit/d6808f0a4ae6ad426b498e9556c76071f7aa9848)
  [#3366](https://github.com/chakra-ui/chakra-ui/pull/3366) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Bring back the TS type
  `Theme` export and deprecated `DefaultChakraTheme`.

- [`8597f58b7`](https://github.com/chakra-ui/chakra-ui/commit/8597f58b7d5c1fe401086d28a379bc1727756c5b)
  [#3361](https://github.com/chakra-ui/chakra-ui/pull/3361) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Allow halved values in
  design token in spacing as mentioned in the documents

## 1.6.1

### Patch Changes

- [`f3ba8dd53`](https://github.com/chakra-ui/chakra-ui/commit/f3ba8dd53abc697c096165185764235012ada90f)
  [#3300](https://github.com/chakra-ui/chakra-ui/pull/3300) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Fixed an issue where the
  TypeScript types were too narrow for component defaultProps and
  ComponentMultiStyleConfig

## 1.6.0

### Minor Changes

- [`408aaaace`](https://github.com/chakra-ui/chakra-ui/commit/408aaaace0dd413b61354958a4c30b9f2f8aa376)
  [#3227](https://github.com/chakra-ui/chakra-ui/pull/3227) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Introducing a generic
  TypeScript type `ChakraTheme` to improve the `extendTheme` function even
  further.

  ```ts
  import { extendTheme } from "@chakra-ui/react"

  export const customTheme = extendTheme({
    // here you get autocomplete for
    //   - existing definitions from the default theme
    //   - new components (Single and MultiStyle)
    //   - CSS definitions
    //   - color hues
    //   - etc.
  })

  export type MyCustomTheme = typeof customTheme
  ```

  You can get typesafe access to your custom theme like this:

  ```ts
  import { useTheme } from "@chakra-ui/react"
  import { MyCustomTheme } from "./my-custom-theme"

  const MyComponent = () => {
    const customTheme = useTheme<MyCustomTheme>()
    //...
  }
  ```

### Patch Changes

- [`a023a269f`](https://github.com/chakra-ui/chakra-ui/commit/a023a269ffe0efdae74be3de28e41790c9a5ca8a)
  [#3278](https://github.com/chakra-ui/chakra-ui/pull/3278) Thanks
  [@dodas](https://github.com/dodas)! - Fixed an issue where a `Tooltip` with
  negative `gutter` causes flickering on hover.

* [`2861b613b`](https://github.com/chakra-ui/chakra-ui/commit/2861b613bf354e6d00de01bf12bb543b2f2c2532)
  [#3251](https://github.com/chakra-ui/chakra-ui/pull/3251) Thanks
  [@dodas](https://github.com/dodas)! - Fixed an issue in Firefox where `Input`
  overflows it's flex container.

* Updated dependencies
  [[`ff4a36bca`](https://github.com/chakra-ui/chakra-ui/commit/ff4a36bca11cc177830f6f1da13700acd1e3a087),
  [`483687237`](https://github.com/chakra-ui/chakra-ui/commit/483687237f2c4fed05dc6a79693f307c601c1285),
  [`61962345c`](https://github.com/chakra-ui/chakra-ui/commit/61962345c5b1c862445c16c586e304b28c376c9a)]:
  - @chakra-ui/utils@1.2.0
  - @chakra-ui/theme-tools@1.0.4

## 1.5.0

### Minor Changes

- [`20fb74c07`](https://github.com/chakra-ui/chakra-ui/commit/20fb74c074fbb4f229c9613f91de65e824309c07)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Add `8xl` to size
  tokens. It maps to `90rem`

* [`90c7a4fbf`](https://github.com/chakra-ui/chakra-ui/commit/90c7a4fbfde69c01395ffe2876d7348dd72ea65a)
  [#3092](https://github.com/chakra-ui/chakra-ui/pull/3092) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - - Improved theme typing in
  order to provide a better autocomplete experience
  - Fixed a type issue where pseudo style props like `_hover` and `_active`
    didn't allow regular css properties

### Patch Changes

- [`709ca0398`](https://github.com/chakra-ui/chakra-ui/commit/709ca0398a8c82c55b85c1364d80b90c5e075257)
  [#3200](https://github.com/chakra-ui/chakra-ui/pull/3200) Thanks
  [@dodas](https://github.com/dodas)! - A `Button` with `variant="link"` has now
  `verticalAlign` set to `baseline`, instead of `middle`.

## 1.4.1

### Patch Changes

- [`4ae55fa3`](https://github.com/chakra-ui/chakra-ui/commit/4ae55fa3ff28eec1be9e1e5b6ab37d3c7f727df1)
  [#3012](https://github.com/chakra-ui/chakra-ui/pull/3012) Thanks
  [@LPVua](https://github.com/LPVua)! - Fixed FormLabel margin and textAlign to
  support rtl; fixed form error icon margin to support rtl

- Updated dependencies
  [[`8b87406c`](https://github.com/chakra-ui/chakra-ui/commit/8b87406c3132586be3393117eef80d47ec82fc54)]:
  - @chakra-ui/utils@1.1.0
  - @chakra-ui/theme-tools@1.0.3

## 1.4.0

### Minor Changes

- [`ff7c3676`](https://github.com/chakra-ui/chakra-ui/commit/ff7c36764650dc7f01957c417eae1ec8ce356495)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add the `2xl`
  breakpoint to the theme which maps to `96em or 1536px`

## 1.3.0

### Minor Changes

- [`f192cfd6`](https://github.com/chakra-ui/chakra-ui/commit/f192cfd640302e75762bb351cec21fdf670ab898)
  [#2751](https://github.com/chakra-ui/chakra-ui/pull/2751) Thanks
  [@dodas](https://github.com/dodas)! - The `Input` component now supports "xs"
  size. This change affects all components that extend from `Input`'s theme,
  such as `Select`, `PinInput`, `Textarea` or `NumberInput`.

### Patch Changes

- [`de3d059b`](https://github.com/chakra-ui/chakra-ui/commit/de3d059bf2ee7ca2a8ba5f10051b4cd76f86847a)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - This was omitted in
  the last release.

## 1.2.2

### Patch Changes

- [`85eb4090`](https://github.com/chakra-ui/chakra-ui/commit/85eb409039640949e01f3aa7353519b19a42a53f)
  [#2741](https://github.com/chakra-ui/chakra-ui/pull/2741) Thanks
  [@dodas](https://github.com/dodas)! - ## 🐛 Bug Fix

  Focus outline now takes precedence over "isInvalid" outline. This change
  affects all components that extend from `Input`'s theme, such as `Select`,
  `PinInput`, `Textarea` or `NumberInput`.

* [`080a7acc`](https://github.com/chakra-ui/chakra-ui/commit/080a7accdd321123e44df082911c6250154fdbd5)
  [#2759](https://github.com/chakra-ui/chakra-ui/pull/2759) Thanks
  [@gifaeriyanto](https://github.com/gifaeriyanto)! - Added the `container` key
  to the `parts` list so it is detected as part of the `Checkbox` component
  theme types.

* Updated dependencies []:
  - @chakra-ui/theme-tools@1.0.2

## 1.2.1

### Patch Changes

- [`72bbd0db`](https://github.com/chakra-ui/chakra-ui/commit/72bbd0dbb913ba38ee2b9191d12bf73713ae4398)
  [#2708](https://github.com/chakra-ui/chakra-ui/pull/2708) Thanks
  [@TimKolberger](https://github.com/TimKolberger)! - Resolved an issue where
  `DrawerCloseButton` was not receiving its base styles when it was passed other
  styles through the `__css` property, breaking the button's positioning.

## 1.2.0

### Minor Changes

- [`28bd21d7`](https://github.com/chakra-ui/chakra-ui/commit/28bd21d793911ba56bd146dd7aaff1008a70d147)
  [#2659](https://github.com/chakra-ui/chakra-ui/pull/2659) Thanks
  [@dodas](https://github.com/dodas)! - feat(theming): enable theming for
  ModalCloseButton

  This change enables `ModalCloseButton` to be themed as part of the `Modal`
  component theme via the `closeButton` key.

  See
  https://chakra-ui.com/docs/theming/component-style#styling-multipart-components
  for more information.

* [`2192be3d`](https://github.com/chakra-ui/chakra-ui/commit/2192be3db77504addffc89cbfef62fb9e884fa5d)
  [#2635](https://github.com/chakra-ui/chakra-ui/pull/2635) Thanks
  [@jmiazga](https://github.com/jmiazga)! - feat: added theming to List,
  ListItem, and ListIcon

- [`a36ede75`](https://github.com/chakra-ui/chakra-ui/commit/a36ede7519b7193f90e4985636a06c5d483a8a62)
  [#2681](https://github.com/chakra-ui/chakra-ui/pull/2681) Thanks
  [@dodas](https://github.com/dodas)! - This change prevent shrinking of
  AlertIcon when using Alert with long text

* [`c696345a`](https://github.com/chakra-ui/chakra-ui/commit/c696345a711338a23542a7b1911a33927a9ba5f1)
  [#2602](https://github.com/chakra-ui/chakra-ui/pull/2602) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(container): add ability
  to style container component with theme api

- [`9fdc61d8`](https://github.com/chakra-ui/chakra-ui/commit/9fdc61d8801f6d76783b5c9f068525d4dfc28b20)
  [#2478](https://github.com/chakra-ui/chakra-ui/pull/2478) Thanks
  [@Zyclotrop-j](https://github.com/Zyclotrop-j)! - feat(divider): add ability
  to style divider component with theme api

## 1.1.0

### Minor Changes

- [`843854ec`](https://github.com/chakra-ui/chakra-ui/commit/843854ec669367623b50a598402be343866d87a8)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Update heading
  theme to relative values for line height

  - Fixed error styles for flushed input variant
    [#2508](https://github.com/chakra-ui/chakra-ui/issues/2508)

  ```jsx
  // This shows the wrong shadow on focus. Work nows 🎉
  <Input variant="flushed" isInvalid placeholder="Focus me" />
  ```

### Patch Changes

- [`892ea2ca`](https://github.com/chakra-ui/chakra-ui/commit/892ea2ca1c02b4127f4f044df33de58cc7641f5c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix orientation
  styles for Tabs when orientation prop is vertical
  [#1187](https://github.com/chakra-ui/chakra-ui/issues/1187)

  - Add support for styling the `root` tab element from theme
    [#2548](https://github.com/chakra-ui/chakra-ui/issues/2548)

- Updated dependencies []:
  - @chakra-ui/theme-tools@1.0.1

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0 (2020-11-13)

**Note:** Version bump only for package @chakra-ui/theme

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

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.6 (2020-10-25)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.5 (2020-09-27)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.4 (2020-09-25)

**Note:** Version bump only for package @chakra-ui/theme

# 1.0.0-rc.3 (2020-08-30)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.0.0-rc.2 (2020-08-09)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.1](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-rc.0...@chakra-ui/theme@1.0.0-rc.1) (2020-08-06)

### Features

- move font feature settings to stat and add default to css reset
  ([2c1ba4b](https://github.com/chakra-ui/chakra-ui/commit/2c1ba4be4b024d596ee0daf0ca1b8e3cf7c77087))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-rc.0](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.7...@chakra-ui/theme@1.0.0-rc.0) (2020-07-26)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.7](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.6...@chakra-ui/theme@1.0.0-next.7) (2020-07-26)

### Bug Fixes

- added ColorModeOptions type to theme config
  ([648d41f](https://github.com/chakra-ui/chakra-ui/commit/648d41f56b9fd501d730c55f34058e61c6a9febb))
- select option issue in dark mode
  ([f36a747](https://github.com/chakra-ui/chakra-ui/commit/f36a747007451204d4895f48d0d22e5afd393d45))

### Reverts

- breakpoint handling
  ([f3ee5f1](https://github.com/chakra-ui/chakra-ui/commit/f3ee5f15c48da242c4d4d43de0dc67ff7664c81e))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.6](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.5...@chakra-ui/theme@1.0.0-next.6) (2020-07-15)

**Note:** Version bump only for package @chakra-ui/theme

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.5](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@1.0.0-next.4...@chakra-ui/theme@1.0.0-next.5) (2020-07-15)

### Bug Fixes

- tabs align prop didnt do anything
  ([8e56b1b](https://github.com/chakra-ui/chakra-ui/commit/8e56b1b8427bd49a91c67ca3c1da792e76ef005c))

### Features

- add popover transition
  ([73d8c4f](https://github.com/chakra-ui/chakra-ui/commit/73d8c4fc9c676c95232cd259f59cce7d38eff94b))
- add transition for modal
  ([dda931b](https://github.com/chakra-ui/chakra-ui/commit/dda931bea7444c3f83392eebf1c34dd571a0dbbc))
- add transition tokens
  ([40c8b30](https://github.com/chakra-ui/chakra-ui/commit/40c8b30f0f0219a1ed673db97c4032e721f38e53))
- add transition tokens
  ([5e190fa](https://github.com/chakra-ui/chakra-ui/commit/5e190fa70b41f6e0e063d3d68f0dd32adff754eb))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.4](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.4) (2020-07-01)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- Adding Icon to theme export
  ([85ff918](https://github.com/chakra-ui/chakra-ui/commit/85ff918c30c9d6d1165cc69884fcb44cf3e13f2a))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))

### Reverts

- theme z-indexes
  ([52494e0](https://github.com/chakra-ui/chakra-ui/commit/52494e07f452ba973f76a5bdeb1dc32025fa9a1a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.3](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.3) (2020-06-28)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))
- ts issue with sx prop
  ([d3b1340](https://github.com/chakra-ui/chakra-ui/commit/d3b1340cb255937927b4d4c56ce218141570b951))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))

### Reverts

- theme z-indexes
  ([52494e0](https://github.com/chakra-ui/chakra-ui/commit/52494e07f452ba973f76a5bdeb1dc32025fa9a1a))

# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-next.2](https://github.com/chakra-ui/chakra-ui/compare/@chakra-ui/theme@0.0.3...@chakra-ui/theme@1.0.0-next.2) (2020-06-21)

### Bug Fixes

- [#891](https://github.com/chakra-ui/chakra-ui/issues/891)
  ([e107acc](https://github.com/chakra-ui/chakra-ui/commit/e107acc8487898a965b0d695c1da71f46fc56d5e))

### Features

- **divider:** revise divider and add vertical support
  ([7b67e9a](https://github.com/chakra-ui/chakra-ui/commit/7b67e9a9814b282aa4361efc472137e78b0d22b7))
- **theme:** reduce default z-index values
  ([c925ca2](https://github.com/chakra-ui/chakra-ui/commit/c925ca2c6b598477146ceea5857eac48a2bd71f4))
