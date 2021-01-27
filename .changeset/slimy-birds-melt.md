---
"@chakra-ui/checkbox": patch
---

Resolved an issue where `Checkbox` used inside `CheckboxGroup` would call the
group's `onChange` handler twice
