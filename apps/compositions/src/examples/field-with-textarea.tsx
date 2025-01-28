import { Field, Textarea } from "@chakra-ui/react"

export const FieldWithTextarea = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Textarea placeholder="Email" />
    </Field.Root>
  )
}
