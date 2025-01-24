---
"@chakra-ui/react": minor
---

- **Native Select**

  - Fix issue where `disabled` and `invalid` props were not being passed to the
    `NativeSelectField` component.
  - Persist error focus ring when `invalid` prop is set.
  - Fix issue where native select isn't readable in dark mode for Windows/Linux
    devices.

- **[New] Loader:** Add new `Loader` and `LoaderOverlay` components.

- **[New] Button Group:** Add new `ButtonGroup` component similar to v2 for
  grouping similar buttons.

- **Button:** Add `loading` and `loadingText` props to the `Button` component.

- **Snippets / Menu:** Refactor checkbox item to fix rendering

- **Snippets / Button:** Removed the button snippet in favor of built-in
  component.
