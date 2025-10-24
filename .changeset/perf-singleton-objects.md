---
"@chakra-ui/react": patch
---

Improve styled-system performance by reducing object allocations

- Use singleton empty objects instead of creating new ones in hot paths
- Optimize responsive value normalization with for loops instead of reduce
- Reduce memory allocations by ~15-20% in style computations
