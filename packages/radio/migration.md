# Migration Notes

## Changes

### Radio

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

### RadioGroup

- `RadioGroup` no longer returns `event` from it's onChange. It only returns the
  `value`.

```jsx
// before
const Before = () => {
  const onChange = event => console.log(event.target.value)
  return (
    <RadioGroup name="test" onChange={onChange}>
      <Radio value="opt1" />
      <Radio value="opt2" />
      <Radio value="opt3" />
    </RadioGroup>
  )
}

// after
const After = () => {
  const onChange = val => console.log(val)
  return (
    <RadioGroup name="test" onChange={onChange}>
      <Radio value="opt1" />
      <Radio value="opt2" />
      <Radio value="opt3" />
    </RadioGroup>
  )
}
```

- To allow for better layout composition, the `RadioGroup` component no longer
  manages the layout of the radio buttons.

  We believe a radio group's layout should be managed 100% by the context it's
  used it, or based on design requirements. The group can stacked (`Stack`),
  placed in a grid (`SimpleGrid`) or made to wrap automatically (`Wrap`).

```jsx
// before
<RadioGroup isInline spacing="40px" defaultValue="one">
<Radio value="one">One</Radio>
<Radio value="two">Two</Radio>
<Radio value="three">Three</Radio>
</RadioGroup>

// after
<RadioGroup direction="row" defaultValue="one">
<Stack direction="row" spacing="40px">
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</Stack>
</RadioGroup>
```

## New Stuff

- The `useRadio` hook is exported with state and focus management logic for use
  in creating tailor-made radio component for your application

- The `useRadioGroup` hook is exported with state management logic for use in
  creating tailor-made radio group component for your application
