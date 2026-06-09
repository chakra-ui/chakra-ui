---
"@chakra-ui/react": minor
---

Update Ark UI to v5.37.2

- **Splitter**: Accept CSS units (`px`, `em`, `rem`, `vh`, `vw`) for size props,
  add per-panel `resizeBehavior` (`"preserve-pixel-size"`), and fix focus not
  moving to a resize trigger on click.
- **Color Picker, Combobox, Date Picker, Hover Card, Menu, Popover, Select,
  Tooltip**: Add `data-side` to placement-aware parts for placement-based
  styling.
- **Accordion**: Remove redundant `aria-disabled` from item triggers.
- **Color Picker**: Fire `onValueChangeEnd` when picking a color with the
  EyeDropper API.
- **Combobox**: Don't submit the form on `Enter` when an item is highlighted or
  the value is rejected by `allowCustomValue: false`.
- **Date Picker**: Fix range-mode clear not resetting active/hovered state, the
  native month/year select inside modals (Firefox), and `outsideDaySelectable`
  hover changing the visible month.
- **Dialog, Hover Card, Menu, Popover, Tooltip**: Fix shared custom trigger
  elements being ignored, and trigger lookups in shadow DOM.
- **Dialog, Popover**: Fix the page being left uninteractive after closing in
  React 19 Strict Mode.
- **Number Input**: Fix blur behavior when the input is cleared and `min` is
  greater than `0`.
- **Pin Input**: Fix `data-filled` being set on every input on first render.
- **Tabs**: Update the indicator when the tab list resizes (responsive reflow).
