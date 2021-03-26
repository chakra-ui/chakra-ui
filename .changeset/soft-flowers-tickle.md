---
"@chakra-ui/form-control": patch
---

Fix concurrent mode issue with setting state in focus event handler. We use
`withFlushSync` helper to achieve this.
