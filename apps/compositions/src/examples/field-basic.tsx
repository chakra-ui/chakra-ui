import { Field, Input } from "@sh3yk0-ui/react"

export const FieldBasic = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
    </Field.Root>
  )
}
