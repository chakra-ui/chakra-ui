---
"@chakra-ui/react": minor
"@chakra-ui/panda-preset": minor
---

### Added

- **Semantic Tokens**: Add new `border` semantic token to all color palettes
  (`gray.300`/`gray.700` for gray, `color.500`/`color.400` for colored palettes)
  to improve outline component appearance

### Changed

- **Button, Badge, Tag, Checkbox**: Update outline variants to use
  `colorPalette.border` instead of `colorPalette.muted` or global `border` token
  for better appearance, especially for non-gray color palettes.

  > **NOTE**: All changes include CSS variable fallbacks to `colorPalette.muted`
  > for backward compatibility.
