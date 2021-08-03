---
"@chakra-ui/system": patch
---

Fix type definitions for `apply` prop.

The `apply` prop supports responsive styles:
```tsx
// Before: type error, expects `string` for `apply`
<Text apply={{ sm: 'styles.h3', lg: 'styles.h4' }}>

// After: no type error, expects `ResponsiveValue<string>` for `apply`
<Text apply={{ sm: 'styles.h3', lg: 'styles.h4' }}>
```
