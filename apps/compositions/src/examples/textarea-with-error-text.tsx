import { Field, HStack, Textarea } from "@chakra-ui/react"

export const TextareaWithErrorText = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root invalid>
        <Field.Label>
          Comment <Field.RequiredIndicator />
        </Field.Label>
        <Textarea placeholder="Start typing..." variant="subtle" />
        <Field.ErrorText>Field is required</Field.ErrorText>
      </Field.Root>
      <Field.Root invalid>
        <Field.Label>
          Comment <Field.RequiredIndicator />
        </Field.Label>
        <Textarea placeholder="Start typing..." variant="outline" />
        <Field.ErrorText>Field is required</Field.ErrorText>
      </Field.Root>
    </HStack>
  )
}
