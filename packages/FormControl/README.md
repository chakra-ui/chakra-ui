# Form Control

This component is used to manange form controls such input fields, checkbox and
radio buttons. It provides components and context that make your form fields
accessible by default.

- **FormControl** - the top level component that provides context
- **FormLabel** - the visible form control label
- **FormHelpText** - the from control's assistive text that guides the user. If
  added, it hides when there's an error in the field.
- **FormErrorText** - the form control's error feedback. If there's a help text
  visible when the control is invalid, it replaces the help text, to prevent
  content shift
- **FormErrorIcon** - an icon that indicates the error state for colorbind
  users.

## Import guide

Install the form control package

```sh
npm install @chakra-ui/form-control
```

then import the components

```jsx
import {
  FormControl,
  FormLabel,
  FormErrorText,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/form-control";
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
  <FormErrorText>First name is invalid</FormErrorText>
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
  <FormErrorText>C'mon! You must select one</FormErrorText>
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
  <FormErrorText>C'mon! You must select one</FormErrorText>
</FormControl>
```

## Save Time

You don't always have to import `FormLabel` and `FormErrorText` components for
every form control. As a shortcut, you can simply pass the `label` and
`errorMessage` props to `FormControl` and it'll work just the same!

```jsx
<FormControl
  label="Tell us about yourself:"
  helpText="Keep it short and sweet!"
  errorText="C'mon! You must select one"
>
  <Textarea />
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
