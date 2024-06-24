import { Group, HStack, Input, InputElement } from "@chakra-ui/react"
import { LuUser } from "react-icons/lu"

export const InputWithLeftElement = () => {
  return (
    <HStack gap="10" width="full">
      <Group flex="1">
        <InputElement pointerEvents="none">
          <LuUser />
        </InputElement>
        <Input ps="10" placeholder="Username" />
      </Group>

      <Group flex="1">
        <InputElement pointerEvents="none" color="fg">
          https://
        </InputElement>
        <Input ps="4.75em" placeholder="yoursite.com" />
      </Group>
    </HStack>
  )
}
