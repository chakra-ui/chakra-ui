---
"@chakra-ui/icon": major
---

Auto assign `key` when passing array of paths to `createIcon`

```jsx live=false
const HeartIcon = createIcon({
  displayName: "HeartIcon",
  path: [<path stroke="none" d="..." fill="none" />, <path d="..." />],
})
```
