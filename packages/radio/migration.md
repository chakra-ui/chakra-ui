# Migration Notes

## Changes

Radio

- Support for the `variantColor` prop has been deprecated. Use `colorScheme`
  prop instead.

For example, `<Radio colorScheme="blue">Option</Radio>`

```jsx
// before
<Radio variantColor="blue">Option</Radio>

// after
<Radio colorScheme="blue">Option</Radio>
```

- Support for the `isFullWidth` prop has been deprecated. The Radio takes up the
  width of the parent by default.

RadioGroup

- To reduce the API surface, we're deprecating the `isInline` prop in favor of
  `direction` prop for the orientation of the Radio group

- The `direction` prop takes either `row` or `column` orientation.

```jsx
// before
<RadioGroup isInline defaultValue={["one", "two"]}>
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>

// after
<RadioGroup direction="row" defaultValue={["one", "two"]}>
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>
```

## Features

Radio

- The `useRadio` hook is exported with state and focus management logic for use
  in creating tailor-made radio component for your application

RadioGroup

- Support for `spacing` prop to customize the space between the children radios

```jsx
<RadioGroup spacing={6}>
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>
```

- Support for responsive `direction` and `spacing` props. This allows the group
  of children radios to wrap around the parent element automagically.

```jsx
<RadioGroup
  spacing={[2, 4, 6]}
  direction={["column", "row"]}
  defaultValue={["one", "two"]}
  onChange={value => console.log(value)}
>
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
  <Radio value="four">Four</Radio>
</RadioGroup>
```

- The `useRadioGroup` hook is exported with state management logic for use in
  creating tailor-made radio group component for your application
