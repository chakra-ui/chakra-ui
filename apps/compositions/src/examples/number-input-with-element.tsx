import { NumberInput } from "@chakra-ui/react"
import { InputGroup } from "compositions/ui/input-group"
import { LuDollarSign } from "react-icons/lu"

export const NumberInputWithElement = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Control />
      <InputGroup startElement={<LuDollarSign />}>
        <NumberInput.Input />
      </InputGroup>
    </NumberInput.Root>
  )
}
