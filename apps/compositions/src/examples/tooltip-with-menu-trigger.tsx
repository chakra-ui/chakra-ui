"use client"

import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithMenuTrigger = () => {
  const triggerId = useId()
  return (
    <MenuRoot ids={{ trigger: triggerId }}>
      <Tooltip
        ids={{ trigger: triggerId }}
        positioning={{ placement: "top" }}
        content="Tooltip content"
      >
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </MenuTrigger>
      </Tooltip>
      <MenuContent>
        <MenuItem value="new-txt">Open tooltip</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuItem value="new-win">New Window</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
