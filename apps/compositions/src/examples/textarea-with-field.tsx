import { HStack, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const TextareaWithField = () => {
  return (
    <HStack gap="10" width="full">
      <Field label="Comment" asterisk>
        <Textarea placeholder="Start typing..." variant="subtle" />
      </Field>
      <Field label="Comment" asterisk>
        <Textarea placeholder="Start typing..." variant="outline" />
      </Field>
    </HStack>
  )
}
