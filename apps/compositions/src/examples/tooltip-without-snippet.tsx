import { Button, Portal, Tooltip } from "@chakra-ui/react"

export const TooltipWithoutSnippet = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button variant="outline" size="sm">
          Hover me
        </Button>
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>This is the tooltip content</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  )
}
