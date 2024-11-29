---
"@chakra-ui/react": patch
---

- **Slider**

  - Add `DraggingIndicator` component to show an element only while dragging
  - Fix issue where slider marks were not styled correctly in vertical
    orientation

- **Menu**: Update recipe to use `--available-height` css variable to keep the
  menu's height within the available space

- **System**: Fixed issue where exporting `withRootProvider` would result in
  type error

- **Snippets / Slider**

  - Move `MarkerGroup` into the `Control` component
  - Remove hardcoded margin values in favor of recipes and `data-has-mark-label`
    attribute
