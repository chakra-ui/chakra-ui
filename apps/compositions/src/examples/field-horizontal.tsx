import { Field, Input, Stack, Switch } from "@chakra-ui/react"

export const FieldHorizontal = () => {
  return (
    <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
      <Field.Root orientation="horizontal">
        <Field.Label>Name</Field.Label>
        <Field.InputElement asChild>
          <Input placeholder="John Doe" />
        </Field.InputElement>
      </Field.Root>

      <Field.Root orientation="horizontal">
        <Field.Label>Email</Field.Label>
        <Field.InputElement asChild>
          <Input placeholder="me@example.com" />
        </Field.InputElement>
      </Field.Root>

      <Field.Root orientation="horizontal">
        <Field.Label>Hide email</Field.Label>
        <Field.InputElement asChild>
          <Switch.Root>
            <Switch.HiddenInput />
            <Switch.Control />
          </Switch.Root>
        </Field.InputElement>
      </Field.Root>

      <Field.Root orientation="horizontal" invalid>
        <Field.Label>Password</Field.Label>
        <Field.InputElement asChild>
          <Input placeholder="Enter password" type="password" />
        </Field.InputElement>
        <Field.ErrorText>
          <Field.ErrorIcon /> Password is required
        </Field.ErrorText>
        <Field.HelperText>
          Password must be at least 8 characters long
        </Field.HelperText>
      </Field.Root>
    </Stack>
  )
}
