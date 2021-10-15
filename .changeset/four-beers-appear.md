---
"@chakra-ui/system": patch
---

Fixed a bug in `useToken` where it wasn't possible to resolve some tokens which
contain dots like `useToken('space','1.5')`. (see #4834)
