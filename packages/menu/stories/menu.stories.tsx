import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { Portal } from "@chakra-ui/portal"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  FaChevronDown,
  FaSearch,
  FaTruck,
  FaUndoAlt,
  FaUnlink,
} from "react-icons/fa"
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useMenuItem,
} from "../src"

const words = [
  "About Visual Studio Code",
  "Check for updates",
  "Preferences",
  "Services",
  "Hide Visual Studio Code",
  "Show All",
]

function logEvents(e: React.MouseEvent | React.KeyboardEvent | undefined) {
  if (e && e.persist) {
    // Stop react from complaining about unpersisted events.
    e.persist()
  }
  console.log(e)
}

export const Basic = () => (
  <div style={{ minHeight: 4000, paddingTop: 500 }}>
    <Menu>
      <MenuButton
        as={Button}
        variant="solid"
        colorScheme="teal"
        size="sm"
        rightIcon={<FaUnlink />}
      >
        Open Wakanda menu
      </MenuButton>
      <MenuList>
        {words.map((word) => (
          <MenuItem key={word} onClick={logEvents}>
            {word}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  </div>
)

export const LazyMenu = () => (
  <Menu isLazy>
    <MenuButton as={Button}>Open Wakanda menu</MenuButton>
    <MenuList>
      {words.map((word) => (
        <MenuItem key={word} onClick={logEvents}>
          {word}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
)

export const WithDisabledItem = () => (
  <>
    <Menu>
      <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
        Open menu
      </MenuButton>
      <MenuList>
        <MenuItem isDisabled icon={<FaSearch />} command="⌥T">
          Search
        </MenuItem>
        <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>
        <MenuItem icon={<FaTruck />}>Delivery</MenuItem>
        <MenuItem isDisabled icon={<FaUnlink />}>
          Unlink
        </MenuItem>
      </MenuList>
    </Menu>

    <Menu>
      <MenuButton as={Button} variant="solid" colorScheme="red" size="sm">
        Open menu
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaSearch />} command="⌥T">
          Search
        </MenuItem>
        <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>
        <MenuItem isDisabled icon={<FaTruck />}>
          Delivery
        </MenuItem>
        <MenuItem icon={<FaUnlink />}>Unlink</MenuItem>
      </MenuList>
    </Menu>
  </>
)

export const WithDisabledButFocusableItem = () => (
  <Menu>
    <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
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

export const WithTogglableMenuItems = () => {
  const [items, setItems] = React.useState<
    {
      content: string
      icon: React.ReactElement
      isDisabled?: boolean
      command?: string
    }[]
  >([
    {
      content: "Search",
      icon: <FaSearch />,
      isDisabled: true,
      command: "⌥T",
    },
    {
      content: "Delivery",
      icon: <FaUndoAlt />,
    },
    {
      content: "Unlink",
      icon: <FaUnlink />,
      isDisabled: true,
    },
  ])

  return (
    <>
      <Button
        onClick={() => {
          return setItems([
            {
              content: "Search",
              icon: <FaSearch />,
              isDisabled: false,
              command: "⌥T",
            },
            {
              content: "Delivery",
              icon: <FaUndoAlt />,
            },
            {
              content: "Unlink",
              icon: <FaUnlink />,
              isDisabled: true,
            },
          ])
        }}
      >
        Enable Search
      </Button>
      <Menu>
        <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
          Open menu
        </MenuButton>
        <MenuList>
          {items.map(({ content, icon, isDisabled, command }) => (
            <MenuItem
              key={content}
              isDisabled={isDisabled}
              icon={icon}
              command={command}
            >
              {content}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export const WithPortal = () => (
  <Menu>
    <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
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

export const withGroupedItems = () => (
  <Menu>
    <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
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
    <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
      Open menu
    </MenuButton>

    <MenuList minWidth="240px">
      <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>

      <MenuDivider />

      <MenuOptionGroup defaultValue="val-1" title="Order" type="radio">
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
      <>
        <MenuButton as={Button}>{isOpen ? "Close" : "Open"}</MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem onClick={() => alert("Kagebunshin")}>
            Create a Copy
          </MenuItem>
        </MenuList>
      </>
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
    <MenuButton as={Button}>Your Cats</MenuButton>
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
    <MenuButton as={Button}>Actions</MenuButton>
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

export const SplitButton = () => (
  <chakra.div display="flex">
    <Button variant="outline" size="sm" borderRightRadius="0" mr="-1px">
      Welcome
    </Button>
    <Menu placement="bottom-end" gutter={4}>
      <MenuButton
        as={Button}
        variant="outline"
        size="sm"
        fontSize="xs"
        borderLeftRadius="0"
      >
        <FaChevronDown />
      </MenuButton>
      <MenuList minW="160px">
        <MenuItem fontSize="14px">Menu 1</MenuItem>
        <MenuItem fontSize="14px">Menu 2</MenuItem>
        <MenuItem fontSize="14px">Menu 3</MenuItem>
      </MenuList>
    </Menu>
  </chakra.div>
)

export const WithinForm = () => {
  return (
    <form>
      <fieldset>
        <legend>regular MenuList with MenuItems</legend>
        <Menu>
          <MenuButton as={Button}>do something</MenuButton>
          <MenuList>
            <MenuItem isDisabled>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem as="a" href="#">
              Attend a Workshop
            </MenuItem>
          </MenuList>
        </Menu>
      </fieldset>
    </form>
  )
}

export const GroupWithDivider = () => {
  return (
    <Menu>
      <MenuButton>Welcome</MenuButton>
      <MenuList>
        <MenuOptionGroup type="radio">
          <MenuItemOption value="A">A</MenuItemOption>
          <MenuItemOption value="B">B</MenuItemOption>
          <MenuItemOption value="C">C</MenuItemOption>
          <MenuDivider />
          <MenuItemOption value="D">D</MenuItemOption>
          <MenuItemOption value="E">E</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export const WithCloseOnSelect = () => (
  <Menu>
    <MenuButton>Welcome</MenuButton>
    <MenuList>
      <MenuOptionGroup type="radio">
        <MenuItemOption closeOnSelect={false} value="A">
          Option 1 (false)
        </MenuItemOption>
        <MenuItemOption value="B">Option 2</MenuItemOption>
        <MenuItemOption value="C">Option 3</MenuItemOption>
        <MenuDivider />
        <MenuItemOption value="D">Option 4</MenuItemOption>
      </MenuOptionGroup>
    </MenuList>
  </Menu>
)

const MenuItemWithInput = (props: any) => {
  const { role: _, ...rest } = useMenuItem(props)
  return (
    <div>
      <input {...rest} />
    </div>
  )
}

export const MenuWithInput = () => {
  return (
    <Menu>
      <MenuButton>Welcome</MenuButton>
      <MenuList>
        <MenuItemWithInput />
        <MenuItem>Menu 1</MenuItem>
        <MenuItem>Menu 2</MenuItem>
        <MenuItem>Menu 3</MenuItem>
        <MenuItem>Menu 4</MenuItem>
      </MenuList>
    </Menu>
  )
}
