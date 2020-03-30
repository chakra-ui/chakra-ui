import { Stack, Box } from "@chakra-ui/layout"
import React from "react"
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

export const BasicUsage = () => (
  <Select placeholder="Select option">
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

export const SelectSizes = () => (
  <Stack spacing={4}>
    {["sm", "md", "lg"].map(size => (
      <Select key={size} placeholder="Placeholder" size={size} />
    ))}
  </Stack>
)
