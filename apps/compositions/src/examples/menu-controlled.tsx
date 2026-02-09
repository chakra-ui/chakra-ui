"use client"

import { Button, Code, Menu, Portal, Stack } from "@chakra-ui/react"
import { useState } from "react"

export const MenuControlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <Stack gap="4" align="flex-start">
      <Code>open: {String(open)}</Code>
      <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-txt">New Text File</Menu.Item>
              <Menu.Item value="new-file">New File...</Menu.Item>
              <Menu.Item value="new-win">New Window</Menu.Item>
              <Menu.Item value="open-file">Open File...</Menu.Item>
              <Menu.Item value="export">Export</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Stack>
  )
}
