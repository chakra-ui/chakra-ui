import { Checkbox } from "compositions/ui/checkbox"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithCheckbox = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is the tooltip content">
      <Checkbox ids={{ root: id }}>Welcome</Checkbox>
    </Tooltip>
  )
}
