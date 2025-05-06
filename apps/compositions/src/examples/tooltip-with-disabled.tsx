import { Button } from "@sh3yk0-ui/react"
import { Tooltip } from "compositions/ui/tooltip"

export const TooltipWithDisabled = () => {
  return (
    <Tooltip content="This is the tooltip content" disabled>
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
