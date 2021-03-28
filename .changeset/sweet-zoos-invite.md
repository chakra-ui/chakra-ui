---
"@chakra-ui/form-control": minor
---

Refactor `useFormControlProvider` to return prop getters `getHelpTextProps`,
`getErrorMessageProps`, and `getRootProps`.

Detect helper text and error message using `ref` callback instead of
`useLayoutEffect`

Create `useFormControlProps` to provide a way to get the resolved form control
props `isInvalid`, `isDisabled`, instead of HTML attributes. This will make it
easier to integrate with number-input, checkbox, and switch.

Update `aria-describedby` id to include `feedbackId` only when `isInvalid` is
`true`,
