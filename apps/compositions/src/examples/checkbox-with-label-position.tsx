import { Checkbox } from "@sh3yk0-ui/react"

export const CheckboxWithLabelPosition = () => {
  return (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
      <Checkbox.Control />
    </Checkbox.Root>
  )
}
