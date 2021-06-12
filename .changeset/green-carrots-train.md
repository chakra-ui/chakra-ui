---
"@chakra-ui/menu": patch
---

Resolved an issue where `MenuList` didn't respect the theme `direction`. For example, if `direction` is `rtl`, `top-right` will now become `top-left`.
