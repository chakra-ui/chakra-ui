import * as React from "react"
import { render, userEvent, axe, press } from "@chakra-ui/test-utils"
import { PortalManager } from "@chakra-ui/portal"
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from ".."

const renderWithPortal = (ui: React.ReactElement) =>
  render(<PortalManager>{ui}</PortalManager>)

test("should render correctly", () => {
  const tools = renderWithPortal(
    <Dialog isOpen onClose={jest.fn()}>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogCloseButton />
          <DialogBody>Dialog body</DialogBody>
          <DialogFooter>Dialog footer</DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )
  expect(tools.asFragment()).toMatchSnapshot()
})

test("should have no accessibility violations", async () => {
  const tools = renderWithPortal(
    <Dialog isOpen onClose={jest.fn()}>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogCloseButton />
          <DialogBody>Dialog body</DialogBody>
          <DialogFooter>Dialog footer</DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )

  const result = await axe(tools.container)
  expect(result).toHaveNoViolations()
})

test("should have the proper 'aria' attributes", () => {
  const tools = renderWithPortal(
    <Dialog isOpen onClose={jest.fn()}>
      <DialogOverlay>
        <DialogContent data-testid="dialog">
          <DialogHeader>Dialog header</DialogHeader>
          <DialogBody>Dialog body</DialogBody>
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )

  const dialog = tools.getByTestId("dialog")

  /**
   * should have `aria-modal` set to `true`
   */
  expect(dialog).toHaveAttribute("aria-modal", "true")
  expect(dialog).toHaveAttribute("role", "dialog")

  /**
   * The id of `DialogBody` should equal the `aria-describedby` of the dialog
   */
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
  const onClose = jest.fn()

  const tools = renderWithPortal(
    <Dialog isOpen onClose={onClose}>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogCloseButton data-testid="close" />
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )

  /**
   * click the close button
   */
  userEvent.click(tools.getByTestId("close"))

  expect(onClose).toHaveBeenCalled()
})

test('clicking overlay or pressing "esc" calls the onClose callback', () => {
  const onClose = jest.fn()
  const tools = renderWithPortal(
    <Dialog isOpen onClose={onClose}>
      <DialogOverlay data-testid="overlay">
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogBody>Dialog body</DialogBody>
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )

  const overlay = tools.getByTestId("overlay")

  userEvent.click(overlay)
  expect(onClose).toHaveBeenCalled()

  press.Escape(overlay)
  expect(onClose).toHaveBeenCalled()
})

test("focuses the initial focus ref when opened", () => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const inputRef = React.useRef(null)
    return (
      <>
        <button data-testid="button" onClick={() => setIsOpen(true)}>
          Open
        </button>
        <Dialog isOpen={isOpen} initialFocusRef={inputRef} onClose={jest.fn()}>
          <DialogOverlay>
            <DialogContent>
              <DialogHeader>Dialog header</DialogHeader>
              <DialogBody>
                <input />
                <input />
                <input data-testid="input" ref={inputRef} />
              </DialogBody>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      </>
    )
  }
  const tools = renderWithPortal(<Component />)

  /**
   * User clicks button to open the dialog
   */
  userEvent.click(tools.getByTestId("button"))

  /**
   * We focus the input right away!
   */
  expect(tools.getByTestId("input")).toHaveFocus()
})

test("should return focus to button when closed", () => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const buttonRef = React.useRef(null)
    return (
      <>
        <button
          ref={buttonRef}
          data-testid="button"
          onClick={() => setIsOpen(true)}
        >
          Open
        </button>
        <Dialog
          finalFocusRef={buttonRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <DialogOverlay>
            <DialogContent>
              <DialogHeader>Dialog header</DialogHeader>
              <DialogCloseButton data-testid="close" />
              <DialogBody>Dialog body</DialogBody>
            </DialogContent>
          </DialogOverlay>
        </Dialog>
      </>
    )
  }
  const tools = renderWithPortal(<Component />)
  const button = tools.getByTestId("button")

  // make sure button isn't focused at the start
  expect(button).not.toHaveFocus()

  // open and close the modal
  userEvent.click(button)
  userEvent.click(tools.getByTestId("close"))

  expect(button).toHaveFocus()
})
