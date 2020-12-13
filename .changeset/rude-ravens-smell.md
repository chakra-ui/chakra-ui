---
"@chakra-ui/skeleton": minor
---

## 🐛 Bug Fix

Prevent content from fading-in on initial render when isLoaded is already true (#2644)

For example, the content would appear without the fade-in animation in this case:
```jsx
<Skeleton isLoaded={true}>
  <h1>My Content</h1>
</Skeleton>
```
