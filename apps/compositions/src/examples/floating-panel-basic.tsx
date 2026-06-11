"use client"

import { Button, FloatingPanel, IconButton, Portal } from "@chakra-ui/react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

export const FloatingPanelBasic = () => {
  return (
    <FloatingPanel.Root
      defaultSize={{ width: 320, height: 180 }}
      minSize={{ width: 240, height: 100 }}
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
                <FloatingPanel.Title>Floating Panel</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized" asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuMinus />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="maximized" asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuSquare />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="default" asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuMaximize2 />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.CloseTrigger asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuX />
                  </IconButton>
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <p>Drag the header to move this panel around.</p>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
