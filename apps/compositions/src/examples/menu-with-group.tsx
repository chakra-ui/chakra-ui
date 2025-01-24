import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "compositions/ui/menu"

export const MenuWithGroup = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline">Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItemGroup title="Styles">
          <MenuItem value="bold">Bold</MenuItem>
          <MenuItem value="underline">Underline</MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItemGroup title="Align">
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}
