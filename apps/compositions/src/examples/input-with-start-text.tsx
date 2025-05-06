import { Input, InputGroup } from "@sh3yk0-ui/react"

export const InputWithStartText = () => {
  return (
    <InputGroup
      startElement="https://"
      startElementProps={{ color: "fg.muted" }}
    >
      <Input ps="7ch" placeholder="yoursite.com" />
    </InputGroup>
  )
}
