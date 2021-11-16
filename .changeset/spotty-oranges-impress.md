---
"@chakra-ui/color-mode": patch
---

Fix Dark and Light mode tags from always rerendering children even if the child
is memoized. <LightMode> and <DarkMode> components are now memoized to prevent
unnecessary rendering of their child components.
