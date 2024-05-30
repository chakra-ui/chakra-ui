# @chakra-ui/react

## 3.0.0-next.1

### Minor Changes

- [`548470d`](https://github.com/chakra-ui/chakra-ui/commit/548470dd4306dd39d76555e172da64fd1861fdc5)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add custom select
  from Ark UI and design recipe

### Patch Changes

- [`c941971`](https://github.com/chakra-ui/chakra-ui/commit/c9419714db8b50b2cad3f478d90d4be4268da48f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Convert Tabs
  component to use Ark UI

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.1
  - @chakra-ui/utils@3.0.0-next.1

## 3.0.0-next.0

### Major Changes

- [#8153](https://github.com/chakra-ui/chakra-ui/pull/8153)
  [`7b6e66a`](https://github.com/chakra-ui/chakra-ui/commit/7b6e66a15b08ad27e8458a009c3fb15ee738ca37)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Prepares the ground
  for the next version Chakra that leverages Ark UI.

  **User Facing**

  - Consolidate all component packages into a single package
  - Remove all deprecated components and APIs
  - Simplify the Changelogs for all v2 releases

  **Infrastructure**

  - Simplify the repo infrastructure and release process
  - Migrate from `jest` to `vitest`
  - Migrate from `tsup` to custom `rollup` setup for better bundling strategy

### Minor Changes

- [#8121](https://github.com/chakra-ui/chakra-ui/pull/8121)
  [`170198f`](https://github.com/chakra-ui/chakra-ui/commit/170198fc3936ad34f8136a2da173c12d9dc3dc36)
  Thanks [@kkieninger](https://github.com/kkieninger)! - ### Fixed

  - Fix hard-coded z-index for Menu in favor of one defined from the theme
  - Fix problem with leading and trailing spaces when getting initials for the
    Avatar component
  - Suppress unnecessary re-renders of Checkbox and Radio component

  ### Added

  - Add CSS `accentColor` property to style props
  - Add support for `asChild` in chakra factory
  - Export `toastStore` from `toast` component
  - Upgrade `framer-motion` to allow for skipAnimations
  - Add component namespace to reduce imports and provide better composition
  - Modal, Drawer: Add default `preserveScrollBarGap`

  ### Changed

  Redesign the component themes and anatomy

- [#8393](https://github.com/chakra-ui/chakra-ui/pull/8393)
  [`623e558`](https://github.com/chakra-ui/chakra-ui/commit/623e558ac22f84e6250387d0971aafe9713667a6)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Integrate Ark UI
  components to reduce maintenance surface.

  - Add `FileUpload` component
  - Remove `trigger=hover` in favor of `HoverCard`
  - Replace `Tooltip`, `Popover` and `HoverCard` with those from Ark UI

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  custom theme conditions or pseudo props via `theme.conditions`

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

- [#8218](https://github.com/chakra-ui/chakra-ui/pull/8218)
  [`a89c598`](https://github.com/chakra-ui/chakra-ui/commit/a89c598ed822bf11efc519f8789fa7c145e3bba0)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add support for
  `_open` and `_closed` pseudo props for styling their respective selectors.

  - `_open`: `&[data-state=open], &[open]`
  - `_closed`: `&[data-state=closed]`
  - `_groupOpen`: `[data-group][data-state=open] &`
  - `_groupClosed`: `[data-group][data-state=closed] &`

  Extend the existing pseudo props to support new selectors`

  - `_placeholder` now supports `&[data-placeholder]`
  - `_placeholderShow` now supports `&[data-placeholder-shown]`
  - `_fullscreen` now supports `&[data-fullscreen]`
  - `_empty` now supports `&[data-empty]`
  - `_expanded` now supports `&[data-state=expanded]`
  - `_checked` now supports `&[data-state-checked]`

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.0
  - @chakra-ui/utils@3.0.0-next.0
