"use client"

import {
  Button,
  ButtonGroup,
  FloatingPanel,
  HStack,
  IconButton,
  Portal,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  LuGripHorizontal,
  LuMaximize2,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu"

const PRESETS = [
  { label: "S", size: { width: 240, height: 180 } },
  { label: "M", size: { width: 360, height: 260 } },
  { label: "L", size: { width: 520, height: 360 } },
]

export const FloatingPanelControlledSize = () => {
  const [size, setSize] = useState({ width: 360, height: 260 })

  return (
    <FloatingPanel.Root
      size={size}
      onSizeChange={(details) => setSize(details.size)}
    >
      <HStack>
        <FloatingPanel.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Panel
          </Button>
        </FloatingPanel.Trigger>
        <ButtonGroup size="sm" variant="outline" attached>
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              onClick={() => setSize(preset.size)}
              fontWeight={size.width === preset.size.width ? "bold" : "normal"}
            >
              {preset.label}
            </Button>
          ))}
        </ButtonGroup>
      </HStack>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <LuGripHorizontal />
                <FloatingPanel.Title>Controlled Size</FloatingPanel.Title>
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
              <Text textStyle="sm" color="fg.muted">
                {size.width} × {size.height}px
              </Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
