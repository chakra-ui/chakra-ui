import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import { FaSearch, FaTruck, FaUndoAlt, FaUnlink } from "react-icons/fa"
import { Button, Menu } from "../src"

const words = [
  "About Visual Studio Code",
  "Check for updates",
  "Preferences",
  "Services",
  "Hide Visual Studio Code",
  "Show All",
]

describe("Menu", () => {
  test("passes a11y test", async () => {
    await testA11y(
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="solid" colorPalette="teal" size="sm">
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

  test("does not render Menu.Content Items if Menu lazyMount", () => {
    render(
      <Menu.Root lazyMount>
        <Menu.Trigger asChild>
          <Button variant="solid" colorPalette="teal" size="sm">
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
            <Menu.Item disabled>
              <FaTruck />
              Delivery
            </Menu.Item>
            <Menu.Item>
              <FaUnlink />
              Unlink
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>,
    )

    expect(screen.getByText("Delivery")).toBeDisabled()
  })

  test("does not fire onClick on disabled Menu.Item", () => {
    const onClick = vi.fn()

    render(
      <Menu.Root>
        <Menu.Trigger as={Button}>Open menu</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item>
              <FaSearch />
              Search
              <Menu.Command>⌥T</Menu.Command>
            </Menu.Item>
            <Menu.Item>
              <FaUndoAlt />
              Undo
            </Menu.Item>
            <Menu.Item disabled onClick={onClick}>
              <FaTruck />
              Delivery
            </Menu.Item>
            <Menu.Item>
              <FaUnlink />
              Unlink
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>,
    )

    const span = screen.getByText("Delivery")
    const button = span.parentNode!

    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  test("option group > radio", async () => {
    render(
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="solid" colorPalette="green" size="sm">
            Open menu
          </Button>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content minWidth="240px">
            <Menu.OptionGroup defaultValue="val-1" title="Order" type="radio">
              <Menu.OptionItem value="val-1">Option 1</Menu.OptionItem>
              <Menu.OptionItem value="val-2">Option 2</Menu.OptionItem>
            </Menu.OptionGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>,
    )

    const button = screen.getByText("Open menu")
    fireEvent.click(button)

    const option1 = screen.getByText("Option 1")
    fireEvent.click(option1)

    expect(option1).toHaveAttribute("aria-checked", "true")
  })

  test("option group > checkbox defaultValue single checked", async () => {
    render(
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="solid" colorPalette="green" size="sm">
            Open menu
          </Button>
        </Menu.Trigger>

        <Menu.Positioner>
          <Menu.Content minWidth="240px">
            <Menu.OptionGroup
              defaultValue={["email"]}
              title="Info"
              type="checkbox"
            >
              <Menu.OptionItem value="email">Email</Menu.OptionItem>
              <Menu.OptionItem value="phone">Phone</Menu.OptionItem>
              <Menu.OptionItem value="country">Country</Menu.OptionItem>
            </Menu.OptionGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>,
    )

    const button = screen.getByText("Open menu")
    fireEvent.click(button)

    const email = await screen.findByText("Email")
    expect(email).toBeChecked()
  })
})
