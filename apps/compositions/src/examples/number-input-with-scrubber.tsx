import { NumberInput } from "@chakra-ui/react"
import { InputGroup } from "compositions/ui/input-group"
import { LuArrowRightLeft } from "react-icons/lu"

export const NumberInputWithScrubber = () => {
  return (
    <NumberInput.Root defaultValue="10" width="200px">
      <NumberInput.Control />
      <InputGroup
        startElementProps={{ pointerEvents: "auto" }}
        startElement={
          <NumberInput.Scrubber>
            <LuArrowRightLeft />
          </NumberInput.Scrubber>
        }
      >
        <NumberInput.Input />
      </InputGroup>
    </NumberInput.Root>
  )
}
