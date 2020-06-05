# Migration Notes

## Changes

- `returnFocusOnClose` has been changed to just `returnFocus` to keep it
  concise.

- `autoFocus` prop to allow users control whether the popover should
  automatically receive focus when it opens.

- `usePortal` prop has been deprecated in favor of composing the `Portal`
  component with the `PopoverContent`
