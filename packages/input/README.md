# Input

Input component is a component that is used to get user input in a text field.

## Installation

```sh
yarn add @chakra-ui/input

# or

npm i @chakra-ui/input
```

## Import components

```jsx
import {
  Input,
  InputGroup,
  InputAddon,
  InputLeftAddon,
  InputRightAddon,
  InputElement,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input"
```

## Usage

```jsx
<Input placeholder="A simple input component" />
```

## Disabled

Pass the `isDisabled` prop to have the input in the disabled state.

```jsx
<Input isDisabled placeholder="A disabled input" />
```

## Invalid

Pass the `isInvalid` prop to have the input in the invalid state.

```jsx
<Input isInvalid placeholder="An invalid input" />
```

## Readonly

Pass the `isReadOnly` prop to have the input in the read-only state.

```jsx
<Input isReadOnly placeholder="An invalid input" />
```

## Sizes

Pass the `size` prop to change the size of the input. Chakra UI input size
values are: `sm`, `md` and `lg`. The size of the input component is `md` by
default.

```jsx
<>
  <Input size="sm" marginBottom="1rem" placeholder="A simple placeholder" />

  <Input size="md" marginBottom="1rem" placeholder="A simple placeholder" />

  <Input size="lg" placeholder="A simple placeholder" />
</>
```

## Variant

Pass the `variant` prop to change the visual appearance of the input component.
Chakra UI input variant types are: `outline`, `filled`, `flushed` and
`unstyled`.

```jsx
<>
  <Input variant="outline" placeholder="Outline" marginBottom="1rem" />
  <Input variant="filled" placeholder="Filled" marginBottom="1rem" />
  <Input variant="flushed" placeholder="Flushed" marginBottom="1rem" />
  <Input variant="unstyled" placeholder="Unstyled" />
</>
```

## Input with addon

Prepend or append an element, generally a label or a button to the input
component.

```jsx
<>
  <InputGroup>
    <InputLeftAddon children="+234" />
    <Input borderLeftRadius="0" placeholder="Phone number..." />
  </InputGroup>

  <br />

  <InputGroup size="sm">
    <InputLeftAddon children="https://" />
    <Input borderRadius="0" placeholder="website.com" />
    <InputRightAddon children=".com" />
  </InputGroup>
</>
```

## Input with custom element

```jsx
<InputGroup>
  <InputLeftElement children={"P"} />
  <Input type="tel" placeholder="Phone number" />
</InputGroup>
```
