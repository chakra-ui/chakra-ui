"use client"

import { Box, Button, Group, Popover, Portal } from "@chakra-ui/react"
import { useRef } from "react"

export const PopoverWithInitialFocus = () => {
  const ref = useRef<HTMLButtonElement | null>(null)
  return (
    <Popover.Root initialFocusEl={() => ref.current}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>Manage Your Channels</Popover.Header>
            <Popover.Arrow />
            <Popover.Body>
              This is a popover with the same width as the trigger button
            </Popover.Body>
            <Popover.Footer>
              <Box fontSize="sm" flex="1">
                Step 2 of 4
              </Box>
              <Group>
                <Button size="sm" ref={ref}>
                  Prev
                </Button>
                <Button size="sm">Next</Button>
              </Group>
            </Popover.Footer>
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
