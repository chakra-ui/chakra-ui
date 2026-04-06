"use client"

import { Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelPersistRect = () => {
  return (
    <FloatingPanel.Root persistRect defaultSize={{ width: 320, height: 200 }}>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content title="Persist Rect">
        <Text textStyle="sm">
          Move or resize this panel, then close and reopen it. The position and
          size are remembered between sessions.
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
