---
"@chakra-ui/checkbox": minor
---

- Add `getRootProps` to usecheckbox hook to manage props passed to checkbox
  container.

- Forward `onFocus` and `onBlur` props to the input element for better
  integration with form libraries.

- Ensure the checkbox works when the root element is not `label`. This helps to
  fix the current accessibility issues with the `Switch` component.
