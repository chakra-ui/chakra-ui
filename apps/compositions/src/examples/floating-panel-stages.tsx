"use client"

import {
  Button,
  FloatingPanel,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinimize2,
  LuRotateCcw,
  LuX,
} from "react-icons/lu"

export const FloatingPanelStages = () => {
  return (
    <FloatingPanel.Root
      defaultOpen
      defaultPosition={{ x: 100, y: 100 }}
      defaultSize={{ width: 360, height: 260 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Stages</FloatingPanel.Title>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.StageTrigger stage="minimized" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                <LuMinimize2 />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.StageTrigger stage="maximized" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Maximize">
                <LuMaximize2 />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.StageTrigger stage="default" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Restore">
                <LuRotateCcw />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.CloseTrigger asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Close">
                <LuX />
              </IconButton>
            </FloatingPanel.CloseTrigger>
          </FloatingPanel.Header>
          <FloatingPanel.Body>
            <Stack gap="2">
              <Text textStyle="sm">
                Use the header controls to cycle between stages.
              </Text>
              <HStack gap="2" textStyle="xs" color="fg.muted">
                <LuMinimize2 />
                <Text>Minimize — collapses to header only</Text>
              </HStack>
              <HStack gap="2" textStyle="xs" color="fg.muted">
                <LuMaximize2 />
                <Text>Maximize — fills the viewport</Text>
              </HStack>
              <HStack gap="2" textStyle="xs" color="fg.muted">
                <LuRotateCcw />
                <Text>Restore — returns to default size</Text>
              </HStack>
            </Stack>
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
