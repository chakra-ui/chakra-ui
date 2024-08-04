import {
  NumberInputField,
  NumberInputRoot,
  NumberInputScruber,
} from "compositions/ui/number-input"

export const NumberInputWithScrubber = () => {
  return (
    <NumberInputRoot defaultValue="10" width="200px">
      <NumberInputField />
      <NumberInputScruber />
    </NumberInputRoot>
  )
}
