import { Portal } from "@chakra-ui/portal"
import { chakra } from "@chakra-ui/system"
import { FadeProps, Fade } from "@chakra-ui/transition"
import * as React from "react"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMenuState,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "./Menu"
import { FaSearch, FaUndoAlt, FaTruck, FaUnlink } from "react-icons/fa"

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

const words = [
  "About Visual Studio Code",
  "Check for updates",
  "Preferences",
  "Services",
  "Hide Visual Studio Code",
  "Show All",
]

export const basic = () => (
  <Menu>
    <MenuButton variant="solid" colorScheme="teal" size="sm">
      Open Wakanda menu
    </MenuButton>
    <MenuList>
      {words.map(word => (
        <MenuItem key={word}>{word}</MenuItem>
      ))}
    </MenuList>
  </Menu>
)

export const disabledMenuItem = () => (
  <Menu>
    <MenuButton variant="solid" colorScheme="green" size="sm">
      Open menu
    </MenuButton>
    <MenuList>
      <MenuItem color="gray.700" icon={<FaSearch />} command="⌥T">
        Search
      </MenuItem>
      <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>
      <MenuItem isDisabled icon={<FaTruck />}>
        Delivery
      </MenuItem>
      <MenuItem icon={<FaUnlink />}>Unlink</MenuItem>
    </MenuList>
  </Menu>
)

export const disabledButFocusableMenuItem = () => (
  <Menu>
    <MenuButton variant="solid" colorScheme="green" size="sm">
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
    <MenuButton variant="solid" colorScheme="green" size="sm">
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

const Submenu2 = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
  <Menu>
    <MenuButton isSubmenu ref={ref} {...props}>
      Other
    </MenuButton>
    <Portal>
      <MenuList>
        <MenuItem>Twitch</MenuItem>
        <MenuItem>Pinterest</MenuItem>
      </MenuList>
    </Portal>
  </Menu>
))

const Submenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
  <Menu>
    <MenuButton isSubmenu ref={ref} {...props}>
      Other
    </MenuButton>
    <Portal>
      <MenuList>
        <MenuItem>Twitter</MenuItem>
        <MenuItem>Facebook</MenuItem>
        <MenuItem as={Submenu2} />
      </MenuList>
    </Portal>
  </Menu>
))

export const nestedMenus = () => (
  <Menu>
    <MenuButton colorScheme="teal">Open menu</MenuButton>
    <Portal>
      <MenuList>
        <MenuItem command="⌘T">New Tab</MenuItem>
        <MenuItem command="⌘N">New Window</MenuItem>
        <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
        <MenuItem as={Submenu} />
        <MenuItem command="⌘O">Open File...</MenuItem>
      </MenuList>
    </Portal>
  </Menu>
)

const MenuTransition = (props: FadeProps) => {
  const menu = useMenuState()
  return <Fade in={menu.isOpen} unmountOnExit={false} {...props} />
}

export const withTransition = () => (
  <Menu>
    <MenuButton variant="solid" colorScheme="green" size="sm">
      Open menu
    </MenuButton>
    <MenuTransition>
      {styles => (
        <MenuList
          style={{ ...styles, transformOrigin: "center" }}
          hidden={false}
        >
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
      )}
    </MenuTransition>
  </Menu>
)

export const withGroupedItems = () => (
  <Menu>
    <MenuButton variant="solid" colorScheme="green" size="sm">
      Open menu
    </MenuButton>
    <MenuList minWidth="240px">
      <MenuGroup title="Group 1">
        <MenuItem>Share...</MenuItem>
        <MenuItem>Move...</MenuItem>
      </MenuGroup>
      <MenuGroup title="Group 2">
        <MenuItem isDisabled>Rename...</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
)

export const withMenuRadio = () => (
  <Menu closeOnSelect={false}>
    <MenuButton variant="solid" colorScheme="green" size="sm">
      Open menu
    </MenuButton>

    <MenuList minWidth="240px">
      <MenuOptionGroup defaultValue="val1" title="Order" type="radio">
        <MenuItemOption _checked={{ color: "blue.500" }} value="val-1">
          Option 1
        </MenuItemOption>
        <MenuItemOption _checked={{ color: "blue.500" }} value="val-2">
          Option 2
        </MenuItemOption>
      </MenuOptionGroup>

      <MenuDivider />

      <MenuOptionGroup title="Country" type="checkbox">
        <MenuItemOption _checked={{ color: "blue.500" }} value="email">
          Email
        </MenuItemOption>
        <MenuItemOption _checked={{ color: "blue.500" }} value="phone">
          Phone
        </MenuItemOption>
        <MenuItemOption _checked={{ color: "blue.500" }} value="country">
          Country
        </MenuItemOption>
      </MenuOptionGroup>
    </MenuList>
  </Menu>
)
