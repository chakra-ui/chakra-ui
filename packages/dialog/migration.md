# Migration Notes

## Changes

- 🚨BREAKING: We changed the `modal` component to `dialog` so now you'll have to
  rename all imports from `Modal*` to `Dialog*`

- Removed support for `addAriaLabels` and `formatIds` prop in favor of passing a
  top-level `id` to the modal, and we'll handle the rest.

- Removed support for `preserveScrollBarGap` prop, we now set it to `true` by
  default to prevent any layout shift due to the scroll lock.
