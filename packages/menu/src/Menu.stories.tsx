import { createChakra } from "@chakra-ui/system"
import * as React from "react"
import { MenuButton, MenuItem, MenuList, Menu } from "./Menu"

export default {
  title: "Menu",
}

const Submenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
  return (
    <Menu>
      <MenuButton isSubmenu ref={ref} {...props}>
        Submenu >>
      </MenuButton>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
      </MenuList>
    </Menu>
  )
})

export function SampleMenu() {
  return (
    <Menu>
      <MenuButton variant="solid" variantColor="green" variantSize="sm">
        Open menu
      </MenuButton>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
        <MenuItem
          onClick={() => {
            console.log("menu 3 clicked")
          }}
        >
          Menu 3
        </MenuItem>
        <MenuItem as={Submenu} />
        <MenuItem>Menu 4</MenuItem>
      </MenuList>
    </Menu>
  )
}
