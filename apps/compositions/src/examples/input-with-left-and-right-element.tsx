import { HStack, Input, Kbd } from "@chakra-ui/react"
import { InputGroup } from "compositions/ui/input-group"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"
import { LuSearch } from "react-icons/lu"

const DomainSelect = () => (
  <NativeSelectRoot size="xs" variant="plain" width="auto" me="-1">
    <NativeSelectField defaultValue=".com" fontSize="sm">
      <option value=".com">.com</option>
      <option value=".org">.org</option>
      <option value=".net">.net</option>
    </NativeSelectField>
  </NativeSelectRoot>
)

export const InputWithLeftAndRightElement = () => {
  return (
    <HStack gap="10" width="full">
      <InputGroup
        flex="1"
        startElement={<LuSearch />}
        endElement={<Kbd>⌘K</Kbd>}
      >
        <Input placeholder="Search contacts" />
      </InputGroup>

      <InputGroup
        flex="1"
        startElement="https://"
        endElement={<DomainSelect />}
      >
        <Input ps="4.75em" pe="0" placeholder="yoursite.com" />
      </InputGroup>
    </HStack>
  )
}
