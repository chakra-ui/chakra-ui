import { InputGroup, NumberInput } from "@sh3yk0-ui/react"
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
