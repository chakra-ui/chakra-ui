import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithHelperText = () => {
  return (
    <Field label="Email" required helperText="We'll never share your email.">
      <Input placeholder="Enter your email" />
    </Field>
  )
}
