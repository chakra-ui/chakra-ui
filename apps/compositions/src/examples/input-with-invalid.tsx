import { Field, Input } from "@sh3yk0-ui/react"

export const InputWithInvalid = () => (
  <Field.Root id="first-name" invalid>
    <Field.Label>First name</Field.Label>
    <Input placeholder="Enter first name" />
    <Field.ErrorText>First name is required</Field.ErrorText>
  </Field.Root>
)
