---
"@chakra-ui/popover": patch
"@chakra-ui/menu": patch
---

Fix issue where the content of a lazy popover or menu gets unmounted before
(framer-motion) animation ends leading to a janky user experience.
