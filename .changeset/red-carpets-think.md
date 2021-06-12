---
"@chakra-ui/utils": minor
---

Added `flipDirection` utility function, which flips the provided `placement`
value. This is useful for flipping a direction for RTL support.

```tsx
flipDirection("left") // "right"
flipDirection("right") // "left"
flipDirection("start") // "end"
flipDirection("end") // "start"
```
