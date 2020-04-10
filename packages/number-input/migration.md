# Migration Notes

## Improvements 🚀

- Fixed issue where an error if the input value is greater than the `max` prop
  when focus is blurred `#584`

- Fixed issue where deleting sole digit sets value to 0 (which may be invalid)
  `#533`

- Fixed issue where input returns `NaN` value after multiple dots `#364`

- Fixed issue where passing `id` to the `NumberInput` and adding a `label` with
  `htmlFor` that points to that `id` doesn't focus the input `#515`

- Add example where consumers can format and parse number input values `#438`

## New ✨

- Export `useNumberInput` so you can build custom numberinput UI
