---
"@chakra-ui/react": minor
---

### Added

- **Carousel**: Added `autoSize` prop for variable width/height slides

### Changed

- **useListCollection**: `initialItems` now accepts `readonly` arrays
- **Types**: Exported `InteractOutsideEvent`, `FocusOutsideEvent`,
  `PointerDownOutsideEvent` types

### Fixed

- **Carousel**: Fixed dragging after tab switch/scroll and mouse wheel scroll
  with `allowMouseDrag`
- **Combobox**:
  - Fixed `onHighlightChange` not firing when filtered to empty;
  - Fixed focus stealing in controlled mode
  - Removed problematic `aria-hidden` behavior
- **File Upload**: Fixed non-interactive children in dropzone not opening file
  picker
- **Radio Group**: Fixed inconsistent `data-focus-visible`/`data-focus`
  attributes; fixed indicator showing before rect resolved (with Tabs)
- **Tabs**: Fixed indicator showing before rect resolved (with Radio Group);
  fixed position not updating when inactive tabs resize
