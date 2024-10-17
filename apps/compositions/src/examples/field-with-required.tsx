import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldWithRequired = () => {
  return (
    <Field label="Email" required>
      <Input placeholder="me@example.com" />
    </Field>
  )
}
