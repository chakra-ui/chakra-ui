import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithDisabled = () => {
  return (
    <NumberInputRoot defaultValue="10" width="200px" disabled>
      <NumberInputField />
    </NumberInputRoot>
  )
}
