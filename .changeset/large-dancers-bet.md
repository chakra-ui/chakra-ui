---
"@chakra-ui/react": patch
---

Fix: normalize nested token overrides when merging default theme

When merging a custom token into the default theme, token normalization could
stop at the category level (for example `colors`) and prevent promoting flat
tokens to `DEFAULT`. This change updates the merge logic so adding nested
overrides like `colors.black.100` correctly moves the original `colors.black`
value to `DEFAULT` and resolves nested tokens.

Fixes: #10800
