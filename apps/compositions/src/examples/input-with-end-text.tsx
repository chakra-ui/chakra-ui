import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithEndText = () => {
  return (
    <InputGroup endElement=".com">
      <Input placeholder="yoursite" />
    </InputGroup>
  )
}
