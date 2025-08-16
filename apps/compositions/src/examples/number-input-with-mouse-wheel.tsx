import { NumberInput } from "@chakra-ui/react"

export const NumberInputWithMouseWheel = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px" allowMouseWheel>
      <NumberInput.TriggerGroup />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
