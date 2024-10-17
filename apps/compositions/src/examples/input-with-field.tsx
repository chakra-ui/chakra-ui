import { HStack, Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithField = () => {
  return (
    <HStack gap="10" width="full">
      <Field label="Email" required>
        <Input placeholder="me@example.com" variant="subtle" />
      </Field>
      <Field label="Email" required>
        <Input placeholder="me@example.com" variant="outline" />
      </Field>
    </HStack>
  )
}
