import { Box, Button, Group } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import {
  LuClipboard,
  LuCopy,
  LuFileSearch,
  LuMessageSquare,
  LuScissors,
  LuShare,
} from "react-icons/lu"

const horizontalMenuItems = [
  { label: "Cut", value: "cut", icon: <LuScissors /> },
  { label: "Copy", value: "copy", icon: <LuCopy /> },
  { label: "Paste", value: "paste", icon: <LuClipboard /> },
]

const verticalMenuItems = [
  { label: "Look Up", value: "look-up", icon: <LuFileSearch /> },
  { label: "Translate", value: "translate", icon: <LuMessageSquare /> },
  { label: "Share", value: "share", icon: <LuShare /> },
]

export const MenuWithMixedLayout = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </MenuTrigger>
      <MenuContent>
        <Group grow gap="0">
          {horizontalMenuItems.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              width="14"
              gap="1"
              flexDirection="column"
              justifyContent="center"
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
        </Group>
        {verticalMenuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Box flex="1">{item.label}</Box>
            {item.icon}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  )
}
