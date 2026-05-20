"use client"

import {
  Button,
  FloatingPanel,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

export const FloatingPanelStages = () => {
  return (
    <FloatingPanel.Root
      persistRect
      defaultSize={{ width: 320, height: 220 }}
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
                <FloatingPanel.Title>Stages</FloatingPanel.Title>
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
                Use the header controls to minimize, maximize, or restore the
                panel.
              </Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
