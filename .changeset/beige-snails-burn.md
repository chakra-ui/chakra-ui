---
"@chakra-ui/number-input": patch
"@chakra-ui/docs": patch
---

feat(number-input): uses props of wrapping form-control

This change enables `NumberInput` to automatically derive various values from a
surrounding `FormControl` if found, similar to `Input` and `Select`.
