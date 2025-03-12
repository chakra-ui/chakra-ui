import { Input, InputGroup } from "@chakra-ui/react"

export const InputWithStartElementEndAddon = () => {
  return (
    <InputGroup startElement="$" endAddon="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
