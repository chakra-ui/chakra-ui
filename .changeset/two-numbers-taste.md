---
"@chakra-ui/react": minor
---

- **Skeleton** Bring back `SkeletonCircle` and `SkeletonText` components.

- **Switch**

  - Transition background color when checked
  - Set the default `children` for `Switch.Control` to `Switch.Thumb` to reduce
    LOC for common use cases.

- **Checkbox**

  - Set the default `children` for `Checkbox.Control` to `Checkbox.Indicator` to
    reduce LOC for common use cases.

- **NumberInput**

  - Set the default `children` for `NumberInput.Control` to
    `NumberInput.IncrementTrigger` and `NumberInput.DecrementTrigger` to reduce
    LOC for common use cases.

- **QrCode**

  - Set the `QrCode.Frame` component to `QrCode.Pattern` to reduce LOC for
    common use cases.

- **RatingGroup**

  - Set the default `children` for `RatingGroup.Control` to the array of
    `RatingGroup.Item` components to reduce LOC for common use cases.

- **Slider**

  - Add `Slider.Marks` component to render marks on the slider track. This is a
    closed composition of `Slider.MarkerGroup` and `Slider.Marker` to reduce LOC
    for common use cases.
  - Add `Slider.Thumbs` component to render thumbs on the slider track. This is
    a closed composition of `Slider.Thumb` to reduce LOC for common use cases.

- **PinInput**

  - Add support for `attached` variant prop to render a pin input with attached
    inputs. This removes the need for the `Group` component to wrap the inputs.
