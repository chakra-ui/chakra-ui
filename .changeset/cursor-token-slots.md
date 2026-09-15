---
"@chakra-ui/react": patch
"@chakra-ui/panda-preset": patch
---

Fix Checkbox Card, Radio Card, and Slider ignoring their cursor tokens, so
overriding `tokens.cursor.checkbox`, `radio`, or `slider` in the theme did
nothing. Disabled elements now use `tokens.cursor.disabled` instead of a
hardcoded `not-allowed`, and Listbox items use `tokens.cursor.option`.
