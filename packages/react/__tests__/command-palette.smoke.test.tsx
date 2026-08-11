import { CommandPalette, Portal, createListCollection } from "@chakra-ui/react"
import userEvent from "@testing-library/user-event"
import { render } from "./core/render"

const collection = createListCollection({
  items: [
    { label: "New File", value: "new-file" },
    { label: "Open File", value: "open-file" },
    { label: "Save File", value: "save-file" },
  ],
})

const Demo = (props: {
  onValueChange?: (details: any) => void
  onSelect?: (details: any) => void
  onOpenChange?: (details: any) => void
  selectionMode?: "none" | "single" | "multiple"
  hotkey?: string | null
  defaultOpen?: boolean
}) => (
  <CommandPalette.Root collection={collection} defaultOpen {...props}>
    <CommandPalette.Trigger>Open</CommandPalette.Trigger>
    <Portal>
      <CommandPalette.Backdrop />
      <CommandPalette.Positioner>
        <CommandPalette.Panel>
          <CommandPalette.Label>Commands</CommandPalette.Label>
          <CommandPalette.Control>
            <CommandPalette.Indicator />
            <CommandPalette.Input placeholder="Search..." />
          </CommandPalette.Control>
          <CommandPalette.List>
            {collection.items.map((item) => (
              <CommandPalette.Item item={item} key={item.value}>
                <CommandPalette.ItemText>{item.label}</CommandPalette.ItemText>
              </CommandPalette.Item>
            ))}
            <CommandPalette.Empty>No results</CommandPalette.Empty>
          </CommandPalette.List>
        </CommandPalette.Panel>
      </CommandPalette.Positioner>
    </Portal>
  </CommandPalette.Root>
)

describe("CommandPalette", () => {
  it("selects an item on click in single mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { getByRole } = render(
      <Demo selectionMode="single" onValueChange={onValueChange} />,
    )

    await user.click(getByRole("option", { name: "Open File" }))

    expect(onValueChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: ["open-file"] }),
    )
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

  it("labels the input via the Label part", async () => {
    const { getByPlaceholderText } = render(<Demo />)
    expect(getByPlaceholderText("Search...")).toHaveAccessibleName("Commands")
  })

  it("runs commands without persisting selection by default", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const { getByRole } = render(<Demo onSelect={onSelect} />)

    const option = getByRole("option", { name: "Open File" })
    await user.click(option)

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemValue: "open-file" }),
    )
    expect(option).not.toHaveAttribute("aria-selected", "true")
  })

  it("closes the dialog on escape", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { getByPlaceholderText } = render(
      <Demo onOpenChange={onOpenChange} />,
    )

    await user.click(getByPlaceholderText("Search..."))
    await user.keyboard("{Escape}")

    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
    )
  })

  it("opens on the hotkey and stays closed when opted out", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Demo defaultOpen={false} onOpenChange={onOpenChange} />)

    await user.keyboard("{Meta>}k{/Meta}")
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    )

    onOpenChange.mockClear()
    render(
      <Demo defaultOpen={false} hotkey={null} onOpenChange={onOpenChange} />,
    )
    await user.keyboard("{Meta>}k{/Meta}")
    expect(onOpenChange).not.toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    )
  })
})
