---
"@chakra-ui/react": patch
---

Bump `@ark-ui/react` to `5.36.0` (from `^5.34.1`)

- **Accordion**: Fix missing `data-focus` on item trigger props.

- **Carousel**: Fix issue with controlled carousel inside dialog, navigation
  transformed containers, scroll drift, and page sync with indicators.

- **ColorPicker**: Fix vertical slider orientation on pointer updates.

- **Combobox**: VoiceOver announces highlighted options on Apple devices via a
  live region

- **Dialog, Popover, HoverCard**: Add support for multiple triggers sharing one
  dialog instance.

- **Field**: `Field.Item` and `target` on `Field.Root` for multi-control fields
  (re-exported as `FieldItem` / `Field.Item`).

- **FileUpload**: Reject duplicate files with `FILE_EXISTS`.

- **Listbox**: `keyboardPriority` for Home/End and arrows; `highlightFirst`,
  `highlightLast`, `highlightNext`, `highlightPrevious`.

- **Menu**: `aria-expanded` when closed; submenu hover “diagonal” flash fix;
  multiple triggers.

- **PinInput**: Deletion and focus behavior, Home/End, `enterKeyHint`,
  `autoSubmit`, `sanitizeValue`.

- **Popover**: Add support for `translations`; `finalFocusEl` and `restoreFocus`
  props.

- **TagsInput**: `allowDuplicates`; `sanitizeValue`; `enterKeyHint` on mobile.
