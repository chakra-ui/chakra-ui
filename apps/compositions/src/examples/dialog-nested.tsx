import { Button, Dialog, Portal } from "@chakra-ui/react"
import Lorem from "react-lorem-ipsum"

export const DialogNested = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Lorem p={2} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline">Button 2</Button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button>Open Nested</Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Dialog Title</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Lorem p={1} />
                      </Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
