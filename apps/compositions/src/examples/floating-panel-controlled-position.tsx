"use client"

import {
  Button,
  FloatingPanel,
  Grid,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuArrowDown,
  LuArrowLeft,
  LuArrowRight,
  LuArrowUp,
  LuGripHorizontal,
  LuMinus,
  LuX,
} from "react-icons/lu"

const STEP = 40

export const FloatingPanelControlledPosition = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 })

  const move = (dx: number, dy: number) =>
    setPosition((p) => ({ x: p.x + dx, y: p.y + dy }))

  return (
    <FloatingPanel.Root
      defaultOpen
      position={position}
      onPositionChange={(details) => setPosition(details.position)}
      defaultSize={{ width: 260, height: 160 }}
    >
      <HStack align="start">
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
      <FloatingPanel.Positioner>
        <FloatingPanel.Content>
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger>
              <LuGripHorizontal />
              <FloatingPanel.Title>Controlled Position</FloatingPanel.Title>
            </FloatingPanel.DragTrigger>
            <FloatingPanel.StageTrigger stage="minimized" asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Minimize">
                <LuMinus />
              </IconButton>
            </FloatingPanel.StageTrigger>
            <FloatingPanel.CloseTrigger asChild>
              <IconButton variant="ghost" size="2xs" aria-label="Close">
                <LuX />
              </IconButton>
            </FloatingPanel.CloseTrigger>
          </FloatingPanel.Header>
          <FloatingPanel.Body>
            <Text textStyle="sm">
              Use the arrow pad above or drag the header to move this panel.
            </Text>
          </FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers />
        </FloatingPanel.Content>
      </FloatingPanel.Positioner>
    </FloatingPanel.Root>
  )
}
