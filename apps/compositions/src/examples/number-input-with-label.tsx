import { NumberInput } from "@chakra-ui/react"

export const NumberInputWithLabel = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Label>Label</NumberInput.Label>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
