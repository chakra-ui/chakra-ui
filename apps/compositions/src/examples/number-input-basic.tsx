import { NumberInput } from "@chakra-ui/react"

export const NumberInputBasic = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
