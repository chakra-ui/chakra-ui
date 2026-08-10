"use client"

import {
  Button,
  FloatingPanel,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

export const FloatingPanelResizeAxes = () => {
  return (
    <FloatingPanel.Root
      defaultSize={{ width: 320, height: 200 }}
      minSize={{ width: 240, height: 160 }}
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
                <FloatingPanel.Title>Resize Axes</FloatingPanel.Title>
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
                Only the south, east, and southeast handles are enabled.
              </Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers axes={["s", "e", "se"]} />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
