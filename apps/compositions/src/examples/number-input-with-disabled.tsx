import { NumberInput } from "@chakra-ui/react"

export const NumberInputWithDisabled = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px" disabled>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
