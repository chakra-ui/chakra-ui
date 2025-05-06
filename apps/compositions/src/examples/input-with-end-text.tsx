import { Input, InputGroup } from "@sh3yk0-ui/react"

export const InputWithEndText = () => {
  return (
    <InputGroup endElement=".com">
      <Input placeholder="yoursite" />
    </InputGroup>
  )
}
