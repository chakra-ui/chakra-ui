---
"@chakra-ui/react": patch
---

**Theme / KeyFrames**: Add CSS variable overrides for slide keyframe distances
(`slide-from-*` and `slide-to-*`), for example:

```tsx
<Box
  css={{
    animation: "slide-from-top 200ms ease-out",
    "--slide-from-top-distance": "1rem",
  }}
/>
```
