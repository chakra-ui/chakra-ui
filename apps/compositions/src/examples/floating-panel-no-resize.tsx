"use client"

import { Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelNoResize = () => {
  return (
    <FloatingPanel.Root
      resizable={false}
      persistRect
      defaultSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content title="Not Resizable">
        <Text textStyle="sm">
          This panel has a fixed size and cannot be resized. Dragging is still
          enabled.
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
