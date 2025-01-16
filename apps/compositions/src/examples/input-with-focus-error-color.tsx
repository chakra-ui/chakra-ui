import { Input, Stack } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithFocusErrorColor = () => {
  return (
    <Stack gap="4">
      <Field label="focusColor=lime">
        <Input placeholder="Focus me" css={{ "--focus-color": "lime" }} />
      </Field>
      <Field invalid label="errorColor=green">
        <Input placeholder="Email" css={{ "--error-color": "green" }} />
      </Field>
      <Field invalid label="errorColor=blue">
        <Input placeholder="Password" css={{ "--error-color": "blue" }} />
      </Field>
    </Stack>
  )
}
