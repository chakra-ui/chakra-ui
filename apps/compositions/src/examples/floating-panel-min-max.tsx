"use client"

import {
  Button,
  FloatingPanel,
  HStack,
  IconButton,
  Portal,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import {
  LuGripHorizontal,
  LuMouse,
  LuMoveHorizontal,
  LuX,
} from "react-icons/lu"

export const FloatingPanelMinMax = () => {
  return (
    <Stack gap="4" align="flex-start">
      <HStack textStyle="sm" gap="2">
        <LuMouse />
        <LuMoveHorizontal />
        <Span>
          Drag the resize handles — size is clamped between min and max.
        </Span>
      </HStack>

      <FloatingPanel.Root
        defaultSize={{ width: 320, height: 220 }}
        minSize={{ width: 280, height: 160 }}
        maxSize={{ width: 480, height: 320 }}
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
                  <FloatingPanel.Title>Min/Max</FloatingPanel.Title>
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
                  Resize the panel with the resize handles. Size is constrained
                  between 280x160px (min) and 480x320px (max).
                </Text>
              </FloatingPanel.Body>
              <FloatingPanel.ResizeTriggers />
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.Root>
    </Stack>
  )
}
