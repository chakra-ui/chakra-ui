---
"@chakra-ui/number-input": patch
---

## 🐛 Bug Fix

We've made it possible to override the `type` and `pattern` props passed to
`NumberInputField` or `getInputProps`

```jsx
<NumberInput>
  <NumberInputField type="number" pattern="-?[0-9]*" />
</NumberInput>
```
