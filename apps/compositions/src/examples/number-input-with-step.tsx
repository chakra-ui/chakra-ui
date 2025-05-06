import { NumberInput } from "@sh3yk0-ui/react"

export const NumberInputWithStep = () => {
  return (
    <NumberInput.Root maxW="200px" defaultValue="2" step={3}>
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}
