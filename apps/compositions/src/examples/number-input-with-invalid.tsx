import { Field } from "compositions/ui/field"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithInvalid = () => {
  return (
    <Field label="Enter Number" invalid errorText="The entry is invalid">
      <NumberInputRoot defaultValue="10" width="200px">
        <NumberInputField />
      </NumberInputRoot>
    </Field>
  )
}
