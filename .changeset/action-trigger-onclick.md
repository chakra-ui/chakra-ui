---
"@chakra-ui/react": patch
---

- Fix `Dialog.ActionTrigger` and `Drawer.ActionTrigger` ignoring the `onClick`
  handler passed to them. The handler now runs before the dialog closes
