import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const InputWithKbd = () => (
  <InputGroup flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
    <Input placeholder="Search contacts" />
  </InputGroup>
)
