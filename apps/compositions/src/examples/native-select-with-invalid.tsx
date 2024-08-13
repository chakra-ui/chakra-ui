import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const NativeSelectWithInvalid = () => (
  <Field invalid errorText="This is an error" width="240px">
    <NativeSelectRoot>
      <NativeSelectField placeholder="Select option">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </NativeSelectField>
    </NativeSelectRoot>
  </Field>
)
