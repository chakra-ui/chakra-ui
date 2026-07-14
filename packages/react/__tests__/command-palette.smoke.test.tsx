import {
  CommandPalette,
  Dialog,
  Portal,
  createListCollection,
} from "@chakra-ui/react"
import userEvent from "@testing-library/user-event"
import { render } from "./core/render"

const collection = createListCollection({
  items: [
    { label: "New File", value: "new-file" },
    { label: "Open File", value: "open-file" },
    { label: "Save File", value: "save-file" },
  ],
})

const Demo = ({
  clearOnEscape,
  ...rootProps
}: {
  onValueChange?: (details: any) => void
  onSelect?: (details: any) => void
  selectionMode?: "none" | "single" | "multiple"
  value?: string[]
  clearOnEscape?: boolean
}) => (
  <CommandPalette.Root collection={collection} {...rootProps}>
    <CommandPalette.Label>Commands</CommandPalette.Label>
    <CommandPalette.Control>
      <CommandPalette.Indicator />
      <CommandPalette.Input
        placeholder="Search..."
        clearOnEscape={clearOnEscape}
      />
    </CommandPalette.Control>
    <CommandPalette.List>
      {collection.items.map((item) => (
        <CommandPalette.Item item={item} key={item.value}>
          <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
        </CommandPalette.Item>
      ))}
      <CommandPalette.Empty>No results</CommandPalette.Empty>
    </CommandPalette.List>
  </CommandPalette.Root>
)

describe("CommandPalette", () => {
  it("selects an item on click in single mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { getByRole } = render(
      <Demo selectionMode="single" onValueChange={onValueChange} />,
    )

    expect(getByRole("listbox")).toBeInTheDocument()

    const option = getByRole("option", { name: "Open File" })
    await user.click(option)

    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ["open-file"] }),
    )
    expect(option).toHaveAttribute("aria-selected", "true")
  })

  it("navigates and selects with the keyboard from the input", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { getByPlaceholderText } = render(
      <Demo selectionMode="single" onValueChange={onValueChange} />,
    )

    await user.click(getByPlaceholderText("Search..."))
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}")

    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ["open-file"] }),
    )
  })

  it("clears the input on escape", async () => {
    const user = userEvent.setup()
    const { getByPlaceholderText } = render(<Demo />)
    const input = getByPlaceholderText("Search...") as HTMLInputElement

    await user.click(input)
    await user.keyboard("open")
    expect(input.value).toBe("open")

    await user.keyboard("{Escape}")
    expect(input.value).toBe("")
  })

  it("labels the input and listbox via the Label part", async () => {
    const { getByRole, getByPlaceholderText } = render(<Demo />)

    expect(getByPlaceholderText("Search...")).toHaveAccessibleName("Commands")
    expect(getByRole("listbox")).toHaveAccessibleName("Commands")
  })

  it("keeps escape untouched when clearOnEscape is false", async () => {
    const user = userEvent.setup()
    const { getByPlaceholderText } = render(<Demo clearOnEscape={false} />)
    const input = getByPlaceholderText("Search...") as HTMLInputElement

    await user.click(input)
    await user.keyboard("open")
    expect(input.value).toBe("open")

    await user.keyboard("{Escape}")
    expect(input.value).toBe("open")
  })

  it("runs commands without persisting selection by default", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { getByRole } = render(<Demo onSelect={onSelect} />)

    const option = getByRole("option", { name: "Open File" })
    await user.click(option)

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: "open-file" }),
    )
    expect(option).toHaveAttribute("aria-selected", "false")
  })

  it("clears the input before closing an enclosing dialog on escape", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { getByPlaceholderText } = render(
      <Dialog.Root defaultOpen onOpenChange={onOpenChange}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Demo />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>,
    )
    const input = getByPlaceholderText("Search...") as HTMLInputElement

    await user.click(input)
    await user.keyboard("open")
    expect(input.value).toBe("open")

    await user.keyboard("{Escape}")
    expect(input.value).toBe("")
    expect(onOpenChange).not.toHaveBeenCalled()

    await user.keyboard("{Escape}")
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
    )
  })
})
