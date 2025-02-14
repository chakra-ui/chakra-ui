import { NativeSelect } from "@chakra-ui/react"

export const NativeSelectWithInvalidRoot = () => (
  <NativeSelect.Root invalid width="240px">
    <NativeSelect.Field placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
)
