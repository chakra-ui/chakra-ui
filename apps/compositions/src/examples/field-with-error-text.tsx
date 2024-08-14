import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldWithErrorText = () => {
  return (
    <Field label="Email" invalid errorText="This is an error text">
      <Input placeholder="me@example.com" />
    </Field>
  )
}
