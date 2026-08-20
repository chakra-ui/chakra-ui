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
  hotkeys?: string[]
  hotkeyOptions?: CommandPalette.HotkeyOptions
  closeOnSelect?: boolean
  defaultOpen?: boolean
  loading?: boolean
  itemProps?: Record<string, any>
}) => {
  const { itemProps, ...rootProps } = props
  return (
    <CommandPalette.Root collection={collection} defaultOpen {...rootProps}>
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
                <CommandPalette.Item
                  item={item}
                  key={item.value}
                  {...itemProps}
                >
                  <CommandPalette.ItemText>
                    {item.label}
                  </CommandPalette.ItemText>
                </CommandPalette.Item>
              ))}
              <CommandPalette.Loading>
                Searching commands
              </CommandPalette.Loading>
              <CommandPalette.Empty>No results</CommandPalette.Empty>
              <CommandPalette.Separator />
            </CommandPalette.List>
          </CommandPalette.Panel>
        </CommandPalette.Positioner>
      </Portal>
    </CommandPalette.Root>
  )
}

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

  it("runs Item, Root, then close callbacks in a stable order", async () => {
    const user = userEvent.setup()
    const calls: string[] = []
    const { getByRole } = render(
      <Demo
        onOpenChange={({ open }) => {
          if (!open) calls.push("close")
        }}
        itemProps={{ onSelect: () => calls.push("item") }}
        onSelect={() => calls.push("root")}
      />,
    )

    await user.click(getByRole("option", { name: "Open File" }))

    expect(calls).toEqual(["item", "root", "close"])
  })

  it("keeps the palette open when an Item overrides closeOnSelect", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const onSelect = vi.fn()
    const { getByRole } = render(
      <Demo
        onOpenChange={onOpenChange}
        itemProps={{ closeOnSelect: false, onSelect }}
      />,
    )

    await user.click(getByRole("option", { name: "Open File" }))

    expect(onSelect).toHaveBeenCalledOnce()
    expect(onOpenChange).not.toHaveBeenCalledWith(
      expect.objectContaining({ open: false }),
    )
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
    const { unmount } = render(
      <Demo defaultOpen={false} onOpenChange={onOpenChange} />,
    )

    await user.keyboard("{Meta>}k{/Meta}")
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    )

    unmount()
    onOpenChange.mockClear()
    render(
      <Demo defaultOpen={false} hotkeys={[]} onOpenChange={onOpenChange} />,
    )
    await user.keyboard("{Meta>}k{/Meta}")
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it("supports multiple hotkeys and disabled hotkey registration", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { unmount } = render(
      <Demo
        defaultOpen={false}
        hotkeys={["mod+k", "mod+p"]}
        onOpenChange={onOpenChange}
      />,
    )

    await user.keyboard("{Meta>}p{/Meta}")
    expect(onOpenChange).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
    )

    unmount()
    onOpenChange.mockClear()
    render(
      <Demo
        defaultOpen={false}
        hotkeyOptions={{ enabled: false }}
        onOpenChange={onOpenChange}
      />,
    )
    await user.keyboard("{Meta>}k{/Meta}")
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it("gives the latest mounted palette priority for shared hotkeys", async () => {
    const user = userEvent.setup()
    const first = vi.fn()
    const second = vi.fn()
    render(<Demo defaultOpen={false} onOpenChange={first} />)
    const { unmount } = render(
      <Demo defaultOpen={false} onOpenChange={second} />,
    )

    await user.keyboard("{Meta>}k{/Meta}")
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledWith(expect.objectContaining({ open: true }))

    unmount()
    await user.keyboard("{Meta>}k{/Meta}")
    expect(first).toHaveBeenCalledWith(expect.objectContaining({ open: true }))
  })

  it("renders Loading instead of Empty and exposes a separator", () => {
    const { getByRole, queryByText } = render(<Demo loading />)

    expect(getByRole("status")).toHaveTextContent("Searching commands")
    expect(queryByText("No results")).not.toBeInTheDocument()
    expect(getByRole("separator")).toBeVisible()
  })
})
