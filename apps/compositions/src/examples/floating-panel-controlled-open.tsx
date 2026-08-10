"use client"

import {
  Button,
  FloatingPanel,
  HStack,
  IconButton,
  Portal,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

export const FloatingPanelControlledOpen = () => {
  const [open, setOpen] = useState(false)

  return (
    <FloatingPanel.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      persistRect
      defaultSize={{ width: 320, height: 200 }}
      minSize={{ width: 320, height: 200 }}
    >
      <HStack>
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm">
            {open ? "Close Panel" : "Open Panel"}
          </Button>
        </FloatingPanel.Trigger>
      </HStack>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Controlled Open</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuX />
                  </IconButton>
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              The open state is fully controlled externally. Closing via the ×
              button or the trigger both update the same state.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
