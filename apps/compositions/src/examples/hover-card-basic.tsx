import { Link, Strong, Text } from "@chakra-ui/react"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "compositions/ui/hover-card"

export const HoverCardBasic = () => {
  return (
    <HoverCardRoot size="sm">
      <HoverCardTrigger asChild>
        <Link href="#">@chakra_ui</Link>
      </HoverCardTrigger>
      <HoverCardContent maxWidth="240px">
        <HoverCardArrow />
        <Text as="div" marginTrim="in-flow">
          <Strong>Chakra</Strong> is a Sanskrit word that means disk or wheel,
          referring to energy centers in the body
        </Text>
      </HoverCardContent>
    </HoverCardRoot>
  )
}
