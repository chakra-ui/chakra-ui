---
"@chakra-ui/react": minor
---

- **Checkbox**: Fixed individual checkbox props being overridden by
  `CheckboxGroup` when rendering

- **Color Picker**: Fixed color not updating when selecting black shades in
  controlled mode

- **Dialog/Popover**: Fixed issue where closing nested dialogs/popovers would
  incorrectly close parent layers

- **Menu**: Fixed glitchy submenu behavior when hovering between trigger items
  quickly

- **Number Input**: Fixed cursor positioning issues after clicking label or
  scrubbing

- **Pagination**: Fixed next trigger not being disabled when count is 0

- **Scroll Area**: Added overflow CSS variables for scroll fade effects
  (`--scroll-area-overflow-{x,y}-{start,end}`)

- **Slider**:
  - Added `thumbCollisionBehavior` prop to control collision handling between
    thumbs (none, push, swap)
  - Fixed thumb drag behavior from edge in `thumbAlignment="contain"` mode

- **Steps**: Added validation support with `isStepValid`, `isStepSkippable`, and
  `onStepInvalid` props

- **Switch**: Fixed `api.toggleChecked()` not working

- **Tags Input**: Added `placeholder` prop that shows when no tags exist

- **Textarea**: Fixed change event not being emitted after clearing controlled
  textarea

- **Tooltip**: Added `data-instant` attribute for instant animations when
  switching between multiple tooltip triggers

- **Tree View**: Fixed initial focus when first node/branch is disabled
