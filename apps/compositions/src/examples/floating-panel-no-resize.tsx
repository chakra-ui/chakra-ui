"use client"

import { Button, FloatingPanel, IconButton, Text } from "@chakra-ui/react"
import { LuGripHorizontal, LuMinus, LuX } from "react-icons/lu"

export const FloatingPanelNoResize = () => {
  return (
    <FloatingPanel.Root
      defaultOpen
      resizable={false}
      defaultPosition={{ x: 100, y: 100 }}
      defaultSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Not Resizable</FloatingPanel.Title>
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
            <Text textStyle="sm">
              This panel has a fixed size and cannot be resized. Dragging is
              still enabled.
            </Text>
          </FloatingPanel.Body>
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
