---
"@chakra-ui/react": patch
---

Update Ark UI to v5.39.3.

- **Field**: Fix `Field.ErrorText` not being announced by VoiceOver and
  Narrator. It is now linked to the input via `aria-describedby` instead of
  `aria-errormessage`, so tests asserting `toHaveAccessibleErrorMessage` should
  use `toHaveAccessibleDescription`.
- **Popover**: `Popover.Title` now renders an `h2` instead of a `div`, and its
  ref is typed as `HTMLHeadingElement`.
- **Listbox, Toggle**: `Listbox.ItemText` and `Toggle.Indicator` now render a
  `span` instead of a `div`, and their refs are typed as `HTMLSpanElement`.
- **Dialog, Drawer, Popover, Color Picker, Floating Panel**: `initialFocusEl`
  can now return `false` to open without moving focus.
- **Pagination**: Add `api.type` and `api.getPageUrl(page)`.
- **Presence**: Fix elements with an exit animation staying mounted forever in
  Safari, invisible but still blocking clicks.
- **Popover**: Fix `autoFocus={false}` being ignored for modal popovers.
- **Popover, Select, Menu**: Fix a stylesheet `z-index` on the positioner being
  ignored.
- **Floating Panel**: Fix `strategy="absolute"` placing the panel outside its
  boundary, and the panel not following its boundary when an ancestor scrolls.
- **Listbox**: Fix Shift+click range selection anchoring on the highlighted item
  instead of the clicked one.
- **Tabs**: Fix programmatic tab selection triggering link navigation.
- **Toaster**: Fix `dir` and `getRootNode` being ignored.
- **Progress**: Fix the formatter not updating when `formatOptions` changes.
- **Splitter**: Fix slow dragging in large documents.
- Fix inline style values containing semicolons, such as data URLs, being cut
  off when props merge.
- Fix an `Illegal invocation` error on setup when a tool like Storybook has
  replaced `HTMLElement.prototype.focus`.
