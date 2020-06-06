# Migration Notes

## Changes

- Support for the `colorScheme` prop has been deprecated. Use `colorScheme` prop
  instead.

```jsx
// before
<Checkbox colorScheme="blue">Option</Checkbox>

// after
<Checkbox colorScheme="blue">Option</Checkbox>
```

- Support for the `isFullWidth` prop has been deprecated. The Checkbox takes up
  the width of the parent by default.

- To allow for better layout composition, the `CheckboxGroup` component no
  longer manages the layout of the radio buttons.

- You can only pass `size`, `variant`, and `colorScheme` in addition to typical
  checbox group's props which are used to control the states of the checkbox.

```jsx
// before
<CheckboxGroup isInline spacing="40px" defaultValue={["one", "two"]}>
  <Checkbox value="one">One</Checkbox>
  <Checkbox value="two">Two</Checkbox>
  <Checkbox value="three">Three</Checkbox>
</CheckboxGroup>

// after
<CheckboxGroup defaultValue={["one", "two"]}>
  <Stack spacing="40px">
    <Checkbox value="one">One</Checkbox>
    <Checkbox value="two">Two</Checkbox>
    <Checkbox value="three">Three</Checkbox>
  </Stack>
</CheckboxGroup>
```

We believe a checkbox group's layout should be managed 100% by the context it's
used it, or based on design requirements. The group can stacked (`Stack`),
placed in a grid (`SimpleGrid`) or made to wrap automatically (`Wrap`).

## Features

- Support for `iconColor` prop to customize the color of the check icon

```jsx
<Checkbox iconColor="blue.500">Option</Checkbox>
```

- Support for `iconSize` prop to customize the size of the check icon

```jsx
<Checkbox iconSize="1rem">Option</Checkbox>
```

- Support for `spacing` prop to customize the spacing between the checkbox and
  label text

```jsx
<Checkbox spacing="1rem">Option</Checkbox>
```

- The `useCheckbox` hook is exported with state and focus management logic for
  use in creating tailor-made checkbox component for your application

* The `useCheckboxGroup` hook is exported with state management logic for use in
  creating tailor-made checkbox group component for your application
