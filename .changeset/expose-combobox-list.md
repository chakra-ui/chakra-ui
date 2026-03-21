---
"@chakra-ui/react": patch
---

Fix export gaps for Ark UI components:

- **Select**: Expose `Select.List` component (for virtualization support)
- **Combobox**: Export `ComboboxSelectionDetails` type (as
  `Combobox.SelectionDetails` in namespace)
- **Listbox**: Export `ListboxScrollToIndexDetails`, `ListboxSelectionDetails`,
  `ListboxSelectionMode` types (as `Listbox.ScrollToIndexDetails`,
  `Listbox.SelectionDetails`, `Listbox.SelectionMode` in namespace)
- **Menu**: Export `MenuValueChangeDetails` type (as `Menu.ValueChangeDetails`
  in namespace)
