# Migration Notes

## Changes

- `FormControl` now exposes most of it is internal functions and hooks so you
  can leverage in building custom components.

- Now export `useFormControl`, the hook you can consume in any custom form
  elements you build.

- We've improved the accessibility of the `FormControl` component. Here are the
  changes:

  - `id` passed to the form control will be passed to the form input directly
  - `FormLabel` will have `htmlFor` that points to the `id` of the form input
  - If you render `FormErrorMessage`, it'll add `aria-describedby` and
    `aria-invalid` to the form input.
  - If you render `FormHelperText`, it'll add/extend `aria-describedby` to the
    form input.
  - If you add the `isDisabled`, `isRequired`, `isReadOnly` prop to
    `FormControl`, it'll cascade across all components

- `FormLabel` are now aware of the `disabled`, `focused` and `error` state of
  the form input, this helps you style the label accordingly using using
  `_disabled`, `_focus`, and `_invalid` style props.

- If you render `FormErrorMessage`, and `isInvalid` is false or undefined, the
  `FormErrorMessage` won't be visible, the only way to make it visible is by
  passing `isInvalid` and setting it to `true`
