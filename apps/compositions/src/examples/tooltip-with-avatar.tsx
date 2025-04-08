import { Avatar } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { useId } from "react"

export const TooltipWithAvatar = () => {
  const id = useId()
  return (
    <Tooltip ids={{ trigger: id }} content="Segun Adebayo is online">
      <Avatar.Root ids={{ root: id }}>
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
        <Avatar.Fallback name="Segun Adebayo" />
      </Avatar.Root>
    </Tooltip>
  )
}
