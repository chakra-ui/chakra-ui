# Radio

Radio component is used in forms when a user needs to select a single value from
several options.

## Installation

```sh
yarn add @chakra-ui/radio

# or

npm i @chakra-ui/radio
```

## Import component

```jsx
import { Radio } from "@chakra-ui/radio"
```

## Usage

```jsx
<Radio>This is a radio</Radio>
```

### RadioGroup

RadioGroup is used to bind multiple radios into a group, and it indicates
whether which option is selected.

```jsx
<RadioGroup defaultValue="one">
  <Radio value="one">One</Radio>
  <Radio value="two">Two</Radio>
  <Radio value="three">Three</Radio>
</RadioGroup>
```
