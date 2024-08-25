import { InputGroup } from "compositions/ui/input-group"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"
import { LuDollarSign } from "react-icons/lu"

export const NumberInputWithElement = () => {
  return (
    <NumberInputRoot defaultValue="10" width="200px">
      <InputGroup startElement={<LuDollarSign />}>
        <NumberInputField />
      </InputGroup>
    </NumberInputRoot>
  )
}
