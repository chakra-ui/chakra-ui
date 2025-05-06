import { Input, InputGroup } from "@sh3yk0-ui/react"

export const InputWithStartElementEndAddon = () => {
  return (
    <InputGroup startElement="$" endAddon="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
