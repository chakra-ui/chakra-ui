---
"@chakra-ui/styled-system": patch
"@chakra-ui/utils": patch
"@chakra-ui/dom-utils": patch
---

Update disabled selector to use state selector `:disabled`, instead of `[disabled]` attribute selector.
This is useful when an editable element is wrapped within `<fieldset disabled>`
