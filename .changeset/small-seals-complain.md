---
"@chakra-ui/menu": patch
---

Fix menu button click detection in shadow doms by using `event.composedPath()`
instead of `event.target`
