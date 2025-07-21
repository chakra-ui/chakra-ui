"use client"

import { Button, Dialog, Menu, Portal } from "@chakra-ui/react"
import Lorem from "react-lorem-ipsum"

export const MenuWithinDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Welcome to the menu</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              <DialogMenu />
              <Lorem p={1} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const DialogMenu = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          Menu
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="new-txt">New Text File</Menu.Item>
          <Menu.Item value="new-file">New File...</Menu.Item>
          <Menu.Item value="new-win">New Window</Menu.Item>
          <Menu.Item value="open-file">Open File...</Menu.Item>
          <Menu.Item value="export">Export</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
