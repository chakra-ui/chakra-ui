import { Stack, Box } from "@chakra-ui/layout"
import { Icon } from "@chakra-ui/icon"
import * as React from "react"
import { Select } from "./index"

export default {
  title: "Select",
  decorators: [
    (story: Function) => (
      <Box maxWidth="400px" mx="auto" mt="40px">
        {story()}
      </Box>
    ),
  ],
}

/**
 * A simple select component
 */

export const BasicUsage = () => (
  <Select placeholder="Select option">
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
    {["sm", "md", "lg"].map(size => (
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

export const SelectIcon = () => {
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
    backgroundColor="tomato"
    placeholder="Woohoo! A new background color!"
  />
)
