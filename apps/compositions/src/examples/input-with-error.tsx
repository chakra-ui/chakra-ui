import { HStack, Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithError = () => {
  return (
    <HStack gap="10" width="full">
      <Field invalid label="Email" error="This field is required">
        <Input placeholder="Enter your email" variant="filled" />
      </Field>
      <Field invalid label="Email" error="This field is required">
        <Input placeholder="Enter your email" variant="outline" />
      </Field>
    </HStack>
  )
}
