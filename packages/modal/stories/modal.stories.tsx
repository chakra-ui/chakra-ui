import { useDisclosure } from "@chakra-ui/hooks/src"
import { PortalManager } from "@chakra-ui/portal/src"
import { chakra } from "@chakra-ui/system/src"
import { Fade, SlideFade, ScaleFade } from "@chakra-ui/transition/src"
import * as React from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "../src"

export default {
  title: "Modal",
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}

const Button = chakra("button", {
  themeKey: "Button",
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />

            <ModalHeader>Welcome Home</ModalHeader>

            <ModalBody>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sit nulla est ex deserunt exercitation
              anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis. Sit nulla est
              ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
              aute id consequat veniam incididunt duis in sint irure nisi.
              Mollit officia cillum Lorem ullamco minim nostrud elit officia
              tempor esse quis. Sit nulla est ex deserunt exercitation anim
              occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis. Sit nulla est
              ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
              aute id consequat veniam incididunt duis in sint irure nisi.
              Mollit officia cillum Lorem ullamco minim nostrud elit officia
              tempor esse quis. Mollit officia cillum Lorem ullamco minim
              nostrud elit officia tempor esse quis. Sit nulla est ex deserunt
              exercitation anim occaecat. Nostrud ullamco deserunt aute id
              consequat veniam incididunt duis in sint irure nisi. Mollit
              officia cillum Lorem ullamco minim nostrud elit officia tempor
              esse quis. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis. Sit nulla est ex deserunt exercitation
              anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
              incididunt duis in sint irure nisi. Mollit officia cillum Lorem
              ullamco minim nostrud elit officia tempor esse quis.
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} colorScheme="gray" mr="12px">
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
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
        <ModalOverlay>
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
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export function SlideAnimation() {
  const modal = useDisclosure()
  return (
    <>
      <button onClick={modal.onOpen}>Open</button>
      <Fade timeout={300} in={modal.isOpen}>
        {(styles) => (
          <Modal isOpen={true} onClose={modal.onClose}>
            <ModalOverlay style={styles}>
              <SlideFade timeout={150} in={modal.isOpen} unmountOnExit={false}>
                {(styles) => (
                  <ModalContent padding={4} mx="auto" mt="40px" style={styles}>
                    Sit nulla est ex deserunt exercitation anim occaecat.
                    Nostrud ullamco deserunt aute id consequat veniam incididunt
                    duis in sint irure nisi. Mollit officia cillum Lorem ullamco
                    minim nostrud elit officia tempor esse quis.
                    <Button colorScheme="blue">Save</Button>
                  </ModalContent>
                )}
              </SlideFade>
            </ModalOverlay>
          </Modal>
        )}
      </Fade>
    </>
  )
}

export function ScaleAnimation() {
  const modal = useDisclosure()
  return (
    <>
      <button onClick={modal.onOpen}>Open</button>
      <Fade timeout={300} in={modal.isOpen}>
        {(styles) => (
          <Modal isOpen={true} onClose={modal.onClose}>
            <ModalOverlay style={styles}>
              <ScaleFade timeout={150} in={modal.isOpen} unmountOnExit={false}>
                {(styles) => (
                  <ModalContent padding={4} mx="auto" mt="40px" style={styles}>
                    Sit nulla est ex deserunt exercitation anim occaecat.
                    Nostrud ullamco deserunt aute id consequat veniam incididunt
                    duis in sint irure nisi. Mollit officia cillum Lorem ullamco
                    minim nostrud elit officia tempor esse quis.
                    <Button colorScheme="blue">Save</Button>
                  </ModalContent>
                )}
              </ScaleFade>
            </ModalOverlay>
          </Modal>
        )}
      </Fade>
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
        <ModalOverlay>
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
              <Button colorScheme="gray">Button 2</Button>
              <Button colorScheme="pink" onClick={second.onOpen}>
                Open Nested
              </Button>
            </ModalFooter>
            <Modal isOpen={second.isOpen} onClose={second.onClose}>
              <ModalOverlay>
                <ModalContent>
                  <ModalHeader>Modal 2 Title</ModalHeader>
                  <ModalFooter>
                    <chakra.div flex="1" />
                    <Button colorScheme="blue" onClick={third.onOpen}>
                      Open Nested 2
                    </Button>
                  </ModalFooter>
                  <Modal isOpen={third.isOpen} onClose={third.onClose}>
                    <ModalOverlay>
                      <ModalContent>
                        <ModalHeader tabIndex={0}>Modal 3 Title</ModalHeader>
                      </ModalContent>
                    </ModalOverlay>
                  </Modal>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}
