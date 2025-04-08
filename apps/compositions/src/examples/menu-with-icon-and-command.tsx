import { Box, Button, Menu, Portal } from "@chakra-ui/react"
import { LuClipboardPaste, LuCopy, LuScissors } from "react-icons/lu"

export const MenuWithIconAndCommand = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline">Edit</Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="cut">
              <LuScissors />
              <Box flex="1">Cut</Box>
              <Menu.ItemCommand>⌘X</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="copy">
              <LuCopy />
              <Box flex="1">Copy</Box>
              <Menu.ItemCommand>⌘C</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item value="paste">
              <LuClipboardPaste />
              <Box flex="1">Paste</Box>
              <Menu.ItemCommand>⌘V</Menu.ItemCommand>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
