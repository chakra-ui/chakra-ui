import { Field, NativeSelect } from "@chakra-ui/react"

export const NativeSelectWithInvalid = () => (
  <Field.Root invalid width="240px">
    <NativeSelect.Root>
      <NativeSelect.Field placeholder="Select option">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
    <Field.ErrorText>This is an error</Field.ErrorText>
  </Field.Root>
)
