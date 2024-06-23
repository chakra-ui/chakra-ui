import { Button } from "compositions/ui/button"
import {
  MenuContent,
  MenuItem,
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
        <MenuItem value="new-txt" command="⌘E">
          New Text File
        </MenuItem>
        <MenuItem value="new-file" command="⌘N">
          New File...
        </MenuItem>
        <MenuItem value="new-win" command="⌘⇧N">
          New Window
        </MenuItem>
        <MenuItem value="open-file" command="⌘O">
          Open File...
        </MenuItem>
        <MenuItem value="export" command="⌘S">
          Export
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
