---
"@chakra-ui/react": patch
---

- **System / Global CSS**: Fix an issue where responsive array values in
  `globalCss` selector rules (for example `#id` or `.class`) were serialized
  incorrectly instead of generating responsive breakpoint styles.
