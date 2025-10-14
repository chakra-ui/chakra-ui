"use client"

import { Button, Stack, Tooltip } from "@chakra-ui/react"

export const TooltipExplorer = () => {
  return (
    <Stack align="center" gap="10" py="16">
      <Tooltip.Root open>
        <Tooltip.Trigger asChild>
          <Button variant="outline" size="sm">
            Hover me
          </Button>
        </Tooltip.Trigger>

        <Tooltip.Positioner>
          <Tooltip.Content>
            This is the tooltip content
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Stack>
  )
}
