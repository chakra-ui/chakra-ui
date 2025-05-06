import { Field, Input } from "@sh3yk0-ui/react"

export const InputWithErrorText = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Input placeholder="Enter your email" />
      <Field.ErrorText>This field is required</Field.ErrorText>
    </Field.Root>
  )
}
