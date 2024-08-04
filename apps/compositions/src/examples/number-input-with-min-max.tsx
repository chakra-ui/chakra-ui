import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithMinMax = () => {
  return (
    <NumberInputRoot width="200px" defaultValue="10" min={5} max={50}>
      <NumberInputField />
    </NumberInputRoot>
  )
}
