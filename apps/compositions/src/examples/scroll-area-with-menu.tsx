import { Button, Menu, Portal, ScrollArea } from "@chakra-ui/react"
import { useId } from "react"

export const ScrollAreaWithMenu = () => {
  const contentId = useId()
  return (
    <Menu.Root ids={{ content: contentId }}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Menu with Scroll
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MenuContent maxH="80" w="64" id={contentId}>
            {menuItems.map((item) => (
              <Menu.Item key={item.value} value={item.value}>
                {item.label}
              </Menu.Item>
            ))}
          </MenuContent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

function MenuContent(props: Menu.ContentProps) {
  const { id, children, ...rest } = props
  return (
    <ScrollArea.Root overflow="visible" ids={{ viewport: id }}>
      <ScrollArea.Viewport asChild>
        <Menu.Content {...rest}>
          {children}
          <ScrollArea.Scrollbar bg="transparent">
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
        </Menu.Content>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  )
}

const menuItems = [
  { value: "profile", label: "Profile" },
  { value: "settings", label: "Settings" },
  { value: "notifications", label: "Notifications" },
  { value: "messages", label: "Messages" },
  { value: "documents", label: "Documents" },
  { value: "files", label: "Files" },
  { value: "images", label: "Images" },
  { value: "videos", label: "Videos" },
  { value: "music", label: "Music" },
  { value: "downloads", label: "Downloads" },
  { value: "share", label: "Share" },
  { value: "copy", label: "Copy" },
  { value: "edit", label: "Edit" },
  { value: "favorites", label: "Favorites" },
  { value: "liked", label: "Liked Items" },
  { value: "bookmarks", label: "Bookmarks" },
  { value: "flagged", label: "Flagged Items" },
  { value: "help", label: "Help & Support" },
  { value: "trash", label: "Trash" },
  { value: "logout", label: "Logout" },
]
