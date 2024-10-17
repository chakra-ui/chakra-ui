import { HStack, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const TextareaWithErrorText = () => {
  return (
    <HStack gap="10" width="full">
      <Field invalid label="Comment" required errorText="Field is required">
        <Textarea placeholder="Start typing..." variant="subtle" />
      </Field>
      <Field invalid label="Comment" required errorText="Field is required">
        <Textarea placeholder="Start typing..." variant="outline" />
      </Field>
    </HStack>
  )
}
