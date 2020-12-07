---
"@chakra-ui/pin-input": minor
---

- Move input props logic to parent hook and expose prop-getter `getInputProps`.
  This helps to co-locate the state logic for easier debugging
- Added support for alpha-numeric and secret values.
- Added `type` prop which can be either `alphanumeric` or `number`
- Added `mask` prop to hide input value similar to `<input type='password' />`

```jsx
<PinInput type="alphanumeric" mask>
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>
```
