import { Button, Flex, IconButton, MenuTrigger } from "@chakra-ui/react"
import { MenuContent, MenuItem, MenuRoot } from "compositions/ui/menu"
import { LuChevronDown } from "react-icons/lu"

export const ButtonWithMenu = () => {
  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <Flex gap="0">
        <Button variant="solid" roundedEnd="0px">
          Accept
        </Button>
        <MenuTrigger asChild>
          <IconButton variant="solid" roundedStart="0px" minW="auto" px="1">
            <LuChevronDown />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="all">Accept All</MenuItem>
          <MenuItem value="selected">Accept Selected</MenuItem>
        </MenuContent>
      </Flex>
    </MenuRoot>
  )
}
