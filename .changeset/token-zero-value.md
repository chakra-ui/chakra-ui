---
"@chakra-ui/react": patch
---

Fix `system.token()` and `useToken()` returning the fallback for tokens whose
value is `0`. The lookup used `||` instead of `??`, so
`useToken("zIndex", "base")` returned the string `"base"` instead of `0`, while
`tokens.getVar()` already used `??`.
