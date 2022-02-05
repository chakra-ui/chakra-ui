---
"@chakra-ui/tooltip": patch
---

Fix an issue where arrow tooltip background color only consider bg props. It
considers `bg`, `background`, `bgColor` and `backgroundColor` now.
