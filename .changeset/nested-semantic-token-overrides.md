---
"@chakra-ui/react": patch
---

Fix a nested `theme.semanticTokens` override silently deleting the sibling
semantic tokens it nests under. Setting `semanticTokens.colors.red` to a single
value dropped `red.solid`, `red.fg`, `red.subtle` and the rest of the palette,
which broke `colorPalette="red"` for every component. `theme.tokens` already
handled this shape, and `theme.semanticTokens` now does too.

In both `theme.tokens` and `theme.semanticTokens`, a later top-level `value`
also no longer loses to an earlier `DEFAULT` entry, so overriding a shipped
token such as `semanticTokens.colors.bg` takes effect.
