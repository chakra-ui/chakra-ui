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
    >
      <Text textStyle="xs" color="fg.muted" mb="2">
        Drag boundary
      </Text>
      <FloatingPanel.Root
        persistRect
        allowOverflow={false}
        getBoundaryEl={() => boundaryRef.current}
        defaultSize={{ width: 280, height: 180 }}
        minSize={{ width: 280, height: 180 }}
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
                  <FloatingPanel.Title>Bounded Panel</FloatingPanel.Title>
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
                  This panel cannot be dragged outside the dashed boundary box.
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
