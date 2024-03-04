import * as React from "react"
import {
  FaChevronDown,
  FaSearch,
  FaTruck,
  FaUndoAlt,
  FaUnlink,
} from "react-icons/fa"
import { Button, Dialog, Image, Portal, chakra } from "../src"
import { Menu, useMenuItem } from "../src/components/menu"

export * from "./menu.stories"

export default {
  title: "Overlay / Menu",
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

function logEvents(e: React.MouseEvent | React.KeyboardEvent | undefined) {
  if (e && e.persist) {
    // Stop React from complaining about non-persisting events.
    e.persist()
  }
  console.log(e)
}

export const Basic = () => (
  <div style={{ minHeight: 4000, paddingTop: 500 }}>
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="teal" size="sm">
          Open Wakanda menu <FaUnlink />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {words.map((word) => (
            <Menu.Item key={word} onClick={logEvents}>
              {word}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  </div>
)

export const LazyMenu = () => (
  <Menu.Root isLazy>
    <Menu.Trigger asChild>
      <Button>Open Wakanda menu</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        {words.map((word) => (
          <Menu.Item key={word} onClick={logEvents}>
            {word}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithDisabledItem = () => (
  <>
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="green" size="sm">
          Open menu
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item isDisabled icon={<FaSearch />} command="⌥T">
            Search
          </Menu.Item>
          <Menu.Item icon={<FaUndoAlt />}>Undo</Menu.Item>
          <Menu.Item icon={<FaTruck />}>Delivery</Menu.Item>
          <Menu.Item isDisabled icon={<FaUnlink />}>
            Unlink
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="green" size="sm">
          Open menu
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item icon={<FaSearch />} command="⌥T">
            Search
          </Menu.Item>
          <Menu.Item icon={<FaUndoAlt />}>Undo</Menu.Item>
          <Menu.Item isDisabled icon={<FaTruck />}>
            Delivery
          </Menu.Item>
          <Menu.Item icon={<FaUnlink />}>Unlink</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  </>
)

export const WithDisabledButFocusableItem = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorScheme="green" size="sm">
        Open menu
      </Button>
      Open menu
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item>Menu 1</Menu.Item>
        <Menu.Item>Menu 2</Menu.Item>
        <Menu.Item isDisabled isFocusable>
          Menu 3
        </Menu.Item>
        <Menu.Item>Menu 4</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithToggleableMenuItems = () => {
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

      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="solid" colorScheme="green" size="sm">
            Open menu
          </Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            {items.map(({ content, icon, isDisabled, command }) => (
              <Menu.Item
                key={content}
                isDisabled={isDisabled}
                icon={icon}
                command={command}
              >
                {content}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  )
}

export const WithPortal = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorScheme="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item>Menu 1</Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
          <Menu.Item>Menu 3</Menu.Item>
          <Menu.Item>Menu 4</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)

export const withGroupedItems = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="solid" colorScheme="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth="240px">
      <Menu.Group title="Group 1">
        <Menu.Item>Share...</Menu.Item>
        <Menu.Item>Move...</Menu.Item>
      </Menu.Group>
      <Menu.Group title="Group 2">
        <Menu.Item isDisabled>Rename...</Menu.Item>
        <Menu.Item>Delete...</Menu.Item>
      </Menu.Group>
    </Menu.Content>
  </Menu.Root>
)

export const withMenuRadio = () => (
  <Menu.Root closeOnSelect={false}>
    <Menu.Trigger asChild>
      <Button variant="solid" colorScheme="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>

    <Menu.Positioner>
      <Menu.Content minWidth="240px">
        <Menu.Item icon={<FaUndoAlt />}>Undo</Menu.Item>
        <Menu.Divider />

        <Menu.OptionGroup defaultValue="val-1" title="Order" type="radio">
          <Menu.ItemOption value="val-1">Option 1</Menu.ItemOption>
          <Menu.ItemOption value="val-2">Option 2</Menu.ItemOption>
        </Menu.OptionGroup>

        <Menu.Divider />
        <Menu.OptionGroup title="Country" type="checkbox">
          <Menu.ItemOption value="email">Email</Menu.ItemOption>
          <Menu.ItemOption value="phone">Phone</Menu.ItemOption>
          <Menu.ItemOption value="country">Country</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const withDisabledIconInMenuRadio = () => (
  <Menu.Root closeOnSelect={false}>
    <Menu.Trigger asChild>
      <Button variant="solid" colorScheme="green" size="sm">
        Open menu
      </Button>
    </Menu.Trigger>

    <Menu.Content minWidth="240px">
      <Menu.OptionGroup title="Country" type="checkbox">
        <Menu.ItemOption icon={null} value="email">
          Email
        </Menu.ItemOption>
        <Menu.ItemOption icon={null} value="phone">
          Phone
        </Menu.ItemOption>
        <Menu.ItemOption icon={null} value="country">
          Country
        </Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu.Content>
  </Menu.Root>
)

export const WithInternalState = () => (
  <Menu.Root>
    {(api) => (
      <>
        <Menu.Trigger asChild>
          <Button>{api.isOpen ? "Close" : "Open"}</Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item>Download</Menu.Item>
            <Menu.Item onClick={() => alert("Kagebunshin")}>
              Create a Copy
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </>
    )}
  </Menu.Root>
)

export const WithLetterNavigation = () => (
  <Menu.Root>
    <Menu.Trigger
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
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item>New File</Menu.Item>
        <Menu.Item>New Window</Menu.Item>
        <Menu.Divider />
        <Menu.Item>Open...</Menu.Item>
        <Menu.Item>Save File</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithScrolling = () => {
  const items = React.useMemo(
    () => Array.from({ length: 30 }).map((_, i) => `Option ${i}`),
    [],
  )
  return (
    <Menu.Root>
      <Menu.Trigger>Choose an option</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content maxHeight="15rem" overflowY="scroll">
          {items.map((value, i) => (
            <Menu.Item key={i} value={value}>
              {value}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const JustAnotherExample = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button>Your Cats</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item minH="48px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/100/100"
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <span>Fluffybuns the Destroyer</span>
        </Menu.Item>
        <Menu.Item minH="40px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/120/120"
            alt="Simon the pensive"
            mr="12px"
          />
          <span>Simon the pensive</span>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const WithLink = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button>Actions</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item>Download</Menu.Item>
        <Menu.Item>Create a Copy</Menu.Item>
        <Menu.Item>Mark as Draft</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
        <Menu.Item as="a" href="#">
          Attend a Workshop
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const SplitButton = () => (
  <chakra.div display="flex">
    <Button variant="outline" size="sm" borderRightRadius="0" mr="-1px">
      Welcome
    </Button>
    <Menu.Root placement="bottom-end" gutter={4}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" fontSize="xs" borderLeftRadius="0">
          <FaChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content minW="160px">
          <Menu.Item fontSize="14px">Menu 1</Menu.Item>
          <Menu.Item fontSize="14px">Menu 2</Menu.Item>
          <Menu.Item fontSize="14px">Menu 3</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  </chakra.div>
)

export const WithinForm = () => {
  return (
    <form>
      <fieldset>
        <legend>regular Menu.Content with Menu.Items</legend>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button>do something</Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item isDisabled>Download</Menu.Item>
              <Menu.Item>Create a Copy</Menu.Item>
              <Menu.Item>Mark as Draft</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
              <Menu.Item as="a" href="#">
                Attend a Workshop
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </fieldset>
    </form>
  )
}

export const GroupWithDivider = () => {
  return (
    <Menu.Root>
      <Menu.Trigger>Welcome</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.OptionGroup type="radio">
            <Menu.ItemOption value="A">A</Menu.ItemOption>
            <Menu.ItemOption value="B">B</Menu.ItemOption>
            <Menu.ItemOption value="C">C</Menu.ItemOption>
            <Menu.Divider />
            <Menu.ItemOption value="D">D</Menu.ItemOption>
            <Menu.ItemOption value="E">E</Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const WithCloseOnSelect = () => (
  <Menu.Root>
    <Menu.Trigger>Welcome</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.OptionGroup type="radio">
          <Menu.ItemOption closeOnSelect={false} value="A">
            Option 1 (false)
          </Menu.ItemOption>
          <Menu.ItemOption value="B">Option 2</Menu.ItemOption>
          <Menu.ItemOption value="C">Option 3</Menu.ItemOption>
          <Menu.Divider />
          <Menu.ItemOption value="D">Option 4</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
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
    <Menu.Root>
      <Menu.Trigger>Welcome</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <MenuItemWithInput />
          <Menu.Item>Menu 1</Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
          <Menu.Item>Menu 3</Menu.Item>
          <Menu.Item>Menu 4</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const MenuWithOverflowingContent = () => {
  return (
    <Menu.Root>
      <Menu.Trigger>Welcome</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content maxHeight="200px" overflowY="hidden">
          <Menu.Item>Menu 1</Menu.Item>
          <Menu.Item>Menu 2</Menu.Item>
          <Menu.Item>Menu 3</Menu.Item>
          <Menu.Item>Menu 4</Menu.Item>
          <Menu.Item>Menu 5</Menu.Item>
          <Menu.Item>Menu 6</Menu.Item>
          <Menu.Item>Menu 7</Menu.Item>
          <Menu.Item>Menu 8</Menu.Item>
          <Menu.Item>Menu 9</Menu.Item>
          <Menu.Item>Menu 10</Menu.Item>
          <Menu.Item>Menu 11</Menu.Item>
          <Menu.Item>Menu 12</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const MenuPerformanceTest = () => {
  return [...Array(100)].map((_, index) => (
    <div key={index}>
      <Menu.Root eventListeners={false}>
        <Menu.Trigger>Menu {index + 1}</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item>Menu 1</Menu.Item>
            <Menu.Item>Menu 2</Menu.Item>
            <Menu.Item>Menu 3</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  ))
}

export const WithoutMenuButton = () => {
  const [isOpen, setOpen] = React.useState(false)
  const open = () => setOpen(true)
  const close = () => setOpen(false)

  React.useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.code === "KeyK") {
        ev.preventDefault()
        open()
      }
    }
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [])

  return (
    <>
      <Dialog.Root
        onClose={close}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
      >
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content minHeight={100} background="none" boxShadow="none">
            <Dialog.Body
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Menu.Root isOpen closeOnSelect onClose={close}>
                <Menu.Content paddingY={5}>
                  <Menu.Item>
                    Saves or updates the code in Stately Registry
                  </Menu.Item>
                  <Menu.Item>Visualizes the current editor code</Menu.Item>
                </Menu.Content>
              </Menu.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
      <p>Press Cmd + K to open</p>
    </>
  )
}

export const ProgrammaticFocusMenuOption = () => {
  const item = React.useRef<HTMLButtonElement>(null)
  return (
    <Menu.Root initialFocusRef={item}>
      <Menu.Trigger>Welcome</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.OptionGroup type="radio">
            <Menu.ItemOption value="A">A</Menu.ItemOption>
            <Menu.ItemOption value="B">B</Menu.ItemOption>
            <Menu.ItemOption ref={item} value="C">
              C
            </Menu.ItemOption>
            <Menu.Divider />
            <Menu.ItemOption value="D">D</Menu.ItemOption>
            <Menu.ItemOption value="E">E</Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

export const ProgrammaticFocusMenuItem = () => {
  const item = React.useRef<HTMLButtonElement>(null)
  return (
    <Menu.Root initialFocusRef={item}>
      <Menu.Trigger>Welcome</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item id="menu-1">Menu 1</Menu.Item>
          <Menu.Item id="menu-2" ref={item}>
            Menu 2
          </Menu.Item>
          <Menu.Item id="menu-3">Menu 3</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
