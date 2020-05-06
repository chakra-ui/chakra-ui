import { Portal } from "@chakra-ui/portal"
import { chakra } from "@chakra-ui/system"
import { ensureFocus } from "@chakra-ui/utils"
import { Image } from "@chakra-ui/image"
import * as React from "react"
import {
  FaSearch,
  FaTruck,
  FaUndoAlt,
  FaUnlink,
  FaChevronDown,
} from "react-icons/fa"
import Transition, { TransitionStatus } from "react-transition-group/Transition"
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useMenuContext,
} from "./Menu"

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

export const Basic = () => (
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

export const WithDisabledItem = () => (
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

export const WithDisabledButFocusableItem = () => (
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

export const WithPortal = () => (
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
    <MenuButton ref={ref} {...props}>
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
    <MenuButton ref={ref} {...props}>
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

export const WithNestedMenu = () => (
  <Menu>
    <MenuButton size="sm" colorScheme="teal">
      Open menu
    </MenuButton>
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

const MenuTransition = (props: {
  children: (styles: any) => React.ReactNode
}) => {
  const menu = useMenuContext()

  const styles = {
    base: {
      opacity: 0,
      transformOrigin: "top left",
      transform: "scale(0.8)",
      transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.320, 1.175)",
      transitionProperty: "opacity, transform",
      transitionDuration: "150ms",
      willChange: "opacity, transform",
    },
    entered: {
      opacity: 1,
      transform: "scale(1)",
    },
    exiting: {
      opacity: 0,
      transform: "scale(0.8)",
    },
  } as any

  const getStyle = (state: TransitionStatus) => ({
    ...styles.base,
    ...styles[state],
  })

  return (
    <Transition
      onEnter={node => {
        node.hidden = false
      }}
      onExited={node => {
        node.hidden = true
        node.style.pointerEvents = null
        // persist focus restoration
        ensureFocus(menu.buttonRef.current)
      }}
      onExit={node => {
        node.hidden = undefined
      }}
      onExiting={node => {
        node.style.pointerEvents = "none"
      }}
      timeout={{ enter: 0, exit: 150 }}
      in={menu.isOpen}
    >
      {state => props.children(getStyle(state))}
    </Transition>
  )
}

export const WithTransition = () => (
  <Menu>
    <MenuButton variant="solid" colorScheme="green" size="sm">
      Open menu
    </MenuButton>
    <MenuTransition>
      {styles => (
        <MenuList css={styles}>
          <MenuItem>Menu 1</MenuItem>
          <MenuItem>Menu 2</MenuItem>
          <MenuItem>Menu 3</MenuItem>
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
      <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>

      <MenuDivider />

      <MenuOptionGroup defaultValue="val1" title="Order" type="radio">
        <MenuItemOption value="val-1">Option 1</MenuItemOption>
        <MenuItemOption value="val-2">Option 2</MenuItemOption>
      </MenuOptionGroup>

      <MenuDivider />

      <MenuOptionGroup title="Country" type="checkbox">
        <MenuItemOption value="email">Email</MenuItemOption>
        <MenuItemOption value="phone">Phone</MenuItemOption>
        <MenuItemOption value="country">Country</MenuItemOption>
      </MenuOptionGroup>
    </MenuList>
  </Menu>
)

export const WithInternalState = () => (
  <Menu>
    {({ isOpen }) => (
      <React.Fragment>
        <MenuButton>{isOpen ? "Close" : "Open"}</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem onClick={() => alert("Kagebunshin")}>
            Create a Copy
          </MenuItem>
        </MenuList>
      </React.Fragment>
    )}
  </Menu>
)

export const WithLetterNavigation = () => (
  <Menu>
    <MenuButton
      px={4}
      py={2}
      transition="all 0.2s"
      borderRadius="md"
      borderWidth="1px"
      _hover={{ bg: "gray.100" }}
      _expanded={{ bg: "red.200" }}
      _focus={{ outline: 0, boxShadow: "outline" }}
    >
      File <FaChevronDown />
    </MenuButton>
    <MenuList>
      <MenuItem>New File</MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuDivider />
      <MenuItem>Open...</MenuItem>
      <MenuItem>Save File</MenuItem>
    </MenuList>
  </Menu>
)

export const JustAnotherExample = () => (
  <Menu>
    <MenuButton>Your Cats</MenuButton>
    <MenuList>
      <MenuItem minH="48px">
        <Image
          boxSize="2rem"
          borderRadius="full"
          src="https://placekitten.com/100/100"
          alt="Fluffybuns the destroyer"
          mr="12px"
        />
        <span>Fluffybuns the Destroyer</span>
      </MenuItem>
      <MenuItem minH="40px">
        <Image
          boxSize="2rem"
          borderRadius="full"
          src="https://placekitten.com/120/120"
          alt="Simon the pensive"
          mr="12px"
        />
        <span>Simon the pensive</span>
      </MenuItem>
    </MenuList>
  </Menu>
)

export const WithLink = () => (
  <Menu>
    <MenuButton>Actions</MenuButton>
    <MenuList>
      <MenuItem>Download</MenuItem>
      <MenuItem>Create a Copy</MenuItem>
      <MenuItem>Mark as Draft</MenuItem>
      <MenuItem>Delete</MenuItem>
      <MenuItem as="a" href="#">
        Attend a Workshop
      </MenuItem>
    </MenuList>
  </Menu>
)

export const EmptyMenu = () => (
  <Menu>
    <MenuButton>Actions</MenuButton>
    <MenuList></MenuList>
  </Menu>
)
