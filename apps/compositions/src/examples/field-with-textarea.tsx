import { Field, Textarea } from "@sh3yk0-ui/react"

export const FieldWithTextarea = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Textarea placeholder="Email" />
    </Field.Root>
  )
}
