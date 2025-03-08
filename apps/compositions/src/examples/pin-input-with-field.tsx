import { Field } from "@chakra-ui/react"
import { PinInput } from "compositions/ui/pin-input"

export const PinInputWithField = () => {
  return (
    <Field.Root>
      <Field.Label>Enter otp</Field.Label>
      <PinInput />
    </Field.Root>
  )
}
