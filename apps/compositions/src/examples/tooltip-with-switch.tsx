import { Switch } from "compositions/ui/switch"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithSwitch = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is the tooltip content">
      <Switch ids={{ root: id }} />
    </Tooltip>
  )
}
