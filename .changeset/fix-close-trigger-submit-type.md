---
"@chakra-ui/react": patch
---

- Fix `Tag.CloseTrigger`, `ActionBar.SelectionTrigger`, `Dialog.ActionTrigger`,
  `Drawer.ActionTrigger` missing `type="button"`, causing unintended form
  submission when used inside a `<form>`
