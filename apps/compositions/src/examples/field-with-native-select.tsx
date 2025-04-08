import { Field, NativeSelect } from "@chakra-ui/react"

export const FieldWithNativeSelect = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}
