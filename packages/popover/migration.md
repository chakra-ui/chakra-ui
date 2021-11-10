# Migration Notes

- We've deprecated support for `trigger` prop. We believe the popover should
  only be triggered on click.

  If you'd like to trigger a popover on hover, then you might want to use a
  tooltip component, or the `useTooltip` hook.

## Changes

- `returnFocusOnClose` has been changed to just `returnFocus` to keep it
  concise.

- `autoFocus` prop to allow users control whether the popover should
  automatically receive focus when it opens.

- `usePortal` prop has been deprecated in favor of composing the `Portal`
  component with the `PopoverContent`
