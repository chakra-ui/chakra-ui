import { Switch } from "@sh3yk0-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const SwitchWithTooltip = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="This is a tooltip">
      <Switch.Root ids={{ root: id }}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Switch with tooltip</Switch.Label>
      </Switch.Root>
    </Tooltip>
  )
}
