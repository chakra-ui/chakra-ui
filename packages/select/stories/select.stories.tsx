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

export const BasicUsage = () => (
  <Select color="pink.500" placeholder="Select option">
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </Select>
)

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

export const SelectSizes = () => (
  <Stack spacing={4}>
    <Select placeholder="large size" size="lg" />
    <Select placeholder="default size" size="md" />
    <Select placeholder="small size" size="sm" />
  </Stack>
)

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
  return <Select icon={<UpDownIcon />} placeholder="Placeholder" size="md" />
}

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

    <Select
      isInvalid
      errorBorderColor="red.300"
      placeholder="Here is a sample placeholder"
    />

    <Select
      isInvalid
      errorBorderColor="crimson"
      placeholder="Here is a sample placeholder"
    />
  </Stack>
)

export const OverrideStyles = () => (
  <Select
    color="white"
    borderColor="tomato"
    bg="tomato"
    placeholder="Woohoo! A new background color!"
  />
)
