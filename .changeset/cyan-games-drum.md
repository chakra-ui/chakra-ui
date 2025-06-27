---
"@chakra-ui/react": patch
---

- **Popover**: Fixed issue where `onOpenChange` could be called twice when
  controlled

- **Combobox**
  - Fixed issue where `onInputValueChange` could be called twice when selecting
    an item
  - Fixed issue where combobox with `allowCustomValue: true` used within in a
    form requires two enter keypress to submit

- **Progress**
  - Fix issue where setting orientation to `vertical` don't work
  - Fix issue where setting `defaultValue` to `null` doesn't show indeterminate
    state

- **Toast**: Fix issue where app crashes when `toaster.promise` is called
  without loading option. The `loading` option is now required. A warning will
  be logged if it is not provided

- **Combobox, Select, Listbox**: Fix issue where rehydrating `defaultValue` or
  `value` after fetching items doesn't update the `valueAsString`
