"use client"

import {
  Button,
  FloatingPanel,
  HStack,
  IconButton,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuGripHorizontal, LuX } from "react-icons/lu"

export const FloatingPanelControlledSize = () => {
  const [size, setSize] = useState({ width: 360, height: 260 })

  return (
    <FloatingPanel.Root
      size={size}
      onSizeChange={(details) => setSize(details.size)}
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
                <FloatingPanel.Title>Controlled Size</FloatingPanel.Title>
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
              <Stack gap="3">
                <HStack gap="2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSize({ width: 240, height: 180 })}
                  >
                    S
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSize({ width: 360, height: 260 })}
                  >
                    M
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSize({ width: 520, height: 360 })}
                  >
                    L
                  </Button>
                </HStack>
                <Text textStyle="sm" color="fg.muted">
                  {Number(size.width.toFixed(2))} x{" "}
                  {Number(size.height.toFixed(2))}px
                </Text>
              </Stack>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
