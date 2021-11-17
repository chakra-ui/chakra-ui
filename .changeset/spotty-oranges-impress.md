---
"@chakra-ui/color-mode": patch
---

Fixed issue where `DarkMode` and `LightMode` elements rerenders their children
even if the child is memoized.

`<LightMode>` and `<DarkMode>` components are now memoized to prevent
unnecessary rendering of their child components.
