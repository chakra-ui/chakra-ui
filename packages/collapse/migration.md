# Migration Notes

## Changes

- `react-animate-height` has been replaced with the `Transition` package from
  Chakra UI, which is built on top of
  [`react-transition-group`](https://reactcommunity.org/react-transition-group/).
  As a result, the following props of the `Collapse` component have been
  deprecated: `endingHeight`, `onAnimationEnd` and `onAnimationStart` and the
  following props now exist on the `Collapse` component:

- A `transition` prop which is used to apply CSS transition for the collapse
  animation. It has a default value of
  `height 200ms ease, opacity 200ms ease, transform 200ms ease` and it can be
  customized to suit your UI needs.

- A `config` prop which is passed to style the appear, entered and exiting
  transition states of the Collapse.

- Collapse now has BEM structured `className` attached to the DOM nodes to make
  it easier to spot the components in the "inspector".

## Note

- The `startingHeight` prop is passed directly to the `Transition` component
  which uses the `react-transition-group` package under the hood, hence you
  won't be able to pass Chakra UI's theme values as a value for the prop.
