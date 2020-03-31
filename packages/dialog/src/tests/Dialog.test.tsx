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

test("Dialog renders correctly", () => {
  const { asFragment } = render(
    <PortalManager>
      <Dialog isOpen onClose={jest.fn()}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogCloseButton />
          <DialogBody>Dialog body</DialogBody>
          <DialogFooter>Dialog footer</DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalManager>,
  )
  expect(asFragment()).toMatchSnapshot()
})

test("has the proper aria attributes", () => {
  const { getByLabelText } = render(
    <PortalManager>
      <Dialog isOpen onClose={jest.fn()}>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogBody>Dialog body</DialogBody>
        </DialogContent>
      </Dialog>
    </PortalManager>,
  )
  // dialog is labelled by the header
  const dialog = getByLabelText("Dialog header")

  expect(dialog).toHaveAttribute("role", "dialog")
  expect(dialog).toHaveAttribute("aria-modal", "true")
  expect(dialog).toHaveAttribute("aria-describedby", "chakra-dialog--body-3")
})

test("clicking the close button calls the onClose callback", () => {
  const onClose = jest.fn()
  const { getByLabelText } = render(
    <PortalManager>
      <Dialog isOpen onClose={onClose}>
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogCloseButton />
        </DialogContent>
      </Dialog>
    </PortalManager>,
  )

  // click the close button
  fireEvent.click(getByLabelText("Close"))

  expect(onClose).toHaveBeenCalled()
})

test('clicking overlay or pressing "esc" calls the onClose callback', () => {
  const onClose = jest.fn()
  const { getByTestId } = render(
    <PortalManager>
      <Dialog isOpen onClose={onClose}>
        <DialogOverlay data-testid="overlay" />
        <DialogContent>
          <DialogHeader>Dialog header</DialogHeader>
          <DialogBody>Dialog body</DialogBody>
        </DialogContent>
      </Dialog>
    </PortalManager>,
  )
  const overlay = getByTestId("overlay")

  userEvent.click(overlay)
  fireEvent.keyDown(overlay, { key: "Escape", keyCode: 27 })

  expect(onClose).toHaveBeenCalledTimes(2)
})

test("focuses the initial focus ref when opened", () => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const inputRef = React.useRef(null)
    return (
      <PortalManager>
        <button data-testid="button" onClick={() => setIsOpen(true)}>
          Open
        </button>
        <Dialog isOpen={isOpen} initialFocusRef={inputRef} onClose={jest.fn()}>
          <DialogContent>
            <DialogHeader>Dialog header</DialogHeader>
            <DialogBody>
              <input />
              <input />
              <input data-testid="input" ref={inputRef} />
            </DialogBody>
          </DialogContent>
        </Dialog>
      </PortalManager>
    )
  }
  const { getByTestId } = render(<Component />)

  // click button, opening the modal
  fireEvent.click(getByTestId("button"))

  // input is now the active element
  expect(document.activeElement).toEqual(getByTestId("input"))
})

test("returns focus when closed", () => {
  const Component = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const buttonRef = React.useRef(null)
    return (
      <PortalManager>
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
          <DialogContent>
            <DialogHeader>Dialog header</DialogHeader>
            <DialogCloseButton />
            <DialogBody>Dialog body</DialogBody>
          </DialogContent>
        </Dialog>
      </PortalManager>
    )
  }
  const { getByLabelText, getByTestId } = render(<Component />)
  const button = getByTestId("button")

  // make sure button isn't focused at the start
  expect(document.activeElement).not.toEqual(button)

  // open and close the modal
  fireEvent.click(button)
  fireEvent.click(getByLabelText("Close"))

  expect(document.activeElement).toEqual(button)
})
