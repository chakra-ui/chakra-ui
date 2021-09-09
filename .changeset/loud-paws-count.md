---
"@chakra-ui/avatar": patch
---

Fix issue where avatar blinks during API call due to its fallback logic. You can
disable the fallback logic by setting `ignoreFallback`, just like you can with
the `Image` component
