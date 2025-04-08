import { Input, InputGroup } from "@chakra-ui/react"
import { LuMail } from "react-icons/lu"

export const InputWithEndIcon = () => {
  return (
    <InputGroup endElement={<LuMail />}>
      <Input placeholder="Email" />
    </InputGroup>
  )
}
