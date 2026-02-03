---
"@chakra-ui/react": patch
---

- **Styled System**: Fixed backdrop blur not applying when using
  `backdropFilter="auto"` with `backdropBlur`. This now works as expected:

```tsx
<Dialog.Backdrop backdropFilter="auto" backdropBlur="md" />
```
