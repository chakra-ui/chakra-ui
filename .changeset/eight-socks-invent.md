---
"@chakra-ui/form-control": patch
---

if an `aria-describedby` property is passed it will be joined with the id's from
helper-text and error-message instead of being overwritten.
