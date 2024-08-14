import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldBasic = () => {
  return (
    <Field label="Email">
      <Input placeholder="me@example.com" />
    </Field>
  )
}
