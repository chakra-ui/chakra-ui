import { Box, Button, Group, Menu, Portal } from "@chakra-ui/react"
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
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Group grow gap="0">
              {horizontalMenuItems.map((item) => (
                <Menu.Item
                  key={item.value}
                  value={item.value}
                  width="14"
                  gap="1"
                  flexDirection="column"
                  justifyContent="center"
                >
                  {item.icon}
                  {item.label}
                </Menu.Item>
              ))}
            </Group>
            {verticalMenuItems.map((item) => (
              <Menu.Item key={item.value} value={item.value}>
                <Box flex="1">{item.label}</Box>
                {item.icon}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
