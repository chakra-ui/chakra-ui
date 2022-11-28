---
"@chakra-ui/styled-system": minor
"@chakra-ui/cli": minor
---

Add the flag `--strict-token-types` for `@chakra-ui/cli tokens` to generate
strict types for theme tokens (e.g. color, spacing)

```bash
chakra-cli tokens --strict-token-types
```

```tsx live=false
// before
<Box padding="abc" />
// valid type, but "abc" is not available in the theme

// after
<Box padding="abc" /> // invalid
// Type '"abc"' is not assignable to type '"1" | "2" | ... | undefined'.
```
