---
"@chakra-ui/react": minor
---

**Updated Ark UI to v5.39.0**

Relevant additions and improvements:

- **Overlays & Collapsible**: New `hideMode` prop controls how kept-mounted
  content is hidden when closed (`'display-none'` or `'activity'` for React 19)

  > Affects Dialog, Drawer, Popover, Accordion, TreeView, and related components

- **Number Input & Slider**: Added configurable keyboard stepping with
  `largeStep` and `smallStep` props for Number Input, and `largeStep` for Slider

- **Dialog & Drawer**: New `data-autofocus` and `data-no-autofocus` attributes
  for managing focus when overlays open

- **Focus Trap**: Added `persistentElements` option to treat portalled content
  as part of the trap

- **Presence**: New `onEnterComplete` callback for when enter animations finish
  (mirrors existing `onExitComplete`)

  > Affects Color Picker, Combobox, Date Picker, Dialog, Drawer, Floating Panel,
  > Hover Card, Menu, Popover, Select, Tooltip, and Tour

- **Date Input & Date Picker**: Improved locale support for native numerals,
  better constraint handling, and timezone fixes

- **Select, Menu, Combobox, Listbox**: Fixed keyboard navigation issues and
  hover highlight behavior

- **Various fixes**: Fieldset re-rendering loops, Next.js 15 production builds,
  Escape dismissal timing, focus visible state, form submission handling, and
  more
