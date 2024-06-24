import { Box } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"

export const TooltipBasic = () => {
  return (
    <Tooltip showArrow content="This is the tooltip content">
      <Box
        tabIndex={0}
        userSelect="none"
        bg="bg.subtle"
        borderWidth="1px"
        borderStyle="dashed"
        padding="5"
        rounded="lg"
      >
        Hover me
      </Box>
    </Tooltip>
  )
}
