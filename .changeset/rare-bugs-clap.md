---
"@chakra-ui/react": patch
---

Fix performance issue where all checkboxes and radios would rerender whenever
trackFocusVisible modality changed, e.g. click into an input then type
