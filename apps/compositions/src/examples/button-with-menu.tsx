import { Button, Group, IconButton, MenuTrigger } from "@chakra-ui/react"
import { MenuContent, MenuItem, MenuRoot } from "compositions/ui/menu"
import { LuChevronDown } from "react-icons/lu"

export const ButtonWithMenu = () => {
  return (
    <MenuRoot positioning={{ placement: "bottom-end" }}>
      <Group attached>
        <Button size="sm" variant="outline">
          Accept
        </Button>
        <MenuTrigger asChild>
          <IconButton size="sm" variant="outline">
            <LuChevronDown />
          </IconButton>
        </MenuTrigger>
      </Group>
      <MenuContent>
        <MenuItem value="all">Accept All</MenuItem>
        <MenuItem value="selected">Accept Selected</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
