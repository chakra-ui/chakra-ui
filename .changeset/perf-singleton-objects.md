---
"@chakra-ui/react": patch
---

Improve styled-system performance with multiple optimizations

- **Token cloning**: Replace `structuredClone()` with efficient shallow clone
  (75x faster)
- **Object allocation**: Use singleton empty objects instead of creating new
  ones in hot paths
- **Array operations**: Optimize responsive value normalization with for loops
  instead of reduce
- **Performance impact**: Significant improvement in style computation speed,
  especially for conditional tokens
