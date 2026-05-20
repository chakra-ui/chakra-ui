"use client"

import {
  Button,
  FloatingPanel,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import { useCallback, useRef } from "react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

export const FloatingPanelAnchorPosition = () => {
  const anchorPos = useRef({ x: 0, y: 0 })

  const getAnchorPosition = useCallback(
    (details: {
      triggerRect: DOMRect | null
      boundaryRect: DOMRect | null
    }) => {
      const rect = details.triggerRect
      if (!rect) return anchorPos.current
      anchorPos.current = { x: rect.left, y: rect.bottom + 8 }
      return anchorPos.current
    },
    [],
  )

  return (
    <FloatingPanel.Root
      getAnchorPosition={getAnchorPosition}
      defaultSize={{ width: 300, height: 200 }}
      minSize={{ width: 280, height: 160 }}
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
                <FloatingPanel.Title>Anchor Position</FloatingPanel.Title>
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
                Opens below the trigger. Drag the header to reposition.
              </Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
