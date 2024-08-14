import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldWithDisabled = () => {
  return (
    <Field label="Email" disabled>
      <Input placeholder="me@example.com" />
    </Field>
  )
}
