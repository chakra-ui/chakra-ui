# Migration Notes

## Features

- `VisuallyHidden` now supports the `as` prop and can infer the types from the
  element type passed.

- We now export `VisuallyHiddenInput` to provider full TS types for hidden input
  types, we noticed this is a common pattern

- We also export the `visuallyHiddenStyle` in case you need it in any scenario
  not covered by `VisuallyHidden`

- Added some test ✨
