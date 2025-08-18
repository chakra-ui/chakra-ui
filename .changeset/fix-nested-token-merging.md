---
"@chakra-ui/react": patch
---

Fix nested token override issue during theme merging

```tsx
const defaultConfig = {
  theme: {
    tokens: {
      colors: {
        black: { value: "#000000" },
      },
    },
  },
}

const userConfig = {
  theme: {
    tokens: {
      colors: {
        black: {
          100: { value: "#EE0F0F" },
          200: { value: "#CC0C0C" },
        },
      },
    },
  },
}

// Before: This would return undefined
const system = createSystem(defaultConfig, userConfig)
system.token("colors.black.100") // undefined

// After: This will return merged correctly, preserving the default value
system.token("colors.black.100") // "#EE0F0F"
system.token("colors.black.200") // "#CC0C0C"
system.token("colors.black") // "#000000"
```
