---
"@chakra-ui/react": patch
---

- **Checkbox**
  - Fix performance issue where all checkboxes and radios would rerender
    whenever trackFocusVisible modality changed, e.g. click into an input then
    type
  - Fix regression where checkbox group doesn't work when wrapped in
    `FormControl`
