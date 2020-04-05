import * as React from "react"
import { render, userEvent, fireEvent } from "@chakra-ui/test-utils"
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

test("Dialog renders correctly", () => {
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

test("has the proper aria attributes", () => {
  const tools = renderWithPortal(
    <Dialog isOpen onClose={jest.fn()}>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogBody>Dialog body</DialogBody>
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )
  // dialog is labelled by the header
  const dialog = tools.getByLabelText("Dialog header")

  expect(dialog).toHaveAttribute("role", "dialog")
  expect(dialog).toHaveAttribute("aria-modal", "true")
  expect(dialog).toHaveAttribute("aria-describedby", "chakra-dialog--body-3")
})

test("clicking the close button calls the onClose callback", () => {
  const onClose = jest.fn()
  const tools = renderWithPortal(
    <Dialog isOpen onClose={onClose}>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogCloseButton />
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
  )

  // click the close button
  fireEvent.click(tools.getByLabelText("Close"))

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
  fireEvent.keyDown(overlay, { key: "Escape", keyCode: 27 })

  expect(onClose).toHaveBeenCalledTimes(2)
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

  // click button, opening the modal
  fireEvent.click(tools.getByTestId("button"))

  // input is now the active element
  expect(document.activeElement).toEqual(tools.getByTestId("input"))
})

test("returns focus when closed", () => {
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
              <DialogCloseButton />
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
  expect(document.activeElement).not.toEqual(button)

  // open and close the modal
  fireEvent.click(button)
  fireEvent.click(tools.getByLabelText("Close"))

  expect(document.activeElement).toEqual(button)
})
