---
"@chakra-ui/media-query": patch
---

Fix an issue where the `useMediaQuery` was not updating the array of booleans
correctly when resizing the viewport.

It also removes deprecated calls `addListener` and `removeListener` in favor of
the recommended `addEventListener` and `removeEventListener` calls.
