import {
  render,
  testA11y,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@chakra-ui/test-utils"
import { Portal } from "@chakra-ui/portal"
import * as React from "react"
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "../src"
import { Button } from "@chakra-ui/button"
import { FaSearch, FaTruck, FaUndoAlt, FaUnlink } from "react-icons/fa"

const words = [
  "About Visual Studio Code",
  "Check for updates",
  "Preferences",
  "Services",
  "Hide Visual Studio Code",
  "Show All",
]

test("passes a11y test", async () => {
  await testA11y(
    <Menu>
      <MenuButton
        as={Button}
        variant="solid"
        colorScheme="teal"
        size="sm"
        // rightIcon={<FaUnlink />}
      >
        Open Wakanda menu
      </MenuButton>
      <MenuList>
        {words.map((word) => (
          <MenuItem key={word}>{word}</MenuItem>
        ))}
      </MenuList>
    </Menu>,
  )
})

test("does not render MenuList Items if Menu isLazy", () => {
  render(
    <Menu isLazy>
      <MenuButton
        as={Button}
        variant="solid"
        colorScheme="teal"
        size="sm"
        // rightIcon={<FaUnlink />}
      >
        Open Wakanda menu
      </MenuButton>
      <MenuList>
        {words.map((word) => (
          <MenuItem key={word}>{word}</MenuItem>
        ))}
      </MenuList>
    </Menu>,
  )

  expect(screen.queryByText(words[0])).not.toBeInTheDocument()
})

test("sets correct aria attributes on disabled MenuItems", () => {
  render(
    <Menu>
      <MenuButton as={Button}>Open menu</MenuButton>
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
    </Menu>,
  )

  expect(screen.getByText("Delivery").parentElement).toHaveAttribute(
    "aria-disabled",
    "true",
  )
})

test("does not fire onClick on disabled MenuItem", () => {
  const onClick = jest.fn()

  render(
    <Menu>
      <MenuButton as={Button}>Open menu</MenuButton>
      <MenuList>
        <MenuItem icon={<FaSearch />} command="⌥T">
          Search
        </MenuItem>
        <MenuItem icon={<FaUndoAlt />}>Undo</MenuItem>
        <MenuItem isDisabled icon={<FaTruck />} onClick={onClick}>
          Delivery
        </MenuItem>
        <MenuItem icon={<FaUnlink />}>Unlink</MenuItem>
      </MenuList>
    </Menu>,
  )

  const span = screen.getByText("Delivery")
  const button = span.parentNode!

  fireEvent.click(button)

  expect(onClick).not.toHaveBeenCalled()
})

/**
 * skipped because broken
 *
 * @see https://github.com/chakra-ui/chakra-ui/issues/1651
 */
test.skip("allows focusing disabled MenuItems given isFocusable", async () => {
  render(
    <Menu>
      <MenuButton as={Button}>Open menu</MenuButton>
      <MenuList>
        <MenuItem isDisabled isFocusable icon={<FaTruck />}>
          Delivery
        </MenuItem>
      </MenuList>
    </Menu>,
  )

  const span = screen.getByText("Delivery")
  const button = span.parentNode!

  fireEvent.click(button)

  await waitFor(() => expect(button).toHaveFocus())
})

test("allows using a Portal to render the MenuList", async () => {
  render(
    <Menu>
      <MenuButton as={Button}>Open menu</MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>Menu 1</MenuItem>
          <MenuItem>Menu 2</MenuItem>
          <MenuItem>Menu 3</MenuItem>
          <MenuItem>Menu 4</MenuItem>
        </MenuList>
      </Portal>
    </Menu>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  const menu = await screen.findByRole("menu")

  expect(menu.previousElementSibling).not.toBe(screen.getByText("Open menu"))
})

test("MenuGroup has correct role ", () => {
  render(
    <Menu>
      <MenuButton as={Button}>Open menu</MenuButton>
      <MenuList minWidth="240px">
        <MenuGroup title="Group 1">
          <MenuItem>Share...</MenuItem>
          <MenuItem>Move...</MenuItem>
        </MenuGroup>
        <MenuGroup title="Group 2">
          <MenuItem>Rename...</MenuItem>
          <MenuItem>Delete...</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getAllByRole("group")).toHaveLength(2)
  expect(screen.getByText("Group 1").nextElementSibling).toBe(
    screen.getByText("Share..."),
  )
})

test("MenuOptionGroup radio", () => {
  render(
    <Menu>
      <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
        Open menu
      </MenuButton>

      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="val1" title="Order" type="radio">
          <MenuItemOption value="val-1">Option 1</MenuItemOption>
          <MenuItemOption value="val-2">Option 2</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getByText("Order")).toBeInTheDocument()
  expect(screen.getAllByRole("menuitemradio")).toHaveLength(2)
})

test("MenuOptionGroup radio defaultValue checked", async () => {
  render(
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
        Open menu
      </MenuButton>

      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="val-1" title="Order" type="radio">
          <MenuItemOption value="val-1">Option 1</MenuItemOption>
          <MenuItemOption value="val-2">Option 2</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getByText("Option 1").closest("button")).toBeChecked()
})

test("MenuOptionGroup checkbox defaultValue single checked", () => {
  render(
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
        Open menu
      </MenuButton>

      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="email" title="Info" type="checkbox">
          <MenuItemOption value="email">Email</MenuItemOption>
          <MenuItemOption value="phone">Phone</MenuItemOption>
          <MenuItemOption value="country">Country</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getByText("Info")).toBeInTheDocument()
  expect(screen.getAllByRole("menuitemcheckbox")).toHaveLength(3)

  expect(screen.getByText("Email").closest("button")).toBeChecked()
  expect(screen.getByText("Phone").closest("button")).not.toBeChecked()
  expect(screen.getByText("Country").closest("button")).not.toBeChecked()
})

test("MenuOptionGroup checkbox defaultValue multiple checked", () => {
  render(
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} variant="solid" colorScheme="green" size="sm">
        Open menu
      </MenuButton>

      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue={["email", "phone"]}
          title="Info"
          type="checkbox"
        >
          <MenuItemOption value="email">Email</MenuItemOption>
          <MenuItemOption value="phone">Phone</MenuItemOption>
          <MenuItemOption value="country">Country</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getByText("Email").closest("button")).toBeChecked()
  expect(screen.getByText("Phone").closest("button")).toBeChecked()
  expect(screen.getByText("Country").closest("button")).not.toBeChecked()
})

test("exposes internal state as render prop", () => {
  render(
    <Menu>
      {({ isOpen }) => (
        <React.Fragment>
          <MenuButton as={Button}>{isOpen ? "Close" : "Open"}</MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => alert("Kagebunshin")}>
              Create a Copy
            </MenuItem>
          </MenuList>
        </React.Fragment>
      )}
    </Menu>,
  )

  expect(screen.getByText("Open")).toBeInTheDocument()

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getByText("Close")).toBeInTheDocument()
})

