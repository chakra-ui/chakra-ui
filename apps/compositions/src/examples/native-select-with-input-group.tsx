import { InputGroup, NativeSelect } from "@chakra-ui/react"
import { LuUser } from "react-icons/lu"

export const NativeSelectWithInputGroup = () => {
  return (
    <NativeSelect.Root size="sm">
      <InputGroup startElement={<LuUser />}>
        <NativeSelect.Field placeholder="Select user">
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </NativeSelect.Field>
      </InputGroup>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}
