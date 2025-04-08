import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import Lorem from "react-lorem-ipsum"

export const DialogWithOutsideScroll = () => {
  return (
    <Dialog.Root size="sm" scrollBehavior="outside">
      <Dialog.Trigger asChild>
        <Button variant="outline">Outside Scroll</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>With Outside Scroll</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <Lorem p={8} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
