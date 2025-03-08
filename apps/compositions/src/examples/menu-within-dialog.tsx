"use client"

import { Button, Dialog, Portal } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { useRef } from "react"
import Lorem from "react-lorem-ipsum"

export const MenuWithinDialog = () => {
  const contentRef = useRef<HTMLDivElement>(null)
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
          <Dialog.Content ref={contentRef}>
            <Dialog.Header>
              <Dialog.Title>Welcome to the menu</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY="4">
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Menu
                  </Button>
                </MenuTrigger>
                <MenuContent portalRef={contentRef}>
                  <MenuItem value="new-txt">New Text File</MenuItem>
                  <MenuItem value="new-file">New File...</MenuItem>
                  <MenuItem value="new-win">New Window</MenuItem>
                  <MenuItem value="open-file">Open File...</MenuItem>
                  <MenuItem value="export">Export</MenuItem>
                </MenuContent>
              </MenuRoot>
              <Lorem p={1} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
