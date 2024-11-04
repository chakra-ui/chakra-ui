---
"@chakra-ui/react": minor
---

- **System:** Fix issue where using `as` prop with logic based components
  doesn't work as expected.

- **DataList:** Add support for `bold` variant.

- **Button:** Tweak the horizontal padding when size is `sm`.

- **Snippets**

  - Slider: Add `showValue` prop to render the text value of the slider.
  - Select: Add `HiddenSelect` to ensure it works in form submissions.

- **Toggle:** Add `Toggle` component for toggling between two states. It
  composes the `Button` component.

- **Select**
  - Fix type inference is lost when using `SelectRoot` component from snippet
  - Fix issue where form data is not populated when using native form element
