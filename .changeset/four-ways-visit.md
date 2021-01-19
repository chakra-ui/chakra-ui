---
"@chakra-ui/pin-input": minor
---

Added an `otp` flag to `PinInput` that sets the `autoComplete` value of
`PinInputField` to `"one-time-code"`.

```jsx
<PinInput otp>
  <PinInputField />
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>
```
