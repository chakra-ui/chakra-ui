# Migration Notes

## Changes

- 🚨BREAKING: We changed the `modal` component to `dialog` so now you'll have to
  rename all imports from `Modal*` to `Dialog*`

- Removed support for `addAriaLabels` and `formatIds` prop in favor of passing a
  top-level `id` to the modal, and we'll handle the rest.

- Removed support for `preserveScrollBarGap` prop, we now set it to `true` by
  default to prevent any layout shift due to the scroll lock.

- You need to wrap the `DialogContent` within the `DialogOverlay` component.
  This helps to make the final DOM structure of the dialog component cleaner.

```jsx
// before
<Dialog>
  <DialogOverlay />
  <DialogContent>
    <DialogHeader>Dialog header</DialogHeader>
    <DialogCloseButton />
    <DialogBody>Dialog body</DialogBody>
    <DialogFooter>Dialog footer</DialogFooter>
  </DialogContent>
</Dialog>

// after
<Dialog>
  <DialogOverlay>
    <DialogContent>
      <DialogHeader>Dialog header</DialogHeader>
      <DialogCloseButton />
      <DialogBody>Dialog body</DialogBody>
      <DialogFooter>Dialog footer</DialogFooter>
    </DialogContent>
  </DialogOverlay>
</Dialog>
```

- You only pass `size` values defined in the component's theme. Hard-coded
  values, will be ignored. Simply update the styles in `theme.components.Dialog`
  to reflect your custom values
