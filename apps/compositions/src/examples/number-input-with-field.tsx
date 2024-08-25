import { Field } from "compositions/ui/field"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithField = () => {
  return (
    <Field label="Enter Number" helperText="Enter a number between 1 and 10">
      <NumberInputRoot width="200px">
        <NumberInputField />
      </NumberInputRoot>
    </Field>
  )
}
