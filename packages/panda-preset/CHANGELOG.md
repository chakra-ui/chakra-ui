# @chakra-ui/panda-preset

## 3.30.0

### Minor Changes

- [`503e11a`](https://github.com/chakra-ui/chakra-ui/commit/503e11ad4b2b5aa6d653e21d96b7f76a72c87d92)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - ### Added
  - **Semantic Tokens**: Add new `border` semantic token to all color palettes
    (`gray.300`/`gray.700` for gray, `color.500`/`color.400` for colored
    palettes) to improve outline component appearance

  ### Changed
  - **Button, Badge, Tag, Checkbox**: Update outline variants to use
    `colorPalette.border` instead of `colorPalette.muted` or global `border`
    token for better appearance, especially for non-gray color palettes.

    > **NOTE**: All changes include CSS variable fallbacks to
    > `colorPalette.muted` for backward compatibility.

### Patch Changes

- [`fd15569`](https://github.com/chakra-ui/chakra-ui/commit/fd155693546b96e390e131c85fac192711d52cef)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **HoverCard,
  Tooltip, Popover**: Fix arrow direction in RTL layouts

- [`81ec4e7`](https://github.com/chakra-ui/chakra-ui/commit/81ec4e781f96ef8051607d6e970ccb61baa1c788)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - - **TagsInput**:
  Fix overflow issue where very long tags would overflow the container instead
  of truncating with ellipsis.
  - **CheckboxGroup**: Fix type issue where `CheckboxGroupProps` could not be
    passed to the `CheckboxGroup` component.

## 3.29.0

### Minor Changes

- [#10391](https://github.com/chakra-ui/chakra-ui/pull/10391)
  [`1580aeb`](https://github.com/chakra-ui/chakra-ui/commit/1580aebf63e7267d86db2fcb91f6303a4c453914)
  Thanks [@Adebesin-Cell](https://github.com/Adebesin-Cell)! - feat: add
  carousel component

## 3.28.1

### Patch Changes

- [`fad9a2e`](https://github.com/chakra-ui/chakra-ui/commit/fad9a2ef3197b73633f08c02a0861d37aaa8929c)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix CodeBlock right
  padding when scrolling long code lines horizontally

## 3.28.0

## 3.27.1

## 3.27.0

## 3.26.0

## 3.25.0

## 3.24.2

## 3.24.1

## 3.24.0

## 3.23.0

## 3.22.0

## 3.21.1

## 3.21.0

## 3.20.0

## 3.19.2

## 3.19.1

## 3.19.0

## 3.18.0

## 3.17.0

## 3.16.1

## 3.16.0

## 3.15.1

## 3.15.0

## 3.14.2

## 3.14.1

## 3.14.0

## 3.13.0

### Patch Changes

- [#9786](https://github.com/chakra-ui/chakra-ui/pull/9786)
  [`65f932d`](https://github.com/chakra-ui/chakra-ui/commit/65f932dd52782de35e69157dcac7fee255c4efc0)
  Thanks [@isBatak](https://github.com/isBatak)! - Generate latest preset

## 3.12.0

## 3.11.0

## 3.10.0

## 3.9.0

## 3.8.2

## 3.8.1

## 3.8.0

## 3.7.0

## 3.6.0

## 3.5.1

## 3.5.0

## 3.4.0

## 3.3.3

## 3.3.2

## 3.3.1

## 3.3.0

### Patch Changes

- [#9430](https://github.com/chakra-ui/chakra-ui/pull/9430)
  [`8f59d88`](https://github.com/chakra-ui/chakra-ui/commit/8f59d88a09f5b03838db1a784fff2f0ed9a81c74)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Initial release of
  Panda preset for Chakra UI
