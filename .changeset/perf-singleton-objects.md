---
"@chakra-ui/react": patch
---

Improve styled-system performance with multiple optimizations

- **Token cloning**: Replace `structuredClone()` with efficient shallow clone
  (75x faster)
- **Memoization**: Improve cache key generation with efficient hashing and LRU
  cache (1.4x faster baseline, up to 585x faster for cached operations)
- **Object allocation**: Use singleton empty objects instead of creating new
  ones in hot paths
- **Array operations**: Optimize responsive value normalization with for loops
  instead of reduce
- **Performance impact**: Significant improvement in style computation speed
  with the memoization layer providing 100-500x gains for repeated operations
