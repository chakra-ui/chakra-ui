import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
//@ts-ignore
import Lorem from "react-lorem-component"
import { Box, Button, Input } from "../src"
import { Dialog } from "../src/components/dialog"
import { PortalManager } from "../src/components/portal"
import { chakra } from "../src/styled-system"

export default {
  title: "Components / Dialog",
  decorators: [
    (StoryFn: any) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}

export function Basic() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={onOpen}>
        Open
      </Button>
      <Dialog.Root isOpen={isOpen} onClose={onClose} centered>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>Welcome Home</Dialog.Header>
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi.
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="solid">Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export function FinalFocusRef() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <Box ref={finalRef} tabIndex={-1} aria-label="Focus moved to this box">
        Some other content that'll receive focus on close.
      </Box>

      <Button mt={4} onClick={onOpen}>
        Open Dialog.
      </Button>

      <Dialog.Root finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </Dialog.Body>

            <Dialog.Footer>
              <Button onClick={onClose}>Close</Button>
              <Button>Secondary Action</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export function NestedDialogs() {
  const first = useDisclosure()
  const second = useDisclosure()

  return (
    <>
      <Button onClick={first.onOpen}>Open</Button>
      <Dialog.Root isOpen={first.isOpen} onClose={first.onClose}>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </Dialog.Body>
            <Dialog.Footer>
              <chakra.div flex="1" />
              <Button>Button 2</Button>
              <Button onClick={second.onOpen}>Open Nested</Button>
            </Dialog.Footer>

            <Dialog.Root isOpen={second.isOpen} onClose={second.onClose}>
              <Dialog.Overlay />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>Dialog. 2 Title</Dialog.Header>
                  <Dialog.Body>
                    Sit nulla est ex deserunt exercitation anim occaecat.
                    Nostrud ullamco deserunt aute id consequat ven.
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const InsideScroll = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={onOpen}>
        Open
      </Button>
      <Dialog.Root onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Lorem size={5} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onClose}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const AnimationDisabled = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={onOpen}>
        Open
      </Button>
      <Dialog.Root onClose={onClose} isOpen={isOpen} motionPreset="none">
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Lorem size={5} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onClose}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const WithContentOverflow = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={onOpen}>
        Open
      </Button>
      <Dialog.Root onClose={onClose} isOpen={isOpen} size="full">
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Lorem count={30} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onClose}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export function WithCustomMotionProps() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={onOpen}>
        Open
      </Button>
      <Dialog.Root isOpen={isOpen} onClose={onClose} centered>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content
            motionProps={{
              initial: "exit",
              animate: "enter",
              exit: "exit",
              variants: {
                enter: { opacity: 1, y: 10 },
                exit: { opacity: 0, y: 0, transition: { duration: 0.1 } },
              },
            }}
          >
            <Dialog.CloseTrigger />
            <Dialog.Header>Welcome Home</Dialog.Header>
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi.
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={onClose}>Cancel</Button>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const WithInitialFocus = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<any>()
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Dialog.Root
        isOpen={isOpen}
        initialFocusRef={inputRef}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. header</Dialog.Header>
            <Dialog.Body>
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input ref={inputRef} placeholder="Focus First" />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
