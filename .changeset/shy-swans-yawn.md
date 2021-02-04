---
"@chakra-ui/color-mode": patch
---

Fix issue where reading from localStorage maybe fail due to several reasons (SecurityError, Uncaught DOMException, TypeError, etc.)
