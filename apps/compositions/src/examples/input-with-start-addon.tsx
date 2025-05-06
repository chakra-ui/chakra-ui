import { Input, InputGroup } from "@sh3yk0-ui/react"

export const InputWithStartAddon = () => {
  return (
    <InputGroup startAddon="https://">
      <Input placeholder="yoursite.com" />
    </InputGroup>
  )
}
