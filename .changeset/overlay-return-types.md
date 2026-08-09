---
"@chakra-ui/react": minor
---

Improve `createOverlay` types. The overlay's return value is now typed through a
`TReturn` generic, so awaiting `open()` gives you the value passed to `close()`
instead of `any`. Pass it as the second type argument:

```ts
createOverlay<DialogProps, DialogResult>(Component)
```

`open()`'s props argument is now optional, and its return type is
`Promise<TReturn | undefined>` — code that relied on the previous `any` return
may need to handle `undefined`.
