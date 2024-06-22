# @chakra-ui/react

## 3.0.0-next.8

### Patch Changes

- [`32a454d`](https://github.com/chakra-ui/chakra-ui/commit/32a454d0c2ffc67a9f09210d591f68b052e889e9)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add missing
  `use client` directives to several components

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.8
  - @chakra-ui/utils@3.0.0-next.8

## 3.0.0-next.7

### Minor Changes

- [`4ff153f`](https://github.com/chakra-ui/chakra-ui/commit/4ff153fd9b449d3e43561b7daceaadfe3c925b08)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Speed up
  intellisence for style props, and add support for `strictTokens` in the CLI.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.7
  - @chakra-ui/utils@3.0.0-next.7

## 3.0.0-next.6

### Minor Changes

- [`925cfd9`](https://github.com/chakra-ui/chakra-ui/commit/925cfd99ce0a09c4145b81c17605e882c4aa1840)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add ActionBar,
  Status, Rating, Pagination components

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.6
  - @chakra-ui/utils@3.0.0-next.6

## 3.0.0-next.5

### Minor Changes

- [`07b04b1`](https://github.com/chakra-ui/chakra-ui/commit/07b04b1c506995f6f276f5f80a93d09d89b92fce)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **[NEW]:** Add
  `RatingGroup`, `SegmentControl`

  - **[NEW]:** Add `EmptyState` component for empty states
  - **[NEW]:** Add `RadioCard` and `CheckboxCard` components for card-based
    selection

- [#8568](https://github.com/chakra-ui/chakra-ui/pull/8568)
  [`5fd993b`](https://github.com/chakra-ui/chakra-ui/commit/5fd993bfbfd82f340646b3aa55fccc4d633834a7)
  Thanks [@isBatak](https://github.com/isBatak)! - Add Collapsible recipe with
  default open/close animation

- [`43f2c7d`](https://github.com/chakra-ui/chakra-ui/commit/43f2c7d857c8fe3cab911891200fdc75d1aa782d)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **CheckboxCard
  [New]**

  Add support for a new `CheckboxCard` component that can be used to render a
  card with a checkbox.

  ```jsx
  <CheckboxCard.Root>
    <CheckboxCard.Control>
      <Stack gap="0" flex="1">
        <CheckboxCard.Label>Checkbox</CheckboxCard.Label>
        <Text>Some description</Text>
      </Stack>

      <CheckboxCard.HiddenInput />
      <CheckboxCard.Indicator />
    </CheckboxCard.Control>
  </CheckboxCard.Root>
  ```

  - **Checkmark [New]**

    Add new checkmark component for rendering a static checkmark icon with the
    `checked`, `disabled`, and `indeterminate` state baked in.

  ```jsx
  <Stack>
    <Checkmark />
    <Checkmark checked />
    <Checkmark indeterminate />
    <Checkmark disabled />
    <Checkmark checked disabled />
    <Checkmark indeterminate disabled />
  </Stack>
  ```

  - **EmptyState [New]**

    Add new `EmptyState` component for rendering an empty state message with a
    title, description, and optional action button.

  ```jsx
  <EmptyState.Root>
    <EmptyState.Content>
      <EmptyState.Indicator>
        <HiTemplate />
      </EmptyState.Indicator>

      <VStack textAlign="center">
        <Text fontWeight="medium">No template found</Text>
        <Text fontSize="sm" color="fg.muted">
          Try creating a new template with the button below
        </Text>
      </VStack>

      <Button variant="outline">
        <HiPlus /> Create Template
      </Button>
    </EmptyState.Content>
  </EmptyState.Root>
  ```

- [#8575](https://github.com/chakra-ui/chakra-ui/pull/8575)
  [`d4522d9`](https://github.com/chakra-ui/chakra-ui/commit/d4522d92bca44a79baa404340426b2783d283e2e)
  Thanks [@isBatak](https://github.com/isBatak)! - Align theme recipe name with
  panda

- [#8569](https://github.com/chakra-ui/chakra-ui/pull/8569)
  [`eb26857`](https://github.com/chakra-ui/chakra-ui/commit/eb2685735e25d6790d14d28653c792b9572c080e)
  Thanks [@isBatak](https://github.com/isBatak)! - Fix the `boxSize` type to
  allow number values.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.5
  - @chakra-ui/utils@3.0.0-next.5

## 3.0.0-next.4

### Minor Changes

- [`e4f2df0`](https://github.com/chakra-ui/chakra-ui/commit/e4f2df05a44d39cb951193cad771bc3f6f917bf2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `Prose`
  component to help style markdown content.

### Patch Changes

- [#8475](https://github.com/chakra-ui/chakra-ui/pull/8475)
  [`9224f4e`](https://github.com/chakra-ui/chakra-ui/commit/9224f4e16299ab6eee7dbc9b1ba3bc6723f00046)
  Thanks [@ryo-manba](https://github.com/ryo-manba)! - Add aria-current
  attribute to stepper

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.4
  - @chakra-ui/utils@3.0.0-next.4

## 3.0.0-next.3

### Minor Changes

- [`de9c0a0`](https://github.com/chakra-ui/chakra-ui/commit/de9c0a0d78f70db1fb246ea8ec377e57e10919e7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add `DataList`
  component

- [`763329e`](https://github.com/chakra-ui/chakra-ui/commit/763329ebdca2a9d4b7295d94fff3d2265a793c99)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Add preset and
  preset-base entrypoints.

  - The `preset` entrypoint exposes the default theme and recipes for Chakra.
  - The `preset-base` entrypoint exposes the base utilities and conditions used
    internally.

### Patch Changes

- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.3
  - @chakra-ui/utils@3.0.0-next.3

## 3.0.0-next.2

### Patch Changes

- [`83366c4`](https://github.com/chakra-ui/chakra-ui/commit/83366c43e42d7d4d385bbb3d85051768b0e03be7)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - Fix regression in
  `mergeConfigs`
  - Decompose `Field` component
  - Refactor `Avatar` to use Ark UI
  - Refactor `Progress` to use Ark UI
- Updated dependencies []:
  - @chakra-ui/hooks@3.0.0-next.2
  - @chakra-ui/utils@3.0.0-next.2

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
