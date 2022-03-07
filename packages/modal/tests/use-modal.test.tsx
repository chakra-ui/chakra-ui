import { renderHook } from "@testing-library/react-hooks"
import { hideOthers } from "aria-hidden"
import { MutableRefObject } from "react"
import { Button } from "@chakra-ui/button"
import * as React from "react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useAriaHidden,
  useImperativeModal,
} from "../src"
import { forwardRef } from "@chakra-ui/system"
import { render, screen } from "@testing-library/react"
import { waitFor } from "@chakra-ui/test-utils"
import userEvent from "@testing-library/user-event"

jest.mock("aria-hidden")

beforeEach(() => {
  jest.clearAllMocks()
})

describe("useAriaHidden", () => {
  it("should be triggered if ref.current is changed", () => {
    const ref: MutableRefObject<null | HTMLElement> = { current: null }

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).not.toBeCalled()

    ref.current = document.createElement("div")

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).toBeCalledWith(ref.current)
  })

  it("shouldn't be triggered if `shouldHide` is `false`", () => {
    const ref: MutableRefObject<null | HTMLElement> = { current: null }

    renderHook(() => useAriaHidden(ref, true))
    expect(hideOthers).not.toBeCalled()

    ref.current = document.createElement("div")

    renderHook(() => useAriaHidden(ref, false))
    expect(hideOthers).not.toBeCalled()
  })
})

describe("useImperativeModal", () => {
  const ExampleModal: React.FC<
    Omit<ModalProps, "children"> & {
      onCancel: () => void
      onConfirm: () => void
    }
  > = (props) => {
    return (
      <Modal {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Just an example Body</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onConfirm}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={props.onCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  const TestComponent: React.FC<{
    clickedConfirm: () => void
    clickedCancelOrClose: () => void
  }> = ({ clickedConfirm, clickedCancelOrClose }) => {
    const [modalNode, openModal] = useImperativeModal()

    const onClick = async () => {
      // render a modal inside a function and get the result back from it
      const modalResult = await openModal<boolean>(({ onClose }) => (
        <ExampleModal
          isOpen
          onClose={() => onClose(false)}
          onCancel={() => onClose(false)}
          onConfirm={() => onClose(true)}
        />
      ))
      if (modalResult) {
        clickedConfirm()
      } else {
        clickedCancelOrClose()
      }
    }
    return (
      <>
        {modalNode}
        <Button onClick={onClick}>Do some action</Button>
      </>
    )
  }
  it("renders modal imperatively", async () => {
    const clickedConfirmMock = jest.fn()
    const clickedCancelOrCloseMock = jest.fn()
    render(
      <TestComponent
        clickedConfirm={clickedConfirmMock}
        clickedCancelOrClose={clickedCancelOrCloseMock}
      />,
    )
    userEvent.click(screen.getByText("Do some action"))
    await waitFor(() => {
      expect(screen.getByText("Modal Title")).toBeInTheDocument()
    })
    userEvent.click(screen.getByText("Confirm"))
    await waitFor(() => {
      expect(clickedConfirmMock).toHaveBeenCalled()
    })
    // Modal should be closed after wards
    expect(screen.queryByText("Modal Title")).not.toBeInTheDocument()
  })
})
