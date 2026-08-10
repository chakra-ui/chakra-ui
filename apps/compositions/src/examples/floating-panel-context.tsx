"use client"

import {
  Button,
  FloatingPanel,
  HStack,
  IconButton,
  Portal,
  Text,
  useFloatingPanelContext,
} from "@chakra-ui/react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

const PanelActions = () => {
  const api = useFloatingPanelContext()
  return (
    <HStack gap="2">
      <Button size="sm" variant="outline" onClick={() => api.minimize()}>
        Minimize
      </Button>
      <Button size="sm" variant="outline" onClick={() => api.maximize()}>
        Maximize
      </Button>
      <Button size="sm" variant="outline" onClick={() => api.restore()}>
        Restore
      </Button>
    </HStack>
  )
}

export const FloatingPanelContext = () => {
  return (
    <FloatingPanel.Root
      defaultSize={{ width: 320, height: 200 }}
      minSize={{ width: 280, height: 160 }}
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Panel
        </Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Context</FloatingPanel.Title>
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
              <Text textStyle="sm" mb="3">
                Control the panel from inside the body using{" "}
                <code>useFloatingPanelContext</code>.
              </Text>
              <PanelActions />
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
