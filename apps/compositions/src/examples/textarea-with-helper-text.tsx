import { HStack, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const TextareaWithHelperText = () => {
  return (
    <HStack gap="10" width="full">
      <Field label="Comment" asterisk helperText="Max 500 characters.">
        <Textarea placeholder="Start typing..." variant="subtle" />
      </Field>
      <Field label="Comment" asterisk helperText="Max 500 characters.">
        <Textarea placeholder="Start typing..." variant="outline" />
      </Field>
    </HStack>
  )
}
