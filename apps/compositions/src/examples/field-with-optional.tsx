import { Badge, Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const FieldWithOptional = () => {
  return (
    <Field
      label="Email"
      optionalText={
        <Badge size="xs" variant="surface">
          Optional
        </Badge>
      }
    >
      <Input placeholder="me@example.com" />
    </Field>
  )
}
