import {
  Group,
  HStack,
  Input,
  InputElement,
  Kbd,
  MenuTrigger,
} from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { MenuContent, MenuItem, MenuRoot } from "compositions/ui/menu"
import { LuChevronsUpDown, LuSearch } from "react-icons/lu"

export const InputWithLeftAndRightElement = () => {
  return (
    <HStack gap="10" width="full">
      <Group flex="1">
        <InputElement pointerEvents="none">
          <LuSearch />
        </InputElement>
        <Input ps="10" pe="10" placeholder="Username" />
        <InputElement pointerEvents="none" placement="end">
          <Kbd variant="outline" size="lg" letterSpacing="wider">
            ⌘K
          </Kbd>
        </InputElement>
      </Group>

      <Group flex="1">
        <InputElement pointerEvents="none" color="fg">
          https://
        </InputElement>
        <Input ps="4.75em" placeholder="yoursite.com" />
        <InputElement placement="end" pe="1">
          <MenuRoot>
            <MenuTrigger>
              <Button variant="plain" size="xs" endIcon={<LuChevronsUpDown />}>
                .com
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value=".com">.com</MenuItem>
              <MenuItem value=".org">.org</MenuItem>
              <MenuItem value=".net">.net</MenuItem>
            </MenuContent>
          </MenuRoot>
        </InputElement>
      </Group>
    </HStack>
  )
}
