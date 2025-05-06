import { Field, Input } from "@sh3yk0-ui/react"

export const FieldWithDisabled = () => {
  return (
    <Field.Root disabled>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
    </Field.Root>
  )
}
