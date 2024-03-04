import {
  act,
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { FaSearch, FaTruck, FaUndoAlt, FaUnlink } from "react-icons/fa"
import { Button } from "../src/components/button"
import { Menu } from "../src/components/menu"
import { Portal } from "../src/components/portal"

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
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="teal" size="sm">
          Open Wakanda menu
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {words.map((word) => (
            <Menu.Item key={word}>{word}</Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )
})

test("does not render Menu.Content Items if Menu isLazy", () => {
  render(
    <Menu.Root isLazy>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="teal" size="sm">
          Open Wakanda menu
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {words.map((word) => (
            <Menu.Item key={word}>{word}</Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  expect(screen.queryByText(words[0])).not.toBeInTheDocument()
})

test("sets correct aria attributes on disabled Menu.Items", () => {
  render(
    <Menu.Root>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
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
    </Menu.Root>,
  )

  expect(screen.getByText("Delivery").parentElement).toBeDisabled()
})

test("does not fire onClick on disabled Menu.Item", () => {
  const onClick = vi.fn()

  render(
    <Menu.Root>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item icon={<FaSearch />} command="⌥T">
            Search
          </Menu.Item>
          <Menu.Item icon={<FaUndoAlt />}>Undo</Menu.Item>
          <Menu.Item isDisabled icon={<FaTruck />} onClick={onClick}>
            Delivery
          </Menu.Item>
          <Menu.Item icon={<FaUnlink />}>Unlink</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
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
test.skip("allows focusing disabled Menu.Items given isFocusable", async () => {
  render(
    <Menu.Root>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item isDisabled isFocusable icon={<FaTruck />}>
            Delivery
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const span = screen.getByText("Delivery")
  const button = span.parentNode!

  fireEvent.click(button)

  await waitFor(() => expect(button).toHaveFocus())
})

test("allows using a Portal to render the Menu.Content", async () => {
  render(
    <Menu.Root>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
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
    </Menu.Root>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  const menu = await screen.findByRole("menu")

  expect(menu.previousElementSibling).not.toBe(screen.getByText("Open menu"))
})

test("MenuGroup has correct role ", async () => {
  render(
    <Menu.Root>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content minWidth="240px">
          <Menu.Group title="Group 1">
            <Menu.Item>Share...</Menu.Item>
            <Menu.Item>Move...</Menu.Item>
          </Menu.Group>
          <Menu.Group title="Group 2">
            <Menu.Item>Rename...</Menu.Item>
            <Menu.Item>Delete...</Menu.Item>
          </Menu.Group>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  await waitFor(() => expect(screen.getAllByRole("group")).toHaveLength(2))
  expect(screen.getByText("Group 1").nextElementSibling).toBe(
    screen.getByText("Share..."),
  )
})

test("Menu.OptionGroup radio", async () => {
  render(
    <Menu.Root>
      <Menu.Trigger as={Button} variant="solid" colorScheme="green" size="sm">
        Open menu
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minWidth="240px">
          <Menu.OptionGroup defaultValue="val1" title="Order" type="radio">
            <Menu.ItemOption value="val-1">Option 1</Menu.ItemOption>
            <Menu.ItemOption value="val-2">Option 2</Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  const title = await screen.findByText("Order")
  expect(title).toBeInTheDocument()
  const options = await screen.findAllByRole("menuitemradio")
  expect(options).toHaveLength(2)
})

test("Menu.OptionGroup radio defaultValue checked", async () => {
  render(
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="green" size="sm">
          Open menu
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minWidth="240px">
          <Menu.OptionGroup defaultValue="val-1" title="Order" type="radio">
            <Menu.ItemOption value="val-1">Option 1</Menu.ItemOption>
            <Menu.ItemOption value="val-2">Option 2</Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const button = screen.getByRole("button")
  fireEvent.click(button)

  expect(screen.getByText("Option 1").closest("button")).toBeChecked()
})

test("Menu.OptionGroup checkbox defaultValue single checked", async () => {
  render(
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="green" size="sm">
          Open menu
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minWidth="240px">
          <Menu.OptionGroup defaultValue="email" title="Info" type="checkbox">
            <Menu.ItemOption value="email">Email</Menu.ItemOption>
            <Menu.ItemOption value="phone">Phone</Menu.ItemOption>
            <Menu.ItemOption value="country">Country</Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(await screen.findByText("Info")).toBeInTheDocument()

  const items = await screen.findAllByRole("menuitemcheckbox")
  expect(items).toHaveLength(3)

  const [email, phone, country] = await screen.findAllByRole("menuitemcheckbox")
  expect(email).toBeChecked()
  expect(phone).not.toBeChecked()
  expect(country).not.toBeChecked()
})

test("Menu.OptionGroup checkbox defaultValue multiple checked", () => {
  render(
    <Menu.Root closeOnSelect={false}>
      <Menu.Trigger asChild>
        <Button variant="solid" colorScheme="green" size="sm">
          Open menu
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content minWidth="240px">
          <Menu.OptionGroup
            defaultValue={["email", "phone"]}
            title="Info"
            type="checkbox"
          >
            <Menu.ItemOption value="email">Email</Menu.ItemOption>
            <Menu.ItemOption value="phone">Phone</Menu.ItemOption>
            <Menu.ItemOption value="country">Country</Menu.ItemOption>
          </Menu.OptionGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const button = screen.getByRole("button")

  fireEvent.click(button)

  expect(screen.getByText("Email").closest("button")).toBeChecked()
  expect(screen.getByText("Phone").closest("button")).toBeChecked()
  expect(screen.getByText("Country").closest("button")).not.toBeChecked()
})

test("exposes internal state as render prop", () => {
  render(
    <Menu.Root>
      {(api) => (
        <>
          <Menu.Trigger as={Button}>
            {api.isOpen ? "Close" : "Open"}
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
    </Menu.Root>,
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
      <Menu.Root isOpen={active === "1"}>
        <Menu.Trigger onClick={props.onBtnClick} as={Button}>
          No 1
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item onClick={props.onItemClick}>1–A</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
      <Menu.Root
        isOpen={active === "2"}
        onClose={() => {
          setActive(undefined)
          props.onClose()
        }}
      >
        <Menu.Trigger as={Button}>No 2</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item>2-A</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  )
}

test.skip("onClose doesn't affect the state of other menus", async () => {
  const onClose = vi.fn()
  const onItemClick = vi.fn()
  const onBtnClick = vi.fn()

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

  const firstMenuItem = screen.getByText("1-A")
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

test("Menu.Item can override its parent menu's `closeOnSelect` and keep the menu open", async () => {
  const onClose = vi.fn()
  render(
    <Menu.Root onClose={onClose}>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item closeOnSelect={false}>I do not close the menu</Menu.Item>
          <Menu.Item>I close the menu</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const openMenuButton = screen.getByRole("button")
  const menuItemThatDoesNotClose = screen.getByText("I do not close the menu")
  const menuItemThatCloses = screen.getByText("I close the menu")

  fireEvent.click(openMenuButton)
  fireEvent.click(menuItemThatDoesNotClose)
  expect(onClose).not.toHaveBeenCalled()

  fireEvent.click(menuItemThatCloses)
  expect(onClose).toHaveBeenCalled()
})

test("Menu.Item can override its parent menu's `closeOnSelect` and close the menu", async () => {
  const onClose = vi.fn()
  render(
    <Menu.Root onClose={onClose} closeOnSelect={false}>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item>I do not close the menu</Menu.Item>
          <Menu.Item closeOnSelect>I close the menu</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const openMenuButton = screen.getByRole("button")
  const menuItemThatDoesNotClose = screen.getByText("I do not close the menu")
  const menuItemThatCloses = screen.getByText("I close the menu")

  fireEvent.click(openMenuButton)
  fireEvent.click(menuItemThatDoesNotClose)
  expect(onClose).not.toHaveBeenCalled()

  fireEvent.click(menuItemThatCloses)
  expect(onClose).toHaveBeenCalled()
})

// test("Menu.Content direction flips in rtl", () => {
//   render(
//     <ChakraProvider theme={{ ...theme, direction: "rtl" }}>
//       <Menu.Root placement="top-end" isOpen>
//         <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
//         <Menu.Positioner>
//           <Menu.Content>
//             <Menu.Item>Pick me</Menu.Item>
//             <Menu.Item>No no, pick me</Menu.Item>
//           </Menu.Content>
//         </Menu.Positioner>
//       </Menu.Root>
//     </ChakraProvider>,
//   )

//   const menuList = screen.getByRole("menu")
//   expect(menuList.parentElement!.getAttribute("data-popper-placement")).toEqual(
//     "top-start",
//   )
// })

test("can override menu item type", async () => {
  render(
    <Menu.Root>
      <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item type="submit">Submit</Menu.Item>
          <Menu.Item as={Button}>Button</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>,
  )

  const button = screen.getByText("Open menu")
  fireEvent.click(button)

  const submitOption = screen.getByText("Submit")
  await waitFor(() => expect(submitOption).toHaveFocus())

  expect(submitOption).toHaveAttribute("type", "submit")
})
