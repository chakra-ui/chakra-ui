---
"@chakra-ui/react": minor
---

Update Ark UI to v5.37.2

### Added

- **Color Picker, Combobox, Date Picker, Hover Card, Menu, Popover, Select,
  Tooltip**: Added `data-side` to placement-aware parts so you can style them
  based on the current placement (`top`, `bottom`, `left`, `right`).

- **Date Picker**: Added `hideTimeZone` for `ZonedDateTime` values. The
  `timeZoneName` segment now renders automatically — set `hideTimeZone` to hide
  it. Arrow navigation and auto-advance after typing now reach read-only
  focusable segments too.

- **Splitter**:
  - Accept CSS units (`px`, `em`, `rem`, `vh`, `vw`) for `defaultSize`,
    `minSize`, and `maxSize` in addition to percentages.
  - Added per-panel `resizeBehavior`. Set to `"preserve-pixel-size"` to keep a
    panel's pixel size constant when the parent group resizes.
  - Allow non-panel children (toolbars, rails, status bars) inside the splitter
    root using partial trigger ids (`"left:"`, `":right"`).

### Fixed

- **Accordion**: Removed redundant `aria-disabled` from item triggers.

- **Color Picker**: Fire `onValueChangeEnd` when picking a color with the
  EyeDropper API, matching the behavior when ending a drag on the sliders.

- **Combobox**: Stop `Enter` from submitting the form when an item is
  highlighted, or when the typed value would be rejected by
  `allowCustomValue: false`.

- **Date Picker**:
  - Preserve entered segments when applying min/max — values clamp
    segment-by-segment on blur instead of snapping.
  - Fixed range-mode keyboard navigation so `ArrowRight` moves from the last
    segment of the start date to the first segment of the end date.
  - Fixed time-only formatters never firing `onValueChange`.
  - Fixed `dayPeriod` (AM/PM) not updating the visible segment via arrow keys or
    typing.
  - Fixed the date input not being writable in locales with multi-character
    separators (e.g. `cs-CZ`, `sk-SK`, `hu-HU`, `ko-KR`).
  - Fixed a Firefox issue where the native month/year `<select>` was not
    interactive inside a modal dialog.
  - Fixed range selection with `outsideDaySelectable` so hovering outside-month
    days no longer changes the visible month.
  - Fixed segment placeholders for locales with explicit script subtags.

- **Dialog, Drawer, Hover Card, Menu, Popover, Tooltip**: Fixed custom trigger
  elements (via shared `ids.trigger`) being ignored when shared across
  components, and fixed trigger lookups in shadow root.

- **Drawer**:
  - Fixed controlled drawers snapping back open before the close animation when
    dismissed by swipe.
  - Fixed flickering when a controlled drawer is swiped or backdrop-closed while
    the `open` setter is async.
  - Fixed `--drawer-swipe-progress` jumping straight to `1` at the start of a
    dismiss swipe — it now moves smoothly.
  - Fixed the drawer freezing mid-drag on release when its content mounts
    lazily.

- **React 19 Strict Mode**: Fixed dialog, drawer, and popover leaving the page
  uninteractive (scroll lock, `inert`, `pointer-events`) after closing.

- **Number Input**: Fixed inconsistent blur behavior when the input is cleared
  and `min` is greater than `0`.

- **Pin Input**: Fixed `data-filled` being set on every input on first render.

- **Splitter**:
  - Fixed clicking a resize trigger not moving focus to it, which prevented
    arrow-key resizing until it was tab-focused (notably on Safari).
  - Fixed `data-focus` being applied on hover instead of only on focus.

- **Tabs**: The indicator now updates via `ResizeObserver` when the tab list
  resizes without individual triggers changing size (e.g. responsive reflow).

- **Floating Panel**: Re-exported additional types (`ResizeTriggerAxis`,
  `Stage`, `ElementIds`, `IntlTranslations`, `AnchorPositionDetails`, `Point`,
  `Size`) and the `resizeTriggerAxes` constant.

- **Types**: Fixed declaration file output paths so type exports resolve to
  existing files.
