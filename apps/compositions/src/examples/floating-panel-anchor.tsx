"use client"

import { Button } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelAnchor = () => {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open anchored panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content
        title="Anchored Panel"
        width="300px"
        height="200px"
      >
        <p>
          This panel opens anchored to the trigger button position. Drag it to
          reposition freely.
        </p>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
