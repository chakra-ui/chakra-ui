# @chakra-ui/form-control

Form Control component is used to manange form controls such input fields,
checkbox and radio buttons. It provides components and context that make your
form fields accessible by default.

- **FormControl** - the top level component that provides context
- **FormLabel** - the visible form control label
- **FormHelperText** - the from control's assistive text that guides the user.
  If added, it hides when there's an error in the field.
- **FormErrorMessage** - the form control's error feedback. If there's a help
  text visible when the control is invalid, it replaces the help text, to
  prevent content shift
- **FormErrorIcon** - an icon that indicates the error state for colorbind
  users.

## Installation

```sh
yarn add @chakra-ui/form-control

# or

npm install @chakra-ui/form-control
```

## Import component

```jsx
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/form-control"
```

## Basic Usage

The `FormControl` component automatically provides the `id` for the input
component to be fully accessible.

### With Input

```jsx
<FormControl>
  // automatically gets `htmlFor`
  <FormLabel>First name:</FormLabel>
  // automatically gets `id` and `aria-*` properties
  <Input placeholder="Enter your first name..." />
  // automatically gets `id` and hides if `isInvalid` is passed to `FormControl`
  <FormHelpText>Keep your first name short</FormHelpText>
  // automatically gets `id` and shows if `isInvalid` is passed to `FormControl`
  <FormErrorMessage>First name is invalid</FormErrorMessage>
</FormControl>
```

### With Checkbox group

```jsx
<FormControl as="fieldset">
  <FormLabel as="legend">Who is better:</FormLabel>
  <CheckboxGroup>
    <Checkbox>Naruto</Checkbox>
    <Checkbox>Boruto</Checkbox>
  </CheckboxGroup>
  <FormErrorMessage>C'mon! You must select one</FormErrorMessage>
</FormControl>
```

## Focus, Invalid and Disabled States

- When the `Input` component receives focus, it notifies the `FormControl` and
  adds `data-focus` on the `FormLabel`. Simply pass `_focus` to the `FormLabel`
  to style this state.

- If `isInvalid` is passed to the `FormControl`, it notifies the `Input` and
  adds `data-invalid` to the `FormLabel` so you can change the styles of the
  label

- If `isDisabled` is passed to the `FormControl`, it makes the `Input` disabled,
  and adds `data-disabled` to the `FormLabel` so you can change the styles of
  the label

## Changing the requried indicator

To change the required indicator beside the `FormLabel`, simply pass the
`indicator` prop and set it to your custom indicator components.

```jsx
<FormControl as="fieldset">
  <FormLabel as="legend" indicator={CustomIndicator}>
    Who is better:
  </FormLabel>
  <CheckboxGroup>
    <Checkbox>Naruto</Checkbox>
    <Checkbox>Boruto</Checkbox>
  </CheckboxGroup>
  <FormErrorMessage>C'mon! You must select one</FormErrorMessage>
</FormControl>
```

## Adding a Visual Icon

```jsx
<FormControl
  label="Tell us about yourself:"
  helpText="Keep it short and sweet!"
  errorText="C'mon! You must select one"
>
  <InputGroup>
    <Input paddingRight="32px" />
    <InputRightElement>
      <FormErrorIcon />
    </InputRightElement>
  </InputGroup>
</FormControl>
```
