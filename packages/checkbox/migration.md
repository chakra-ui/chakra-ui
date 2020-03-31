# Migration Notes

## Changes

Checkbox

- Support for the `variantColor` prop has been deprecated. Use `colorScheme` prop instead.

For example, `<Checkbox colorScheme="blue">Option</Checkbox>`

```jsx
// before
<Checkbox variantColor="blue">Option</Checkbox>

// after
<Checkbox colorScheme="blue">Option</Checkbox>
```

- Support for the `isFullWidth` prop has been deprecated. The Checkbox takes up the
  width of the parent by default.

CheckboxGroup

- To reduce the API surface, we're deprecating the `isInline` prop in favor of `direction` prop for the orientation of the checkbox group

- The `direction` prop takes either `row` or `column` orientation.

```jsx
// before
<CheckboxGroup isInline defaultValue={["one", "two"]}>
  <Checkbox value="one">One</Checkbox>
  <Checkbox value="two">Two</Checkbox>
  <Checkbox value="three">Three</Checkbox>
</CheckboxGroup>

// after
<CheckboxGroup direction="row" defaultValue={["one", "two"]}>
  <Checkbox value="one">One</Checkbox>
  <Checkbox value="two">Two</Checkbox>
  <Checkbox value="three">Three</Checkbox>
</CheckboxGroup>
```

## Features

Checkbox

- Support for `iconColor` prop to customize the color of the check icon

```jsx
<Checkbox iconColor="blue">Option</Checkbox>
```

- Support for `iconSize` prop to customize the size of the check icon

```jsx
<Checkbox iconSize="1rem">Option</Checkbox>
```

- Support for `labelSpacing` prop to customize the spacing between the checkbox and label text

```jsx
<Checkbox labelSpacing="1rem">Option</Checkbox>
```

- The `useCheckbox` hook is exported with state and focus management logic for use in creating tailor-made checkbox component for your application

CheckboxGroup

- Support for `spacing` prop to customize the space between the children checkboxes

```jsx
<CheckboxGroup spacing={6}>
  <Checkbox value="one">One</Checkbox>
  <Checkbox value="two">Two</Checkbox>
  <Checkbox value="three">Three</Checkbox>
</CheckboxGroup>
```

- Support for responsive `direction` and `spacing` props. This allows the group of checkboxes to wrap around the parent element automagically.

```jsx
<CheckboxGroup
  spacing={[2, 4, 6]}
  direction={["column", "row"]}
  defaultValue={["one", "two"]}
  onChange={value => console.log(value)}
>
  <Checkbox value="one">One</Checkbox>
  <Checkbox value="two">Two</Checkbox>
  <Checkbox value="three">Three</Checkbox>
  <Checkbox value="four">Four</Checkbox>
</CheckboxGroup>
```

- The `useCheckboxGroup` hook is exported with state management logic for use in creating tailor-made checkbox component for your application
