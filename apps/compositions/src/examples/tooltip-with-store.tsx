"use client"

import { Button, HStack, Tooltip, useTooltip } from "@chakra-ui/react"

export const TooltipWithStore = () => {
  const tooltip = useTooltip()
  const toggleOpen = () => tooltip.setOpen(!tooltip.open)
  return (
    <HStack>
      <Button size="sm" variant="subtle" onClick={toggleOpen}>
        Toggle
      </Button>
      <Tooltip.RootProvider value={tooltip}>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Tooltip Target</Button>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>This is the tooltip content</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.RootProvider>
    </HStack>
  )
}
