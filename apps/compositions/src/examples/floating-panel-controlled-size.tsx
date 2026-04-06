"use client"

import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react"
import { FloatingPanel } from "compositions/ui/floating-panel"
import { useState } from "react"

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
      <FloatingPanel.Content title="Controlled Size">
        <Text textStyle="sm" color="fg.muted">
          {size.width} × {size.height}px
        </Text>
      </FloatingPanel.Content>
    </FloatingPanel.Root>
  )
}
