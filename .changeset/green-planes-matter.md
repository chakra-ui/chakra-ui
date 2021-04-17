---
"@chakra-ui/button": minor
---

Added `spinnerPlacement` prop to allow changing the spinner placement for the
button when `isLoading` is `true`. Spinner placement can be either `start` or
`end`

```jsx live=false
<Button isLoading spinnerPlacement="end">
  Click me
</Button>
```
