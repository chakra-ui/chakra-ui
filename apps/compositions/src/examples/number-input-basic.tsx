import { NumberInput } from "@sh3yk0-ui/react"

export const NumberInputBasic = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
