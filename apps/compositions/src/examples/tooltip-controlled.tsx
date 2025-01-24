"use client"

import { Button } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { useState } from "react"

export const TooltipControlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <Tooltip
      content="Tooltip Content"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Button size="sm">{open ? "Hide" : "Show"} tooltip</Button>
    </Tooltip>
  )
}
