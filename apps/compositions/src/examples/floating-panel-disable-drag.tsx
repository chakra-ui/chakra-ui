"use client"

import {
  Button,
  FloatingPanel,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

export const FloatingPanelDisableDrag = () => {
  return (
    <FloatingPanel.Root
      draggable={false}
      persistRect
      defaultSize={{ width: 320, height: 200 }}
      minSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Disable Drag</FloatingPanel.Title>
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
              <Text textStyle="sm">
                This panel cannot be dragged. The position is fixed. Resizing is
                still enabled.
              </Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
