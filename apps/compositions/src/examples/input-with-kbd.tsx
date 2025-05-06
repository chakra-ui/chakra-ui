import { Input, InputGroup, Kbd } from "@sh3yk0-ui/react"
import { LuSearch } from "react-icons/lu"

export const InputWithKbd = () => (
  <InputGroup flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
    <Input placeholder="Search contacts" />
  </InputGroup>
)
