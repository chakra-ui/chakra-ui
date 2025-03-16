import { Field, NumberInput } from "@chakra-ui/react"

export const NumberInputWithInvalid = () => {
  return (
    <Field.Root invalid>
      <Field.Label>Enter Number</Field.Label>
      <NumberInput.Root defaultValue="10" width="200px">
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Field.ErrorText>The entry is invalid</Field.ErrorText>
    </Field.Root>
  )
}
