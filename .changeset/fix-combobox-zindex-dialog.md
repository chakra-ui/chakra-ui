---
"@chakra-ui/react": patch
---

fix: combobox dropdown appears above dialog modals

Updated combobox content z-index from 'dropdown' (1000) to 'popover' (1500) to ensure dropdown options are visible when used inside dialog components (z-index 1400).