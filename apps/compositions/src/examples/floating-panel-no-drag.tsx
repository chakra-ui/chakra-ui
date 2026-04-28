"use client"

import { Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelNoDrag = () => {
  return (
    <FloatingPanel.Root
      draggable={false}
      persistRect
      defaultSize={{ width: 320, height: 200 }}
      minSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content title="Not Draggable">
        <Text textStyle="sm">
          This panel cannot be dragged. The position is fixed. Resizing is still
          enabled.
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
