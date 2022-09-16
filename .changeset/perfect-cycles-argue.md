---
"@chakra-ui/tooltip": patch
---

Fixed issue where disabled tooltip triggers require an extra wrapper (via
`shouldWrapChildren). This was fixed by switching from mouse events to pointer
events
