import { useDisclosure } from "@chakra-ui/hooks"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import Lorem from "react-lorem-component"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "../src"

const Button = chakra("button", {
  baseStyle: {
    outline: 0,
    transition: "all 0.2s",
  },
})

export function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Welcome Home</ModalHeader>
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export function ReturnFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef<any>()

  return (
    <>
      <chakra.div
        ref={finalRef}
        tabIndex={-1}
        aria-label="Focus moved to this box"
      >
        Some other content that'll receive focus on close.
      </chakra.div>

      <Button mt={4} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis.
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export function NestedModal() {
  const first = useDisclosure()
  const second = useDisclosure()
  const third = useDisclosure()
  return (
    <>
      <button onClick={first.onOpen}>Open</button>
      <Modal isOpen={first.isOpen} onClose={first.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis.
          </ModalBody>
          <ModalFooter>
            <chakra.div flex="1" />
            <Button>Button 2</Button>
            <Button onClick={second.onOpen}>Open Nested</Button>
          </ModalFooter>

          <Modal isOpen={second.isOpen} onClose={second.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal 2 Title</ModalHeader>
              <ModalFooter>
                <chakra.div flex="1" />
                <Button onClick={third.onOpen}>Open Nested 2</Button>
              </ModalFooter>

              <Modal isOpen={third.isOpen} onClose={third.onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader tabIndex={0}>Modal 3 Title</ModalHeader>
                </ModalContent>
              </Modal>
            </ModalContent>
          </Modal>
        </ModalContent>
      </Modal>
    </>
  )
}

export const InsideScroll = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem size={5} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const AnimationDisabled = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="none">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem size={5} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const FullWithLongContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Modal onClose={onClose} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title2</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={30} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
