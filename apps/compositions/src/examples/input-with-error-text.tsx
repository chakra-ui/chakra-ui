import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithErrorText = () => {
  return (
    <Field invalid label="Email" error="This field is required">
      <Input placeholder="Enter your email" />
    </Field>
  )
}
