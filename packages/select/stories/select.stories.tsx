import { Container, Stack } from "@chakra-ui/layout"
import * as React from "react"
import { Select } from "../src"

export default {
  title: "Select",
  decorators: [
    (story: Function) => (
      <Container maxWidth="400px" mt="40px">
        {story()}
      </Container>
    ),
  ],
}

/**
 * A simple select component
 */

export const BasicUsage = () => (
  <Select color="pink.500" placeholder="Select option">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>
)

/**
 * - Pass the `isInvalid` prop to put the select component in an invalid state
 * - Pass the `isDisabled` prop to put the select component in a disabled state
 */

export const SelectStates = () => (
  <Stack>
    <Select placeholder="Select option" isInvalid>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>

    <Select placeholder="Select option" isDisabled>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  </Stack>
)

/**
 * Control the visual appearance of the select component
 * by passing the `variant` prop.
 *
 * @type {('outline'|'filled'|'flushed'|'unstyled' })}
 */

export const SelectVariants = () => (
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
)

/**
 * Pass the `size` prop to change the size and height of the select component.
 *
 *  @type {('sm'|'md'|'lg' })}
 */

export const SelectSizes = () => (
  <Stack spacing={4}>
    {["sm", "md", "lg"].map((size) => (
      <Select key={size} placeholder="Placeholder" size={size}>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </Select>
    ))}
  </Stack>
)

/**
 * A controlled select component
 */

export const SelectControlled = () => {
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

/**
 * Pass the `icon` prop to change the arrow icon of the select
 * component to a custom icon.
 *
 * You also have access to the `iconSize` prop to change the size of
 * the custom arrow icon.
 */

const UpDownIcon = (props: any) => (
  <svg viewBox="0 0 6 15" fill="none" stroke="currentColor" {...props}>
    <path d="M5 5.5L3 3.5L1 5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 9.5L3 11.5L1 9.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const SelectIcon = () => {
  return (
    <Select
      isDisabled
      icon={<UpDownIcon />}
      iconSize="6"
      placeholder="Placeholder"
      size="md"
    />
  )
}

/**
 * Pass the `focusBorderColor` prop to change the border color of
 * the select component in the focused state
 *
 * Pass the `errorBorderColor` prop to change the border color of
 * the select component in the invalid state
 *
 * The value of these props can be set to a color in the theme object,
 * or a raw CSS value.
 */

export const FocusAndErrorColors = () => (
  <Stack>
    <Select
      focusBorderColor="lime"
      placeholder="Here is a sample placeholder"
    />
    <Select
      focusBorderColor="pink.400"
      placeholder="Here is a sample placeholder"
    />
    <br />
    <Select
      isInvalid
      errorBorderColor="red.300"
      placeholder="Here is a sample placeholder"
    />
    <br />
    <Select
      isInvalid
      errorBorderColor="crimson"
      placeholder="Here is a sample placeholder"
    />
    <br />
  </Stack>
)

/**
 * Even though the select comes with predefined styles,
 * you can override pretty much any property.
 *
 * Here's we'll override the background color.
 */

export const OverrideStyles = () => (
  <Select
    color="white"
    borderColor="tomato"
    bg="tomato"
    placeholder="Woohoo! A new background color!"
  />
)
