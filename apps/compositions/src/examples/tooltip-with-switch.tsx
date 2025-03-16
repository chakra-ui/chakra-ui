import { Switch } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithSwitch = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is the tooltip content">
      <Switch.Root ids={{ root: id }}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Toggle</Switch.Label>
      </Switch.Root>
    </Tooltip>
  )
}
