---
"@chakra-ui/cli": patch
---

When the [Chakra CLI](https://chakra-ui.com/docs/theming/advanced#theme-typings)
fails to generate theme typings, it now exits with a status code of `1`. This
resolves an issue where failures exited with a success status code.
