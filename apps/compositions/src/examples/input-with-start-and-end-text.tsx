import { Input, InputGroup } from "@sh3yk0-ui/react"

export const InputWithStartAndEndText = () => {
  return (
    <InputGroup startElement="$" endElement="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
