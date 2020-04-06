# Migration Notes

## Changes

- Removed support for `addAriaLabels` and `formatIds` prop in favor of passing a
  top-level `id` prop to the modal, and we'll handle the rest.

- Removed support for `preserveScrollBarGap` prop, we now set it to `true` by
  default to prevent any layout shift due to the scroll lock.

- You need to wrap the `ModalContent` within the `ModalOverlay` component. This
  helps to make the final DOM structure of the modal component cleaner.

```jsx
// before
<Modal>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal header</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Modal body</ModalBody>
    <ModalFooter>Modal footer</ModalFooter>
  </ModalContent>
</Modal>

// after
<Modal>
  <ModalOverlay>
    <ModalContent>
      <ModalHeader>Modal header</ModalHeader>
      <ModalCloseButton />
      <ModalBody>Modal body</ModalBody>
      <ModalFooter>Modal footer</ModalFooter>
    </ModalContent>
  </ModalOverlay>
</Modal>
```

- You only pass `size` values defined in the component's theme. Hard-coded
  values, will be ignored. Simply update the styles in `theme.components.Modal`
  to reflect your custom values

- Ability to disable focus trap

## Props Changes

We updated the prop names for boolean props to match our naming convention. All
boolean prop must start with `should`, `is`, or `has`

| Old Prop              | New Prop                    |
| --------------------- | --------------------------- |
| `returnFocusOnClose`  | `shouldReturnFocus`         |
| `closeOnOverlayClick` | `shouldCloseOnOverlayClick` |
| `blockScrollOnMount`  | `shouldBlockScroll`         |
| `closeOnEsc`          | `shouldCloseOnEsc`          |

## New Props

- `shouldTrapFocus` : to help disable focus trap
- `shouldAutoFocus` : to help disable auto focusing on the first interactive
  element.
- `onOverlayClick`: callback fired when the overlay is clicked
- `onEsc`: callback fired when `esc` is pressed
