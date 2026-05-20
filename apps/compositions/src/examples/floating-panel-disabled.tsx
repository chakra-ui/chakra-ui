"use client"

import {
  Box,
  Button,
  FloatingPanel,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import { useRef } from "react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

export const FloatingPanelDisabled = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={containerRef}
      position="relative"
      isolation="isolate"
      h="400px"
      w="full"
    >
      <FloatingPanel.Root
        defaultOpen
        persistRect
        disabled
        strategy="absolute"
        getBoundaryEl={() => containerRef.current}
        defaultPosition={{ x: 16, y: 60 }}
        defaultSize={{ width: 320, height: 200 }}
        minSize={{ width: 320, height: 200 }}
      >
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm" m="3">
            Open Panel
          </Button>
        </FloatingPanel.Trigger>
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <FloatingPanel.Header>
                <FloatingPanel.DragTrigger>
                  <LuGripHorizontal />
                  <FloatingPanel.Title>Disabled Panel</FloatingPanel.Title>
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
                <Text textStyle="sm">
                  This panel is disabled. Dragging, resizing, and stage controls
                  are all inactive.
                </Text>
              </FloatingPanel.Body>
              <FloatingPanel.ResizeTriggers />
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.Root>
    </Box>
  )
}
