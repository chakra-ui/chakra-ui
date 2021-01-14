---
"@chakra-ui/popper": minor
"@chakra-ui/menu": patch
---

Added `enabled` property to `usePopper`. Popper won't be updated while it is set
to `false`.

`Menu` now uses this option to not update its position while it's closed.
