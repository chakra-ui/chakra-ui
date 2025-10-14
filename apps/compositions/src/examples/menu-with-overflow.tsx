import { Button, Menu, Portal } from "@chakra-ui/react"

export const MenuWithOverflow = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Menu
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content maxH="200px" minW="10rem">
            {menuItems.map((item) => (
              <Menu.Item key={item.value} value={item.value}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const menuItems = [
  { value: "new-file", label: "New File" },
  { value: "new-folder", label: "New Folder" },
  { value: "open", label: "Open..." },
  { value: "open-recent", label: "Open Recent" },
  { value: "save", label: "Save" },
  { value: "save-as", label: "Save As..." },
  { value: "save-all", label: "Save All" },
  { value: "export", label: "Export" },
  { value: "import", label: "Import" },
  { value: "print", label: "Print" },
  { value: "share", label: "Share" },
  { value: "duplicate", label: "Duplicate" },
  { value: "rename", label: "Rename" },
  { value: "move", label: "Move To..." },
  { value: "copy", label: "Copy To..." },
  { value: "delete", label: "Delete" },
  { value: "find", label: "Find" },
  { value: "replace", label: "Replace" },
  { value: "preferences", label: "Preferences" },
  { value: "settings", label: "Settings" },
  { value: "help", label: "Help" },
  { value: "about", label: "About" },
  { value: "quit", label: "Quit" },
]
