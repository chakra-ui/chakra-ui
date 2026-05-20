"use client"

import {
  Button,
  FloatingPanel,
  IconButton,
  Portal,
  useFloatingPanel,
} from "@chakra-ui/react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

export const FloatingPanelWithStore = () => {
  const floatingPanel = useFloatingPanel({
    defaultSize: { width: 320, height: 200 },
    minSize: { width: 280, height: 160 },
  })

  return (
    <FloatingPanel.RootProvider value={floatingPanel}>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          {floatingPanel.open ? "Close Panel" : "Open Panel"}
        </Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Store</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger asChild>
                  <IconButton variant="ghost" size="2xs">
                    <LuX />
                  </IconButton>
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              Use <code>useFloatingPanel</code> with{" "}
              <code>FloatingPanel.RootProvider</code> to access panel state and
              methods from outside the panel tree.
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.RootProvider>
  )
}
