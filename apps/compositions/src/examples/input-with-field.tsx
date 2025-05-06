import { Field, HStack, Input } from "@sh3yk0-ui/react"

export const InputWithField = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root required>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="me@example.com" variant="subtle" />
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="me@example.com" variant="outline" />
      </Field.Root>
    </HStack>
  )
}
