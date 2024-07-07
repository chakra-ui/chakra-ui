import { Button } from "compositions/ui/button"
import {
  MenuContent,
  MenuItem,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

export const MenuWithCommand = () => {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button variant="solid" size="sm">
          Command
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">
          New Text File <MenuItemCommand>⌘E</MenuItemCommand>
        </MenuItem>
        <MenuItem value="new-file">
          New File... <MenuItemCommand>⌘N</MenuItemCommand>
        </MenuItem>
        <MenuItem value="new-win">
          New Window <MenuItemCommand>⌘⇧N</MenuItemCommand>
        </MenuItem>
        <MenuItem value="open-file">
          Open File... <MenuItemCommand>⌘O</MenuItemCommand>
        </MenuItem>
        <MenuItem value="export">
          Export <MenuItemCommand>⌘S</MenuItemCommand>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
