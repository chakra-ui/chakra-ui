---
"@chakra-ui/react": minor
---

- **System**: Allow `undefined` for optional properties in CSS and recipe types

- **Color Picker**: Fixed issue where value change end event is invoked when
  committing via an input.

- **Toast**: Fixed issue where calling `toast.remove()` without an id shows a
  TypeScript error.

- **Field**: Fixed issue where helper text and error text could not be detected
  in shadow DOM environments.

- **Slider**

  - Fixed issue where `minStepsBetweenThumbs` isn't computed correctly when
    interacting with pointer or keyboard.
  - Fixed issue where `Shift` + `ArrowRight` set value to `0` instead of `max`
    when step is too large (e.g. `20`).
  - Fixed issue where `onValueChangeEnd` doesn't return the latest value when
    dragging very fast.
  - Fixed issue where slider could throw a error when rendered in an popover or
    dialog.

- **File Upload**: Added support for transforming uploaded files via
  `transformFiles` context property.

- **Combobox**: Fixed issue where `onInputValueChange` doesn't get called when
  `autoFocus` is set to `true`

- **Pin Input**: Fixed issue where input padding could cause clipping of the
  text when `fontSize` is increased.
