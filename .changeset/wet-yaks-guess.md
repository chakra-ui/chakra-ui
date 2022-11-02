---
"@chakra-ui/css-reset": patch
---

fix(css-reset): Use dvh unit if supported

This allows the user agent to dynamically adapt the height of a Modal, depending on what parts of the UI (e.g. address bar) are visible.
