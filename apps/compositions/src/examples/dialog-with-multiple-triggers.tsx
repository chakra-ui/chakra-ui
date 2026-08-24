"use client"

import { Button, CloseButton, Dialog, HStack, Portal } from "@chakra-ui/react"

const people = {
  alice: "Alice Chen",
  bob: "Bob Okonkwo",
  cara: "Cara Singh",
}

export const DialogWithMultipleTriggers = () => {
  return (
    <Dialog.Root>
      <HStack>
        {Object.entries(people).map(([id, name]) => (
          <Dialog.Trigger asChild key={id} value={id}>
            <Button variant="outline" size="sm">
              Edit {name}
            </Button>
          </Dialog.Trigger>
        ))}
      </HStack>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Context>
              {(api) => {
                const name = people[api.triggerValue as keyof typeof people]
                return (
                  <>
                    <Dialog.Header>
                      <Dialog.Title>Edit {name}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      This dialog opened from the {name} trigger.
                    </Dialog.Body>
                  </>
                )
              }}
            </Dialog.Context>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
