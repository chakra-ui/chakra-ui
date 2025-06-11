---
"@chakra-ui/react": patch
---

- **File Upload**: Prevented `undefined` in `acceptedFiles` when no files
  accepted

- **Select**: Fixed issue where highlighted item could be cleared when
  navigating up/down the list with keyboard

- **Tabs**: Fixed issue where tabs with links should not trigger tab change upon
  cmd/middle click

- **Menu**: Fixed issue where `Menu.ItemText` could not be used with `Menu.Item`
