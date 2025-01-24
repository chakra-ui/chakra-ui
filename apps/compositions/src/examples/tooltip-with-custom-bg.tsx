import { Button } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { FaBell } from "react-icons/fa"

export const TooltipWithCustomBg = () => (
  <Tooltip
    showArrow
    content="This is the tooltip content"
    contentProps={{ css: { "--tooltip-bg": "tomato" } }}
  >
    <Button variant="outline" size="sm">
      <FaBell /> 3
    </Button>
  </Tooltip>
)
