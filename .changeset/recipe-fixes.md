---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

- **Checkbox Card, Radio Card, Slider**: Fix `cursor` token overrides in the
  theme being ignored.
- **Theme**: Use `tokens.cursor.disabled` for disabled elements instead of a
  hardcoded `not-allowed`, and `tokens.cursor.option` for Listbox items.
- **FileUpload**: Fix disabled delete triggers showing an active cursor and
  full-opacity icon.
- **ScrollArea**: Fix the vertical scrollbar showing when content only overflows
  horizontally, and vice versa.
