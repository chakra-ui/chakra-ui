# Migration Notes

There are no breaking changes to the Toast component but we've improved a couple
of things

- Removed `react-spring` as dependency in favor of `react-transition-group`
- Add support for duplicate toast prevention using `toast.isActive` method
- Add support to programmatically close one to all toasts using `toast.close` or
  `toast.closeAll` methods
- Add support to programmatically update a toast using `toast.update` method.
- Add Support for `onCloseComplete` prop, a callback function to run side
  effects after the toast has closed.
