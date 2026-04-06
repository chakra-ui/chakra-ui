"use client"

import { Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"

export const FloatingPanelLazyMount = () => {
  return (
    <FloatingPanel.Root
      lazyMount
      unmountOnExit
      defaultSize={{ width: 320, height: 200 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <FloatingPanel.Content title="Lazy Mount">
        <Text textStyle="sm">
          Content is only mounted when the panel is open and unmounted when it
          closes, keeping the DOM clean.
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
