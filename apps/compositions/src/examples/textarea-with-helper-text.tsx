import { Field, HStack, Textarea } from "@chakra-ui/react"

export const TextareaWithHelperText = () => {
  return (
    <HStack gap="10" width="full">
      <Field.Root required>
        <Field.Label>
          Comment <Field.RequiredIndicator />
        </Field.Label>
        <Textarea placeholder="Start typing..." variant="subtle" />
        <Field.HelperText>Max 500 characters.</Field.HelperText>
      </Field.Root>
      <Field.Root required>
        <Field.Label>
          Comment <Field.RequiredIndicator />
        </Field.Label>
        <Textarea placeholder="Start typing..." variant="outline" />
        <Field.HelperText>Max 500 characters.</Field.HelperText>
      </Field.Root>
    </HStack>
  )
}
