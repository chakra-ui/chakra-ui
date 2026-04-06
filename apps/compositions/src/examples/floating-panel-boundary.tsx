"use client"

import { Box, Button, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"
import { useRef } from "react"

export const FloatingPanelBoundary = () => {
  const boundaryRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={boundaryRef}
      position="relative"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="border.emphasized"
      borderRadius="l2"
      w="full"
      h="400px"
      p="4"
    >
      <Text textStyle="xs" color="fg.muted" mb="2">
        Drag boundary
      </Text>
      <FloatingPanel.Root
        persistRect
        allowOverflow={false}
        getBoundaryEl={() => boundaryRef.current}
        defaultSize={{ width: 280, height: 180 }}
      >
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Panel
          </Button>
        </FloatingPanel.Trigger>
        <FloatingPanel.Content title="Bounded Panel">
          <Text textStyle="sm">
            This panel cannot be dragged outside the dashed boundary box.
          </Text>
        </FloatingPanel.Content>
      </FloatingPanel.Root>
    </Box>
  )
}
