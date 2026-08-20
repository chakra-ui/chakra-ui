---
"@chakra-ui/react": patch
---

- Fix Next.js 15 production builds failing to compile with
  `Attempted import error: 'Activity' is not exported from 'react'`. React's
  optional `Activity` export was imported statically, so webpack rejected it
  even on React versions that expose it at runtime. It now resolves at runtime
  and falls back to `display-none` when the React build doesn't expose it

- **Menu**: Fix `Menu.ContextTrigger` flashing at the top-left corner on the
  first right-click, and long-press context menus on touch opening stuck at
  `(0,0)`. The positioner reported a placement before one had been computed,
  which skipped the off-screen guard that hides it until the anchor point is
  known. Long-press had a second cause, it never triggered a reposition on open

- **Dialog, Drawer, Menu, Popover**: Fix `Escape` being ignored right after an
  overlay opens. Handlers registered a frame late, so the overlay was painted
  and focus-trapped before it could listen. Under CPU load that gap grew well
  past one frame and swallowed the keypress

- **Dialog, Drawer, Popover**: Fix a closing overlay pulling focus back from an
  element your app focused in the meantime, such as a second dialog opened right
  after closing the first. Closing a nested overlay no longer throws when the
  outer container has no connected focusable element, and the focus ring now
  shows on the returned-to element after you close with `Escape`

- **Dialog, Drawer**: Fix the page still scrolling behind an open overlay on
  layouts where `<html>` is the scroll container. The scroll lock targeted
  `<body>`, so nothing was locked

- **Popover**: Fix tabbing out of portalled content looping back into the
  content when the trigger was the last tabbable element on the page. Focus now
  moves to the next tabbable element after the trigger

- **Combobox, Listbox, Menu, Select**: Fix keyboard navigation losing or moving
  the highlighted item while the pointer rests over scrollable content.
  Scrolling an item into view moved the content under the cursor, and the
  resulting `pointerleave` counted as a real hover

- **DateInput**
  - Fix segment text lagging a keystroke behind when you type over an already
    committed date, and in-progress edits being dropped while focus caught up
    after auto-advance. Fast typing and `ArrowUp`/`ArrowDown`/`Home`/`End` now
    land on the segment you're editing
  - Fix `CalendarDate` and `CalendarDateTime` values shifting by your local UTC
    offset when you pass a custom `formatter` without a `timeZone`. A wall-clock
    value round-trips unchanged
  - Accept your locale's native numerals when typing, not just ASCII digits.
    Covers Arabic-Indic `٠-٩` and Devanagari `०-९`

- **DatePicker**
  - Fix `minView`, `maxView`, and `defaultView` being ignored when resolving the
    initial view, which was hardcoded to day through year
  - Fix `defaultOpen` overriding `open`, which let a controlled picker open
    against its own prop
  - Fix disabled and read-only pickers still reacting to cell clicks, the clear
    trigger, and presets. Read-only pickers keep roving-focus navigation,
    disabled pickers drop out of the tab order
  - Fix `maxSelectedDates` not being enforced on month and year cells in
    `multiple` mode
  - Fix keyboard range selection drifting from pointer behavior. Picking a third
    date restarts the range, and reopening with only a start date resumes it
    instead of restarting
  - Fix `translations` requiring every message. It's now `Partial`, so you can
    override one message and let the rest fall back to the defaults
  - Fix the view trigger's `aria-label` naming the wrong view, and announce
    dates inside a range as "In range" instead of the generic "Choose"
  - Accept your locale's native numerals when typing, not just ASCII digits

- **NumberInput**
  - Fix `api.setValue` throwing when you pass a number and `formatOptions` is
    set
  - Fix `Cmd`/`Ctrl` with arrow keys producing values off the `step` grid

- **Slider**: Fix `Cmd`/`Ctrl` with arrow keys producing values off the `step`
  grid

- **TagsInput**
  - Fix an XSS vector in the hidden element that measures input width. It set
    the tag value with `innerHTML`, so a value containing markup was parsed and
    could execute. It now uses `textContent`
  - Fix native form submit so `FormData` reflects the current tags. The hidden
    input kept its initial value after you added, removed, or cleared tags

- **Checkbox, RadioGroup, Switch**: Fix clicking a label adding
  `data-focus-visible` to the control. Activating the label briefly moved focus
  to an overlay container, which was read as virtual focus

- **Fieldset**: Fix `Fieldset.Root` re-rendering whenever its subtree mutated,
  even when helper and error text were unchanged

- **FloatingPanel**: Fix closing a panel leaving it on the stack, so the next
  panel now becomes topmost, and fix stack order not applying to the positioner,
  so focusing a panel raises it above its siblings

- **QrCode**: Fix `getDataUrl()` and the download trigger dropping the overlay,
  so a logo or badge placed over the code went missing from the export

- **Toast**: Fix a height flicker when expanding the stack in overlap mode.
  Heights are measured without the `scale` transform applied

- **ColorPicker**: Fix the channel input committing a partial value when you
  press `Enter` to confirm an IME composition

- **Splitter**
  - Fix collapsed panels sizing to `minSize` instead of `collapsedSize`, and fix
    keyboard resizing breaking when a resize trigger got focus while hovered
  - Fix the resize trigger matching `:focus-visible` after a pointer drag. It
    still takes focus, so keyboard resizing keeps working, but no longer shows
    the focus ring

- **Steps**
  - Fix `Steps.NextTrigger` and `Steps.PrevTrigger` submitting an ancestor form
    on click. They carried no `type`, so they defaulted to `type="submit"`
  - Fix `Steps.RootProvider` rendering its children twice

- **Marquee**: Fix scroll speed depending on content width. Duration now comes
  from the content size and the actual translation distance, so `speed` matches
  real pixel speed even when the content is narrower than the viewport
