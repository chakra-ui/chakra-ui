# Migration Notes

- When using `InputAddon`, you no longer need to pass border radius properties
  to the `Input`, `InputGroup` will smartly detect the addon and apply the
  necessary border-radius styles to the input.

- `Input` and `InputAddon` styles/variants can be changed globally from the
  theme.

- Input now has BEM structured `className` attached to the DOM nodes to make it
  easier to spot the components in the "inspector" .

- Input now uses `paddingY` and `minHeight` instead of `height` for it is block
  height
