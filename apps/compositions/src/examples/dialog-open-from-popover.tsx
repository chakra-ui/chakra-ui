"use client"

import {
  Button,
  CloseButton,
  Dialog,
  Popover,
  Portal,
  Text,
} from "@chakra-ui/react"

export const DialogOpenFromPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open Popover</Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="medium">Popover Title</Popover.Title>
              <Text my="4">
                This popover contains a button that opens a dialog. The dialog
                should appear above the popover.
              </Text>
              <PopoverDialog />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

function PopoverDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="solid" colorPalette="blue">
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Dialog from Popover</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                This dialog was opened from within a popover. It should appear
                above the popover thanks to the unified z-index system.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="blue">Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
