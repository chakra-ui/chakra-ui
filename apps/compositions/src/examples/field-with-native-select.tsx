import { Field } from "@chakra-ui/react"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const FieldWithNativeSelect = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <NativeSelectRoot>
        <NativeSelectField items={["Option 1", "Option 2", "Option 3"]} />
      </NativeSelectRoot>
    </Field.Root>
  )
}
