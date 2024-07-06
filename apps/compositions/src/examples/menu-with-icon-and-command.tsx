import { Box, Kbd } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { FaCopy, FaCut, FaPaste } from "react-icons/fa"

export const MenuWithIconAndCommand = () => {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button>Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="cut" valueText="cut">
          <FaCut />
          <Box flex="1">Cut</Box>
          <Kbd>⌘X</Kbd>
        </MenuItem>
        <MenuItem value="copy" valueText="copy">
          <FaCopy />
          <Box flex="1">Copy</Box>
          <Kbd>⌘C</Kbd>
        </MenuItem>
        <MenuItem value="paste" valueText="paste">
          <FaPaste />
          <Box flex="1">Paste</Box>
          <Kbd>⌘V</Kbd>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
