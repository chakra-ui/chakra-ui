---
"@chakra-ui/react": minor
---

Add support for merging multiple system configs into one within `createSystem`

Before:

```tsx
const config = mergeConfigs(defaultConfig, customConfig)
export const system = createSystem(config)
```

After:

```tsx
const system = createSystem(defaultConfig, customConfig)
```
