"use client"

import { Button, FloatingPanel, IconButton } from "@chakra-ui/react"
import { useRef } from "react"
import { LuGripHorizontal, LuMinus, LuX } from "react-icons/lu"

export const FloatingPanelAnchor = () => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <FloatingPanel.Root
      defaultOpen
      getAnchorPosition={(details) => {
        const rect = details.triggerRect
        if (!rect) return { x: 100, y: 100 }
        return { x: rect.left, y: rect.bottom + 8 }
      }}
    >
      <FloatingPanel.Trigger ref={triggerRef} asChild>
        <Button variant="outline" size="sm">
          Open anchored panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content width="300px" height="200px">
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Anchored Panel</FloatingPanel.Title>
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
            <p>
              This panel opens anchored to the trigger button position. Drag it
              to reposition freely.
            </p>
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
