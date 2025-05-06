import { Input, InputGroup } from "@sh3yk0-ui/react"

export const InputWithStartAndEndAddon = () => {
  return (
    <InputGroup startAddon="$" endAddon="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
