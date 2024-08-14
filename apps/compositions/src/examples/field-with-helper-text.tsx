import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldWithHelperText = () => {
  return (
    <Field label="Email" helperText="This is a helper text">
      <Input placeholder="me@example.com" />
    </Field>
  )
}
