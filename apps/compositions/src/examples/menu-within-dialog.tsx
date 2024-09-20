import { HStack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogContent,
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
import Lorem from "react-lorem-ipsum"

export const MenuWithinDialog = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <HStack justify="space-between" mb="6">
            <DialogTitle>Welcome to the menu</DialogTitle>
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Menu
                </Button>
              </MenuTrigger>
              <MenuContent portalled={false}>
                <MenuItem value="new-txt">New Text File</MenuItem>
                <MenuItem value="new-file">New File...</MenuItem>
                <MenuItem value="new-win">New Window</MenuItem>
                <MenuItem value="open-file">Open File...</MenuItem>
                <MenuItem value="export">Export</MenuItem>
              </MenuContent>
            </MenuRoot>
          </HStack>
          <Lorem p={4} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
