---
"@chakra-ui/react": minor
---

- **useMediaQuery**: Fix type signature to allow skipping the second argument

- **RadioCard**: Fix accessibility issue due to html structure

- **Slider**

  - Add support for `origin: end` to align the thumb to the end of the track.
  - Expose `thumbSize` as CSS variables in the root element. Can be useful for
    styling the slider.

- **Menu**

  - Added `onSelect` event to the `Menu.Item` component.
  - Ensure menu items have unique IDs to improve accessibility and HTML
    validation.
