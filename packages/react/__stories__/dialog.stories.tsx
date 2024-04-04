import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { HiX } from "react-icons/hi"
//@ts-ignore
import Lorem from "react-lorem-component"
import { Box, Button, IconButton, Input } from "../src"
import { Dialog } from "../src/components/dialog"
import { chakra } from "../src/styled-system"

export default {
  title: "Components / Dialog",
}

export const Basic = () => {
  const [open, handlers] = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={handlers.open}>
        Open
      </Button>
      <Dialog.Root open={open} onClose={handlers.close} centered>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Header>Welcome Home</Dialog.Header>
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi.
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handlers.close}>Cancel</Button>
              <Button variant="solid">Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const FinalFocusRef = () => {
  const [open, handlers] = useDisclosure()
  const finalRef = React.useRef<any>()

  return (
    <>
      <Box ref={finalRef} tabIndex={-1} aria-label="Focus moved to this box">
        Some other content that'll receive focus on close.
      </Box>

      <Button mt={4} onClick={handlers.open}>
        Open Dialog.
      </Button>

      <Dialog.Root
        finalFocusRef={finalRef}
        open={open}
        onClose={handlers.close}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </Dialog.Body>

            <Dialog.Footer>
              <Button onClick={handlers.close}>Close</Button>
              <Button>Secondary Action</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const NestedDialogs = () => {
  const [firstOpen, first] = useDisclosure()
  const [secondOpen, second] = useDisclosure()

  return (
    <>
      <Button onClick={first.open}>Open</Button>
      <Dialog.Root open={firstOpen} onClose={first.close}>
        <Dialog.Backdrop />
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
              <Button onClick={second.open}>Open Nested</Button>
            </Dialog.Footer>

            <Dialog.Root open={secondOpen} onClose={second.close}>
              <Dialog.Backdrop />
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
  const [open, handlers] = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={handlers.open}>
        Open
      </Button>
      <Dialog.Root onClose={handlers.close} open={open} scrollBehavior="inside">
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Lorem size={5} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handlers.close}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const AnimationDisabled = () => {
  const [open, handlers] = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={handlers.open}>
        Open
      </Button>
      <Dialog.Root onClose={handlers.close} open={open} motionPreset="none">
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Lorem size={5} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handlers.close}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const FullWithLongContent = () => {
  const [open, handlers] = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={handlers.open}>
        Open
      </Button>
      <Dialog.Root onClose={handlers.close} open={open} size="full">
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Dialog Title</Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Lorem count={30} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handlers.close}>Close</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export function WithCustomMotionProps() {
  const [open, handlers] = useDisclosure()
  return (
    <>
      <Button variant="solid" onClick={handlers.open}>
        Open
      </Button>
      <Dialog.Root open={open} onClose={handlers.close}>
        <Dialog.Backdrop />
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
            <Dialog.CloseTrigger asChild>
              <IconButton variant="ghost" aria-label="Close">
                <HiX />
              </IconButton>
            </Dialog.CloseTrigger>
            <Dialog.Header>Welcome Home</Dialog.Header>
            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi.
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handlers.close}>Cancel</Button>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export const WithInitialFocus = () => {
  const [open, setopen] = React.useState(false)
  const inputRef = React.useRef<any>()
  return (
    <>
      <Button onClick={() => setopen(true)}>Open</Button>
      <Dialog.Root
        open={open}
        initialFocusRef={inputRef}
        onClose={() => setopen(false)}
      >
        <Dialog.Backdrop />
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
