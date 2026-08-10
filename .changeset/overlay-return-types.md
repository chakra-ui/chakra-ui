---
"@chakra-ui/react": minor
---

**createOverlay**: Add a `TReturn` generic so awaiting `open()` returns the
value passed to `close()` instead of `any`.

```ts
interface DialogResult {
  message: string
}

const dialog = createOverlay<DialogProps, DialogResult>(Component)

const result = await dialog.open("id", props)
if (result) {
  console.log(result.message)
}
```

`TReturn` defaults to `unknown`, so untyped `open()` calls may need narrowing
now. The result can also be `undefined`, since `close(id, value)` doesn't
require a value.
