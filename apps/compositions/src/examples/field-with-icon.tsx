import { Field, Input } from "@chakra-ui/react"

export const FieldWithIcon = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
      <Field.ErrorText width={"100%"} marginBottom="4">
        <Field.ErrorIcon />
        This is an erro text with icon.
      </Field.ErrorText>
    </Field.Root>
  )
}
