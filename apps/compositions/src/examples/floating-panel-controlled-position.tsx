"use client"

import {
  Box,
  Button,
  FloatingPanel,
  Grid,
  HStack,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuArrowUp,
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
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
      <FloatingPanel.Root
        defaultOpen
        strategy="absolute"
        getBoundaryEl={() => containerRef.current}
        position={position}
        onPositionChange={(details) => setPosition(details.position)}
        defaultSize={{ width: 260, height: 160 }}
      >
        <HStack align="start" p="3">
          <FloatingPanel.Trigger asChild>
            <Button variant="outline" size="sm">
              Open Panel
            </Button>
          </FloatingPanel.Trigger>
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
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <FloatingPanel.Header>
                <FloatingPanel.DragTrigger>
                  <LuGripHorizontal />
                  <FloatingPanel.Title>Controlled Position</FloatingPanel.Title>
                </FloatingPanel.DragTrigger>
                <FloatingPanel.Control>
                  <FloatingPanel.StageTrigger stage="minimized" asChild>
                    <IconButton variant="ghost" size="2xs">
                      <LuMinus />
                    </IconButton>
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger stage="maximized" asChild>
                    <IconButton variant="ghost" size="2xs">
                      <LuSquare />
                    </IconButton>
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.StageTrigger stage="default" asChild>
                    <IconButton variant="ghost" size="2xs">
                      <LuMaximize2 />
                    </IconButton>
                  </FloatingPanel.StageTrigger>
                  <FloatingPanel.CloseTrigger asChild>
                    <IconButton variant="ghost" size="2xs">
                      <LuX />
                    </IconButton>
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
              <FloatingPanel.Body>
                <Text textStyle="sm">
                  Use the arrow pad above or drag the header to move this panel.
                </Text>
              </FloatingPanel.Body>
              <FloatingPanel.ResizeTriggers />
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.Root>
    </Box>
  )
}
