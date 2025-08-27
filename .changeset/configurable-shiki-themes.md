---
"@chakra-ui/react": patch
---

**CodeBlock**: Add configurable theme support and sync loading for Shiki adapter

- **Theme configuration is now required** - The `theme` property must be
  explicitly provided to `createShikiAdapter`
- **Removed hard-coded theme fallbacks** - Missing themes now throw descriptive
  errors
- **Optional sync loading** with `loadSync` method for better performance

```typescript
// Before
const adapter = createShikiAdapter({
  async load() { /* ... */ },
})

// After
const adapter = createShikiAdapter({
  async load() { /* ... */ },
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
})
```