const CompWithTwoMenus: React.FC<{
  onItemClick: () => void
  onClose: () => void
  onBtnClick: () => void
}> = (props) => {
  const [active, setActive] = React.useState<string | undefined>(undefined)

  return (
    <>
      <Menu isOpen={active === "1"}>
        <MenuButton onClick={props.onBtnClick} as={Button}>
          No 1
        </MenuButton>
        <MenuList>
          <MenuItem onClick={props.onItemClick}>1–A</MenuItem>
        </MenuList>
      </Menu>
      <Menu
        isOpen={active === "2"}
        onClose={() => {
          setActive(undefined)
          props.onClose()
        }}
      >
        <MenuButton as={Button}>No 2</MenuButton>
        <MenuList>
          <MenuItem>2–A</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

test("onClose doesn't affect the state of other menus", async () => {
  const onClose = jest.fn()
  const onItemClick = jest.fn()
  const onBtnClick = jest.fn()

  render(
    <CompWithTwoMenus
      onItemClick={onItemClick}
      onClose={onClose}
      onBtnClick={onBtnClick}
    />,
  )

  const firstMenuButton = screen.getByText("No 1")
  fireEvent.click(firstMenuButton.parentElement!)
  await waitFor(
    () =>
      screen.getByText("No 1").parentElement!.getAttribute("aria-expanded") ===
      "true",
  )

  const firstMenuItem = screen.getByText("1–A")
  act(() => {
    fireEvent.focus(firstMenuItem)
    fireEvent.click(firstMenuItem)
  })

  expect(onClose).not.toBeCalled()
  expect(onItemClick).toBeCalled()
  expect(onBtnClick).toBeCalledTimes(1)
  expect(
    screen.getByText("No 1").parentElement!.getAttribute("aria-expanded"),
  ).toBe("false")
})
