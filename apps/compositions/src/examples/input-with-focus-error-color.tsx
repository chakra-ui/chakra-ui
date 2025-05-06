import { Field, Input, Stack } from "@sh3yk0-ui/react"

export const InputWithFocusErrorColor = () => {
  return (
    <Stack gap="4">
      <Field.Root>
        <Field.Label>focusColor=lime</Field.Label>
        <Input placeholder="Focus me" css={{ "--focus-color": "lime" }} />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>errorColor=green</Field.Label>
        <Input placeholder="Email" css={{ "--error-color": "green" }} />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>errorColor=blue</Field.Label>
        <Input placeholder="Password" css={{ "--error-color": "blue" }} />
      </Field.Root>
    </Stack>
  )
}
