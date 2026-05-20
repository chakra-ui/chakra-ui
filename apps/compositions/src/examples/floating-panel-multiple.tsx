"use client"

import {
  Button,
  FloatingPanel,
  HStack,
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

const panels = [
  {
    id: "notes",
    label: "Notes",
    title: "Notes",
    defaultPosition: { x: 80, y: 80 },
    description: "Jot down quick ideas and reminders.",
  },
  {
    id: "tasks",
    label: "Tasks",
    title: "Tasks",
    defaultPosition: { x: 260, y: 120 },
    description: "Track items you want to finish today.",
  },
  {
    id: "chat",
    label: "Chat",
    title: "Chat",
    defaultPosition: { x: 440, y: 160 },
    description: "Keep a lightweight conversation panel open.",
  },
] as const

export const FloatingPanelMultiple = () => {
  return (
    <HStack gap="2" flexWrap="wrap">
      {panels.map((panel) => (
        <FloatingPanel.Root
          key={panel.id}
          id={panel.id}
          persistRect
          defaultPosition={panel.defaultPosition}
          defaultSize={{ width: 280, height: 200 }}
          minSize={{ width: 240, height: 160 }}
        >
          <FloatingPanel.Trigger asChild>
            <Button variant="outline" size="sm">
              {panel.label}
            </Button>
          </FloatingPanel.Trigger>
          <Portal>
            <FloatingPanel.Positioner>
              <FloatingPanel.Content>
                <FloatingPanel.Header>
                  <FloatingPanel.DragTrigger>
                    <LuGripHorizontal />
                    <FloatingPanel.Title>{panel.title}</FloatingPanel.Title>
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
                  <Text textStyle="sm">{panel.description}</Text>
                </FloatingPanel.Body>
                <FloatingPanel.ResizeTriggers />
              </FloatingPanel.Content>
            </FloatingPanel.Positioner>
          </Portal>
        </FloatingPanel.Root>
      ))}
    </HStack>
  )
}
