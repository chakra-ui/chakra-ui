# Migration Notes

- We've deprecated support for `trigger` prop. We believe the popover should
  only be triggered on click.

  If you'd like to trigger a popover on hover, then you might want to use a
  tooltip component, or the `useTooltip` hook.
