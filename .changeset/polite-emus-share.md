---
"@chakra-ui/menu": patch
---

Menu props initialFocusRef not working. The way it works now, doesn't redraw on
focus. Solved using a custom hook useFocusOnShow.
