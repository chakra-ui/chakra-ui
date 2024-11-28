---
"@chakra-ui/react": patch
---

- **Slider**

  - Add `DraggingIndicator` component to show an element only while dragging
  - Fix issue where slider marks were not styled correctly in vertical
    orientation

- **Snippets / Slider**

  - Move `MarkerGroup` into the `Control` component
  - Remove hardcoded margin values in favor of recipes and `data-has-mark-label`
    attribute
