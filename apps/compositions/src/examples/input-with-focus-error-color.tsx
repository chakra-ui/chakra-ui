import { Field, Input, Stack } from "@chakra-ui/react"

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

      <Field.Root invalid>
        <Field.Label>variant=outline,focusColor=error</Field.Label>
        <Input placeholder="Focus me" variant="outline" />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>variant=subtle,focusColor=error</Field.Label>
        <Input placeholder="Focus me" variant="subtle" />
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>variant=flushed,focusColor=error</Field.Label>
        <Input placeholder="Focus me" variant="flushed" />
      </Field.Root>
    </Stack>
  )
}
