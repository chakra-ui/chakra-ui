"use client"

import {
  Box,
  Button,
  FloatingPanel as ChakraFloatingPanel,
  Grid,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"
import { useRef, useState } from "react"
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuArrowUp,
} from "react-icons/lu"

const STEP = 40

export const FloatingPanelControlledPosition = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 16, y: 100 })

  const move = (dx: number, dy: number) =>
    setPosition((p) => ({ x: p.x + dx, y: p.y + dy }))

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
        strategy="absolute"
        getBoundaryEl={() => containerRef.current}
        position={position}
        onPositionChange={(details) => setPosition(details.position)}
        defaultSize={{ width: 260, height: 160 }}
      >
        <HStack align="start" p="3">
          <ChakraFloatingPanel.Trigger asChild>
            <Button variant="outline" size="sm">
              Open Panel
            </Button>
          </ChakraFloatingPanel.Trigger>
          <Grid templateColumns="repeat(3, 1fr)" gap="1">
            <span />
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Move up"
              onClick={() => move(0, -STEP)}
            >
              <LuArrowUp />
            </IconButton>
            <span />
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Move left"
              onClick={() => move(-STEP, 0)}
            >
              <LuArrowLeft />
            </IconButton>
            <span />
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Move right"
              onClick={() => move(STEP, 0)}
            >
              <LuArrowRight />
            </IconButton>
            <span />
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Move down"
              onClick={() => move(0, STEP)}
            >
              <LuArrowDown />
            </IconButton>
            <span />
          </Grid>
          <Text textStyle="xs" fontFamily="mono" color="fg.muted" pt="1">
            x: {Math.round(position.x)}, y: {Math.round(position.y)}
          </Text>
        </HStack>
        <FloatingPanel.Content title="Controlled Position">
          <Text textStyle="sm">
            Use the arrow pad above or drag the header to move this panel.
          </Text>
        </FloatingPanel.Content>
      </ChakraFloatingPanel.Root>
    </Box>
  )
}
