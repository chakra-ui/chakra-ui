import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithStep = () => {
  return (
    <NumberInputRoot maxW="200px" defaultValue="2" step={3}>
      <NumberInputField />
    </NumberInputRoot>
  )
}
