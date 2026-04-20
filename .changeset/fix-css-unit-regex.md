---
"@chakra-ui/react": patch
---

- **System**: Fix `isCssUnit` utility to reject malformed values like `1a5rem`
  and `1-5rem` by properly escaping the decimal point in the length regex.
