import {
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { Dialog } from "."

const DemoDialog = (props: Omit<Dialog.RootProps, "children">) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Overlay />
      <Dialog.Content data-testid="content">
        <Dialog.Header>Dialog header</Dialog.Header>
        <Dialog.CloseButton data-testid="close" />
        <Dialog.Body>Dialog body</Dialog.Body>
        <Dialog.Footer>Dialog footer</Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

test("should have no accessibility violations", async () => {
  const { baseElement } = render(<DemoDialog isOpen onClose={vi.fn()} />)

  // Test baseElement because the Dialog. is in a portal
  await testA11y(baseElement, {
    axeOptions: {
      rules: {
        // https://github.com/dequelabs/axe-core/issues/3752
        "aria-dialog-name": { enabled: false },
      },
    },
  })
})

test("should have the proper 'aria' attributes", () => {
  const tools = render(<DemoDialog isOpen onClose={vi.fn()} />)

  const dialog = tools.getByRole("dialog")

  expect(dialog).toHaveAttribute("aria-modal", "true")
  expect(dialog).toHaveAttribute("role", "dialog")

  expect(tools.getByText("Dialog body").id).toEqual(
    dialog.getAttribute("aria-describedby"),
  )

  /**
   * The id of `DialogHeader` should equal the `aria-labelledby` of the dialog
   */
  expect(tools.getByText("Dialog header").id).toEqual(
    dialog.getAttribute("aria-labelledby"),
  )
})

test("should fire 'onClose' callback when close button is clicked", () => {
  const onClose = vi.fn()
  const tools = render(<DemoDialog isOpen onClose={onClose} />)

  fireEvent.click(tools.getByTestId("close"))
  expect(onClose).toHaveBeenCalled()
})

describe("closing the Dialog.", () => {
  test("clicking overlay calls the onClose callback", async () => {
    const onClose = vi.fn()
    render(<DemoDialog isOpen onClose={onClose} />)

    const dialog = await screen.findByRole("dialog")
    const overlay = dialog.parentElement

    if (overlay) {
      fireEvent.pointerDown(overlay)
      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalled()
    }
  })

  test("pressing escape key calls the onClose callback", async () => {
    const onClose = vi.fn()
    const { user } = render(<DemoDialog isOpen onClose={onClose} />)

    await user.keyboard("[Escape]")
    expect(onClose).toHaveBeenCalled()
  })
})

test("focuses the initial focus ref when opened", () => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const inputRef = React.useRef(null)
    return (
      <>
        <button
          type="button"
          data-testid="button"
          onClick={() => setIsOpen(true)}
        >
          Open
        </button>

        <Dialog.Root
          isOpen={isOpen}
          initialFocusRef={inputRef}
          onClose={vi.fn()}
        >
          <Dialog.Overlay />
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
  const tools = render(<Component />)

  /**
   * User clicks button to open the Dialog.
   */
  fireEvent.click(tools.getByTestId("button"))

  /**
   * We focus the input right away!
   */
  expect(tools.getByTestId("input")).toHaveFocus()
})

test("should return focus to button when closed", async () => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const buttonRef = React.useRef(null)
    return (
      <>
        <button
          type="button"
          ref={buttonRef}
          data-testid="button"
          onClick={() => setIsOpen(true)}
        >
          Open
        </button>

        <Dialog.Root
          finalFocusRef={buttonRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Header>Dialog. header</Dialog.Header>
            <Dialog.CloseButton data-testid="close" />
            <Dialog.Body>Dialog. body</Dialog.Body>
          </Dialog.Content>
        </Dialog.Root>
      </>
    )
  }
  const tools = render(<Component />)
  const button = tools.getByTestId("button")

  // make sure button isn't focused at the start
  expect(button).not.toHaveFocus()

  // open and close the Dialog.
  fireEvent.click(button)
  fireEvent.click(tools.getByTestId("close"))

  // wait for button to be focused
  await waitFor(() => expect(button).toHaveFocus())
})
