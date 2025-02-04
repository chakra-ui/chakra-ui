---
"@chakra-ui/react": patch
---

- **Avatar:** Add support for passing `name` to the `AvatarFallback` to render
  the initials. If no `name` or `children` is passed, it'll render either the
  initials or a fallback icon.

- **Hooks**: Add `useConst` and `useUpdateEffect` hooks from v2.
