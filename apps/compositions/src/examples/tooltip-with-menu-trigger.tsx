"use client"

import { Button, Menu, Portal } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithMenuTrigger = () => {
  const triggerId = useId()
  return (
    <Menu.Root ids={{ trigger: triggerId }}>
      <Tooltip
        ids={{ trigger: triggerId }}
        positioning={{ placement: "top" }}
        content="Tooltip content"
      >
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </Menu.Trigger>
      </Tooltip>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="new-txt">Open tooltip</Menu.Item>
            <Menu.Item value="new-file">New File...</Menu.Item>
            <Menu.Item value="new-win">New Window</Menu.Item>
            <Menu.Item value="export">Export</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
