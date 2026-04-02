"use client"

import { Button, FloatingPanel, HStack, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { LuGripHorizontal, LuMinus, LuX } from "react-icons/lu"

export const FloatingPanelOpenState = () => {
  const [open, setOpen] = useState(false)

  return (
    <FloatingPanel.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      defaultPosition={{ x: 100, y: 100 }}
      defaultSize={{ width: 320, height: 200 }}
    >
      <HStack>
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm">
            {open ? "Close Panel" : "Open Panel"}
          </Button>
        </FloatingPanel.Trigger>
      </HStack>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Open State</FloatingPanel.Title>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.StageTrigger stage="minimized" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                <LuMinus />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.CloseTrigger asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Close">
                <LuX />
              </IconButton>
            </FloatingPanel.CloseTrigger>
          </FloatingPanel.Header>
          <FloatingPanel.Body>
            The open state is fully controlled externally. Closing via the ×
            button or the trigger both update the same state.
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
