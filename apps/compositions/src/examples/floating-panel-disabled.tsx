"use client"

import {
  Box,
  Button,
  FloatingPanel as ChakraFloatingPanel,
  Text,
} from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"
import { useRef } from "react"

export const FloatingPanelDisabled = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={containerRef}
      position="relative"
      isolation="isolate"
      h="400px"
      w="full"
    >
      <ChakraFloatingPanel.Root
        defaultOpen
        persistRect
        disabled
        strategy="absolute"
        getBoundaryEl={() => containerRef.current}
        defaultPosition={{ x: 16, y: 60 }}
        defaultSize={{ width: 320, height: 200 }}
        minSize={{ width: 320, height: 200 }}
      >
        <ChakraFloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm" m="3">
            Open Panel
          </Button>
        </ChakraFloatingPanel.Trigger>
        <FloatingPanel.Content title="Disabled Panel">
          <Text textStyle="sm">
            This panel is disabled. Dragging, resizing, and stage controls are
            all inactive.
          </Text>
        </FloatingPanel.Content>
      </ChakraFloatingPanel.Root>
    </Box>
  )
}
