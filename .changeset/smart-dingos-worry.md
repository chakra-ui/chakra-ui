---
"@chakra-ui/popper": patch
---

Remove default `[]` value for modifiers and moved it into `createPopper`
definition. This allows memoized modifiers to work correctly in user-land when
used with `useCallback`.
