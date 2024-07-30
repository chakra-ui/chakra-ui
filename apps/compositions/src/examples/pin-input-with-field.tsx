import { Field } from "compositions/ui/field"
import { PinInput } from "compositions/ui/pin-input"

export const PinInputWithField = () => {
  return (
    <Field label="Enter otp">
      <PinInput />
    </Field>
  )
}
