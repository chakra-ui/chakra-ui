"use client"

import { Button, FloatingPanel, IconButton, Portal } from "@chakra-ui/react"
import { useCallback, useRef } from "react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

export const FloatingPanelBasic = () => {
  const anchorPos = useRef({ x: 0, y: 0 })

  const getAnchorPosition = useCallback(
    (details: {
      triggerRect: DOMRect | null
      boundaryRect: DOMRect | null
    }) => {
      if (!details.triggerRect) return anchorPos.current
      anchorPos.current = {
        x: details.triggerRect.left,
        y: details.triggerRect.bottom + 8,
      }
      return anchorPos.current
    },
    [],
  )

  return (
    <FloatingPanel.Root
    // persistRect
    // getAnchorPosition={getAnchorPosition}
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
                  <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                    <LuMinus />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="maximized" asChild>
                  <IconButton variant="ghost" size="2xs" aria-label="Maximize">
                    <LuSquare />
                  </IconButton>
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="default" asChild>
                  <IconButton variant="ghost" size="2xs" aria-label="Restore">
                    <LuMaximize2 />
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
              <p>Drag the header to move this panel around.</p>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
