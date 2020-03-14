import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Menu, MenuButton, MenuItem, MenuList } from "./Menu"
import { Portal } from "@chakra-ui/portal"

export default {
  title: "Menu",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => (
  <Menu>
    <MenuButton variant="solid" variantColor="green" variantSize="sm">
      Open menu
    </MenuButton>
    <MenuList>
      <MenuItem>Menu 1</MenuItem>
      <MenuItem>Menu 2</MenuItem>
      <MenuItem>Menu 3</MenuItem>
      <MenuItem>Menu 4</MenuItem>
    </MenuList>
  </Menu>
)

export const disabledMenuItem = () => (
  <Menu>
    <MenuButton variant="solid" variantColor="green" variantSize="sm">
      Open menu
    </MenuButton>
    <MenuList>
      <MenuItem>Menu 1</MenuItem>
      <MenuItem>Menu 2</MenuItem>
      <MenuItem isDisabled>Menu 3</MenuItem>
      <MenuItem>Menu 4</MenuItem>
    </MenuList>
  </Menu>
)

export const disabledButFocusableMenuItem = () => (
  <Menu>
    <MenuButton variant="solid" variantColor="green" variantSize="sm">
      Open menu
    </MenuButton>
    <MenuList>
      <MenuItem>Menu 1</MenuItem>
      <MenuItem>Menu 2</MenuItem>
      <MenuItem isDisabled isFocusable>
        Menu 3
      </MenuItem>
      <MenuItem>Menu 4</MenuItem>
    </MenuList>
  </Menu>
)

export const withPortal = () => (
  <Menu>
    <MenuButton variant="solid" variantColor="green" variantSize="sm">
      Open menu
    </MenuButton>
    <Portal>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
        <MenuItem>Menu 3</MenuItem>
        <MenuItem>Menu 4</MenuItem>
      </MenuList>
    </Portal>
  </Menu>
)

const Submenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
  <Menu>
    <MenuButton isSubmenu ref={ref} {...props}>
      Submenu >>
    </MenuButton>
    <Portal>
      <MenuList>
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
      </MenuList>
    </Portal>
  </Menu>
))

export const nestedMenus = () => (
  <Menu>
    <MenuButton variant="solid" variantColor="green" variantSize="sm">
      Open menu
    </MenuButton>
    <Portal>
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
    </Portal>
  </Menu>
)
