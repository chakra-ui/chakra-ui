"use client"

import { Button, FloatingPanel, IconButton } from "@chakra-ui/react"
import { LuGripHorizontal, LuMinus, LuSquare, LuX } from "react-icons/lu"

export const FloatingPanelBasic = () => {
  return (
    <FloatingPanel.Root defaultOpen defaultPosition={{ x: 100, y: 100 }}>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content width="320px" height="240px">
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Floating Panel</FloatingPanel.Title>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.Control>
              <FloatingPanel.StageTrigger stage="minimized" asChild>
                <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                  <LuMinus />
                </IconButton>
              </FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="maximized" asChild>
                <IconButton variant="ghost" size="2xs" aria-label="Maximize">
                  <LuSquare />
                </IconButton>
              </FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger asChild>
                <IconButton variant="ghost" size="2xs" aria-label="Close">
                  <LuX />
                </IconButton>
              </FloatingPanel.CloseTrigger>
            </FloatingPanel.Control>
          </FloatingPanel.Header>
          <FloatingPanel.Body>
            <p>Drag the header to move this panel around the screen.</p>
            <p>Use the resize handles to change the panel size.</p>
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
