# Select

The Select component is a component that allows users pick a value from
predefined options.

Ideally, it should be used when there are more than 5 options, otherwise you
might consider using a radio group instead.

## Installation

```sh
yarn add @chakra-ui/select

# or

npm i @chakra-ui/select
```

## Import component

```jsx
import { Select } from "@chakra-ui/select"
```

## Usage

```jsx
<Select placeholder="A simple select component">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</Select>
```

## States

### Disabled

Pass the `isDisabled` prop to put the select component in an invalid state

```jsx
<Select placeholder="Select option" isDisabled>
  <option value="Option 1">Option 1</option>
  <option value="Option 2">Option 2</option>
  <option value="Option 3">Option 3</option>
</Select>
```

### Invalid

Pass the `isInvalid` prop to put the select component in an invalid state

```jsx
<Select placeholder="Select option" isInvalid>
  <option value="Option 1">Option 1</option>
  <option value="Option 2">Option 2</option>
  <option value="Option 3">Option 3</option>
</Select>
```

## Variants

Control the visual appearance of the select component by passing the `variant`
prop.

The following values are allowed: **outline, filled, flushed, unstyled**

```jsx
<Stack>
  <Select placeholder="Select option" variant="outline">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>

  <Select placeholder="Select option" variant="filled">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>

  <Select placeholder="Select option" variant="flushed">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>

  <Select placeholder="Select option" variant="unstyled">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>
</Stack>
```

## Sizes

Pass the `size` prop to change the size and height of the select component.

The following values are allowed: **sm, md, lg**

```jsx
<Stack spacing={4}>
  {["sm", "md", "lg"].map((size) => (
    <Select key={size} placeholder="Select option" size={size}>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  ))}
</Stack>
```

## Controlled Select

```tsx
const ControlledSelectExample = () => {
  const [value, setValue] = React.useState("")
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)
  }

  return (
    <Select
      value={value}
      onChange={handleChange}
      placeholder="Controlled select"
    >
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  )
}
```

## Changing the icon in the Select

Pass the `icon` prop to change the arrow icon of the select component to a
custom icon.

You also have access to the `iconSize` prop to change the size of the custom
arrow icon.

```jsx
const CustomSelectIconExample = () => {
  const SelectIcon = () => (
    <Icon viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
      />
    </Icon>
  )
  return <Select icon={SelectIcon} placeholder="Placeholder" size="md" />
}
```

## Focus border color and error border color

Pass the `focusBorderColor` prop to change the border color of the select
component in the focused state.

Pass the `errorBorderColor` prop to change the border color of the select
component in the invalid state.

The value of these props can be set to a color in the theme object, or a raw CSS
value.

```jsx
<Stack>
  <Select focusBorderColor="lime" placeholder="Here is a sample placeholder" />

  <Select
    isInvalid
    errorBorderColor="crimson"
    placeholder="Here is a sample placeholder"
  />
</Stack>
```

## Overriding the Select styles

Even though the select comes with predefined styles, you can override pretty
much any property. Here's we'll override the background color.

```jsx
<Select
  color="white"
  borderColor="tomato"
  backgroundColor="tomato"
  placeholder="Woohoo! A new background color!"
/>
```
