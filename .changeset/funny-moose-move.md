---
"@chakra-ui/toast": patch
---

- Fix issue where toast portal are rendered in test even if they are not used.
- Add support for `portalProps` in toast provider. When using with the
  `ChakraProvider`, this can be configure in the `toastOptions`
