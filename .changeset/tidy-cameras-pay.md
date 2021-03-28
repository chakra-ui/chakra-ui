---
"@chakra-ui/number-input": patch
---

### useNumberInput

- Forward `aria-*` props to the input element.
- Fix issue where `onChange` was called on mount.
- Fix issue where `onBlur` was called twice.
- Memoize all callback props `onFocus`, `onBlur`, `getAriaValueText`
- Refactor implicit `useFormControl` logic to be called from `NumberInput`
  instead.
- Call `setFocused.on` with `ReactDOM.flushSync` to prevent concurrent mode
  issue where setting state in `onFocus` affects `onChange` event handler.
