---
"@chakra-ui/utils": minor
---

Added `getPlacementForThemeDirection` utility function for flipping `placement`
when `direction` is `rtl`.

```tsx
getPlacementForThemeDirection("ltr", "left") // left
getPlacementForThemeDirection("ltr", "right") // right

getPlacementForThemeDirection("rtl", "left") // right
getPlacementForThemeDirection("rtl", "right") // left
```
