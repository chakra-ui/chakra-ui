---
"@chakra-ui/react": patch
---

Fix an issue where responsive array values in `globalCss` selector rules (for
example `#id` or `.class`) were serialized incorrectly instead of generating
responsive breakpoint styles.
