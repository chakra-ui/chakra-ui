"use client"

import { Button, FloatingPanel, IconButton, Text } from "@chakra-ui/react"
import { LuGripHorizontal, LuMinus, LuX } from "react-icons/lu"

export const FloatingPanelOverflow = () => {
  return (
    <FloatingPanel.Root
      defaultOpen
      allowOverflow={false}
      defaultPosition={{ x: 100, y: 100 }}
      defaultSize={{ width: 300, height: 180 }}
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
              <FloatingPanel.Title>No Overflow</FloatingPanel.Title>
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
              This panel cannot be dragged beyond the viewport edges.
            </Text>
          </FloatingPanel.Body>
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
