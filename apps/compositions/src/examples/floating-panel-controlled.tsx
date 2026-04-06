"use client"

import { Button, HStack } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"
import { useState } from "react"

export const FloatingPanelControlled = () => {
  const [open, setOpen] = useState(false)

  return (
    <FloatingPanel.Root
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      defaultSize={{ width: 320, height: 200 }}
    >
      <HStack>
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm">
            {open ? "Close Panel" : "Open Panel"}
          </Button>
        </FloatingPanel.Trigger>
      </HStack>
      <FloatingPanel.Content title="Controlled">
        The open state is fully controlled externally. Closing via the × button
        or the trigger both update the same state.
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
