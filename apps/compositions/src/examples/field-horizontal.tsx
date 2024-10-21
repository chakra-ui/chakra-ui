import { Input, Stack } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import { Switch } from "compositions/ui/switch"

export const FieldHorizontal = () => {
  return (
    <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
      <Field orientation="horizontal" label="Name">
        <Input placeholder="John Doe" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Email">
        <Input placeholder="me@example.com" flex="1" />
      </Field>
      <Field orientation="horizontal" label="Hide email">
        <Switch />
      </Field>
    </Stack>
  )
}
