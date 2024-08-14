import { Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldWithTextarea = () => {
  return (
    <Field label="Email">
      <Textarea placeholder="Email" />
    </Field>
  )
}
