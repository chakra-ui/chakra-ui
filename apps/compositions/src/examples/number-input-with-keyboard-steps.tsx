import { Field, NumberInput } from "@chakra-ui/react"

export const NumberInputWithKeyboardSteps = () => {
  return (
    <Field.Root maxW="240px">
      <Field.Label>Quantity</Field.Label>
      <NumberInput.Root
        defaultValue="10"
        step={1}
        largeStep={20}
        smallStep={0.5}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Field.HelperText>
        Use Shift + Arrow for 20 and Alt + Arrow for 0.5.
      </Field.HelperText>
    </Field.Root>
  )
}
