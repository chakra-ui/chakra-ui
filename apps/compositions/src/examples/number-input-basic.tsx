import { NumberInput } from "@chakra-ui/react"

export const NumberInputBasic = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Label>Enter Number</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.TriggerGroup />
        <NumberInput.Input />
      </NumberInput.Control>
    </NumberInput.Root>
  )
}
