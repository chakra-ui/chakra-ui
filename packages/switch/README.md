# Switch

The Switch component is used as an alternative for the checkbox component,
switch between enabled or disabled states.

## Installation

```sh
yarn add @chakra-ui/switch

# or

npm i @chakra-ui/switch
```

## Import component

```jsx
import { Switch } from "@chakra-ui/switch"
```

## Usage

```jsx
<Switch />
```

## Sizes

Pass the `size` prop to change the size of the switch.

```jsx
<>
  <Switch size="sm" marginLeft="1rem" colorScheme="green" />

  <Switch size="md" marginLeft="1rem" colorScheme="green" />

  <Switch size="lg" marginLeft="1rem" colorScheme="green" />
</>
```

## Switch background-color

You can change the checked background color of the `switch` by passing the
`colorScheme` prop

```jsx
<Switch colorScheme="blue" />
```

## Resources

- https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox--switch/
- https://www.lightningdesignsystem.com/components/checkbox-button/
