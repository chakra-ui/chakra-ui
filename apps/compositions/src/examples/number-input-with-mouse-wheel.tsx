import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"

export const NumberInputWithMouseWheel = () => {
  return (
    <NumberInputRoot defaultValue="10" width="200px" allowMouseWheel>
      <NumberInputField />
    </NumberInputRoot>
  )
}
