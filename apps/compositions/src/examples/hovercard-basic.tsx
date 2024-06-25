import { Link, Strong, Text } from "@chakra-ui/react"
import {
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "compositions/ui/hovercard"

export const HoverCardBasic = () => {
  return (
    <HoverCardRoot size="sm">
      <HoverCardTrigger>
        <Link href="#">@chakra_ui</Link>
      </HoverCardTrigger>
      <HoverCardContent maxWidth="240px">
        <Text as="div" marginTrim="in-flow">
          <Strong>Chakra</Strong> is a Sanskrit word that means disk or wheel,
          referring to energy centers in the body
        </Text>
      </HoverCardContent>
    </HoverCardRoot>
  )
}
