import { Checkbox } from "@chakra-ui/react"

export const CheckboxWithLabelPosition = () => {
  return (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
  )
}
