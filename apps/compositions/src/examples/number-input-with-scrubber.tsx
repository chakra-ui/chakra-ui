import { InputGroup } from "compositions/ui/input-group"
import {
  NumberInputField,
  NumberInputRoot,
  NumberInputScrubber,
} from "compositions/ui/number-input"
import { LuArrowRightLeft } from "react-icons/lu"

export const NumberInputWithScrubber = () => {
  return (
    <NumberInputRoot defaultValue="10" width="200px">
      <InputGroup
        startElementProps={{ pointerEvents: "auto" }}
        startElement={
          <NumberInputScrubber>
            <LuArrowRightLeft />
          </NumberInputScrubber>
        }
      >
        <NumberInputField />
      </InputGroup>
    </NumberInputRoot>
  )
}
