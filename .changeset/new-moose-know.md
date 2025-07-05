---
"@chakra-ui/react": patch
---

- **Clipboard**: Fix issue where `clipboardAnatomy` was not exported from
  `@chakra-ui/react/anatomy`

- **Combobox**
  - Expose `reason` to `onOpenChange` and `onInputValueChange` callbacks
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **Toast**: Fix issue where toast `title` or `description` could not accept
  React element

- **Progress**: Improve `valueAsString` formatting

- **Select**
  - Select highlighted item only if it exists in the collection
  - Expose `api.clearHighlightedValue` function to clear highlighted value

- **ClientOnly**: Support `children` as a function
