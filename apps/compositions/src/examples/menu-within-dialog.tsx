"use client"

import { Button } from "@chakra-ui/react"
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
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
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>Welcome to the menu</DialogTitle>
        </DialogHeader>
        <DialogBody spaceY="4">
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
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
