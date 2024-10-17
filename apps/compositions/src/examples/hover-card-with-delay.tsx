import { Box, Link, Strong } from "@chakra-ui/react"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "compositions/ui/hover-card"

export const HoverCardWithDelay = () => {
  return (
    <HoverCardRoot size="sm" openDelay={1000} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link href="#">@chakra_ui</Link>
      </HoverCardTrigger>
      <HoverCardContent maxWidth="240px">
        <HoverCardArrow />
        <Box>
          <Strong>Chakra</Strong> is a Sanskrit word that means disk or wheel,
          referring to energy centers in the body
        </Box>
      </HoverCardContent>
    </HoverCardRoot>
  )
}
