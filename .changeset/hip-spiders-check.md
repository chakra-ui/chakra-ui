---
"@chakra-ui/react-use-outside-click": patch
"@chakra-ui/hooks": patch
---

Fix outside click detection in shadow doms by using `event.composedPath()`
instead of `event.target`
