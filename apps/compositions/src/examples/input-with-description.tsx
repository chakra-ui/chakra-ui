import { HStack, Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithDescription = () => {
  return (
    <HStack gap="10" width="full">
      <Field label="Email" asterisk description="We'll never share your email.">
        <Input placeholder="Enter your email" variant="filled" />
      </Field>
      <Field label="Email" asterisk description="We'll never share your email.">
        <Input placeholder="Enter your email" variant="outline" />
      </Field>
    </HStack>
  )
}
