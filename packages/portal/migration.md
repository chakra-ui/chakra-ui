# Migration Notes

## Changes

- Now have a `PortalManager`, we use this portal manager a container for all
  portals. This helps us manage the stacking of portaled elements without the
  need for z-index.

- Removed `isDisabled` prop. If you want to use a Portal, then there's no point
  having this prop. Can be replaced within your component with this.

  ```jsx
  const Component = prop.isDisabled ? React.Fragment : Portal
  ```

- Added `onMount` and `onUnmount` callbacks

- `container` prop is now a function that returns an `HTMLElement`
