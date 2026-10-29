---
"@chakra-ui/react": patch
---

Update Ark UI to v5.40.0.

- **Combobox**: Add a `loading` prop that sets `aria-busy` on the list and holds
  back the empty state while loading. The content stays visible while loading,
  so a loading indicator shows even when there are no items.
- **Combobox, Menu**: Add `modifiers` to the `onSelect` details, and call
  `onSelect` when a link item is modifier-clicked.
- **Pagination**: Items and triggers render as anchors when `type="link"`.
- **Pin Input**: Fix keystrokes going into the hidden input after a blocked
  native `required` validation. Focus now moves to a visible input.
- **Steps**: Add `data-current`, `data-complete` and `data-incomplete` to the
  item, and move `aria-current="step"` to the trigger.
- **Field**: Fix helper and error text not being announced on Select, Tags
  Input, Color Picker, File Upload, Rating Group and Pin Input.
- **File Upload**: Fix `Field.Root readOnly` not making the file upload
  read-only.
- **Toast**: Move focus to the next toast when a focused toast is dismissed.
- **Overlays**: Fix <kbd>Escape</kbd> not closing content right after it opens,
  and floating content flashing at the top-left on first open.
