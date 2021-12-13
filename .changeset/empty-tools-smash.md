---
"@chakra-ui/system": minor
"@chakra-ui/cli": minor
---

Use the feature flag `--strict-component-types` for `@chakra-ui/cli tokens` to
generate strict component type for the theming props `variant` and `size`.

```bash
chakra-cli tokens --strict-component-types
```

```tsx
// before
<Button variant="abc" />
// valid type but variant is not available in the theme

// after
<Button variant="abc" /> // invalid
// Type '"abc"' is not assignable to type '"link" | "outline" | "ghost" | "solid" | "unstyled" | undefined'.
```
