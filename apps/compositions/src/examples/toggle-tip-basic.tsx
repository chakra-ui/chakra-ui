import { Button } from "compositions/ui/button"
import { ToggleTip } from "compositions/ui/toggle-tip"
import { LuInfo } from "react-icons/lu"

export const ToggleTipBasic = () => {
  return (
    <ToggleTip content="This is some additional information.">
      <Button size="xs" variant="ghost">
        <LuInfo />
      </Button>
    </ToggleTip>
  )
}