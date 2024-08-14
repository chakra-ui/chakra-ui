import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const FieldWithNativeSelect = () => {
  return (
    <Field label="Email">
      <NativeSelectRoot>
        <NativeSelectField items={["Option 1", "Option 2", "Option 3"]} />
      </NativeSelectRoot>
    </Field>
  )
}
