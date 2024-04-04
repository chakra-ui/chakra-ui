import {
  act,
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import { useRef, useState } from "react"
import { Dialog } from "../src/components/dialog"

const DemoDialog = (props: Omit<Dialog.RootProps, "children">) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Backdrop data-testid="overlay" />
      <Dialog.Positioner data-testid="positioner">
        <Dialog.Content data-testid="content">
          <Dialog.Header>Dialog header</Dialog.Header>
          <Dialog.CloseTrigger data-testid="close">Close</Dialog.CloseTrigger>
          <Dialog.Body>Dialog body</Dialog.Body>
          <Dialog.Footer>Dialog footer</Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

describe("Dialog", () => {
  test("should have no accessibility violations", async () => {
    render(<DemoDialog open onClose={vi.fn()} />)
    const dialogEl = screen.getByRole("dialog")
    await testA11y(dialogEl, {
      axeOptions: {
        rules: { "aria-dialog-name": { enabled: false } },
      },
    })
  })

  test("should have the proper 'aria' attributes", () => {
    render(<DemoDialog open onClose={vi.fn()} />)
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("aria-modal", "true")
    expect(dialog).toHaveAttribute("role", "dialog")
  })

  test("should fire 'onClose' callback when close button is clicked", async () => {
    const onClose = vi.fn()
    const { user } = render(<DemoDialog open onClose={onClose} />)
    await act(() => user.click(screen.getByTestId("close")))
    expect(onClose).toHaveBeenCalled()
  })

  test("should close on outside click", async () => {
    const onClose = vi.fn()
    const { user } = render(<DemoDialog open onClose={onClose} />)

    await act(() => user.click(screen.getByTestId("positioner")))
    expect(onClose).toHaveBeenCalled()
  })

  test.skip("should close on escape key", async () => {
    const onClose = vi.fn()
    const { user } = render(<DemoDialog open onClose={onClose} />)
    await act(() => user.keyboard("[Escape]"))
    expect(onClose).toHaveBeenCalled()
  })

  test("focus initial element when opened", () => {
    const Component = () => {
      const [open, setOpen] = useState(false)
      const inputRef = useRef<HTMLInputElement>(null)

      return (
        <>
          <button
            type="button"
            data-testid="button"
            onClick={() => setOpen(true)}
          >
            Open
          </button>

          <Dialog.Root open={open} initialFocusRef={inputRef} onClose={vi.fn()}>
            <Dialog.Backdrop />
            <Dialog.Content>
              <Dialog.Header>Dialog. header</Dialog.Header>
              <Dialog.Body>
                <input />
                <input />
                <input data-testid="input" ref={inputRef} />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Root>
        </>
      )
    }

    render(<Component />)

    fireEvent.click(screen.getByTestId("button"))
    expect(screen.getByTestId("input")).toHaveFocus()
  })

  test("should return focus to button when closed", async () => {
    const Component = () => {
      const [open, setopen] = useState(false)
      const buttonRef = useRef(null)
      return (
        <>
          <button
            type="button"
            ref={buttonRef}
            data-testid="button"
            onClick={() => setopen(true)}
          >
            Open
          </button>

          <Dialog.Root
            finalFocusRef={buttonRef}
            open={open}
            onClose={() => setopen(false)}
          >
            <Dialog.Backdrop />
            <Dialog.Content>
              <Dialog.Header>Dialog. header</Dialog.Header>
              <Dialog.CloseTrigger data-testid="close" />
              <Dialog.Body>Dialog. body</Dialog.Body>
            </Dialog.Content>
          </Dialog.Root>
        </>
      )
    }

    render(<Component />)

    const button = screen.getByTestId("button")
    expect(button).not.toHaveFocus()

    fireEvent.click(button)
    fireEvent.click(screen.getByTestId("close"))

    await waitFor(() => expect(button).toHaveFocus())
  })
})
