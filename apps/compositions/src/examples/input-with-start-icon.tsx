import { Input, InputGroup } from "@chakra-ui/react"
import { LuUser } from "react-icons/lu"

export const InputWithStartIcon = () => {
  return (
    <InputGroup startElement={<LuUser />}>
      <Input placeholder="Username" />
    </InputGroup>
  )
}
