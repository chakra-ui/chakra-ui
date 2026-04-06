"use client"

import { Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelNoOverflow = () => {
  return (
    <FloatingPanel.Root
      allowOverflow={false}
      defaultSize={{ width: 300, height: 180 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content title="No Overflow">
        <Text textStyle="sm">
          This panel cannot be dragged beyond the viewport edges.
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
