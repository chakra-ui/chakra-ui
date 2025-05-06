import { Button } from "@sh3yk0-ui/react"
import { Tooltip } from "compositions/ui/tooltip"

export const TooltipWithOffset = () => {
  return (
    <Tooltip
      content="This is the tooltip content"
      positioning={{ offset: { mainAxis: 4, crossAxis: 4 } }}
    >
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
