import { Box, Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { LuClipboardPaste, LuCopy, LuScissors } from "react-icons/lu"

export const MenuWithIconAndCommand = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline">Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="cut" valueText="cut">
          <LuScissors />
          <Box flex="1">Cut</Box>
          <MenuItemCommand>⌘X</MenuItemCommand>
        </MenuItem>
        <MenuItem value="copy" valueText="copy">
          <LuCopy />
          <Box flex="1">Copy</Box>
          <MenuItemCommand>⌘C</MenuItemCommand>
        </MenuItem>
        <MenuItem value="paste" valueText="paste">
          <LuClipboardPaste />
          <Box flex="1">Paste</Box>
          <MenuItemCommand>⌘V</MenuItemCommand>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
