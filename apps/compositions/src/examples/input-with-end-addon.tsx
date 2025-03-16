import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithEndAddon = () => {
  return (
    <InputGroup endAddon=".com">
      <Input placeholder="yoursite" />
    </InputGroup>
  )
}
