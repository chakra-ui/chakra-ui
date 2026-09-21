"use client"

import { Button, HStack, Popover, Portal } from "@chakra-ui/react"

export const PopoverWithMultipleTriggers = () => {
  return (
    <Popover.Root>
      <HStack>
        <Popover.Trigger asChild value="profile">
          <Button size="sm" variant="outline">
            Profile
          </Button>
        </Popover.Trigger>
        <Popover.Trigger asChild value="settings">
          <Button size="sm" variant="outline">
            Settings
          </Button>
        </Popover.Trigger>
        <Popover.Trigger asChild value="help">
          <Button size="sm" variant="outline">
            Help
          </Button>
        </Popover.Trigger>
      </HStack>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Context>
                {(api) => (
                  <>
                    <Popover.Title
                      fontWeight="medium"
                      textTransform="capitalize"
                    >
                      {api.triggerValue}
                    </Popover.Title>
                    Opened from the {api.triggerValue} trigger.
                  </>
                )}
              </Popover.Context>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
