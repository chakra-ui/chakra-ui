---
"@chakra-ui/image": patch
---

Added `fallbackStrategies` for `Image` to provide different behaviors when to
display/load the `fallback`

- `beforeLoadOrError` is the default strategy and previous behaviour of `Image`
  which displays/loads the placeholder when `loading` the `src`/`srcSet` and on
  `error`
- `onError` strategy displays/loads the fallback image only on `error`
