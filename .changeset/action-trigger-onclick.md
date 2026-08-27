---
"@chakra-ui/react": patch
---

- Fix `Dialog.ActionTrigger` and `Drawer.ActionTrigger` discarding a caller's
  `onClick`. The internal close handler was declared after the props spread, so
  it replaced the user handler instead of running alongside it
