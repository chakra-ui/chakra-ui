import { Button, Dialog, Portal } from "@chakra-ui/react"

export const DialogWithBackdropBlur = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog (backdrop blur)</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop
          backdropFilter="auto"
          backdropBlur="md"
          bg="blackAlpha.600"
        />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body pt="4" spaceY="4">
              <Dialog.Title>Backdrop blur example</Dialog.Title>
              <Dialog.Description>
                This dialog uses backdropFilter="auto" and backdropBlur so the
                content behind is blurred. The backdrop vars use valid no-op
                fallbacks so the property stays valid when only some are set.
              </Dialog.Description>
            </Dialog.Body>
            <Dialog.CloseTrigger />
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>Close</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
