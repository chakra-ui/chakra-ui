"use client"

import { Button } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelClosed = () => {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content
        title="Floating Panel"
        width="320px"
        height="240px"
      >
        <p>Drag the header to move this panel around.</p>
        <p>Use the resize handles to change the panel size.</p>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
