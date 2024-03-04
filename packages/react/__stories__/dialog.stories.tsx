import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
//@ts-ignore
import Lorem from "react-lorem-component"
import { Dialog } from "../src/components/dialog"
import { PortalManager } from "../src/components/portal"
import { chakra } from "../src/styled-system"

export default {
  title: "Overlay / Dialog",
  decorators: [
    (StoryFn: any) => (
      <PortalManager>
        <StoryFn />
      </PortalManager>
    ),
  ],
}

const Button = chakra("button", {
  baseStyle: {
    px: "3",
    py: "2",
    bg: "gray.100",
    rounded: "md",
    transitionProperty: "color, box-shadow",
    transitionDuration: "normal",
  },
})

export function Basic() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open</Button>
      <Dialog.Root isOpen={isOpen} onClose={onClose} isCentered>
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
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export function FinalFocusRef() {
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
        Open Dialog.
      </Button>

      <Dialog.Root finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. Title</Dialog.Header>
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
      <button onClick={first.onOpen}>Open</button>
      <Dialog.Root isOpen={first.isOpen} onClose={first.onClose}>
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. Title</Dialog.Header>
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
      <button onClick={onOpen}>Open</button>
      <Dialog.Root onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. Title</Dialog.Header>
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
      <button onClick={onOpen}>Open</button>
      <Dialog.Root onClose={onClose} isOpen={isOpen} motionPreset="none">
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. Title</Dialog.Header>
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

export const FullWithLongContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Dialog.Root onClose={onClose} isOpen={isOpen} size="full">
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. Title2</Dialog.Header>
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
      <Button onClick={onOpen}>Open</Button>
      <Dialog.Root isOpen={isOpen} onClose={onClose} isCentered>
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

export function WithInitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialFocusRef = React.useRef(null)
  return (
    <>
      <Button onClick={onOpen}>Open Dialog.</Button>
      <Dialog.Root
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog. Title</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <p>With just the text it's awesome</p>
              <input
                defaultValue="But with a focussed input it breaks"
                name="name"
                ref={initialFocusRef}
              />
            </Dialog.Body>

            <Dialog.Footer>
              <Button>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const InitialFocusRef = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<any>()
  return (
    <>
      <button data-testid="button" onClick={() => setIsOpen(true)}>
        Open
      </button>
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
              <input />
              <input />
              <input ref={inputRef} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
