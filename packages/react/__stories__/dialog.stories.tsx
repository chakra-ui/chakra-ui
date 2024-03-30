import * as React from "react"
import { HiX } from "react-icons/hi"
//@ts-ignore
import Lorem from "react-lorem-component"
import { Box, Button, IconButton, Input, Portal } from "../src"
import { Dialog } from "../src/components/dialog"

export default {
  title: "Components / Dialog",
  decorators: [(Story: any) => <Story />],
}

export const Basic = () => {
  return (
    <Dialog.Root centered>
      <Button variant="outline" asChild>
        <Dialog.Trigger>Open</Dialog.Trigger>
      </Button>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <IconButton asChild variant="ghost" aria-label="Close">
            <Dialog.CloseTrigger>
              <HiX />
            </Dialog.CloseTrigger>
          </IconButton>
          <Dialog.Header>Welcome Home</Dialog.Header>
          <Dialog.Body>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi.
          </Dialog.Body>
          <Dialog.Footer>
            <Button asChild>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Button>
            <Button variant="outline">Save</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const NestedDialogs = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Dialog.Root lazyMount>
      <Button asChild>
        <Dialog.Trigger>Open</Dialog.Trigger>
      </Button>
      <Portal>
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
              <Button variant="outline">Button 2</Button>
              <Button onClick={() => setIsOpen(true)}>Open Nested</Button>
            </Dialog.Footer>

            <Dialog.Root
              lazyMount
              open={isOpen}
              onOpenChange={(e) => setIsOpen(e.open)}
            >
              <Portal>
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
              </Portal>
            </Dialog.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export const InsideScroll = () => {
  return (
    <Dialog.Root scrollBehavior="inside">
      <Button asChild>
        <Dialog.Trigger>Open</Dialog.Trigger>
      </Button>
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
            <Button asChild>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const WithInstantAnimation = () => {
  return (
    <Dialog.Root motionPreset="none">
      <Button asChild>
        <Dialog.Trigger>Open</Dialog.Trigger>
      </Button>
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
            <Button asChild>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const WithContentOverflow = () => {
  return (
    <Dialog.Root size="full">
      <Button asChild variant="outline">
        <Dialog.Trigger>Open</Dialog.Trigger>
      </Button>

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
            <Button asChild>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const WithInitialFocus = () => {
  const inputRef = React.useRef<any>()
  return (
    <Dialog.Root initialFocusEl={() => inputRef.current}>
      <Button asChild variant="outline">
        <Dialog.Trigger>Open</Dialog.Trigger>
      </Button>
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
  )
}

export const WithFinalFocus = () => {
  const finalRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <Box
        ref={finalRef}
        tabIndex={-1}
        aria-label="Focus moved to this box"
        _focus={{ outline: "2px solid red" }}
      >
        Some other content that'll receive focus on close.
      </Box>

      <Dialog.Root finalFocusEl={() => finalRef.current}>
        <Button asChild mt={4}>
          <Dialog.Trigger>Open Dialog.</Dialog.Trigger>
        </Button>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <IconButton asChild variant="ghost">
                <Dialog.CloseTrigger>
                  <HiX />
                </Dialog.CloseTrigger>
              </IconButton>
            </Dialog.Header>

            <Dialog.Body>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
              ullamco deserunt aute id consequat veniam incididunt duis in sint
              irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
              officia tempor esse quis.
            </Dialog.Body>

            <Dialog.Footer>
              <Button asChild>
                <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
              </Button>
              <Button variant="outline">Secondary Action</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
