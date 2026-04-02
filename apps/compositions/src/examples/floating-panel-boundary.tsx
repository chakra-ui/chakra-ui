"use client"

import { Box, Button, FloatingPanel, IconButton, Text } from "@chakra-ui/react"
import { useRef } from "react"
import { LuGripHorizontal, LuMinus, LuX } from "react-icons/lu"

export const FloatingPanelBoundary = () => {
  const boundaryRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={boundaryRef}
      position="relative"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="border.emphasized"
      borderRadius="l2"
      w="full"
      h="400px"
      p="4"
      overflow="hidden"
    >
      <Text textStyle="xs" color="fg.muted">
        Drag boundary
      </Text>
      <FloatingPanel.Root
        defaultOpen
        strategy="absolute"
        allowOverflow={false}
        getBoundaryEl={() => boundaryRef.current}
        defaultPosition={{ x: 40, y: 60 }}
        defaultSize={{ width: 280, height: 180 }}
      >
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm" mt="2">
            Open Panel
          </Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Bounded Panel</FloatingPanel.Title>
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
                This panel cannot be dragged outside the dashed boundary box.
              </Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel.Root>
    </Box>
  )
}
