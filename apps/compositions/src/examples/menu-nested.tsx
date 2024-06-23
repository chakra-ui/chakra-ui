import { Icon } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "compositions/ui/menu"
import { LuChevronsUpDown } from "react-icons/lu"

export const MenuNested = () => {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button variant="outline" size="sm">
          Nested
          <Icon asChild mx="-1">
            <LuChevronsUpDown />
          </Icon>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
          <MenuTriggerItem value="open-recent">Open Recent</MenuTriggerItem>
          <MenuContent>
            <MenuItem value="panda">Panda</MenuItem>
            <MenuItem value="ark">Ark UI</MenuItem>
            <MenuItem value="chakra">Chakra v3</MenuItem>
          </MenuContent>
        </MenuRoot>
        <MenuItem value="open-file">Open File...</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
