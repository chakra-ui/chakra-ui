import { Avatar } from "compositions/ui/avatar"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithAvatar = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="Segun Adebayo is online">
      <Avatar
        ids={{ root: id }}
        name="Segun Adebayo"
        src="https://bit.ly/sage-adebayo"
      />
    </Tooltip>
  )
}
