import { Dialog, chakra } from "@chakra-ui/react-next"

export const DialogBasic = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Dialog Title</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <chakra.p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </chakra.p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
            <chakra.button>Save</chakra.button>
          </Dialog.Footer>
          <Dialog.CloseTrigger>X</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
