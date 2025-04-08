import { Field, Input, Stack, Switch } from "@chakra-ui/react"

export const FieldHorizontal = () => {
  return (
    <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
      <Field.Root orientation="horizontal">
        <Field.Label>Name</Field.Label>
        <Input placeholder="John Doe" flex="1" />
      </Field.Root>

      <Field.Root orientation="horizontal">
        <Field.Label>Email</Field.Label>
        <Input placeholder="me@example.com" flex="1" />
      </Field.Root>

      <Field.Root orientation="horizontal">
        <Field.Label>Hide email</Field.Label>
        <Switch.Root>
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Field.Root>
    </Stack>
  )
}
