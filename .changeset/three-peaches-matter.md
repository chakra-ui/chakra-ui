---
"@chakra-ui/media-query": patch
---

This fixes an issue where the useMediaQuery was not updating the array of
statuses correctly when resizing the view. It also removes deprecated calls
addListener and removeListener in favor of the recommended addEventListener and
removeEventListener calls.
